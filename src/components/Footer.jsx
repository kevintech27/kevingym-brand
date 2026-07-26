import React from 'react';
import { Link } from 'react-router-dom';
import { ECOSYSTEM, PERSON, SOCIALS } from '@/lib/brand';
import { Label } from '@/components/Primitives';

export const Footer = () => (
  <footer className="border-t border-kg-line py-16 sm:py-20">
    <div className="kg-wrap">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="font-mono text-sm uppercase tracking-label">KEVINGYM</div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-kg-grey">
            {PERSON.name} — {PERSON.roles.join(' · ')}.
          </p>
        </div>

        <div>
          <Label>Écosystème</Label>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/" className="kg-link">
                kevingym.com — la marque
              </Link>
            </li>
            <li>
              {/* Le programme a son propre domaine : jamais servi depuis ici. */}
              <a href={ECOSYSTEM.programme} className="kg-link">
                kevingymworkout.com — HYBRID
              </a>
            </li>
            <li>
              <a href={ECOSYSTEM.app} className="kg-link">
                app.kevingymworkout.com — espace membre
              </a>
            </li>
            <li>
              <a href={ECOSYSTEM.links} className="kg-link">
                links.kevingym.com — tous mes liens
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Label>Suivre</Label>
          <ul className="mt-5 space-y-3 text-sm">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a href={s.url} className="kg-link" rel="me noopener" target="_blank">
                  {s.label} · {s.handle}
                </a>
              </li>
            ))}
            <li>
              <Link to="/partners" className="kg-link">
                Travailler ensemble
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-kg-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="kg-label">© {new Date().getFullYear()} {PERSON.name}</span>
        <span className="kg-label">
          Mentions légales du programme sur{' '}
          <a href={`${ECOSYSTEM.programme}/mentions-legales`} className="text-kg-fog hover:text-kg-white">
            kevingymworkout.com
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
