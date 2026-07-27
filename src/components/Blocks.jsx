import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, ECOSYSTEM, HYBRID, STATS, mailto } from '@/lib/brand';
import { Card, Label, Reveal, Section, Stat } from '@/components/Primitives';

// Blocks: the compositions that appear on more than one route. Keeping them
// here is what stops the eight pages from drifting apart visually.

/** The audience figures. Read straight from STATS in src/lib/brand.js. */
export const ProofBar = ({ bordered = true }) => (
  <section className={bordered ? 'border-b border-kg-border' : ''}>
    <div className="kg-wrap grid grid-cols-2 gap-y-12 py-16 sm:gap-y-14 lg:grid-cols-5 lg:gap-y-0 lg:divide-x lg:divide-kg-border lg:py-20">
      {STATS.map((s, i) => (
        <Reveal key={s.id} delay={i * 70} className="lg:px-6">
          <Stat label={s.label} value={s.value} />
        </Reveal>
      ))}
    </div>
  </section>
);

/** A grid of plain cards: title plus one paragraph. */
export const CardGrid = ({ items, columns = 2 }) => (
  <div className={`grid gap-5 sm:gap-6 ${columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
    {items.map((item, i) => (
      <Reveal key={item.id} delay={(i % 3) * 90} className="h-full">
        <Card className="flex h-full flex-col gap-3 px-7 py-8">
          <h3 className="font-display text-xl font-semibold tracking-headline text-kg-white">
            {item.title}
          </h3>
          <p className="text-sm font-light leading-relaxed tracking-copy text-kg-muted">
            {item.body}
          </p>
        </Card>
      </Reveal>
    ))}
  </div>
);

/** Numbered process steps. */
export const Steps = ({ items }) => (
  <ol className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
    {items.map((item, i) => (
      <Reveal key={item.id} delay={i * 80} className="h-full">
        <li className="flex h-full flex-col gap-3 rounded-[28px] border border-kg-border bg-white/[0.022] px-7 py-8">
          <span className="font-mono text-xs tracking-label text-kg-dim">{item.step}</span>
          <h3 className="font-display text-lg font-semibold tracking-headline text-kg-white">
            {item.title}
          </h3>
          <p className="text-sm font-light leading-relaxed tracking-copy text-kg-muted">
            {item.body}
          </p>
        </li>
      </Reveal>
    ))}
  </ol>
);

/**
 * HYBRID call to action. Every route that mentions the programme uses this so
 * there is exactly one place in the codebase deciding where a HYBRID button
 * points: kevingymworkout.com, never this domain.
 */
export const HybridCTA = ({ label = 'Discover HYBRID' }) => (
  <Section
    label="Training"
    title="HYBRID."
    intro={HYBRID.tagline}
    align="center"
    className="border-t border-kg-border"
  >
    <div className="flex flex-wrap justify-center gap-3">
      <a href={HYBRID.home} className="kg-btn">
        {label}
      </a>
      <a href={HYBRID.app} className="kg-btn-ghost">
        Member area
      </a>
    </div>
    <p className="mx-auto mt-8 max-w-measure text-center text-xs font-light leading-relaxed text-kg-dim">
      HYBRID is sold and delivered on kevingymworkout.com. Your account and your programme live on
      app.kevingymworkout.com.
    </p>
  </Section>
);

/** Closing call to action. Present at the bottom of every route. */
export const ContactCTA = ({
  title = 'A brand, a gym, a project?',
  intro = 'I read and answer every professional inquiry myself.',
  subject = null,
}) => (
  <Section label="Contact" title={title} intro={intro} align="center" className="border-t border-kg-border">
    <div className="text-center">
      <Reveal>
        <a
          href={mailto(subject)}
          className="kg-underline-swipe inline-block break-all font-display text-[clamp(1.35rem,4.6vw,3rem)] font-semibold tracking-display text-kg-white"
        >
          {CONTACT_EMAIL}
        </a>
      </Reveal>
      <Reveal delay={110}>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="kg-btn-ghost">
            All contact options
          </Link>
          <a href={ECOSYSTEM.links} className="kg-btn-ghost">
            All links
          </a>
        </div>
      </Reveal>
    </div>
  </Section>
);

/** Two large routing tiles, used on the partners hub and on the home page. */
export const SplitTiles = ({ tiles }) => (
  <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
    {tiles.map((t, i) => (
      <Reveal key={t.to} delay={i * 100} className="h-full">
        <Link to={t.to} className="group block h-full">
          <Card className="flex h-full flex-col justify-between gap-10 px-8 py-10 sm:px-10 sm:py-14">
            <div>
              <Label>{t.eyebrow}</Label>
              <h3 className="kg-display kg-shade mt-5 text-[clamp(1.8rem,4.5vw,2.75rem)]">
                {t.title}
              </h3>
              <p className="mt-5 max-w-measure text-base font-light leading-relaxed tracking-copy text-kg-muted">
                {t.body}
              </p>
            </div>
            <span className="text-sm font-medium tracking-copy text-kg-muted transition-colors duration-500 ease-apple group-hover:text-kg-white">
              {t.action} &rsaquo;
            </span>
          </Card>
        </Link>
      </Reveal>
    ))}
  </div>
);
