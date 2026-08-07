/**
 * smoke-test-seo.mjs
 * Fetches each prerendered route from the live GitHub Pages URL and asserts
 * that the expected <title>, <meta name="description">, and OG tags are
 * present in the raw HTML response.
 *
 * Usage:
 *   node scripts/smoke-test-seo.mjs [base-url]
 *
 * Defaults to https://regenseq.github.io when no base-url is supplied.
 */

const BASE_URL = process.argv[2] ?? 'https://regenseq.github.io';

const routes = [
  {
    path: '/',
    title: 'RegenSeq | Repurpose DNA Sequencers for Spatial Biology',
    description:
      'Open source toolkit to repurpose Illumina HiSeq 2500 sequencers as automation platforms for spatial biology and proteomics research.',
    ogTitle: 'RegenSeq | Open Source DNA Sequencer Repurposing',
    ogDescription:
      'NSF-funded toolkit for repurposing HiSeq 2500 sequencers into automation platforms for spatial biology research.',
    ogImage: 'https://regenseq.github.io/og-image.png',
  },
  {
    path: '/community-guidelines',
    title: 'Community Guidelines | RegenSeq',
    description:
      'Coding conventions and contribution guidelines for the RegenSeq open source project — instruments, systems, hardware settings, recipes, and how to contribute.',
    ogTitle: 'Community Guidelines | RegenSeq',
    ogDescription:
      'Shared conventions for building reliable laboratory automation software with PySeq2500.',
    ogImage: 'https://regenseq.github.io/og-image.png',
  },
  {
    path: '/community/request-flowcells',
    title: 'Request Flowcells | RegenSeq',
    description:
      'Request or purchase custom HiSeq flowcells for your spatial biology research. Submit the form and the RegenSeq team will follow up on availability.',
    ogTitle: 'Request Flowcells | RegenSeq',
    ogDescription:
      'Get custom flowcells for repurposed Illumina HiSeq 2500 sequencers. Request or purchase for $50 each.',
    ogImage: 'https://regenseq.github.io/og-image.png',
  },
  {
    path: '/community/find-a-sequencer',
    title: 'Find a Sequencer | RegenSeq',
    description:
      "Tell us your location and research goals and we'll help match you with a nearby decommissioned Illumina HiSeq 2500 sequencer.",
    ogTitle: 'Find a Sequencer | RegenSeq',
    ogDescription:
      'Submit your details and let the RegenSeq community help you locate a suitable sequencer for spatial biology research.',
    ogImage: 'https://regenseq.github.io/og-image.png',
  },
];

/** Escape a string for use inside a regex. */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Check that `html` contains each expected tag value; return a list of failures. */
function checkHtml(html, route) {
  const failures = [];

  const checks = [
    {
      label: '<title>',
      pattern: new RegExp(`<title>${escapeRegex(route.title)}</title>`),
    },
    {
      label: 'meta description',
      pattern: new RegExp(
        `<meta\\s+name="description"\\s+content="${escapeRegex(route.description)}"`,
      ),
    },
    {
      label: 'og:title',
      pattern: new RegExp(
        `<meta\\s+property="og:title"\\s+content="${escapeRegex(route.ogTitle)}"`,
      ),
    },
    {
      label: 'og:description',
      pattern: new RegExp(
        `<meta\\s+property="og:description"\\s+content="${escapeRegex(route.ogDescription)}"`,
      ),
    },
    {
      label: 'og:image',
      pattern: new RegExp(
        `<meta\\s+property="og:image"\\s+content="${escapeRegex(route.ogImage)}"`,
      ),
    },
    {
      label: 'twitter:image',
      pattern: new RegExp(
        `<meta\\s+name="twitter:image"\\s+content="${escapeRegex(route.ogImage)}"`,
      ),
    },
  ];

  for (const { label, pattern } of checks) {
    if (!pattern.test(html)) {
      failures.push(`  ✗ ${label} not found`);
    }
  }

  return failures;
}

/**
 * Perform a HEAD request on `url` and confirm it returns HTTP 200.
 * Returns null on success, or an error string on failure.
 */
async function checkImageUrl(url, retries = 3, delayMs = 5000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'HEAD',
        headers: { 'User-Agent': 'RegenSeq-SEO-SmokeTest/1.0' },
        redirect: 'follow',
      });
      if (res.ok) return null;
      return `HTTP ${res.status} ${res.statusText}`;
    } catch (err) {
      if (attempt === retries) return err.message;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

async function fetchWithRetry(url, retries = 3, delayMs = 5000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'RegenSeq-SEO-SmokeTest/1.0' },
        redirect: 'follow',
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      return await res.text();
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`    attempt ${attempt} failed (${err.message}), retrying in ${delayMs}ms…`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

let overallPassed = true;

console.log(`\n🔍  SEO smoke test against ${BASE_URL}\n`);

for (const route of routes) {
  const url = `${BASE_URL}${route.path}`;
  process.stdout.write(`  ${route.path} … `);

  let html;
  try {
    html = await fetchWithRetry(url);
  } catch (err) {
    console.log(`FAIL (fetch error: ${err.message})`);
    overallPassed = false;
    continue;
  }

  const failures = checkHtml(html, route);
  if (failures.length === 0) {
    console.log('PASS');
  } else {
    console.log('FAIL');
    failures.forEach((f) => console.log(f));
    overallPassed = false;
  }
}

// Check that each unique OG image URL is reachable (HTTP 200).
const imageUrls = [...new Set(routes.map((r) => r.ogImage).filter(Boolean))];
if (imageUrls.length > 0) {
  console.log('🖼️   Checking OG image URLs…\n');
  for (const imageUrl of imageUrls) {
    process.stdout.write(`  ${imageUrl} … `);
    const err = await checkImageUrl(imageUrl);
    if (err) {
      console.log(`FAIL (${err})`);
      overallPassed = false;
    } else {
      console.log('PASS');
    }
  }
  console.log('');
}

if (overallPassed) {
  console.log('✅  All SEO smoke tests passed.');
  process.exit(0);
} else {
  console.error('❌  One or more SEO smoke tests failed.');
  process.exit(1);
}
