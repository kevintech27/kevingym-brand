import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ECOSYSTEM } from '@/lib/brand';

const LINKS = [
  { to: '/about', label: 'Parcours' },
  { to: '/content', label: 'Contenu' },
  { to: '/partners', label: 'Partenariats' },
  { to: '/hybrid', label: 'HYBRID' },
  { to: '/contact', label: 'Contact' },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Empeche le defilement de l'arriere-plan quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-kg-line bg-kg-black/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="kg-wrap flex h-[72px] items-center justify-between">
        {/* Le logo renvoie a l'accueil de la MARQUE, jamais au programme. */}
        <Link to="/" className="font-mono text-sm font-medium uppercase tracking-label">
          KEVINGYM
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-mono text-[11px] uppercase tracking-label transition-colors duration-200 ${
                  isActive ? 'text-kg-cyan' : 'text-kg-grey hover:text-kg-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {/* Sortie vers le site du programme : lien externe explicite. */}
          <a href={ECOSYSTEM.programme} className="kg-btn px-6 py-3">
            Le programme
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-kg-white transition-transform duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-kg-white transition-transform duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="animate-soften border-t border-kg-line bg-kg-black md:hidden">
          <nav className="kg-wrap flex flex-col py-6">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `border-b border-kg-line py-5 font-mono text-xs uppercase tracking-label ${
                    isActive ? 'text-kg-cyan' : 'text-kg-fog'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a href={ECOSYSTEM.programme} className="kg-btn mt-7">
              Le programme HYBRID
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Nav;
