import React from 'react';
import { ECOSYSTEM, PERSON, SOCIALS } from '@/lib/brand';
import { Label } from '@/components/Primitives';

export const Footer = () => (
  <footer className="border-t border-kg-border py-16 sm:py-20">
    <div className="kg-wrap flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="font-display text-[13px] font-bold uppercase tracking-[0.24em] text-kg-white">
          KEVINGYM
        </div>
        <p className="mt-4 text-sm font-light tracking-copy text-kg-dim">
          {PERSON.name} — {PERSON.roles.join(' · ')}
        </p>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-3">
        {SOCIALS.map((s) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="me noopener"
            className="kg-link text-sm font-light tracking-copy"
          >
            {s.label}
          </a>
        ))}
        <a href={ECOSYSTEM.programme} className="kg-link text-sm font-light tracking-copy">
          The programme
        </a>
        <a href={ECOSYSTEM.links} className="kg-link text-sm font-light tracking-copy">
          All links
        </a>
      </div>
    </div>

    <div className="kg-wrap mt-14 flex flex-col gap-3 border-t border-kg-border pt-8 sm:flex-row sm:items-center sm:justify-between">
      <Label>
        © {new Date().getFullYear()} {PERSON.name}
      </Label>
      <Label>
        Legal notices on{' '}
        <a href={`${ECOSYSTEM.programme}/mentions-legales`} className="text-kg-muted transition-colors duration-300 hover:text-kg-white">
          kevingymworkout.com
        </a>
      </Label>
    </div>
  </footer>
);

export default Footer;
