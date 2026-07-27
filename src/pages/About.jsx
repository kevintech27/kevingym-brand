import { Link } from 'react-router-dom';
import { BUILDER, PERSON, STORY } from '@/lib/brand';
import { Aura, Img, Label, PageHead, Reveal, Section } from '@/components/Primitives';
import { ContactCTA, ProofBar } from '@/components/Blocks';

/**
 * Story. The three photographs that exist, alternating sides, each with the
 * one paragraph it actually supports. No invented dates, no fabricated
 * milestones: the captions describe the picture, not a legend around it.
 */
const Story = () => (
  <Section label="The story" title="How it started." className="border-t border-kg-border">
    <div className="space-y-20 sm:space-y-28">
      {STORY.map((chapter, i) => (
        <Reveal key={chapter.id}>
          <article
            className={`group grid items-center gap-8 sm:gap-12 lg:grid-cols-2 ${
              i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <Img
              src={chapter.image}
              alt={chapter.alt}
              ratio="aspect-[4/5]"
              placeholder="Photo to add"
            />
            <div>
              <Label>{chapter.year}</Label>
              <p className="mt-6 text-lg font-light leading-relaxed tracking-copy text-kg-muted sm:text-xl">
                {chapter.body}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </Section>
);

const Manifesto = () => (
  <Section label="Standard" align="center" className="border-t border-kg-border lg:py-52">
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

/**
 * Builder. The single accent zone of the KEVINGYM Brand System. No
 * overflow-hidden on purpose: the sphere bleeds into the sections above and
 * below rather than being clipped square at the zone's edges. That bleed is
 * what makes the glow read as organic instead of a cutout.
 */
const Builder = () => (
  <section className="kg-accent-zone relative border-t border-kg-border">
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2">
      <Reveal className="relative h-full w-full">
        <Aura tone="accent" className="inset-0" />
      </Reveal>
    </div>

    <div className="kg-wrap relative py-28 sm:py-40">
      <div className="text-center">
        <Reveal>
          <Label tone="accent">Builder</Label>
        </Reveal>

        <Reveal delay={140}>
          <h2 className="kg-display kg-shade mt-8 text-[clamp(2.1rem,6vw,4.25rem)]">
            I also build the systems.
          </h2>
        </Reveal>
      </div>

      {/* The facts sit on a glass pane rather than straight on the gradient.
          It is the only surface on the site with real colour moving behind
          it, so it is the only one where the blur reads as glass instead of
          as a slightly lighter rectangle. */}
      <Reveal delay={220}>
        <div className="kg-panel-accent mx-auto mt-14 max-w-2xl space-y-6 text-center">
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

export default function About() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title="Kevin Nguena."
        intro={`${PERSON.roles.join(', ')}. Based in ${PERSON.city}, working with brands and gyms in France and internationally.`}
      >
        <Link to="/contact" className="kg-btn">
          Work with me
        </Link>
        <Link to="/content" className="kg-btn-ghost">
          See the content
        </Link>
      </PageHead>

      <ProofBar />
      <Story />
      <Manifesto />
      <Builder />
      <ContactCTA />
    </>
  );
}
