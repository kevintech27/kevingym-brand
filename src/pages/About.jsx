import React from 'react';
import { Link } from 'react-router-dom';
import { JOURNEY } from '@/lib/brand';
import { Img, Label, Reveal, Section } from '@/components/Primitives';

export default function About() {
  return (
    <>
      <Section
        label="Parcours"
        title={<>Personne ne commence<br />avec une salle.</>}
        intro="J'ai commencé chez moi, sans matériel, à quinze ans. Ce qui a changé mon corps n'est pas un secret d'entraînement : c'est le fait de ne jamais m'arrêter assez longtemps pour repartir de zéro."
      />

      <div className="kg-wrap pb-24 sm:pb-32">
        <ol className="border-t border-kg-line">
          {JOURNEY.map((step, i) => (
            <li key={step.year} className="border-b border-kg-line py-12 sm:py-16">
              <Reveal>
                <div className="grid gap-8 lg:grid-cols-[160px_1fr_320px] lg:gap-12">
                  <div>
                    <Label accent>{String(i + 1).padStart(2, '0')}</Label>
                    <div className="mt-3 font-mono text-sm text-kg-fog">{step.year}</div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                      {step.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-kg-fog">{step.body}</p>
                  </div>

                  <div>
                    <Img
                      src={step.image}
                      alt={`${step.year} — ${step.title}`}
                      ratio="aspect-[4/3]"
                      placeholder="Photo à ajouter"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <Section label="Vision" title="Où je vais." className="border-t border-kg-line">
        <div className="grid gap-10 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-kg-fog">
            Je ne veux pas construire une audience jetable. Je veux un écosystème cohérent : du
            contenu qui apprend vraiment quelque chose, un programme que je suis moi-même, et une
            application qui rend la régularité possible pour des gens qui n&apos;ont pas de coach.
          </p>
          <p className="text-lg leading-relaxed text-kg-fog">
            Sur le long terme, KEVINGYM doit tenir debout sans moi devant la caméra tous les jours :
            une méthode, des outils, une communauté. C&apos;est pour ça que je sépare la marque du
            produit — cette page parle de moi, le programme a son propre site.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/content" className="kg-btn">
            Voir mon contenu
          </Link>
          <Link to="/partners" className="kg-btn-ghost">
            Travailler avec moi
          </Link>
        </div>
      </Section>
    </>
  );
}
