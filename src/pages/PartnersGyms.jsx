import React from 'react';
import { GYM_SERVICES } from '@/lib/brand';
import { Img, Label, Reveal, Section } from '@/components/Primitives';
import ContactForm from '@/components/ContactForm';

export default function PartnersGyms() {
  return (
    <>
      <Section
        label="Pour les salles"
        title={<>Votre salle,<br />filmée comme il faut.</>}
        intro="Une salle se vend en trente secondes de vidéo : la lumière, l'espace, le matériel, l'ambiance. Je viens m'entraîner chez vous et je produis ce contenu."
      />

      <Section label="Ce que je filme" title="Chaque zone a son intérêt." className="border-t border-kg-line">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: 'Le plateau', d: 'Racks, barres, charges libres : le cœur de la salle, filmé en mouvement.' },
            { t: 'Espace street workout', d: 'Barres de traction et poids du corps, là où le contenu vertical fonctionne le mieux.' },
            { t: 'Machines et équipement', d: 'Montrées en usage réel, avec la technique correcte — pas en plan fixe.' },
            { t: 'Cardio et fonctionnel', d: 'Rythme, intensité, sueur. Ce qui donne envie de venir.' },
            { t: 'Ambiance et architecture', d: 'Lumière, volumes, matériaux. Ce qui différencie votre salle des autres.' },
            { t: 'Vestiaires et services', d: 'Les détails qui rassurent avant un premier abonnement.' },
          ].map((z, i) => (
            <Reveal key={z.t} delay={i * 60}>
              <div className="h-full border border-kg-line p-7">
                <h3 className="text-lg font-medium">{z.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-kg-grey">{z.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label="Prestations" title="Comment on travaille." className="border-t border-kg-line">
        <ol className="border-t border-kg-line">
          {GYM_SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <li className="grid gap-4 border-b border-kg-line py-7 sm:grid-cols-[80px_1fr]">
                <Label accent>{String(i + 1).padStart(2, '0')}</Label>
                <div>
                  <h3 className="text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-kg-grey">{s.desc}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section label="Exemple" title="Le rendu." className="border-t border-kg-line">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          <Img src="/images/kevin-street.jpg" alt="Entraînement en extérieur" ratio="aspect-[9/12]" className="rounded-xl" />
          <Img src={null} alt="Tournage en salle — à ajouter" ratio="aspect-[9/12]" placeholder="Vidéo à ajouter" className="rounded-xl" />
          <Img src={null} alt="Plan d'équipement — à ajouter" ratio="aspect-[9/12]" placeholder="Vidéo à ajouter" className="rounded-xl" />
        </div>
      </Section>

      <Section label="Votre salle" title="Parlons-en." className="border-t border-kg-line">
        <ContactForm
          kind="gym"
          fields={[
            { name: 'gym', label: 'Nom de la salle', required: true },
            { name: 'city', label: 'Ville', required: true },
            { name: 'name', label: 'Votre nom', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'goal', label: 'Objectif (visibilité, ouverture, recrutement…)' },
            { name: 'message', label: 'Votre demande', textarea: true, required: true },
          ]}
        />
      </Section>
    </>
  );
}
