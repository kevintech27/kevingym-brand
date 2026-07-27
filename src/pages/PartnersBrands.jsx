import { Link } from 'react-router-dom';
import {
  BRAND_SERVICES,
  COLLABORATION_SLOTS_OPEN,
  COLLABORATIONS,
  DELIVERABLES,
  MEDIA_KIT_URL,
  PROCESS,
  mailto,
} from '@/lib/brand';
import { BrandMark, Card, Label, PageHead, Reveal, Section, Todo } from '@/components/Primitives';
import { CardGrid, ContactCTA, ProofBar, Steps } from '@/components/Blocks';

const Services = () => (
  <Section
    label="Formats"
    title="What you can book."
    intro="Price depends on scope and is quoted per campaign. Usage rights are always agreed in writing before the shoot."
    align="center"
    className="border-t border-kg-border"
  >
    <CardGrid items={BRAND_SERVICES} />

    <div className="mt-14 flex flex-wrap justify-center gap-3">
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

/**
 * A logo wall, not a card per brand. With six partners and no copy yet, cards
 * would be six mostly-empty boxes. Each cell holds the logo once the asset
 * exists and the brand's wordmark until then, so the row reads as finished at
 * every stage. Nothing describes a result that has not been measured.
 */
const Wall = () => {
  if (COLLABORATIONS.length === 0) {
    return (
      <Section
        label="Partnerships"
        title="Open to collaborations."
        align="center"
        className="border-t border-kg-border"
      >
        <div className="mx-auto max-w-2xl">
          <Todo>
            No confirmed brand partnership is listed yet. Add them to{' '}
            <code>COLLABORATIONS</code> in <code>src/lib/brand.js</code> once each one is signed.
          </Todo>
        </div>
      </Section>
    );
  }

  return (
    <Section
      label="Partnerships"
      title="Brands I've worked with."
      align="center"
      className="border-t border-kg-border"
    >
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
              <Label>Open slot</Label>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

const MediaKit = () => (
  <Section
    label="Media kit"
    title="Everything in one file."
    align="center"
    className="border-t border-kg-border"
  >
    <div className="flex flex-wrap justify-center gap-3">
      {MEDIA_KIT_URL ? (
        <a href={MEDIA_KIT_URL} className="kg-btn" download>
          Download the media kit
        </a>
      ) : (
        <span className="kg-btn-ghost cursor-not-allowed opacity-40" aria-disabled="true">
          Media kit
        </span>
      )}
      <a href={mailto('Campaign inquiry')} className="kg-btn-ghost">
        Request it by email
      </a>
    </div>

    {!MEDIA_KIT_URL && (
      <div className="mx-auto mt-12 max-w-2xl text-left">
        <Todo>
          PLACEHOLDER: drop the PDF at <code>public/media-kit.pdf</code>, then set{' '}
          <code>MEDIA_KIT_URL</code> in <code>src/lib/brand.js</code>. Until then the button stays
          visibly disabled instead of pointing at nothing.
        </Todo>
      </div>
    )}
  </Section>
);

export default function PartnersBrands() {
  return (
    <>
      <PageHead
        eyebrow="For brands"
        title="Campaigns."
        intro="Vertical-first content built around your product, shot and edited end to end, delivered to an agreed spec."
      >
        <a href={mailto('Campaign inquiry')} className="kg-btn">
          Start a campaign
        </a>
        <Link to="/content" className="kg-btn-ghost">
          See the work
        </Link>
      </PageHead>

      <ProofBar />
      <Services />
      <Wall />
      <Section
        label="Process"
        title="How it works."
        align="center"
        className="border-t border-kg-border"
      >
        <Steps items={PROCESS} />
      </Section>
      <MediaKit />
      <ContactCTA
        title="Tell me about the campaign."
        intro="The brand, the product, the window and the budget range. One email is enough to start."
        subject="Campaign inquiry"
      />
    </>
  );
}
