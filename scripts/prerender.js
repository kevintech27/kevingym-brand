import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Build-time prerender. Turns the single-page build into one real HTML file
// per route, so every crawler gets the right title, description and canonical
// without executing a line of JavaScript.
//
// Run by `npm run build` after the client and server bundles are built. There
// is no server at runtime.

const DIST = path.resolve('dist');
const SSR_ENTRY = pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href;

const { render, META, OG_IMAGE, SITE_URL } = await import(SSR_ENTRY);

/** HTML-escapes a value going into an attribute. */
const attr = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

/**
 * Replaces one tag, and fails the build if the tag is not found.
 *
 * The throw is the point. A silent no-match would ship eight pages that all
 * claim to be the home page, and nothing in the build output would say so.
 * That is exactly the failure this script exists to remove, so it must never
 * be able to come back quietly through an edit to index.html.
 */
const replaceTag = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    throw new Error(
      `prerender: no match for ${label}. index.html changed shape; update scripts/prerender.js.`,
    );
  }
  return html.replace(pattern, replacement);
};

const PATTERNS = {
  title: /<title>[\s\S]*?<\/title>/,
  description: /<meta\s+name="description"[\s\S]*?\/>/,
  canonical: /<link rel="canonical"[^>]*\/>/,
  ogType: /<meta property="og:type"[^>]*\/>/,
  ogTitle: /<meta property="og:title"[^>]*\/>/,
  ogDescription: /<meta\s+property="og:description"[\s\S]*?\/>/,
  ogUrl: /<meta property="og:url"[^>]*\/>/,
  twitterTitle: /<meta name="twitter:title"[^>]*\/>/,
  twitterDescription: /<meta\s+name="twitter:description"[\s\S]*?\/>/,
  root: /<div id="root"><\/div>/,
};

const buildPage = (template, route, meta, appHtml) => {
  const url = `${SITE_URL}${route}`;
  let html = template;

  html = replaceTag(html, PATTERNS.title, `<title>${attr(meta.title)}</title>`, 'title');
  html = replaceTag(
    html,
    PATTERNS.description,
    `<meta name="description" content="${attr(meta.description)}" />`,
    'description',
  );
  html = replaceTag(
    html,
    PATTERNS.canonical,
    `<link rel="canonical" href="${attr(url)}" />`,
    'canonical',
  );
  html = replaceTag(
    html,
    PATTERNS.ogType,
    `<meta property="og:type" content="${route === '/' ? 'website' : 'article'}" />`,
    'og:type',
  );
  html = replaceTag(
    html,
    PATTERNS.ogTitle,
    `<meta property="og:title" content="${attr(meta.title)}" />`,
    'og:title',
  );
  html = replaceTag(
    html,
    PATTERNS.ogDescription,
    `<meta property="og:description" content="${attr(meta.description)}" />`,
    'og:description',
  );
  html = replaceTag(html, PATTERNS.ogUrl, `<meta property="og:url" content="${attr(url)}" />`, 'og:url');
  html = replaceTag(
    html,
    PATTERNS.twitterTitle,
    `<meta name="twitter:title" content="${attr(meta.title)}" />`,
    'twitter:title',
  );
  html = replaceTag(
    html,
    PATTERNS.twitterDescription,
    `<meta name="twitter:description" content="${attr(meta.description)}" />`,
    'twitter:description',
  );
  html = replaceTag(html, PATTERNS.root, `<div id="root">${appHtml}</div>`, 'root container');

  return html;
};

/**
 * Shell served for any URL that matches no route. It carries noindex and no
 * canonical: a rewrite answers 200, so without this every mistyped address
 * would be served as another indexable copy of the home page.
 */
const buildFallback = (template) => {
  let html = template.replace(PATTERNS.canonical, '');
  html = replaceTag(
    html,
    /<meta name="robots"[^>]*\/>/,
    '<meta name="robots" content="noindex, nofollow" />',
    'robots',
  );
  return replaceTag(html, PATTERNS.title, '<title>Page not found | KEVINGYM</title>', 'title');
};

const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
const routes = Object.keys(META);
const written = [];

for (const route of routes) {
  const html = buildPage(template, route, META[route], render(route));
  const target =
    route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html');

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, html, 'utf8');
  written.push(path.relative(DIST, target).replaceAll('\\', '/'));
}

await fs.writeFile(path.join(DIST, 'spa-fallback.html'), buildFallback(template), 'utf8');
written.push('spa-fallback.html');

// Sanity check. OG_IMAGE is exported so a future change to the image path
// cannot leave the prerendered pages pointing at a file that is not shipped.
const ogFile = path.join(DIST, OG_IMAGE.replace(SITE_URL, ''));
await fs.access(ogFile).catch(() => {
  throw new Error(`prerender: og:image points at ${OG_IMAGE} but ${ogFile} is not in the build.`);
});

console.log(`prerender: ${written.length} files written`);
for (const f of written) console.log(`  ${f}`);
