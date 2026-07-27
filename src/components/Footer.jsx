import { Link } from 'react-router-dom';
import { ECOSYSTEM, PERSON, SOCIALS } from '@/lib/brand';
import { Label } from '@/components/Primitives';

const SITE_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/content', label: 'Content' },
  { to: '/partners/brands', label: 'For brands' },
  { to: '/partners/gyms', label: 'For gyms' },
  { to: '/hybrid', label: 'HYBRID' },
  { to: '/contact', label: 'Contact' },
];

// Outbound only. The programme, the member area and the link-in-bio all live
// on their own hosts: this site links to them and never mirrors them.
const ELSEWHERE = [
  { href: ECOSYSTEM.programme, label: 'HYBRID programme' },
  { href: ECOSYSTEM.app, label: 'Member area' },
  { href: ECOSYSTEM.links, label: 'All links' },
];

const col = 'text-sm font-light tracking-copy';

export const Footer = () => (
  <footer className="border-t border-kg-border py-16 sm:py-20">
    <div className="kg-wrap grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <div className="font-display text-[13px] font-bold uppercase tracking-[0.24em] text-kg-white">
          KEVINGYM
        </div>
        <p className={`mt-4 text-kg-dim ${col}`}>
          {PERSON.name}
          <br />
          {PERSON.roles.join(' / ')}
        </p>
      </div>

      <div>
        <Label>Site</Label>
        <div className="mt-5 flex flex-col gap-3">
          {SITE_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={`kg-link ${col}`}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <Label>Elsewhere</Label>
        <div className="mt-5 flex flex-col gap-3">
          {ELSEWHERE.map((l) => (
            <a key={l.href} href={l.href} className={`kg-link ${col}`}>
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div>
        <Label>Social</Label>
        <div className="mt-5 flex flex-col gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="me noopener noreferrer"
              className={`kg-link ${col}`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>

    <div className="kg-wrap mt-14 flex flex-col gap-3 border-t border-kg-border pt-8 sm:flex-row sm:items-center sm:justify-between">
      <Label>
        &copy; {new Date().getFullYear()} {PERSON.name}
      </Label>
      <Label>
        Legal notices on{' '}
        <a
          href={`${ECOSYSTEM.programme}/mentions-legales`}
          className="text-kg-muted transition-colors duration-300 hover:text-kg-white"
        >
          kevingymworkout.com
        </a>
      </Label>
    </div>
  </footer>
);

export default Footer;
