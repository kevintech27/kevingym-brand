import React, { useCallback, useEffect, useRef, useState } from 'react';

// =============================================================================
// KEVINGYM Brand System — shared visual primitives.
// -----------------------------------------------------------------------------
// Register: precision over ornament. One display face, one text face, one
// motion curve. Everything that moves uses the same easing so the page reads
// as a single mechanism rather than a stack of effects.
// =============================================================================

/** Utility label. `tone="nexus"` is only ever used inside `.nx-zone`. */
export const Label = ({ children, tone = 'dim', className = '' }) => (
  <span className={`${tone === 'nexus' ? 'nx-label' : 'kg-label'} ${className}`}>{children}</span>
);

/** Thin horizontal rule, used to pace sections. */
export const Rule = ({ className = '' }) => <div className={`kg-rule ${className}`} />;

/**
 * Signature aura: a soft radial glow behind the content. Renders exactly
 * twice on the page — white in the hero, cyan/violet in the builder zone.
 */
export const Aura = ({ tone = 'white', className = '' }) => (
  <div aria-hidden className={`kg-aura ${tone === 'nexus' ? 'nx-aura' : ''} ${className}`} />
);

/**
 * Tracks how far the page has scrolled, in pixels, on a rAF tick. Used for
 * the hero parallax and the nav's material change — one listener, shared.
 */
export const useScrollY = () => {
  const [y, setY] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setY(window.scrollY);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return y;
};

/**
 * True when the user asked the system to limit motion. CSS handles the
 * declarative animations; this is for the scroll-driven transforms, which
 * are inline styles the media query can't reach.
 */
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
};

/**
 * Feeds the cursor position into a `.kg-card` as CSS variables so its
 * spotlight gradient tracks the pointer. Pure CSS handles the rendering —
 * this only writes two custom properties, never React state, so it costs
 * nothing per frame.
 */
export const useSpotlight = () => {
  const ref = useRef(null);

  const onPointerMove = useCallback((event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
};

/** Card surface with a cursor-tracked spotlight. See `.kg-card` in index.css. */
export const Card = ({ children, className = '', ...rest }) => {
  const { ref, onPointerMove } = useSpotlight();
  return (
    <div ref={ref} onPointerMove={onPointerMove} className={`kg-card ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Editorial section: a label, a title, a body. `align="center"` gives the
 * Apple-style centered header used by the wider sections.
 */
export const Section = ({
  id,
  label,
  title,
  intro,
  children,
  align = 'left',
  className = '',
}) => {
  const centered = align === 'center';

  return (
    <section id={id} className={`py-24 sm:py-32 lg:py-44 ${className}`}>
      <div className="kg-wrap">
        {(label || title) && (
          <header className={`mb-14 sm:mb-20 ${centered ? 'text-center' : ''}`}>
            {label && (
              <div className={`flex items-center gap-5 ${centered ? 'justify-center' : ''}`}>
                {centered && (
                  <span aria-hidden className="hidden h-px w-16 bg-gradient-to-l from-kg-border to-transparent sm:block" />
                )}
                <Label>{label}</Label>
                <span
                  aria-hidden
                  className={`h-px bg-gradient-to-r from-kg-border to-transparent ${
                    centered ? 'hidden w-16 sm:block' : 'flex-1'
                  }`}
                />
              </div>
            )}
            {title && (
              <h2 className="kg-display kg-shade mt-6 text-[clamp(2.1rem,6vw,4.25rem)]">{title}</h2>
            )}
            {intro && (
              <p
                className={`mt-6 max-w-measure text-lg font-light leading-relaxed text-kg-muted sm:text-xl ${
                  centered ? 'mx-auto' : ''
                }`}
              >
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
};

/**
 * Reveal: animates a block in when it enters the viewport. IntersectionObserver
 * rather than a library — zero dependency, and disabled automatically via
 * prefers-reduced-motion (see index.css).
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
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
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
 * Img: image in a rounded frame, with an honest placeholder. If the file is
 * missing or fails to load we show a clearly labeled empty slot instead of a
 * broken image or a stock photo standing in for the real thing.
 */
export const Img = ({
  src,
  alt,
  ratio = 'aspect-[4/5]',
  placeholder = 'Photo to add',
  className = '',
}) => {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`kg-frame ${ratio} ${className} flex flex-col items-center justify-center gap-4 px-6 text-center`}
        role="img"
        aria-label={`${placeholder}: ${alt}`}
      >
        {/* A faint light source inside the empty frame, so a placeholder still
            belongs to the page instead of reading as a broken asset. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.09] via-white/[0.02] to-transparent"
        />
        <span className="relative text-sm font-light tracking-copy text-kg-muted">{placeholder}</span>
        <span aria-hidden className="relative h-px w-10 bg-kg-border" />
        <span className="relative max-w-[80%] text-xs font-light leading-relaxed text-kg-dim">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`kg-frame ${ratio} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-apple group-hover:scale-[1.04]"
      />
    </div>
  );
};

/**
 * Stat: a single proof-bar entry. Falls back to an honest placeholder.
 *
 * Only figures get the display treatment — a phrase like "FR + International"
 * set at 3rem overflows its column and wraps into the row below, so text
 * values set small instead. The fixed-height value box is what keeps every
 * label in the row on one baseline regardless of which branch renders.
 */
export const Stat = ({ label, value }) => {
  const isFigure = Boolean(value) && /^[\d]/.test(value);

  return (
    <div className="group text-center">
      <div className="flex min-h-[3rem] items-center justify-center sm:min-h-[3.75rem]">
        {value ? (
          <span
            className={
              isFigure
                ? 'kg-display kg-shade text-[clamp(2rem,5vw,3.25rem)] tabular-nums'
                : 'font-display text-lg font-semibold tracking-headline text-kg-white sm:text-xl'
            }
          >
            {value}
          </span>
        ) : (
          <span className="font-sans text-sm font-light tracking-copy text-kg-dim">To add</span>
        )}
      </div>
      <div className="kg-label mt-3 transition-colors duration-500 ease-apple group-hover:text-kg-muted">
        {label}
      </div>
    </div>
  );
};

/** Callout for content Kevin still needs to fill in. Monochrome by default. */
export const Todo = ({ children, tone = 'dim' }) => (
  <div
    className={`rounded-2xl border px-6 py-5 ${
      tone === 'nexus' ? 'nx-glass' : 'border-kg-border bg-kg-surface'
    }`}
  >
    <Label tone={tone}>To fill in</Label>
    <p className="mt-2 text-sm font-light leading-relaxed text-kg-muted">{children}</p>
  </div>
);
