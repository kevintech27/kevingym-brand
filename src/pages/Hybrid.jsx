import { HYBRID } from '@/lib/brand';
import { Label, PageHead, Reveal, Section } from '@/components/Primitives';
import { ContactCTA } from '@/components/Blocks';

// HYBRID SYSTEM on the personal site.
//
// This page explains what the system is and sends every buying and every
// account action to kevingymworkout.com. It deliberately holds no price, no
// checkout, no session count and no results claim: the programme site is the
// single source of truth for all of that, and duplicating it here would
// create a second, competing sales page on a second domain.

const What = () => (
  <Section label="The system" title="One system, not a catalogue." className="border-t border-kg-border">
    <div className="max-w-measure space-y-6">
      {HYBRID.body.map((line, i) => (
        <Reveal key={line} delay={i * 100}>
          <p className="text-lg font-light leading-relaxed tracking-copy text-kg-muted sm:text-xl">
            {line}
          </p>
        </Reveal>
      ))}
    </div>
  </Section>
);

const Where = () => (
  <Section
    label="Where it lives"
    title="Everything about HYBRID SYSTEM is on its own site."
    align="center"
    className="border-t border-kg-border"
  >
    {/* Deux colonnes a partir de md et pas de sm. Entre 640 et 767px les
        cartes tombaient a 210px de contenu, trop etroit pour
        app.kevingymworkout.com: le domaine long passait sur deux lignes quand
        le court restait sur une, et les deux cartes se desalignaient. */}
    <div className="mx-auto grid max-w-3xl gap-5 md:grid-cols-2 md:gap-6">
      <Reveal className="h-full">
        <a href={HYBRID.home} className="group block h-full">
          <div className="kg-card flex h-full flex-col justify-between gap-8 px-8 py-10">
            <div>
              <Label>The programme</Label>
              {/* Un nom de domaine n'offre aucun point de cesure au
                  navigateur: il deborde de la carte et se fait couper net par
                  l'arrondi, sans jamais passer a la ligne. Le clamp est donc
                  calibre sur la plus longue des deux chaines,
                  app.kevingymworkout.com, et overflow-wrap sert de garde-fou
                  si une adresse plus longue arrive un jour. */}
              <p className="kg-display kg-shade mt-4 text-[clamp(1.1rem,2.5vw,1.45rem)] [overflow-wrap:anywhere]">
                kevingymworkout.com
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed tracking-copy text-kg-muted">
                What is inside, how it is structured, and the price. This is where HYBRID SYSTEM is sold.
              </p>
            </div>
            <span className="text-sm font-medium tracking-copy text-kg-muted transition-colors duration-500 ease-apple group-hover:text-kg-white">
              Open the programme site &rsaquo;
            </span>
          </div>
        </a>
      </Reveal>

      <Reveal delay={100} className="h-full">
        <a href={HYBRID.app} className="group block h-full">
          <div className="kg-card flex h-full flex-col justify-between gap-8 px-8 py-10">
            <div>
              <Label>Members</Label>
              <p className="kg-display kg-shade mt-4 text-[clamp(1.1rem,2.5vw,1.45rem)] [overflow-wrap:anywhere]">
                app.kevingymworkout.com
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed tracking-copy text-kg-muted">
                Already bought HYBRID SYSTEM? Your account, your sessions and your progress are here.
              </p>
            </div>
            <span className="text-sm font-medium tracking-copy text-kg-muted transition-colors duration-500 ease-apple group-hover:text-kg-white">
              Open the member area &rsaquo;
            </span>
          </div>
        </a>
      </Reveal>
    </div>

    <p className="mx-auto mt-12 max-w-measure text-center text-xs font-light leading-relaxed text-kg-dim">
      kevingym.com is the personal brand site. It never sells the programme and never holds a
      checkout: HYBRID SYSTEM is bought, delivered and supported on kevingymworkout.com.
    </p>
  </Section>
);

export default function Hybrid() {
  return (
    <>
      <PageHead eyebrow="Training" title={`${HYBRID.name}.`} intro={HYBRID.tagline}>
        <a href={HYBRID.home} className="kg-btn">
          Discover HYBRID SYSTEM
        </a>
        <a href={HYBRID.app} className="kg-btn-ghost">
          Member area
        </a>
      </PageHead>

      <What />
      <Where />
      <ContactCTA
        title="Question about the programme?"
        intro="Support for HYBRID SYSTEM is handled on the programme site. For anything else, this inbox is mine."
        subject="Question about HYBRID SYSTEM"
      />
    </>
  );
}
