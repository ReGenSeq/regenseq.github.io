import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { teamMembers } from "./client/src/data/team";

/**
 * Vite plugin: generates Person JSON-LD from the team data file and injects it
 * into index.html at the TEAM_JSONLD_PLACEHOLDER comment.  This keeps the
 * structured data in sync with the UI — edit client/src/data/team.ts and both
 * are updated automatically.
 */
/** Derive a stable URL fragment id from a person's name, e.g. "Dr. Kunal Pandit" → "person-kunal-pandit" */
function personId(name: string): string {
  return (
    "https://regenseq.github.io/#" +
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

function teamJsonLdPlugin() {
  return {
    name: "vite-team-jsonld",
    transformIndexHtml(html: string): string {
      // Build Person JSON-LD blocks with @id anchors for cross-referencing
      const personBlocks = teamMembers.map((m) => {
        const block: Record<string, unknown> = {
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": personId(m.name),
          name: m.name,
          jobTitle: m.role,
          email: m.email,
          description: m.description,
          affiliation: {
            "@type": "Organization",
            name: m.org,
            url: m.orgUrl,
          },
          worksFor: {
            "@type": "Organization",
            name: m.org,
            url: m.orgUrl,
          },
        };
        if (m.imageUrl) {
          block.image = m.imageUrl;
        }
        return block;
      });

      const scriptTag =
        `<script type="application/ld+json">\n` +
        JSON.stringify(personBlocks, null, 2) +
        `\n    </script>`;

      const placeholder =
        /[ \t]*<!--\s*TEAM_JSONLD_PLACEHOLDER[^>]*-->/;

      if (!placeholder.test(html)) {
        console.warn(
          "[vite-team-jsonld] TEAM_JSONLD_PLACEHOLDER comment not found in index.html — JSON-LD was not injected."
        );
        return html;
      }

      let result = html.replace(placeholder, `    ${scriptTag}`);

      // Inject a "member" array into the RegenSeq Organization JSON-LD block so
      // search engines can associate each Person with the organisation.
      // We scan every ld+json script tag, parse it, and patch the one whose
      // top-level @type is "Organization" and name is "RegenSeq".
      result = result.replace(
        /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g,
        (_match, open, body, close) => {
          let parsed: Record<string, unknown>;
          try {
            parsed = JSON.parse(body);
          } catch {
            return _match; // not JSON we can handle — leave untouched
          }
          if (
            parsed["@type"] === "Organization" &&
            parsed["name"] === "RegenSeq"
          ) {
            parsed["member"] = teamMembers.map((m) => ({
              "@id": personId(m.name),
            }));
            return `${open}\n    ${JSON.stringify(parsed, null, 2).replace(/\n/g, "\n    ")}\n    ${close}`;
          }
          return _match;
        }
      );

      return result;
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    teamJsonLdPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
