// Postbuild SEO steps (runs after `ng build` via the npm "postbuild" hook).
//
// 1. sitemap.xml — generated from the ACTUAL prerendered output so it can't
//    drift from the route list. Every prerendered route (home, the six
//    /services/<slug> pages, every /insights/<slug> post, and the other
//    static pages) is derived from the folders Angular emitted.
// 2. 404.html — copied from the prerendered /404 page so Netlify serves the
//    NotFound page with a real 404 status for unmatched URLs.

import { readdirSync, statSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { join, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://cloudcomputingassociates.com';
const ROOT = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'dist',
  'cloudcomputingassociates-com',
  'browser'
);

if (!existsSync(ROOT)) {
  console.error(`postbuild: build output not found at ${ROOT}`);
  process.exit(1);
}

// Collect every prerendered page (a folder containing index.html).
function findIndexFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) findIndexFiles(full, acc);
    else if (entry.name === 'index.html') acc.push(full);
  }
  return acc;
}

const indexFiles = findIndexFiles(ROOT);

const urls = [];
for (const file of indexFiles) {
  const relDir = relative(ROOT, dirname(file)).split(sep).join('/'); // '' = home
  // The /404 page is not a public route — exclude it from the sitemap.
  if (relDir === '404') continue;
  const loc = relDir === '' ? `${ORIGIN}/` : `${ORIGIN}/${relDir}`;
  const lastmod = statSync(file).mtime.toISOString().slice(0, 10); // YYYY-MM-DD
  urls.push({ loc, lastmod });
}

urls.sort((a, b) => a.loc.localeCompare(b.loc));

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

writeFileSync(join(ROOT, 'sitemap.xml'), xml);
console.log(`postbuild: sitemap.xml written with ${urls.length} URL(s)`);

// Create 404.html from the prerendered /404 page so Netlify returns a real 404.
const notFoundSrc = join(ROOT, '404', 'index.html');
if (existsSync(notFoundSrc)) {
  copyFileSync(notFoundSrc, join(ROOT, '404.html'));
  console.log('postbuild: 404.html created from prerendered /404 page');
} else {
  console.error('postbuild: /404/index.html not found — 404.html NOT created');
  process.exit(1);
}
