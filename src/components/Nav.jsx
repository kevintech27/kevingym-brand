import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useScrollY } from '@/components/Primitives';

// Nav: floating pill, fixed top, monochrome.
// The pill is weightless over the hero and only condenses into glass once
// content is scrolling underneath it. The material appears when it has a job
// to do. Under the md breakpoint the links move into a full-screen sheet:
// eight routes never fit in a pill on a 390px screen.

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/content', label: 'Content' },
  { to: '/partners', label: 'Partners' },
  { to: '/hybrid', label: 'HYBRID SYSTEM' },
];

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-[13px] font-medium tracking-copy transition-colors duration-300 ease-apple ${
    isActive ? 'text-kg-white' : 'text-kg-muted hover:text-kg-white'
  }`;

export const Nav = () => {
  const y = useScrollY();
  const condensed = y > 24;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Any navigation closes the sheet, including a browser back button.
  useEffect(() => setOpen(false), [pathname]);

  // A scrollable page behind an open full-screen sheet is a mobile bug, not a
  // feature: lock the body while the sheet is up.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <div
          className={`flex items-center gap-2 rounded-full transition-all duration-700 ease-apple sm:gap-4 ${
            condensed || open
              ? 'kg-glass py-2 pl-5 pr-2 shadow-[0_20px_50px_-30px_rgba(0,0,0,1)]'
              : 'border border-transparent py-2.5 pl-5 pr-2'
          }`}
        >
          <Link
            to="/"
            className="font-display text-[13px] font-bold uppercase tracking-[0.24em] text-kg-white transition-opacity duration-300 ease-apple hover:opacity-70"
          >
            KEVINGYM
          </Link>

          <nav aria-label="Main" className="hidden items-center md:flex">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact" className="kg-btn ml-1 hidden px-5 py-2.5 text-[12.5px] sm:inline-flex">
            Work with me
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-kg-border text-kg-muted transition-colors duration-300 ease-apple hover:text-kg-white md:hidden"
          >
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-500 ease-apple ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-500 ease-apple ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile sheet. Pure black rather than glass: at this size a blurred
          panel over a black page just reads as muddy. */}
      <div
        className={`fixed inset-0 z-40 bg-kg-black/95 backdrop-blur-2xl transition-opacity duration-500 ease-apple md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav
          aria-label="Main mobile"
          className="kg-wrap flex h-full flex-col justify-center gap-1 pb-24"
        >
          {[{ to: '/', label: 'Home' }, ...LINKS, { to: '/contact', label: 'Contact' }].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `kg-display py-3 text-[clamp(2rem,9vw,3rem)] transition-colors duration-300 ease-apple ${
                  isActive ? 'text-kg-white' : 'text-kg-dim hover:text-kg-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Nav;
