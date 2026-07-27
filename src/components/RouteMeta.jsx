import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '@/lib/brand';

// RouteMeta: title, description, canonical et og:url par route.
// Ecriture directe dans le <head>, sans react-helmet : sur le site du programme,
// react-helmet@6 s'est revele totalement inoperant avec React 18 + createRoot +
// StrictMode (aucune balise injectee quand le Helmet est monte au premier
// rendu). On ne reproduit pas ce piege ici.
//
// Le canonical pointe TOUJOURS vers kevingym.com : ce site est la marque
// personnelle. Aucune page ne canonicalise vers kevingymworkout.com, qui est un
// site distinct avec son propre contenu.

const META = {
  '/': {
    title: 'Kevin Nguena · KEVINGYM | Content Creator, Hybrid Athlete, Founder',
    description:
      'Official site of Kevin Nguena. Content creator, hybrid athlete, and founder of KEVINGYM. Brand collaborations, premium gym partnerships, and media kit.',
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

export const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const known = META[path];
    const url = `${SITE_URL}${path === '/' ? '/' : path}`;

    if (!known) {
      // Route inconnue : on n'indexe pas et on ne declare pas de canonical.
      setMeta('robots', 'noindex, nofollow');
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
      return;
    }

    document.title = known.title;
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('description', known.description);
    setMeta('og:title', known.title, true);
    setMeta('og:description', known.description, true);
    setMeta('og:url', url, true);

    upsert(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'canonical');
        return l;
      },
      'href',
      url,
    );
  }, [pathname]);

  return null;
};

export default RouteMeta;
