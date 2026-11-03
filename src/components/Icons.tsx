/** Inline SVG icon set — no icon library, so nothing extra ships to the client. */

type P = { className?: string };

const base = 'h-5 w-5';
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const Icon = {
  chart: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-5 3 3 5-7" />
    </svg>
  ),
  badge: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.5L7 22l5-2.5L17 22l-1.5-8.5" />
    </svg>
  ),
  layers: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17.5l9 5 9-5" />
    </svg>
  ),
  clipboard: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M9 3h6v3H9z" />
      <path d="M15 4.5h2.5A1.5 1.5 0 0119 6v13.5A1.5 1.5 0 0117.5 21h-11A1.5 1.5 0 015 19.5V6a1.5 1.5 0 011.5-1.5H9" />
      <path d="M8.5 12l2 2 4.5-4.5" />
    </svg>
  ),
  pulse: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M2 12h4l2.5-7 4 14 3-9 2 2H22" />
    </svg>
  ),
  target: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  candles: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M6 3v4M6 17v4M18 2v5M18 15v7" />
      <rect x="3.5" y="7" width="5" height="10" rx="1" />
      <rect x="15.5" y="7" width="5" height="8" rx="1" />
      <path d="M12 5v14" opacity=".4" />
    </svg>
  ),
  certificate: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M7 8h6M7 11.5h4" />
      <circle cx="17" cy="17.5" r="3" />
      <path d="M15.5 20l-.5 3 2-1 2 1-.5-3" />
    </svg>
  ),
  globe: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
    </svg>
  ),
  mentor: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0113 0" />
      <path d="M16.5 5.5a3 3 0 010 6" />
      <path d="M18 20a6.4 6.4 0 00-2-4.6" />
    </svg>
  ),
  check: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  ),
  arrowRight: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  ),
  chevronDown: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  phone: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006.5 6.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.2 2 2 0 016.5 3z" />
    </svg>
  ),
  mail: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M3 6.5l9 6 9-6" />
    </svg>
  ),
  pin: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  clock: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5l3.5 2" />
    </svg>
  ),
  star: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.1 1.2-6.5L2.5 9.3l6.6-.9z" />
    </svg>
  ),
  quote: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M9.5 5c-3 1.6-5 4.5-5 8.2V19h6.3v-6.2H7.4c0-2.3 1-4 3-5.1L9.5 5zm9.4 0c-3 1.6-5 4.5-5 8.2V19h6.3v-6.2h-3.4c0-2.3 1-4 3-5.1L18.9 5z" />
    </svg>
  ),
  play: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  ),
  menu: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  whatsapp: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 1.8a8.2 8.2 0 11-4.2 15.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 0112 3.8zm-3.3 4c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.7 4.2 3.7 2 .8 2.5.7 2.9.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.5-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.8 6.8 0 01-2-1.2 7.5 7.5 0 01-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.3-.5v-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.6z" />
    </svg>
  ),
  youtube: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3z" />
    </svg>
  ),
  instagram: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" />
    </svg>
  ),
  twitter: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.5 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.1 21H2l7.3-8.3L2.3 3h6.4l4.4 5.9zm-1.1 16.1h1.7L7.7 4.8H5.9z" />
    </svg>
  ),
  linkedin: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.9 21H3.4V9h3.5v12zM5.1 7.4a2 2 0 110-4.1 2 2 0 010 4.1zM21 21h-3.5v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.7V9H13v1.6h.1a3.7 3.7 0 013.3-1.8c3.5 0 4.2 2.3 4.2 5.4V21z" />
    </svg>
  ),
  shield: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M12 2.8l7.5 3v6c0 4.4-3.1 8.4-7.5 9.5-4.4-1.1-7.5-5.1-7.5-9.5v-6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  users: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 19.5a6.2 6.2 0 0112.4 0" />
      <circle cx="17.5" cy="9" r="2.6" />
      <path d="M17 14.4a5 5 0 014.2 4.4" />
    </svg>
  ),
  book: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M4 4.5A1.5 1.5 0 015.5 3H19v15H5.5A1.5 1.5 0 004 19.5z" />
      <path d="M4 19.5A1.5 1.5 0 015.5 18H19v3H5.5A1.5 1.5 0 014 19.5z" />
    </svg>
  ),
  sparkle: ({ className = base }: P) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
      <path d="M19 14l.9 2.6L22.5 18l-2.6.9L19 21.5l-.9-2.6L15.5 18l2.6-.9z" opacity=".6" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;
