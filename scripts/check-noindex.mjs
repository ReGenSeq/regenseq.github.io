#!/usr/bin/env node
/**
 * check-noindex.mjs
 *
 * Guards against internal pages shipping without a noindex Helmet tag.
 *
 * Algorithm:
 *   1. Read client/public/robots.txt → collect all "Disallow" paths.
 *   2. Skip non-page paths (/api/, /_vite/, wildcards, directory-style).
 *   3. Parse client/src/App.tsx to build a map of { route-path → component-name }.
 *   4. For every disallowed page path, find the matching component file and
 *      verify it contains a <meta name="robots" content="...noindex..."> tag
 *      INSIDE a <Helmet> JSX element (not elsewhere in the file).
 *   5. Exit 1 (with clear diagnostics) if any check fails; exit 0 on success.
 *
 * Run:   node scripts/check-noindex.mjs
 * Or:    npm run test:noindex
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── helpers ──────────────────────────────────────────────────────────────────

function readFile(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    throw new Error(`File not found: ${abs}`);
  }
  return fs.readFileSync(abs, "utf8");
}

/** Parse robots.txt and return all Disallow values. */
function parseDisallowPaths(robotsTxt) {
  return robotsTxt
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.toLowerCase().startsWith("disallow:"))
    .map((l) => l.replace(/^disallow:\s*/i, "").trim());
}

/**
 * Determine whether a Disallow path represents an individual page route
 * (as opposed to a directory wildcard or a backend path).
 */
const BACKEND_PREFIXES = ["/api/", "/_vite/"];

function isPagePath(p) {
  if (!p || p === "/") return false;
  if (p.endsWith("/")) return false;
  if (p.includes("*")) return false;
  if (BACKEND_PREFIXES.some((prefix) => p.startsWith(prefix))) return false;
  return true;
}

/**
 * Parse App.tsx and return a map of routePath → componentName.
 * Looks for patterns like:  <Route path="/foo-bar" component={FooBar} />
 */
function parseRouteMap(appTsx) {
  const map = new Map();
  const routeRe =
    /<Route\s+path=["']([^"']+)["']\s+component=\{([A-Za-z0-9_]+)\}/g;
  let m;
  while ((m = routeRe.exec(appTsx)) !== null) {
    map.set(m[1], m[2]);
  }
  return map;
}

/**
 * Given a componentName (e.g. "HiSeqOutline"), try to find its source file
 * under client/src/pages/.
 */
function resolveComponentFile(componentName) {
  const pagesDir = path.join(ROOT, "client", "src", "pages");
  for (const ext of [".tsx", ".ts", ".jsx", ".js"]) {
    const candidate = path.join(pagesDir, `${componentName}${ext}`);
    if (fs.existsSync(candidate)) {
      return path.relative(ROOT, candidate);
    }
  }
  return null;
}

/**
 * Return true when the source contains a <Helmet> JSX element that encloses
 * a <meta name="robots" content="...noindex..."> tag.
 *
 * The detector:
 *   1. Finds every <Helmet ...>…</Helmet> block in the source.
 *   2. Checks whether the noindex robots meta appears inside that block.
 *
 * This means:
 *   - An unused `import { Helmet }` with the meta elsewhere → FAILS ✓
 *   - A `<Helmet>` block containing only other tags → FAILS ✓
 *   - A standalone meta tag outside any Helmet block → FAILS ✓
 *   - A `<Helmet>` block that contains the correct meta → PASSES ✓
 */
