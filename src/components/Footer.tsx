import Link from 'next/link';
import { site, contact, socials } from '@/lib/site';
import { courses } from '@/lib/courses';
import { Icon } from './Icons';
import Logo from './Logo';

const quickLinks = [
  { label: 'About Us', href: '/about/' },
  { label: 'All Courses', href: '/courses/' },
  { label: 'Mentors', href: '/mentors/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Market News', href: '/news/' },
  { label: 'Career Outcomes', href: '/careers/' },
  { label: 'Contact', href: '/contact/' },
];

/* Sitewide links into the SEO landing pages — every page links to them. */
const popularLinks = [
  { label: 'Stock Market Course', href: '/stock-market-course/' },
  { label: 'Trading Course', href: '/trading-course/' },
  { label: 'Stock Market Course in Lucknow', href: '/stock-market-course-in-lucknow/' },
  { label: 'Share Market Classes in Lucknow', href: '/stock-market-course-in-lucknow/' },
  { label: 'NISM Series XV Coaching', href: '/courses/nism-series-15/' },
  { label: 'Options Trading Course', href: '/trading-course/' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-line bg-surface/40">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.shortDescription} Classroom in Lucknow, live online batches, and lifetime
              access to every recording.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => {
                const Glyph = Icon[s.icon as keyof typeof Icon];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white/[0.03] text-muted transition-colors hover:border-bull/40 hover:text-bull"
                  >
                    <Glyph className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-fg">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-bull"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Programs */}
          <nav aria-label="Programs">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-fg">
              Programs
            </h3>
            <ul className="mt-4 space-y-2.5">
              {courses.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/courses/${c.slug}/`}
                    className="text-sm text-muted transition-colors hover:text-bull"
                  >
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-fg">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex gap-3">
                <Icon.pin className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                <span className="text-muted">{contact.address.full}</span>
              </li>
              <li className="flex gap-3">
                <Icon.phone className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                <span className="flex flex-col gap-1">
                  {contact.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="tnum text-muted transition-colors hover:text-bull"
                    >
                      {p.label}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Icon.mail className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all text-muted transition-colors hover:text-bull"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon.clock className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                <span className="text-muted">{contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Popular searches — internal linking for crawl depth */}
        <nav aria-label="Popular pages" className="mt-12 border-t border-line pt-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-fg">
            Popular
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
            {popularLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Risk disclaimer */}
        <div className="mt-12 rounded-2xl border border-amber/20 bg-amber/[0.04] p-5">
          <div className="flex gap-3">
            <Icon.shield className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
            <p className="text-xs leading-relaxed text-muted">
              <span className="font-semibold text-fg">Disclaimer:</span> {site.name} is an
              educational institute. We are not a SEBI-registered Investment Adviser or Research
              Analyst, and we do not provide buy/sell recommendations, tips, portfolio management
              or assured-return schemes. Investment in securities, derivatives, currency and
              digital assets carries market risk, including possible loss of capital. All course
              content is for educational purposes only. Please read all scheme-related documents
              carefully and consult a SEBI-registered adviser before investing.{' '}
              <Link
                href="/disclaimer/"
                className="font-semibold text-amber underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                Read the full legal disclaimer
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Managed by M/s KOSOVO INDIA INC. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/terms/" className="transition-colors hover:text-bull">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy/" className="transition-colors hover:text-bull">
              Privacy Policy
            </Link>
            <Link href="/refund-policy/" className="transition-colors hover:text-bull">
              Refund Policy
            </Link>
            <Link href="/disclaimer/" className="transition-colors hover:text-bull">
              Legal Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
