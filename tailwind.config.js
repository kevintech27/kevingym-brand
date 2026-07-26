/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // === KEVINGYM BRAND SYSTEM =============================================
      // Noir OLED en fond, blanc et gris pour la hierarchie, un seul accent cyan
      // employe avec parcimonie : labels actifs, liens, details techniques.
      colors: {
        kg: {
          black: '#000000',
          ink: '#08080A',
          panel: '#0D0D10',
          line: '#1C1C21',
          grey: '#6E6E78',
          fog: '#A5A5B0',
          white: '#FFFFFF',
          cyan: '#22D3EE',
          cyandim: '#0E7490',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        label: '0.28em',
      },
      maxWidth: {
        editorial: '1240px',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        soften: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        soften: 'soften 1s ease both',
      },
    },
  },
  plugins: [],
};
