import React from 'react';
import {
  BUILDER,
  COLLABORATIONS,
  COLLABORATION_SLOTS_OPEN,
  CONTACT_EMAIL,
  DELIVERABLES,
  ECOSYSTEM,
  MEDIA_KIT_URL,
  PERSON,
  SOCIALS,
  STATS,
  WORK_ITEMS,
} from '@/lib/brand';
import {
  Aura,
  BrandMark,
  Card,
  Img,
  Label,
  Reveal,
  Section,
  Stat,
  Todo,
  usePrefersReducedMotion,
  useScrollY,
} from '@/components/Primitives';

const clamp01 = (n) => Math.min(1, Math.max(0, n));

/**
 * Hero. One centered column: eyebrow, name, slogan, actions, portrait.
 * The portrait deliberately runs past the fold: the cut-off frame is the
 * scroll cue, no arrow needed.
 */
const Hero = () => {
  const scrollY = useScrollY();
  const reduced = usePrefersReducedMotion();
  const y = reduced ? 0 : scrollY;

  // Three planes moving at different rates: the aura barely drifts, the type
  // leads, the portrait trails. That difference is what gives the header
  // depth on a flat black background.
  const typeStyle = { opacity: clamp01(1 - y / 560), transform: `translate3d(0, ${y * 0.14}px, 0)` };
  const auraStyle = { transform: `translate3d(-50%, ${y * 0.22}px, 0)` };
  const portraitStyle = { transform: `translate3d(0, ${y * -0.05}px, 0)` };

  return (
    <section id="top" className="relative overflow-hidden border-b border-kg-border">
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[760px] w-[760px]" style={auraStyle}>
        <Aura tone="white" className="inset-0" />
      </div>

      <div className="kg-wrap relative flex min-h-[100svh] flex-col items-center pb-24 pt-36 text-center sm:pt-40">
        <div style={typeStyle} className="will-change-transform">
          {/* Constrained + balanced: at 390px the roles wrap, and without a
              measure the break orphans "FOUNDER" on its own line. */}
          <Reveal>
            <Label className="mx-auto block max-w-[20rem] text-balance sm:max-w-none">
              {PERSON.roles.join('   ·   ')}
            </Label>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="kg-display kg-shade mt-8 text-[clamp(3rem,12vw,9.5rem)]">
              Kevin
              <br />
              Nguena
            </h1>
          </Reveal>

          {/* The slogan set as a structural rule, not a subtitle: two hairlines
              and one wide-tracked line holding the name down. */}
          <Reveal delay={180}>
            <div className="mt-10 flex items-center justify-center gap-5 sm:gap-7">
              <span aria-hidden className="h-px w-10 bg-gradient-to-l from-kg-border to-transparent sm:w-20" />
              <span className="text-[11px] font-medium uppercase tracking-label text-kg-white/80 sm:text-xs">
                {PERSON.slogan}
              </span>
              <span aria-hidden className="h-px w-10 bg-gradient-to-r from-kg-border to-transparent sm:w-20" />
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
              <a href="#contact" className="kg-btn">
                Work with me
              </a>
              <a href={ECOSYSTEM.programme} className="kg-link text-sm font-medium tracking-copy">
                The programme &rsaquo;
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={360} className="mt-20 w-full sm:mt-24">
          <div
            style={portraitStyle}
            className="group mx-auto w-[min(80vw,400px)] will-change-transform"
          >
            <Img
              src={null}
              alt="Kevin Nguena, cinematic hero photo"
              ratio="aspect-[3/4]"
              placeholder="Portrait to add"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/**
 * Brand band between the hero and the numbers. Hairline type, edge-faded,
 * slow enough to read as texture rather than as a moving element.
 */
const BrandBand = () => (
  <div className="kg-fade-x overflow-hidden border-b border-kg-border py-6" aria-hidden>
    <div className="flex w-max animate-marquee">
      {[0, 1].map((half) => (
        <div
          key={half}
          className="flex items-center whitespace-nowrap text-[11px] font-medium uppercase tracking-label text-kg-dim"
        >
          {[PERSON.slogan, PERSON.handle, PERSON.name, PERSON.slogan, PERSON.handle, PERSON.name].map(
            (word, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span>{word}</span>
                <span className="mx-8 h-1 w-1 rounded-full bg-kg-dim/60 sm:mx-12" />
              </span>
            ),
          )}
        </div>
      ))}
    </div>
  </div>
);

const ProofBar = () => (
  <section className="border-b border-kg-border">
    <div className="kg-wrap grid grid-cols-2 gap-y-12 py-16 sm:gap-y-14 lg:grid-cols-5 lg:gap-y-0 lg:divide-x lg:divide-kg-border lg:py-20">
      {STATS.map((s, i) => (
        <Reveal key={s.id} delay={i * 70} className="lg:px-6">
          <Stat label={s.label} value={s.value} />
        </Reveal>
      ))}
    </div>
  </section>
);

/**
 * Identity. The one section that is only words. It carries the brand itself
 * (discipline, focus, lock in), so it gets the page's most generous spacing
 * and its opening line is set at hero scale. Deliberately not a grid of
 * "values" with icons: on this page the restraint is the argument.
 */
const Identity = () => (
  <Section label="Identity" align="center" className="lg:py-56">
    <div className="mx-auto max-w-3xl space-y-12 text-center sm:space-y-14">
      {PERSON.manifesto.map((line, i) => (
        <Reveal key={line} delay={i * 120}>
          <p
            className={
              i === 0
                ? 'kg-display kg-shade text-[clamp(1.9rem,5.2vw,3.5rem)] leading-[1.12]'
                : 'text-lg font-light leading-relaxed tracking-copy text-kg-muted sm:text-xl'
            }
          >
            {line}
          </p>
        </Reveal>
      ))}
    </div>
  </Section>
);

const Work = () => (
  <Section
    id="work"
    label="Work"
    title="What I make."
    intro="Vertical-first content, shot and edited to be watched, not skimmed."
    align="center"
    className="border-t border-kg-border"
  >
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {WORK_ITEMS.map((item, i) => (
        <Reveal key={item.id} delay={(i % 3) * 90} className="group">
          <Img
            src={item.image}
            alt={`${item.title}, ${item.note}`}
            ratio="aspect-[3/4]"
            placeholder="Photo / video to add"
          />
          <div className="mt-5 px-1">
            <p className="font-display text-lg font-semibold tracking-headline text-kg-white">
              {item.title}
            </p>
            <p className="mt-1 text-sm font-light tracking-copy text-kg-dim">{item.note}</p>
          </div>
        </Reveal>
      ))}
    </div>

    <div className="mt-16 flex flex-wrap justify-center gap-3">
      {DELIVERABLES.map((d) => (
        <span
          key={d}
          className="rounded-full border border-kg-border bg-white/[0.02] px-5 py-2.5 text-[12.5px] font-medium tracking-copy text-kg-muted backdrop-blur-xl transition-all duration-500 ease-apple hover:border-white/25 hover:bg-white/[0.06] hover:text-kg-white"
        >
          {d}
        </span>
      ))}
    </div>
  </Section>
);

const Partnerships = () => (
  <Section
    id="partnerships"
    label="Partnerships"
    title="Brands I've worked with."
    align="center"
    className="border-t border-kg-border"
  >
    {/* A logo wall, not a card per brand: with six partners and no copy yet,
        cards would be six mostly-empty boxes. Each cell holds the logo once
        the asset exists and the brand's wordmark until then, so the row reads
        as finished at every stage. */}
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
      {COLLABORATIONS.map((c, i) => (
        <Reveal key={c.name} delay={(i % 3) * 90} className="h-full">
          <Card className="group flex h-full min-h-[130px] flex-col items-center justify-center gap-3 px-5 py-8 text-center sm:min-h-[150px]">
            <BrandMark name={c.name} logo={c.logo} />
            {c.desc && (
              <p className="text-xs font-light leading-relaxed tracking-copy text-kg-dim">
                {c.desc}
              </p>
            )}
            {c.result && (
              <p className="text-[11px] font-medium uppercase tracking-label text-kg-muted">
                {c.result}
              </p>
            )}
          </Card>
        </Reveal>
      ))}

      {Array.from({ length: COLLABORATION_SLOTS_OPEN }).map((_, i) => (
        <Reveal key={`slot-${i}`}>
          <div className="flex h-full min-h-[130px] items-center justify-center rounded-[28px] border border-dashed border-kg-border sm:min-h-[150px]">
            <span className="kg-label">Open slot</span>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

const Builder = () => (
  // No overflow-hidden here on purpose: the sphere bleeds into the sections
  // above and below rather than being clipped square at the zone's edges.
  // That bleed is what makes the glow read as organic instead of a cutout.
  <section id="builder" className="nx-zone relative">
    {/* The radial gradient itself fades to transparent, no extra rectangular
        mask on top, that was the flat edge cutting across the round glow.
        Centered (both axes) so it bleeds evenly above and below the zone,
        and wrapped in Reveal so it fades in on scroll like everything else. */}
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2">
      <Reveal className="relative h-full w-full">
        <Aura tone="nexus" className="inset-0" />
      </Reveal>
    </div>

    <div className="kg-wrap relative py-28 sm:py-40">
      <div className="text-center">
        {/* Greeting: the first thing you see entering this zone, a quiet
            "hello" before the section explains itself. */}
        <Reveal>
          <p className="kg-display text-[clamp(1.8rem,5vw,3rem)] text-kg-white">Hello.</p>
        </Reveal>

        <Reveal delay={140}>
          <h2 className="kg-display kg-shade mt-8 text-[clamp(2.1rem,6vw,4.25rem)]">
            I also build the systems.
          </h2>
        </Reveal>
      </div>

      {/* The facts sit on a glass pane rather than straight on the gradient.
          It is the only surface on the page with real colour moving behind
          it, so it is the only one where the blur reads as glass instead of
          as a slightly lighter rectangle. */}
      <Reveal delay={220}>
        <div className="nx-panel mx-auto mt-14 max-w-2xl space-y-6 text-center">
          {BUILDER.facts.map((f) => (
            <p key={f} className="text-lg font-light leading-relaxed tracking-copy text-white/75">
              {f}
            </p>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

const Contact = () => (
  <Section
    id="contact"
    label="Contact"
    title="A brand, a gym, a project?"
    intro="I read and answer every professional inquiry myself."
    align="center"
    className="border-t border-kg-border"
  >
    <div className="text-center">
      {/* The email is the deliverable of this whole page, at display size,
          not hidden behind a small pill. */}
      {CONTACT_EMAIL && (
        <Reveal>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="kg-underline-swipe inline-block break-all font-display text-[clamp(1.35rem,4.6vw,3.25rem)] font-semibold tracking-display text-kg-white"
          >
            {CONTACT_EMAIL}
          </a>
        </Reveal>
      )}

      <Reveal delay={110}>
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {MEDIA_KIT_URL ? (
            <a href={MEDIA_KIT_URL} className="kg-btn-ghost" download>
              Media kit
            </a>
          ) : (
            <span className="kg-btn-ghost cursor-not-allowed opacity-40" aria-disabled="true">
              Media kit
            </span>
          )}

          {SOCIALS.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener" className="kg-btn-ghost">
              {s.label}
            </a>
          ))}
        </div>
      </Reveal>

      {!CONTACT_EMAIL && (
        <div className="mx-auto mt-14 max-w-2xl text-left">
          <Todo>
            Set your real business email in <code>src/lib/brand.js</code> →{' '}
            <code>CONTACT_EMAIL</code>. Until then the button stays visibly disabled instead of
            pointing at nothing.
          </Todo>
        </div>
      )}
    </div>
  </Section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <BrandBand />
      <ProofBar />
      <Identity />
      <Work />
      <Partnerships />
      <Builder />
      <Contact />
    </>
  );
}
