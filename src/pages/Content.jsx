import { Link } from 'react-router-dom';
import { DELIVERABLES, ECOSYSTEM, SOCIALS, WORK_ITEMS } from '@/lib/brand';
import { Card, Img, Label, PageHead, Reveal, Section } from '@/components/Primitives';
import { ContactCTA, ProofBar } from '@/components/Blocks';

/**
 * Gallery. Renders only the tiles that have a file behind them, and the whole
 * section disappears when none do. The deliverable pills below survive either
 * way, so /content still states what Kevin makes even with no photo on it.
 * See WORK_ITEMS in src/lib/brand.js for the paths and the export format.
 */
const Gallery = () => {
  const shown = WORK_ITEMS.filter((item) => item.image);
  if (shown.length === 0) return null;

  return (
    <Section
      label="Work"
      title="What I make."
      intro="Vertical-first content, shot and edited to be watched, not skimmed."
      align="center"
      className="border-t border-kg-border"
    >
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {shown.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 90} className="group">
            <Img src={item.image} alt={item.alt} ratio="aspect-[3/4]" />
            <div className="mt-5 px-1">
              <p className="font-display text-lg font-semibold tracking-headline text-kg-white">
                {item.title}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

/**
 * The deliverable pills, split out of the gallery so they keep showing while
 * there is no photo yet.
 */
const Formats = () => (
  <Section
    label="Formats"
    title="What I deliver."
    align="center"
    className="border-t border-kg-border"
  >
    <div className="flex flex-wrap justify-center gap-3">
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

const Channels = () => (
  <Section
    label="Channels"
    title="Where it lives."
    align="center"
    className="border-t border-kg-border"
  >
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
      {SOCIALS.map((s, i) => (
        <Reveal key={s.id} delay={i * 90} className="h-full">
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
            <Card className="flex h-full flex-col justify-between gap-8 px-8 py-10">
              <div>
                <Label>{s.label}</Label>
                <p className="kg-display kg-shade mt-4 text-[clamp(1.6rem,4vw,2.25rem)]">
                  {s.handle}
                </p>
              </div>
              <span className="text-sm font-medium tracking-copy text-kg-muted transition-colors duration-500 ease-apple group-hover:text-kg-white">
                Open profile &rsaquo;
              </span>
            </Card>
          </a>
        </Reveal>
      ))}
    </div>

    <div className="mt-10 flex flex-wrap justify-center gap-3">
      <a href={ECOSYSTEM.links} className="kg-btn-ghost">
        All links
      </a>
      <Link to="/partners/brands" className="kg-btn-ghost">
        Work with me
      </Link>
    </div>
  </Section>
);

export default function Content() {
  return (
    <>
      <PageHead
        eyebrow="Content"
        title="The work."
        intro="Reels, TikTok, UGC, shoots and long-form. Filmed and edited by me, built for the platform it ships on."
      >
        <Link to="/partners/brands" className="kg-btn">
          Book a campaign
        </Link>
        <a href={ECOSYSTEM.links} className="kg-btn-ghost">
          All links
        </a>
      </PageHead>

      <ProofBar />
      <Gallery />
      <Formats />
      <Channels />
      <ContactCTA
        title="Want this for your product?"
        intro="Tell me the brand, the product and the window. I answer every professional inquiry myself."
        subject="Campaign inquiry"
      />
    </>
  );
}
