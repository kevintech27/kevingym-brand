import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '@/lib/brand';

// RouteMeta: title, description, canonical, Open Graph and Twitter card per
// route. Written straight into the <head>, without react-helmet: on the
// programme site, react-helmet@6 turned out to be completely inoperative with
// React 18 + createRoot + StrictMode (no tag injected at all when the Helmet
// mounts on first render). We don't reproduce that trap here.
//
// The canonical ALWAYS points at kevingym.com. This site is the personal
// brand. No page canonicalises toward kevingymworkout.com, which is a
// separate site with its own content and its own sitemap.

export const OG_IMAGE = `${SITE_URL}/og.png`;

export const META = {
  '/': {
    title: 'Kevin Nguena | KEVINGYM, Content Creator, Athlete, Founder',
    description:
      'Official site of Kevin Nguena. Content creator, athlete, and founder of KEVINGYM. Brand collaborations, gym partnerships, and HYBRID SYSTEM.',
  },
  '/about': {
    title: 'About Kevin Nguena | KEVINGYM',
    description:
      'How KEVINGYM started, how Kevin Nguena trains today, and the platform he built and runs himself behind it.',
  },
  '/content': {
    title: 'Content | Kevin Nguena, KEVINGYM',
    description:
      'Vertical-first fitness content by Kevin Nguena: Reels, TikTok, UGC, shoots and long-form. Audience figures and deliverables.',
  },
  '/partners': {
    title: 'Partners | Kevin Nguena, KEVINGYM',
    description:
      'Work with Kevin Nguena. Brand campaigns, gym collaborations, events and appearances. One inbox, answered personally.',
  },
  '/partners/brands': {
    title: 'For brands | Kevin Nguena, KEVINGYM',
    description:
      'Campaign content, UGC and paid usage, long-term ambassador deals and event appearances with Kevin Nguena. Audience figures and process.',
  },
  '/partners/gyms': {
    title: 'For gyms | Kevin Nguena, KEVINGYM',
    description:
      'Filming on site, open training sessions, opening coverage and ongoing home-gym partnerships with Kevin Nguena.',
  },
  '/hybrid': {
    title: 'HYBRID SYSTEM | Strength and conditioning by Kevin Nguena',
    description:
      'HYBRID SYSTEM is the single training system by Kevin Nguena: strength and conditioning in the same week. Sold and delivered on kevingymworkout.com.',
  },
  '/contact': {
    title: 'Contact | Kevin Nguena, KEVINGYM',
    description:
      'Contact Kevin Nguena for a brand campaign, a gym collaboration, an event invitation or a project. Every professional inquiry is answered personally.',
  },
};

const upsert = (selector, create, attr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const setMeta = (name, content, byProperty = false) =>
  upsert(
    byProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute(byProperty ? 'property' : 'name', name);
      return m;
    },
    'content',
    content,
  );

const setLink = (rel, href) =>
  upsert(
    `link[rel="${rel}"]`,
    () => {
      const l = document.createElement('link');
      l.setAttribute('rel', rel);
      return l;
    },
    'href',
    href,
  );

export const normalisePath = (pathname) =>
  pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

export const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = normalisePath(pathname);
    const known = META[path];
    const url = `${SITE_URL}${path === '/' ? '/' : path}`;

    if (!known) {
      // Unknown route: no indexing, and no canonical claimed for an address
      // that has no content behind it.
      document.title = 'Page not found | KEVINGYM';
      setMeta('robots', 'noindex, nofollow');
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
      return;
    }

    document.title = known.title;
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('description', known.description);

    setMeta('og:type', path === '/' ? 'website' : 'article', true);
    setMeta('og:site_name', 'KEVINGYM', true);
    setMeta('og:title', known.title, true);
    setMeta('og:description', known.description, true);
    setMeta('og:url', url, true);
    setMeta('og:image', OG_IMAGE, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:image:alt', 'KEVINGYM, Kevin Nguena', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', known.title);
    setMeta('twitter:description', known.description);
    setMeta('twitter:image', OG_IMAGE);

    setLink('canonical', url);
  }, [pathname]);

  return null;
};

export default RouteMeta;
