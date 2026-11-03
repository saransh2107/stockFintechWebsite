'use client';

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';

export type Theme = 'light' | 'dark';
export const THEME_KEY = 'sf:theme';

/**
 * Runs before first paint, inlined in <head>.
 *
 * Without this the page renders in the default (dark) palette and then snaps
 * to light once React hydrates — the classic theme flash. Keep it dependency
 * free and synchronous; it is deliberately tiny.
 */
export const themeScript = `(function(){try{
var k='${THEME_KEY}',s=localStorage.getItem(k);
var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
document.documentElement.setAttribute('data-theme',t);
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

function current(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  // Starts 'dark' on the server; the effect syncs it to what the inline
  // script already applied, so markup matches and nothing flashes.
  const [theme, setTheme] = useState<Theme>('dark');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(current());
    setReady(true);

    // Follow the OS only while the visitor has not made an explicit choice.
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_KEY)) return;
      } catch {
        /* storage blocked — still follow the OS */
      }
      const next: Theme = e.matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      setTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  function toggle() {
    const next: Theme = current() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode — the choice just will not persist */
    }
  }

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      className={`relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white/[0.04] text-muted transition-colors hover:border-brand/40 hover:text-brand ${className}`}
    >
      {/* Until the effect runs we do not know the theme — avoid a wrong icon. */}
      <span className={ready ? 'contents' : 'opacity-0'}>
        <m.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className="grid place-items-center"
        >
          {isLight ? <MoonIcon /> : <SunIcon />}
        </m.span>
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1.05rem] w-[1.05rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1.05rem] w-[1.05rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" />
    </svg>
  );
}
