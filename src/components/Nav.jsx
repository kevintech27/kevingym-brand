import React from 'react';
import { useScrollY } from '@/components/Primitives';

// =============================================================================
// Nav — floating pill, fixed top, monochrome.
// -----------------------------------------------------------------------------
// The site is a single scrolling page: no route menu, no hamburger. The pill
// is weightless over the hero and only condenses into glass once content is
// scrolling underneath it — the material appears when it has a job to do.
// =============================================================================

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#partnerships', label: 'Partnerships' },
  { href: '#builder', label: 'Builder' },
];

export const Nav = () => {
  const y = useScrollY();
  const condensed = y > 24;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`flex items-center gap-2 rounded-full transition-all duration-700 ease-apple sm:gap-4 ${
          condensed
            ? 'kg-glass py-2 pl-5 pr-2 shadow-[0_20px_50px_-30px_rgba(0,0,0,1)]'
            : 'border border-transparent py-2.5 pl-5 pr-2'
        }`}
      >
        <a
          href="#top"
          className="font-display text-[13px] font-bold uppercase tracking-[0.24em] text-kg-white transition-opacity duration-300 ease-apple hover:opacity-70"
        >
          KEVINGYM
        </a>

        <nav aria-label="Sections" className="hidden items-center md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-[13px] font-medium tracking-copy text-kg-muted transition-colors duration-300 ease-apple hover:text-kg-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="kg-btn ml-1 px-5 py-2.5 text-[12.5px]">
          Work with me
        </a>
      </div>
    </header>
  );
};

export default Nav;
