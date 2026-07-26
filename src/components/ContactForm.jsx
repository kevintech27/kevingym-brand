import React, { useMemo, useState } from 'react';
import { Label, Todo } from '@/components/Primitives';

// =============================================================================
// ContactForm — formulaire sans backend.
// -----------------------------------------------------------------------------
// Ce site est volontairement STATIQUE : pas de base de donnees, pas de Supabase,
// pas de cle secrete. Le formulaire compose donc un e-mail prerempli via
// `mailto:` et laisse l'utilisateur l'envoyer depuis sa propre messagerie.
//
// Avantages : rien a heberger, rien a securiser, aucune donnee personnelle
// stockee (donc rien de plus a declarer cote RGPD).
// Limite : cela ouvre le client mail du visiteur. Si tu veux un vrai envoi en
// arriere-plan plus tard, branche un service tiers (Formspree, Resend) — c'est
// le seul endroit a modifier.
// =============================================================================

// TODO KEVIN : remplacer par ta vraie adresse professionnelle une fois creee.
// Tant qu'elle n'existe pas, on ne met pas d'adresse fantome : le formulaire
// affiche un avertissement au lieu d'envoyer dans le vide.
export const CONTACT_EMAIL = null; // ex. 'business@kevingym.com'

const Field = ({ field, value, onChange }) => {
  const id = `f-${field.name}`;
  const common = {
    id,
    name: field.name,
    value,
    required: field.required,
    onChange: (e) => onChange(field.name, e.target.value),
    className:
      'w-full border border-kg-line bg-kg-panel px-4 py-3.5 text-sm text-kg-white placeholder-kg-grey/60 ' +
      'transition-colors focus:border-kg-cyan focus:outline-none',
  };

  return (
    <div className={field.textarea ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="kg-label mb-2.5 block">
        {field.label}
        {field.required && <span className="text-kg-cyan"> *</span>}
      </label>
      {field.textarea ? (
        <textarea {...common} rows={6} />
      ) : (
        <input {...common} type={field.type || 'text'} />
      )}
    </div>
  );
};

export const ContactForm = ({ kind = 'general', fields }) => {
  const [values, setValues] = useState({});
  const set = (k, v) => setValues((p) => ({ ...p, [k]: v }));

  const subjectPrefix =
    kind === 'brand' ? '[MARQUE]' : kind === 'gym' ? '[SALLE]' : '[CONTACT]';

  const mailto = useMemo(() => {
    if (!CONTACT_EMAIL) return null;
    const subject = `${subjectPrefix} ${values.company || values.gym || values.name || 'Nouvelle demande'}`;
    const body = fields
      .map((f) => `${f.label} : ${values[f.name] || '—'}`)
      .join('\n');
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [values, fields, subjectPrefix]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mailto) window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((f) => (
          <Field key={f.name} field={f} value={values[f.name] || ''} onChange={set} />
        ))}
      </div>

      {CONTACT_EMAIL ? (
        <button type="submit" className="kg-btn mt-9">
          Envoyer la demande
        </button>
      ) : (
        <div className="mt-9">
          <Todo>
            Aucune adresse professionnelle n&apos;est encore configurée. Crée ton adresse (par
            exemple <code className="text-kg-cyan">business@kevingym.com</code>), puis renseigne-la
            dans <code className="text-kg-cyan">src/components/ContactForm.jsx</code> →{' '}
            <code className="text-kg-cyan">CONTACT_EMAIL</code>. En attendant, le bouton d&apos;envoi
            est volontairement masqué plutôt que d&apos;envoyer vers une boîte inexistante.
          </Todo>
          <p className="mt-6 text-sm text-kg-grey">
            En attendant, tu peux me joindre en message privé sur Instagram ou TikTok.
          </p>
        </div>
      )}

      <p className="mt-6 text-xs leading-relaxed text-kg-grey">
        <Label>Confidentialité</Label>
        <span className="mt-2 block">
          Ce formulaire n&apos;enregistre rien : il ouvre simplement ton logiciel de messagerie avec
          le message prérempli. Aucune donnée n&apos;est stockée sur ce site.
        </span>
      </p>
    </form>
  );
};

export default ContactForm;
