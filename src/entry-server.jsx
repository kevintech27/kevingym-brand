import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '@/App';

// Server entry, used only by scripts/prerender.js at build time. There is no
// server at runtime: Vercel serves the files this produces as plain static
// HTML.
//
// Why this exists. The site is a single-page app, so before this the server
// answered every one of the eight URLs with the same index.html. Any crawler
// that does not execute JavaScript therefore read the home page's title,
// description and canonical on all eight pages, and a canonical pointing at
// the root from every page is an instruction to index one page instead of
// eight. Google runs JavaScript and would eventually correct that, but Bing,
// LinkedIn, WhatsApp, Slack, Facebook and X do not, which is why sharing a
// deep link previewed as the home page.
//
// RouteMeta still writes the same tags in the browser. It stays: it is what
// keeps the head correct during client-side navigation, when no new document
// is ever requested. The two are consistent by construction because both read
// META from RouteMeta.jsx.
export { META, OG_IMAGE, normalisePath } from '@/components/RouteMeta';
export { SITE_URL } from '@/lib/brand';

export const render = (url) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
