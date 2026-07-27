import { Link } from 'react-router-dom';
import { HYBRID, PERSON } from '@/lib/brand';
import {
  Aura,
  Img,
  Label,
  Reveal,
  Section,
  usePrefersReducedMotion,
  useScrollY,
} from '@/components/Primitives';
import { ContactCTA, ProofBar, SplitTiles } from '@/components/Blocks';

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

  // No hero portrait yet. The three real photographs in public/images are
  // phone shots: they carry the story on /about, but none of them is a
  // cinematic hero frame. A labelled empty slot is more honest than a selfie
  // blown up to 400px on the first screen a brand manager sees.
  // TODO KEVIN: shoot one, drop it at public/images/kevin-hero.jpg, then pass
  // that path as src below.

  return (
    <section id="top" className="relative overflow-hidden border-b border-kg-border">
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[760px] w-[760px]"
        style={auraStyle}
      >
        <Aura className="inset-0" />
      </div>

      <div className="kg-wrap relative flex min-h-[100svh] flex-col items-center pb-24 pt-36 text-center sm:pt-40">
        <div style={typeStyle} className="will-change-transform">
          {/* Constrained and balanced: at 390px the roles wrap, and without a
              measure the break orphans "FOUNDER" on its own line. */}
          <Reveal>
            <Label className="mx-auto block max-w-[20rem] text-balance sm:max-w-none">
              {PERSON.roles.join('   /   ')}
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
              <span
                aria-hidden
                className="h-px w-10 bg-gradient-to-l from-kg-border to-transparent sm:w-20"
              />
              <span className="text-[11px] font-medium uppercase tracking-label text-kg-white/80 sm:text-xs">
                {PERSON.slogan}
              </span>
              <span
                aria-hidden
                className="h-px w-10 bg-gradient-to-r from-kg-border to-transparent sm:w-20"
              />
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
              <Link to="/contact" className="kg-btn">
                Work with me
              </Link>
              <a href={HYBRID.home} className="kg-link text-sm font-medium tracking-copy">
                The HYBRID programme &rsaquo;
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
              alt="Kevin Nguena, cinematic hero portrait"
              ratio="aspect-[3/4]"
              eager
              placeholder="PLACEHOLDER: hero portrait to shoot"
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
          {[
            PERSON.slogan,
            PERSON.handle,
            PERSON.name,
            PERSON.slogan,
            PERSON.handle,
            PERSON.name,
          ].map((word, i) => (
            <span key={`${half}-${i}`} className="flex items-center">
              <span>{word}</span>
              <span className="mx-8 h-1 w-1 rounded-full bg-kg-dim/60 sm:mx-12" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/**
 * Identity. The one section that is only words. It carries the brand itself,
 * so it gets the page's most generous spacing and its opening line is set at
 * hero scale. Deliberately not a grid of "values" with icons: on this page
 * the restraint is the argument.
 */
const Identity = () => (
  <Section label="Identity" align="center" className="lg:py-52">
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

    <div className="mt-16 flex justify-center">
      <Link to="/about" className="kg-btn-ghost">
        Read the full story
      </Link>
    </div>
  </Section>
);

const Paths = () => (
  <Section
    label="Where to go"
    title="What are you here for?"
    align="center"
    className="border-t border-kg-border"
  >
    <SplitTiles
      tiles={[
        {
          to: '/content',
          eyebrow: 'Content',
          title: 'See the work.',
          body: 'Vertical-first content, shot and edited to be watched, not skimmed. Formats, platforms and audience figures.',
          action: 'View content',
        },
        {
          to: '/partners',
          eyebrow: 'Partners',
          title: 'Work together.',
          body: 'Brand campaigns, gym collaborations, events and appearances. One inbox, answered personally.',
          action: 'See partnerships',
        },
      ]}
    />

    <div className="mt-6 grid gap-5 sm:gap-6 lg:grid-cols-2">
      <SplitTiles
        tiles={[
          {
            to: '/hybrid',
            eyebrow: 'Training',
            title: 'HYBRID.',
            body: 'The single training system I sell. Strength and conditioning in the same week, structured so neither cancels the other.',
            action: 'About the system',
          },
          {
            to: '/about',
            eyebrow: 'About',
            title: 'Who I am.',
            body: 'Where it started, how I train today, and the platform behind KEVINGYM that I build and run myself.',
            action: 'Read the story',
          },
        ]}
      />
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
      <Paths />
      <ContactCTA />
    </>
  );
}
