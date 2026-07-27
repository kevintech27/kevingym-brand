/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // KEVINGYM SYSTEM: base charter, whole site.
      // Pure black, white, and two greys. No color accent anywhere in this
      // zone. The only "accent" is white-on-black and type-scale contrast.
      // NEXUS: builder section only.
      // Cyan never leaks outside the `nx-` scoped classes below.
      colors: {
        kg: {
          black: '#000000',
          surface: 'rgba(255, 255, 255, 0.035)',
          surfaceHover: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.10)',
          white: '#FFFFFF',
          muted: '#A1A1AA',
          dim: '#52525B',
        },
        nx: {
          bg: '#000000',
          cyan: '#00FFFF',
          violet: '#6D28D9',
          border: 'rgba(0, 255, 255, 0.16)',
          surface: 'rgba(0, 255, 255, 0.04)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        // Mono stays reserved for the NEXUS/builder zone only.
        mono: ['"Share Tech Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // Optical tracking: the bigger the type, the tighter it sets. This is
      // the single biggest difference between "web default" and the Apple /
      // Google headline register.
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
        rise: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.985)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        soften: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.72', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        // Slow, gentle contour morph. Makes a perfect circle drift like a
        // liquid blob instead of a rigid disc. NEXUS sphere only.
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
        'nx-fluid': 'breathe 11s ease-in-out infinite, fluid 22s ease-in-out infinite',
        drip: 'drip 2.2s ease-in-out infinite',
        marquee: 'marquee 48s linear infinite',
      },
    },
  },
  plugins: [],
};
