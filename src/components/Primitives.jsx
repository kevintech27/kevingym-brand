import React, { useEffect, useRef, useState } from 'react';

// =============================================================================
// Briques visuelles du KEVINGYM Brand System.
// =============================================================================

/** Label technique mono, tres espace. Signature typographique du systeme. */
export const Label = ({ children, accent = false, className = '' }) => (
  <span className={`kg-label ${accent ? 'text-kg-cyan' : ''} ${className}`}>{children}</span>
);

/** Filet horizontal fin, utilise pour rythmer les sections. */
export const Rule = ({ className = '' }) => <div className={`kg-rule ${className}`} />;

/**
 * Section editoriale : un label, un titre, un contenu.
 * `id` permet l'ancrage depuis la navigation.
 */
export const Section = ({ id, label, title, intro, children, className = '' }) => (
  <section id={id} className={`py-20 sm:py-28 lg:py-36 ${className}`}>
    <div className="kg-wrap">
      {(label || title) && (
        <header className="mb-12 sm:mb-16">
          {label && <Label>{label}</Label>}
          {title && (
            <h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-kg-fog sm:text-lg">
              {intro}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  </section>
);

/**
 * Reveal : anime l'apparition d'un bloc quand il entre dans le viewport.
 * IntersectionObserver plutot qu'une librairie : zero dependance, et l'animation
 * se desactive automatiquement via prefers-reduced-motion (voir index.css).
 */
export const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${shown ? 'animate-rise' : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * Img : image avec espace reserve honnete.
 *
 * Si le fichier est absent ou echoue, on n'affiche pas une image cassee : on
 * montre un bloc clairement identifie comme un emplacement a remplir. C'est
 * assume — mieux vaut un espace reserve lisible qu'une fausse photo de sportif
 * trouvee sur une banque d'images, qui trahirait la marque.
 */
export const Img = ({ src, alt, ratio = 'aspect-[4/5]', placeholder = 'Photo à ajouter', className = '' }) => {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`${ratio} ${className} flex flex-col items-center justify-center gap-3 border border-dashed border-kg-line bg-kg-panel`}
        role="img"
        aria-label={`${placeholder} : ${alt}`}
      >
        <span className="kg-label text-kg-grey">{placeholder}</span>
        <span className="max-w-[70%] text-center text-xs leading-relaxed text-kg-grey/70">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`${ratio} ${className} overflow-hidden bg-kg-panel`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
      />
    </div>
  );
};

/**
 * Stat : chiffre d'audience.
 * Si la donnee n'est pas verifiee, on affiche un espace reserve plutot qu'un
 * chiffre invente. Une marque qui decouvre un chiffre gonfle ne revient pas.
 */
export const Stat = ({ label, value, verified }) => (
  <div className="border-t border-kg-line pt-5">
    <div className="font-semibold tabular-nums">
      {verified && value ? (
        <span className="text-3xl sm:text-4xl">{value}</span>
      ) : (
        <span className="text-sm font-normal text-kg-grey">À renseigner</span>
      )}
    </div>
    <div className="kg-label mt-2">{label}</div>
  </div>
);

/** Encadre d'avertissement pour les contenus a completer par Kevin. */
export const Todo = ({ children }) => (
  <div className="rounded-xl border border-kg-cyandim/40 bg-kg-cyan/[0.04] px-5 py-4">
    <Label accent>À compléter</Label>
    <p className="mt-2 text-sm leading-relaxed text-kg-fog">{children}</p>
  </div>
);