const HELMET_BLOCK_RE = /<Helmet(?:\s[^>]*)?>([^]*?)<\/Helmet>/g;
const NOINDEX_META_RE =
  /<meta\s[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["']/;

function hasNoindexHelmet(src) {
  // Reset lastIndex before each use (global regex retains state)
  HELMET_BLOCK_RE.lastIndex = 0;
  let m;
  while ((m = HELMET_BLOCK_RE.exec(src)) !== null) {
    const helmetBody = m[1];
    if (NOINDEX_META_RE.test(helmetBody)) {
      return true;
    }
  }
  return false;
}

// ── self-tests (fixture-based) ────────────────────────────────────────────────
// Run before checking real files.  If the detector itself is broken, exit early.

function runSelfTests() {
  const cases = [
    // ── passing cases ──────────────────────────────────────────────────────
    {
      desc: "noindex meta inside <Helmet>",
      src: `
        import { Helmet } from "react-helmet-async";
        export default function Page() {
          return (
            <div>
              <Helmet>
                <meta name="robots" content="noindex, nofollow" />
              </Helmet>
            </div>
          );
        }
      `,
      expected: true,
    },
    {
      desc: "noindex meta inside <Helmet> with props",
      src: `
        <Helmet prioritizeSeoTags>
          <title>Foo</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
      `,
      expected: true,
    },
    {
      desc: "noindex listed among other directives inside Helmet",
      src: `
        <Helmet>
          <meta name="robots" content="max-snippet:-1, noindex" />
        </Helmet>
      `,
      expected: true,
    },

    // ── failing cases ──────────────────────────────────────────────────────
    {
      desc: "Helmet import only — no JSX Helmet element",
      src: `
        import { Helmet } from "react-helmet-async";
        export default function Page() {
          return <div><meta name="robots" content="noindex, nofollow" /></div>;
        }
      `,
      expected: false,
    },
    {
      desc: "noindex meta is outside the Helmet block",
      src: `
        <div>
          <Helmet><title>Foo</title></Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </div>
      `,
      expected: false,
    },
    {
      desc: "Helmet block present but contains no noindex",
      src: `
        <Helmet>
          <title>Foo</title>
          <meta name="description" content="Bar" />
        </Helmet>
      `,
      expected: false,
    },
    {
      desc: "noindex meta but no Helmet element at all",
      src: `<meta name="robots" content="noindex, nofollow" />`,
      expected: false,
    },
    {
      desc: "robots meta with noindex in component comment only",
      src: `
        // noindex — internal design tool, not public content
        <Helmet><title>Foo</title></Helmet>
      `,
      expected: false,
    },
  ];

  let selfTestFailed = false;
  for (const { desc, src, expected } of cases) {
    const actual = hasNoindexHelmet(src);
    if (actual !== expected) {
      console.error(
        `✗  Self-test FAILED: "${desc}" — expected ${expected}, got ${actual}`
      );
      selfTestFailed = true;
    }
  }

  if (selfTestFailed) {
    console.error(
      "\nDetector self-tests failed. Fix hasNoindexHelmet() before running against real files."
    );
    process.exit(2);
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

// 0. Validate the detector itself first
runSelfTests();

const errors = [];
const warnings = [];

// 1. Load robots.txt
const robotsTxt = readFile("client/public/robots.txt");
const allDisallow = parseDisallowPaths(robotsTxt);
const pagePaths = allDisallow.filter(isPagePath);

if (pagePaths.length === 0) {
  console.warn(
    "⚠  No page-style Disallow entries found in robots.txt — nothing to check."
  );
  process.exit(0);
}

// 2. Load App.tsx route map
const appTsx = readFile("client/src/App.tsx");
const routeMap = parseRouteMap(appTsx);

// 3. Check each disallowed page path
let passed = 0;

for (const routePath of pagePaths) {
  const componentName = routeMap.get(routePath);

  if (!componentName) {
    warnings.push(
      `robots.txt disallows "${routePath}" but no matching Route was found in App.tsx.`
    );
    continue;
  }

  const componentFile = resolveComponentFile(componentName);

  if (!componentFile) {
    errors.push(
      `Route "${routePath}" maps to component "${componentName}" but no source file was found under client/src/pages/.`
    );
    continue;
  }

  const src = readFile(componentFile);

  if (!hasNoindexHelmet(src)) {
    errors.push(
      `"${componentFile}" (served at "${routePath}") is listed as Disallow in robots.txt ` +
        `but does NOT contain a <Helmet> block with a noindex robots meta tag.\n` +
        `  Add inside the component's JSX:\n` +
        `    <Helmet>\n` +
        `      <meta name="robots" content="noindex, nofollow" />\n` +
        `    </Helmet>`
    );
    continue;
  }

  console.log(`✓  ${routePath}  →  ${componentFile}`);
  passed++;
}

// 4. Report
if (warnings.length) {
  console.warn("\n⚠  Warnings:");
  warnings.forEach((w) => console.warn(`   ${w}`));
}

if (errors.length) {
  console.error(`\n✗  ${errors.length} check(s) failed:\n`);
  errors.forEach((e, i) => console.error(`  [${i + 1}] ${e}\n`));
  process.exit(1);
}

console.log(
  `\n✓  All ${passed} disallowed page route(s) have a noindex Helmet tag.`
);
