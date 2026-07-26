import React from 'react';
import { ECOSYSTEM } from '@/lib/brand';
import { Img, Label, Reveal, Section } from '@/components/Primitives';

// =============================================================================
// Page teaser HYBRID.
// -----------------------------------------------------------------------------
// IMPORTANT : cette page NE VEND PAS. Elle presente le programme et renvoie vers
// kevingymworkout.com, qui est le site officiel du produit. On ne duplique ni la
// page de vente, ni le tunnel de paiement, ni les prix detailles : deux pages de
// vente concurrentes sur deux domaines se cannibalisent en referencement et
// diluent le message.
// =============================================================================

export default function Hybrid() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-kg-line">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-kg-cyan/[0.06] blur-[130px]"
        />
        <div className="kg-wrap relative py-24 text-center sm:py-32">
          <Reveal>
            <Label accent>Mon unique programme</Label>
            <h1 className="mt-6 text-[clamp(3rem,12vw,9rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
              HYBRID
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-kg-fog">
              Esthétique physique <span className="text-kg-white">et</span> performance athlétique.
              Un seul système de 90 jours — pas deux offres séparées, pas de version « light ».
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={ECOSYSTEM.programme} className="kg-btn">
                Voir le programme
              </a>
              <a href={ECOSYSTEM.app} className="kg-btn-ghost">
                Espace membre
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Section label="Le principe" title="Pourquoi « hybride ».">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6 text-lg leading-relaxed text-kg-fog">
            <p>
              La plupart des gens choisissent un camp : soit ils s&apos;entraînent pour être forts,
              soit pour être secs. J&apos;ai fait les deux en même temps, parce que c&apos;est comme
              ça que j&apos;ai obtenu un physique qui tient debout dans la vraie vie.
            </p>
            <p>
              HYBRID, c&apos;est la méthode que j&apos;ai construite pour moi et que je suis encore
              aujourd&apos;hui : progression en charge, travail au poids du corps, isolation ciblée,
              et une régularité rendue tenable par un vrai suivi.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Img src="/images/kevin-street.jpg" alt="Travail au poids du corps" ratio="aspect-[3/4]" className="rounded-xl" />
            <Img src="/images/kevin-today.jpg" alt="Physique hybride" ratio="aspect-[3/4]" className="mt-10 rounded-xl" />
          </div>
        </div>
      </Section>

      <Section label="Ce qu'il y a dedans" title="Le système, en bref." className="border-t border-kg-line">
        <div className="grid gap-px bg-kg-line sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: '90 jours structurés', d: 'Douze semaines découpées en phases, avec une intention par phase.' },
            { t: 'Force et esthétique', d: 'Les deux travaillés en parallèle, pas en alternance de blocs.' },
            { t: 'Adapté à ton matériel', d: 'Salle complète, matériel minimal ou poids du corps : le programme s’adapte.' },
            { t: 'Suivi quotidien', d: 'Une application, pas un PDF. Chaque séance validée, chaque jour compté.' },
            { t: 'Communauté privée', d: 'Un groupe où on s’entraîne vraiment, pas un salon de motivation.' },
            { t: 'Accès à vie', d: 'Un paiement unique, aucun abonnement.' },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 50}>
              <div className="h-full bg-kg-black p-8">
                <h3 className="text-lg font-medium">{f.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-kg-grey">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 border border-kg-line p-8 sm:p-10">
          <Label accent>Le programme est vendu sur son propre site</Label>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-kg-fog">
            Les détails complets, le contenu semaine par semaine, le prix et l&apos;achat se trouvent
            sur <span className="text-kg-white">kevingymworkout.com</span>. Cette page ne sert
            qu&apos;à te dire ce que c&apos;est.
          </p>
          <a href={ECOSYSTEM.programme} className="kg-btn mt-8">
            Aller sur kevingymworkout.com
          </a>
        </div>
      </Section>
    </>
  );
}
