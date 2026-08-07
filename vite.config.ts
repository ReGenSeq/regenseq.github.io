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
function teamJsonLdPlugin() {
  return {
    name: "vite-team-jsonld",
    transformIndexHtml(html: string): string {
      const personBlocks = teamMembers.map((m) => {
        const block: Record<string, unknown> = {
          "@context": "https://schema.org",
          "@type": "Person",
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

      return html.replace(placeholder, `    ${scriptTag}`);
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
