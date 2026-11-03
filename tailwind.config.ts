import type { Config } from 'tailwindcss';

/**
 * Colours resolve through CSS variables so the whole palette flips between
 * light and dark without touching a single class name. Values live in
 * globals.css under `:root` (dark) and `[data-theme='light']`.
 *
 * `line` is a pre-baked rgba (it is always a translucent hairline), so it does
 * not take an opacity modifier — use `border-line` plain.
 */
const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: rgb('--c-ink'),
        surface: rgb('--c-surface'),
        card: rgb('--c-card'),
        raised: rgb('--c-raised'),
        fg: rgb('--c-fg'),
        muted: rgb('--c-muted'),
        line: 'var(--c-line)',

        /* Brand identity — sampled from the original logo artwork. */
        brand: rgb('--c-brand'),
        cyan: rgb('--c-cyan'),
        violet: rgb('--c-violet'),
        magenta: rgb('--c-magenta'),

        /* Market semantics — green up, red down. Never themed away. */
        bull: rgb('--c-bull'),
        bear: rgb('--c-bear'),
        amber: rgb('--c-amber'),
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        content: '76rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, var(--c-grid) 1px, transparent 1px), linear-gradient(to right, var(--c-grid) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
      keyframes: {
        'ticker-scroll': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'marquee-slow': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        ticker: 'ticker-scroll 40s linear infinite',
        marquee: 'marquee-slow 32s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
