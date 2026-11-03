import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="glow relative flex min-h-[70vh] items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-[0.25]"
      />
      <div className="container-x relative text-center">
        <svg viewBox="0 0 220 70" className="mx-auto h-auto w-full max-w-xs" aria-hidden>
          <defs>
            <linearGradient id="nf-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF4D6A" />
              <stop offset="100%" stopColor="#FFB547" />
            </linearGradient>
          </defs>
          <path
            d="M5,15 L35,28 L60,20 L85,42 L110,34 L140,55 L170,48 L215,62"
            fill="none"
            stroke="url(#nf-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="215" cy="62" r="4" fill="#FF4D6A" />
        </svg>

        <p className="tnum mt-6 font-display text-6xl font-extrabold text-bear/80">404</p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">This page gapped down and vanished</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          The link you followed does not exist any more. It may have moved during our site
          rebuild — try the courses page or head home.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to home
            <Icon.arrowRight className="h-4 w-4" />
          </Link>
          <Link href="/courses/" className="btn-ghost">
            Browse courses
          </Link>
        </div>
      </div>
    </section>
  );
}
