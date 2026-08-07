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
    ogImage: 'https://regenseq.github.io/og-image.png',
    ogImageWidth: '1408',
    ogImageHeight: '768',
    ogImageAlt: 'DNA sequencing laboratory equipment showing repurposed Illumina HiSeq 2500 sequencer for spatial biology research',
    // Page-specific JSON-LD blocks injected into the static HTML at build time so
    // Googlebot and the SEO smoke test see them in the raw document.
    jsonLdBlocks: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is ReGenSeq?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ReGenSeq is an NSF POSE Phase I–funded open source ecosystem that repurposes decommissioned Illumina HiSeq 2500 DNA sequencers into flexible automation platforms for spatial biology, spatial transcriptomics, and proteomics research. It is developed at the Technology Innovation Laboratory at the New York Genome Center (NYGC)."
            }
          },
          {
            "@type": "Question",
            "name": "What is PySeq2500?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PySeq2500 is the open source Python control software at the heart of ReGenSeq. It allows researchers to control a repurposed Illumina HiSeq 2500 sequencer as an automated fluorescence microscope for spatial biology workflows."
            }
          },
          {
            "@type": "Question",
            "name": "How can I get a repurposed HiSeq 2500 sequencer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can submit a request through the ReGenSeq community's 'Find a Sequencer' form at https://regenseq.github.io/community/find-a-sequencer. The community will help match you with a nearby decommissioned instrument."
            }
          },
          {
            "@type": "Question",
            "name": "How can I get custom flowcells for the HiSeq 2500?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Custom HiSeq flowcells are available from the ReGenSeq community for $50 each. Submit a request at https://regenseq.github.io/community/request-flowcells and the team will follow up on availability."
            }
          },
          {
            "@type": "Question",
            "name": "Is ReGenSeq free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. ReGenSeq (PySeq2500) is open source software released under a permissive license. The source code is freely available on GitHub at https://github.com/ReGenSeq/PySeq2500."
            }
          },
          {
            "@type": "Question",
            "name": "What research applications does ReGenSeq support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ReGenSeq supports spatial transcriptomics, spatial proteomics, cyclic immunofluorescence (CyCIF), multiplexed imaging, and other single-cell spatial assays. It transforms a decommissioned DNA sequencer into a programmable fluorescence microscopy platform."
            }
          }
        ]
      },
    ],
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
    ogImage: 'https://regenseq.github.io/og-image.png',
    ogImageWidth: '1408',
    ogImageHeight: '768',
    ogImageAlt: 'DNA sequencing laboratory equipment showing repurposed Illumina HiSeq 2500 sequencer for spatial biology research',
    jsonLdBlocks: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Community", "item": "https://regenseq.github.io/#community" },
          { "@type": "ListItem", "position": 2, "name": "Community Guidelines", "item": "https://regenseq.github.io/community-guidelines" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "ReGenSeq Community Guidelines",
        "description": "Coding conventions and contribution guidelines for the ReGenSeq open source project, covering instruments, systems, hardware settings, recipes, and how to contribute.",
        "url": "https://regenseq.github.io/community-guidelines",
        "inLanguage": "en-US",
        "author": {
          "@type": "Organization",
          "name": "ReGenSeq Open Source Community",
          "url": "https://regenseq.github.io/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "New York Genome Center",
          "url": "https://www.nygenome.org/"
        },
        "about": {
          "@type": "SoftwareApplication",
          "name": "PySeq2500",
          "url": "https://github.com/ReGenSeq/PySeq2500"
        },
        "keywords": "PySeq2500, open source, contribution guidelines, lab automation, HiSeq 2500, spatial biology, Python conventions"
      },
    ],
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
    ogImage: 'https://regenseq.github.io/og-image.png',
    ogImageWidth: '1408',
    ogImageHeight: '768',
    ogImageAlt: 'DNA sequencing laboratory equipment showing repurposed Illumina HiSeq 2500 sequencer for spatial biology research',
    jsonLdBlocks: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Community", "item": "https://regenseq.github.io/#community" },
          { "@type": "ListItem", "position": 2, "name": "Request Flowcells", "item": "https://regenseq.github.io/community/request-flowcells" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Request or Purchase HiSeq Flowcells",
        "description": "Request or purchase custom flowcells for repurposed Illumina HiSeq 2500 sequencers from the ReGenSeq community. Flowcells are available for $50 each.",
        "url": "https://regenseq.github.io/community/request-flowcells",
        "provider": {
          "@type": "Organization",
          "name": "ReGenSeq Open Source Community",
          "url": "https://regenseq.github.io/"
        },
        "offers": {
          "@type": "Offer",
          "price": "50",
          "priceCurrency": "USD",
          "description": "Custom HiSeq 2500 flowcell",
          "availability": "https://schema.org/InStock"
        },
        "areaServed": "Worldwide",
        "serviceType": "Laboratory Equipment Supply"
      },
    ],
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
    ogImage: 'https://regenseq.github.io/og-image.png',
    ogImageWidth: '1408',
    ogImageHeight: '768',
    ogImageAlt: 'DNA sequencing laboratory equipment showing repurposed Illumina HiSeq 2500 sequencer for spatial biology research',
    jsonLdBlocks: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Community", "item": "https://regenseq.github.io/#community" },
          { "@type": "ListItem", "position": 2, "name": "Find a Sequencer", "item": "https://regenseq.github.io/community/find-a-sequencer" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Find a Decommissioned HiSeq 2500 Sequencer",
        "description": "Submit your location and research goals and the ReGenSeq community will help match you with a nearby decommissioned Illumina HiSeq 2500 sequencer available for repurposing.",
        "url": "https://regenseq.github.io/community/find-a-sequencer",
        "provider": {
          "@type": "Organization",
          "name": "ReGenSeq Open Source Community",
          "url": "https://regenseq.github.io/"
        },
        "areaServed": "Worldwide",
        "serviceType": "Laboratory Equipment Matching",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free community matching service for decommissioned HiSeq 2500 sequencers"
        }
      },
    ],
  },
];

function injectMeta(html, route) {
  // Inject page-specific JSON-LD blocks immediately before </head>.
  if (route.jsonLdBlocks && route.jsonLdBlocks.length > 0) {
    const scripts = route.jsonLdBlocks
      .map(
        (block) =>
          `    <script type="application/ld+json">\n    ${JSON.stringify(block, null, 2).replace(/\n/g, '\n    ')}\n    </script>`
      )
      .join('\n');
    html = html.replace('</head>', `${scripts}\n  </head>`);
  }

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
  // og:image
  html = html.replace(
    /(<meta property="og:image" content=")[^"]*(")/,
    `$1${route.ogImage}$2`
  );
  // og:image:width
  html = html.replace(
    /(<meta property="og:image:width" content=")[^"]*(")/,
    `$1${route.ogImageWidth}$2`
  );
  // og:image:height
  html = html.replace(
    /(<meta property="og:image:height" content=")[^"]*(")/,
    `$1${route.ogImageHeight}$2`
  );
  // og:image:alt
  html = html.replace(
    /(<meta property="og:image:alt" content=")[^"]*(")/,
    `$1${route.ogImageAlt}$2`
  );
  // twitter:image
  html = html.replace(
    /(<meta name="twitter:image" content=")[^"]*(")/,
    `$1${route.ogImage}$2`
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
