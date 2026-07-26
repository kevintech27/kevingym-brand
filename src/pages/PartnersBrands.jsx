import React from 'react';
import { AUDIENCE, BRAND_SERVICES, SOCIALS } from '@/lib/brand';
import { Label, Reveal, Section, Stat, Todo } from '@/components/Primitives';
import ContactForm from '@/components/ContactForm';

export default function PartnersBrands() {
  return (
    <>
      <Section
        label="Pour les marques"
        title="Media kit."
        intro="Tout ce dont tu as besoin pour décider si une collaboration a du sens, sans avoir à me le demander par mail."
      />

      <Section label="Audience" title="Qui me suit." className="border-t border-kg-line">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {AUDIENCE.map((a, i) => (
            <Reveal key={a.id} delay={i * 60}>
              <Stat label={a.label} value={a.value} verified={a.verified} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 max-w-2xl">
          <Todo>
            Renseigne les chiffres dans <code className="text-kg-cyan">AUDIENCE</code>, et ajoute ici
            la répartition démographique (âge, genre, pays) que tu trouves dans tes statistiques
            Instagram et TikTok. C&apos;est la première chose qu&apos;une marque regarde.
          </Todo>
        </div>
      </Section>

      <Section label="Plateformes" title="Où je publie." className="border-t border-kg-line">
        <div className="grid gap-6 sm:grid-cols-2">
          {SOCIALS.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between border border-kg-line p-7 transition-colors hover:border-kg-cyan"
              >
                <span>
                  <span className="block text-lg font-medium">{s.label}</span>
                  <span className="mt-1 block font-mono text-xs text-kg-grey">{s.handle}</span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-label text-kg-cyan">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label="Services" title="Ce que je peux produire." className="border-t border-kg-line">
        <div className="grid gap-px bg-kg-line sm:grid-cols-2">
          {BRAND_SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="h-full bg-kg-black p-8">
                <h3 className="text-lg font-medium">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-kg-grey">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label="Media kit" title="Le dossier complet." className="border-t border-kg-line">
        <div className="max-w-2xl">
          <Todo>
            Dépose ton media kit PDF dans <code className="text-kg-cyan">public/media-kit.pdf</code>{' '}
            puis remplace ce bloc par un bouton de téléchargement. Tant que le fichier n&apos;existe
            pas, on n&apos;affiche pas un lien mort.
          </Todo>
        </div>
      </Section>

      <Section label="Campagne" title="Parlons de ton projet." className="border-t border-kg-line">
        <ContactForm
          kind="brand"
          fields={[
            { name: 'company', label: 'Marque / société', required: true },
            { name: 'name', label: 'Ton nom', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'budget', label: 'Budget indicatif' },
            { name: 'timing', label: 'Échéance souhaitée' },
            { name: 'message', label: 'Le projet en quelques lignes', textarea: true, required: true },
          ]}
        />
      </Section>
    </>
  );
}
