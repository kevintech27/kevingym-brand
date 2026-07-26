import React from 'react';
import { Link } from 'react-router-dom';
import { Label, Reveal, Section } from '@/components/Primitives';

const Choice = ({ to, label, title, body, points }) => (
  <Link
    to={to}
    className="group flex h-full flex-col justify-between border border-kg-line p-8 transition-colors duration-300 hover:border-kg-cyan sm:p-10"
  >
    <div>
      <Label accent>{label}</Label>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
      <p className="mt-5 text-base leading-relaxed text-kg-fog">{body}</p>
      <ul className="mt-7 space-y-2.5">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-sm text-kg-grey">
            <span className="mt-2 h-px w-4 shrink-0 bg-kg-cyan" />
            {p}
          </li>
        ))}
      </ul>
    </div>
    <span className="mt-10 font-mono text-[11px] uppercase tracking-label text-kg-fog transition-colors group-hover:text-kg-cyan">
      Voir le détail →
    </span>
  </Link>
);

export default function Partners() {
  return (
    <>
      <Section
        label="Partenariats"
        title="Deux façons de travailler ensemble."
        intro="Je ne fais pas de placement déguisé. Ce que je montre, je l'utilise — c'est la seule raison pour laquelle mon audience écoute encore."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Choice
              to="/partners/brands"
              label="Pour les marques"
              title="Marques & équipementiers"
              body="Vêtements, nutrition, équipement, applications. Une intégration qui ressemble à mon contenu habituel, pas à une publicité posée dessus."
              points={[
                'Media kit et audience détaillée',
                'Contenu vertical Reels et TikTok',
                'Intégration produit en situation réelle',
                'Campagnes et partenariats longue durée',
              ]}
            />
          </Reveal>

          <Reveal delay={100}>
            <Choice
              to="/partners/gyms"
              label="Pour les salles"
              title="Salles de sport"
              body="Je viens m'entraîner chez vous et je filme. Votre salle devient un décor crédible, vue par des gens qui cherchent justement où s'entraîner."
              points={[
                'Repérage et visite avant tournage',
                'Mise en valeur des espaces et des équipements',
                'Contenu vertical prêt à publier',
                'Feature sur mes réseaux et partenariat récurrent',
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <Section label="Méthode" title="Comment ça se passe." className="border-t border-kg-line">
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: '01', t: 'Prise de contact', d: 'Tu m’écris avec ton objectif, ton produit ou ta salle, et tes délais.' },
            { n: '02', t: 'Cadrage', d: 'On définit le format, le nombre de contenus, les droits d’usage et le budget.' },
            { n: '03', t: 'Production', d: 'Je tourne et je monte. Tu vois le contenu avant publication.' },
            { n: '04', t: 'Publication & bilan', d: 'Mise en ligne, puis retour chiffré sur les performances réelles.' },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <li className="border-t border-kg-line pt-6">
                <Label accent>{s.n}</Label>
                <h3 className="mt-4 text-lg font-medium">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-kg-grey">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
