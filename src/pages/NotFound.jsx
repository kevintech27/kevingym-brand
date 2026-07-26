import React from 'react';
import { Link } from 'react-router-dom';
import { ECOSYSTEM } from '@/lib/brand';
import { Label } from '@/components/Primitives';

export default function NotFound() {
  return (
    <section className="kg-wrap flex min-h-[70vh] flex-col justify-center py-24">
      <Label accent>Erreur 404</Label>
      <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">Page introuvable.</h1>
      <p className="mt-6 max-w-lg text-base leading-relaxed text-kg-fog">
        Cette adresse n&apos;existe pas sur kevingym.com. Si tu cherchais le programme HYBRID, ton
        compte ou ton espace membre, tout se trouve sur le site du programme.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/" className="kg-btn">
          Retour à l&apos;accueil
        </Link>
        <a href={ECOSYSTEM.programme} className="kg-btn-ghost">
          Site du programme
        </a>
      </div>
    </section>
  );
}
