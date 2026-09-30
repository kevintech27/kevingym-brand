import { Link } from 'react-router-dom';
import { PROCESS, mailto } from '@/lib/brand';
import { PageHead, Section } from '@/components/Primitives';
import { ContactCTA, ProofBar, SplitTiles, Steps } from '@/components/Blocks';

const Routes = () => (
  <Section
    label="Two doors"
    title="Pick the one that fits."
    align="center"
    className="border-t border-kg-border"
  >
    <SplitTiles
      tiles={[
        {
          to: '/partners/brands',
          eyebrow: 'For brands',
          title: 'Campaigns and UGC.',
          body: 'Campaign content, UGC with agreed paid usage, long-term ambassador deals, and appearances at launches and events.',
          action: 'For brands',
        },
        {
          to: '/partners/gyms',
          eyebrow: 'For gyms',
          title: 'Clubs and facilities.',
          body: 'Filming on site, open sessions with your members, opening coverage, and ongoing home-gym partnerships.',
          action: 'For gyms',
        },
      ]}
    />
  </Section>
);

const Events = () => (
  <Section
    label="Events"
    title="Invite me."
    intro="Launches, store openings, training sessions, panels and talks. France and international, travel discussed case by case."
    align="center"
    className="border-t border-kg-border"
  >
    <div className="flex flex-wrap justify-center gap-3">
      <a href={mailto('Event invitation')} className="kg-btn">
        Send an invitation
      </a>
      <Link to="/contact" className="kg-btn-ghost">
        Other requests
      </Link>
    </div>
  </Section>
);

const Process = () => (
  <Section
    label="Process"
    title="How it works."
    align="center"
    className="border-t border-kg-border"
  >
    <Steps items={PROCESS} />
  </Section>
);

export default function Partners() {
  return (
    <>
      <PageHead
        eyebrow="Partners"
        title="Work with me."
        intro="Brand campaigns, gym collaborations, events and projects. One inbox, read and answered personally."
      >
        <Link to="/partners/brands" className="kg-btn">
          For brands
        </Link>
        <Link to="/partners/gyms" className="kg-btn-ghost">
          For gyms
        </Link>
      </PageHead>

      <ProofBar />
      <Routes />
      <Events />
      <Process />
      <ContactCTA />
    </>
  );
}
