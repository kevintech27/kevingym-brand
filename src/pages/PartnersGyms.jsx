import { Link } from 'react-router-dom';
import { GYM_PARTNERS, GYM_SERVICES, PROCESS, mailto } from '@/lib/brand';
import { BrandMark, Card, PageHead, Reveal, Section } from '@/components/Primitives';
import { CardGrid, ContactCTA, ProofBar, Steps } from '@/components/Blocks';

const Services = () => (
  <Section
    label="Formats"
    title="What a club gets."
    intro="Your facility on camera, credited by name and location, in front of an audience that trains."
    align="center"
    className="border-t border-kg-border"
  >
    <CardGrid items={GYM_SERVICES} />
  </Section>
);

/**
 * Gym partners. Empty by design until a relationship is actually signed: an
 * invented club logo is the fastest way to lose the next real one.
 */
const Wall = () => (
  <Section
    label="Clubs"
    title={GYM_PARTNERS.length ? 'Where I train and film.' : 'Open to a home gym.'}
    align="center"
    className="border-t border-kg-border"
  >
    {GYM_PARTNERS.length ? (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        {GYM_PARTNERS.map((g, i) => (
          <Reveal key={g.name} delay={(i % 3) * 90} className="h-full">
            <Card className="group flex h-full min-h-[130px] items-center justify-center px-5 py-8 text-center sm:min-h-[150px]">
              <BrandMark name={g.name} logo={g.logo} />
            </Card>
          </Reveal>
        ))}
      </div>
    ) : (
      // No club is listed until one is signed. The empty state is written for
      // the reader, not for the developer: a gym owner landing here should see
      // an opening, not a note about a data file. Adding a club to
      // GYM_PARTNERS in src/lib/brand.js turns this back into a wall on its own.
      <p className="mx-auto max-w-measure text-center text-lg font-light leading-relaxed tracking-copy text-kg-muted">
        No club is listed here yet, and none will be until one is signed. If you run a facility and
        want your name on this wall, one email is enough to start.
      </p>
    )}
  </Section>
);

export default function PartnersGyms() {
  return (
    <>
      <PageHead
        eyebrow="For gyms"
        title="Clubs."
        intro="Filming on site, open sessions with your members, opening coverage, and ongoing home-gym partnerships."
      >
        <a href={mailto('Gym collaboration')} className="kg-btn">
          Propose a collaboration
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
      <ContactCTA
        title="Tell me about the club."
        intro="Location, size, what you are opening or launching, and the window you have in mind."
        subject="Gym collaboration"
      />
    </>
  );
}
