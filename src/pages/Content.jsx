import React from 'react';
import { CONTENT_CATEGORIES, SOCIALS } from '@/lib/brand';
import { Img, Label, Reveal, Section, Todo } from '@/components/Primitives';

const Card = ({ item }) => (
  <article className="group">
    <Img
      src={item.image}
      alt={`${item.title} — ${item.note}`}
      ratio="aspect-[9/12]"
      placeholder="Vidéo / photo à ajouter"
      className="rounded-xl"
    />
    <h3 className="mt-4 text-base font-medium">{item.title}</h3>
    <p className="mt-1 font-mono text-[11px] uppercase tracking-label text-kg-grey">{item.note}</p>
    {item.embed && (
      <a href={item.embed} target="_blank" rel="noopener" className="mt-3 inline-block text-sm text-kg-cyan hover:underline">
        Voir le contenu
      </a>
    )}
  </article>
);

export default function Content() {
  return (
    <>
      <Section
        label="Portfolio"
        title="Ce que je produis."
        intro="Formats verticaux pensés pour la rétention. Le fond passe avant l'effet : si une vidéo n'apprend rien, elle ne sert à rien."
      >
        <div className="flex flex-wrap gap-3">
          {SOCIALS.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener" className="kg-btn-ghost">
              {s.label} {s.handle}
            </a>
          ))}
        </div>
      </Section>

      {CONTENT_CATEGORIES.map((cat) => (
        <Section
          key={cat.id}
          id={cat.id}
          label={cat.title}
          title={cat.title}
          intro={cat.desc}
          className="border-t border-kg-line"
        >
          {cat.items.length === 0 ? (
            <div className="max-w-2xl">
              <Todo>
                Aucun contenu listé pour « {cat.title} ». Ajoute des entrées dans{' '}
                <code className="text-kg-cyan">CONTENT_CATEGORIES</code> (
                <code className="text-kg-cyan">src/lib/brand.js</code>) avec le lien du post et une
                image de couverture.
              </Todo>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-3">
              {cat.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 70}>
                  <Card item={item} />
                </Reveal>
              ))}
            </div>
          )}
        </Section>
      ))}

      <Section className="border-t border-kg-line">
        <Label>Performances</Label>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Les statistiques de contenu
        </h2>
        <div className="mt-8 max-w-2xl">
          <Todo>
            Cette section n&apos;affichera des chiffres de performance (vues, taux de rétention,
            engagement) que lorsque tu les auras renseignés et vérifiés. Une marque demandera
            systématiquement des captures d&apos;écran de tes statistiques : autant ne publier que ce
            que tu peux prouver.
          </Todo>
        </div>
      </Section>
    </>
  );
}
