/**
 * generate-routes.mjs
 * Post-build script: copies dist/public/index.html into per-route subdirectories,
 * injecting route-specific title, description, canonical, and OG tags so that
 * Googlebot and AI crawlers see correct meta before JavaScript executes.
 *
 * Run automatically via: npm run build
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist', 'public');

const routes = [
  {
    path: '/',
    title: 'RegenSeq | Repurpose DNA Sequencers for Spatial Biology',
    description:
      'Open source toolkit to repurpose Illumina HiSeq 2500 sequencers as automation platforms for spatial biology and proteomics research.',
    canonical: 'https://regenseq.github.io/',
    ogTitle: 'RegenSeq | Open Source DNA Sequencer Repurposing',
    ogDescription:
      'NSF-funded toolkit for repurposing HiSeq 2500 sequencers into automation platforms for spatial biology research.',
  },
  {
    path: '/community-guidelines',
    title: 'Community Guidelines | RegenSeq',
    description:
      'Coding conventions and contribution guidelines for the RegenSeq open source project — instruments, systems, hardware settings, recipes, and how to contribute.',
    canonical: 'https://regenseq.github.io/community-guidelines',
    ogTitle: 'Community Guidelines | RegenSeq',
    ogDescription:
      'Shared conventions for building reliable laboratory automation software with PySeq2500.',
  },
  {
    path: '/community/request-flowcells',
    title: 'Request Flowcells | RegenSeq',
    description:
      'Request or purchase custom HiSeq flowcells for your spatial biology research. Submit the form and the RegenSeq team will follow up on availability.',
    canonical: 'https://regenseq.github.io/community/request-flowcells',
    ogTitle: 'Request Flowcells | RegenSeq',
    ogDescription:
      'Get custom flowcells for repurposed Illumina HiSeq 2500 sequencers. Request or purchase for $50 each.',
  },
  {
    path: '/community/find-a-sequencer',
    title: 'Find a Sequencer | RegenSeq',
    description:
      "Tell us your location and research goals and we'll help match you with a nearby decommissioned Illumina HiSeq 2500 sequencer.",
    canonical: 'https://regenseq.github.io/community/find-a-sequencer',
    ogTitle: 'Find a Sequencer | RegenSeq',
    ogDescription:
      'Submit your details and let the RegenSeq community help you locate a suitable sequencer for spatial biology research.',
  },
];

function injectMeta(html, route) {
  // title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  // meta description
  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${route.description}$2`
  );
  // canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${route.canonical}" />`
  );
  // og:title
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${route.ogTitle}$2`
  );
  // og:description
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${route.ogDescription}$2`
  );
  // og:url
  html = html.replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    `$1${route.canonical}$2`
  );
  // twitter:title
  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${route.ogTitle}$2`
  );
  // twitter:description
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${route.ogDescription}$2`
  );
  return html;
}

const template = readFileSync(join(distPath, 'index.html'), 'utf-8');

for (const route of routes) {
  const html = injectMeta(template, route);

  if (route.path === '/') {
    writeFileSync(join(distPath, 'index.html'), html);
    console.log('✅  /  →  dist/public/index.html');
  } else {
    const segments = route.path.slice(1); // strip leading /
    const dir = join(distPath, segments);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
    console.log(`✅  ${route.path}  →  dist/public/${segments}/index.html`);
  }
}

// Update sitemap lastmod dates to today's date
const today = new Date().toISOString().split('T')[0];
const sitemapPath = join(distPath, 'sitemap.xml');
if (existsSync(sitemapPath)) {
  let sitemap = readFileSync(sitemapPath, 'utf-8');
  sitemap = sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  writeFileSync(sitemapPath, sitemap);
  console.log(`✅  sitemap.xml lastmod → ${today}`);
}

console.log('\n🎉  Route generation complete.');
