/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // KEVINGYM Brand System.
      // Base palette, whole site: pure black, white, and two greys. The only
      // "accent" in the base palette is white-on-black and type-scale contrast.
      //
      // A single restrained accent (cyan/blue) exists for the builder zone and
      // is reachable only through the `kg-accent-*` scoped classes in
      // index.css. It never leaks into the hero, the nav, the stats, the CTAs
      // or the footer.
      colors: {
        kg: {
          black: '#000000',
          surface: 'rgba(255, 255, 255, 0.035)',
          surfaceHover: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.10)',
          white: '#FFFFFF',
          muted: '#A1A1AA',
          dim: '#52525B',
          accent: '#00E5FF',
          accentDeep: '#094FB8',
          accentBorder: 'rgba(0, 229, 255, 0.16)',
          accentSurface: 'rgba(0, 229, 255, 0.04)',
        },
      },
      fontFamily: {
        // Geist for text and display, Geist Mono for the accent zone.
        sans: ['Geist', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        // Mono stays reserved for the builder / accent zone only.
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // Optical tracking: the bigger the type, the tighter it sets. This is
      // the single biggest difference between "web default" and the editorial
      // headline register this site is aiming at.
      letterSpacing: {
        label: '0.2em',
        display: '-0.035em',
        headline: '-0.025em',
        copy: '-0.011em',
      },
      maxWidth: {
        editorial: '1180px',
        measure: '38rem',
      },
      // Apple's own interface curve (used on sheets, scroll snaps, buttons)
      // plus a softer overshoot-free curve for entrances.
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.32, 0.72, 0, 1)',
        soft: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // Entrance: fade + lift + de-blur. The blur is what makes it read as
        // "focusing into place" rather than a plain slide.
        //
        // The final frame resolves the filter to `none`, not to `blur(0)`.
        // A filter left on the element after the animation, even a
        // zero-radius one, promotes it to its own compositing layer, and
        // Chromium then refuses to paint any background-clip:text inside
        // that layer. Every display headline on the site went invisible on
        // black until this was changed.
        rise: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.985)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'none' },
        },
        soften: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Opacity only, deliberately. Animating `scale` on a 760px element
        // carrying a 120px blur forces the compositor to re-rasterise the
        // whole blurred layer every frame: on a mid-range phone that is the
        // difference between a smooth page and a hot one. The breathing
        // reads the same with opacity alone.
        breathe: {
          '0%, 100%': { opacity: '0.68' },
          '50%': { opacity: '1' },
        },
        // Slow, gentle contour morph. Makes a perfect circle drift like a
        // liquid blob instead of a rigid disc. Accent sphere only.
        fluid: {
          '0%, 100%': { borderRadius: '42% 58% 65% 35% / 45% 40% 60% 55%' },
          '25%': { borderRadius: '60% 40% 45% 55% / 55% 60% 40% 45%' },
          '50%': { borderRadius: '50% 50% 35% 65% / 40% 60% 55% 45%' },
          '75%': { borderRadius: '45% 55% 60% 40% / 60% 40% 45% 55%' },
        },
        // Scroll hint: a dot dripping down a hairline at the hero's bottom.
        drip: {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '25%': { opacity: '1' },
          '75%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(28px)' },
        },
        // Infinite brand band: the track holds two identical halves, so
        // -50% loops seamlessly.
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        soften: 'soften 1s ease both',
        breathe: 'breathe 11s ease-in-out infinite',
        'accent-fluid': 'breathe 11s ease-in-out infinite, fluid 22s ease-in-out infinite',
        drip: 'drip 2.2s ease-in-out infinite',
        marquee: 'marquee 48s linear infinite',
      },
    },
  },
  plugins: [],
};
