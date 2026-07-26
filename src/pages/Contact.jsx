import React from 'react';
import { Link } from 'react-router-dom';
import { ECOSYSTEM, SOCIALS } from '@/lib/brand';
import { Label, Reveal, Section } from '@/components/Primitives';
import ContactForm from '@/components/ContactForm';

const Route = ({ title, desc, to, href, cta }) => {
  const inner = (
    <>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-kg-grey">{desc}</p>
      <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-label text-kg-cyan">
        {cta} →
      </span>
    </>
  );
  const cls =
    'block h-full border border-kg-line p-7 transition-colors duration-300 hover:border-kg-cyan';
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
};

export default function Contact() {
  return (
    <>
      <Section
        label="Contact"
        title="Parlons projet."
        intro="Je lis et je réponds moi-même. Pour aller plus vite, utilise l'entrée qui correspond à ta demande."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <Route
              title="Marques"
              desc="Collaboration, placement produit, campagne, ambassadeur."
              to="/partners/brands"
              cta="Formulaire marque"
            />
          </Reveal>
          <Reveal delay={70}>
            <Route
              title="Salles de sport"
              desc="Tournage dans votre salle, mise en valeur, partenariat récurrent."
              to="/partners/gyms"
              cta="Formulaire salle"
            />
          </Reveal>
          <Reveal delay={140}>
            <Route
              title="Support HYBRID"
              desc="Une question sur le programme, ton compte ou ton accès ? C'est sur le site du programme."
              href={`${ECOSYSTEM.programme}/contact`}
              cta="Support programme"
            />
          </Reveal>
          <Reveal delay={210}>
            <Route
              title="Presse & événements"
              desc="Interview, intervention, événement, tournage externe."
              href="#form"
              cta="Formulaire ci-dessous"
            />
          </Reveal>
        </div>
      </Section>

      <Section id="form" label="Autre demande" title="Écris-moi." className="border-t border-kg-line">
        <ContactForm
          kind="general"
          fields={[
            { name: 'name', label: 'Nom', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'org', label: 'Structure (facultatif)' },
            { name: 'subject', label: 'Sujet', required: true },
            { name: 'message', label: 'Message', textarea: true, required: true },
          ]}
        />
      </Section>

      <Section label="Réseaux" title="Ou en direct." className="border-t border-kg-line">
        <div className="flex flex-wrap gap-3">
          {SOCIALS.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener" className="kg-btn-ghost">
              {s.label} {s.handle}
            </a>
          ))}
          <a href={ECOSYSTEM.links} className="kg-btn-ghost">
            Tous mes liens
          </a>
        </div>
      </Section>
    </>
  );
}
