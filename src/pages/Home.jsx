import React from 'react';
import { Link } from 'react-router-dom';
import { AUDIENCE, COLLABORATIONS, ECOSYSTEM, PERSON, SOCIALS } from '@/lib/brand';
import { Img, Label, Reveal, Section, Stat, Todo } from '@/components/Primitives';

const Hero = () => (
  <section className="relative overflow-hidden border-b border-kg-line">
    {/* Halo cyan tres discret : la seule couleur du hero. */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-kg-cyan/[0.07] blur-[140px]"
    />

    <div className="kg-wrap relative grid items-end gap-14 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:py-36">
      <div>
        <Reveal>
          <Label accent>{PERSON.roles.join(' — ')}</Label>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 text-[clamp(2.75rem,9vw,7rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
            KEVIN
            <br />
            <span className="text-kg-grey">NGUENA</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-kg-fog">{PERSON.baseline}</p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/partners" className="kg-btn">
              Travailler ensemble
            </Link>
            <Link to="/content" className="kg-btn-ghost">
              Voir mon contenu
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        {/* Visuel principal : une VRAIE photo de Kevin, jamais une banque d'images. */}
        <Img
          src="/images/kevin-today.jpg"
          alt="Kevin Nguena aujourd'hui"
          ratio="aspect-[4/5]"
          placeholder="Photo hero à ajouter"
          className="rounded-2xl"
        />
      </Reveal>
    </div>
  </section>
);

const Audience = () => {
  const anyVerified = AUDIENCE.some((a) => a.verified);
  return (
    <Section
      label="Audience"
      title="Les chiffres, quand ils sont vérifiables."
      intro="Je préfère un espace vide à un chiffre gonflé. Les données ci-dessous sont renseignées manuellement et mises à jour à la main."
    >
      <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
        {AUDIENCE.map((a, i) => (
          <Reveal key={a.id} delay={i * 60}>
            <Stat label={a.label} value={a.value} verified={a.verified} />
          </Reveal>
        ))}
      </div>

      {!anyVerified && (
        <div className="mt-10 max-w-2xl">
          <Todo>
            Renseigne tes chiffres dans <code className="text-kg-cyan">src/lib/brand.js</code> →{' '}
            <code className="text-kg-cyan">AUDIENCE</code>, puis passe <code>verified</code> à{' '}
            <code>true</code>. Tant que c&apos;est <code>false</code>, rien n&apos;est publié.
          </Todo>
        </div>
      )}
    </Section>
  );
};

const Collabs = () => (
  <Section
    label="Collaborations"
    title="Marques avec qui j'ai travaillé."
    className="border-t border-kg-line"
  >
    {COLLABORATIONS.length === 0 ? (
      <div className="max-w-2xl">
        <Todo>
          Aucune collaboration n&apos;est affichée pour l&apos;instant. Ajoute-les dans{' '}
          <code className="text-kg-cyan">COLLABORATIONS</code>. Afficher de faux logos partenaires
          serait immédiatement repéré par une marque sérieuse — mieux vaut une section vide qu&apos;une
          section fausse.
        </Todo>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {COLLABORATIONS.map((c) => (
          <div
            key={c.name}
            className="flex h-28 items-center justify-center border border-kg-line px-6 text-center"
          >
            <span className="font-mono text-xs uppercase tracking-label text-kg-fog">{c.name}</span>
          </div>
        ))}
      </div>
    )}
  </Section>
);

const HybridTeaser = () => (
  <Section className="border-t border-kg-line">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <Reveal>
        <Label accent>Mon programme</Label>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
          HYBRID
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-kg-fog">
          Un seul programme, celui que j&apos;utilise vraiment. Esthétique physique et performance
          athlétique dans un même système de 90 jours — pas deux offres séparées.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          {/* Sortie vers le site du programme : c'est lui qui vend, pas cette page. */}
          <a href={ECOSYSTEM.programme} className="kg-btn">
            Découvrir HYBRID
          </a>
          <Link to="/hybrid" className="kg-btn-ghost">
            En savoir plus
          </Link>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="grid grid-cols-2 gap-4">
          <Img src="/images/kevin-street.jpg" alt="Street workout" ratio="aspect-square" className="rounded-xl" />
          <Img src="/images/kevin-today.jpg" alt="Physique hybride" ratio="aspect-square" className="mt-8 rounded-xl" />
        </div>
      </Reveal>
    </div>
  </Section>
);

const Contact = () => (
  <Section className="border-t border-kg-line">
    <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <Label>Contact</Label>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          Une marque, une salle, un projet ?
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-kg-fog">
          Je réponds moi-même à chaque demande professionnelle.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/contact" className="kg-btn">
          Me contacter
        </Link>
        {SOCIALS.map((s) => (
          <a key={s.id} href={s.url} target="_blank" rel="noopener" className="kg-btn-ghost">
            {s.label}
          </a>
        ))}
      </div>
    </div>
  </Section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <Audience />
      <Collabs />
      <HybridTeaser />
      <Contact />
    </>
  );
}
