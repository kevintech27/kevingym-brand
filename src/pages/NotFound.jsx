import React from 'react';
import { ECOSYSTEM } from '@/lib/brand';
import { Label } from '@/components/Primitives';

export default function NotFound() {
  return (
    <section className="kg-wrap flex min-h-[70vh] flex-col justify-center py-32 text-center">
      <Label className="mx-auto">404</Label>
      <h1 className="kg-display kg-shade mt-6 text-[clamp(2.4rem,7vw,5rem)]">Page not found.</h1>
      <p className="mx-auto mt-8 max-w-measure text-lg font-light leading-relaxed tracking-copy text-kg-muted">
        This address doesn&apos;t exist on kevingym.com. If you were looking for the HYBRID
        programme, your account, or your member area, that all lives on the programme site.
      </p>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <a href="/" className="kg-btn">
          Back home
        </a>
        <a href={ECOSYSTEM.programme} className="kg-btn-ghost">
          Programme site
        </a>
      </div>
    </section>
  );
}
