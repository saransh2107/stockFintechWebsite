import type { Metadata } from 'next';
import { contact, socials } from '@/lib/site';
import { pageMeta, breadcrumbLd, localBusinessLd } from '@/lib/seo';
import { PageHero } from '@/components/ui';
import { Reveal, StaggerGroup, StaggerItem, slideRight } from '@/components/motion';
import { Icon } from '@/components/Icons';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = pageMeta({
  title: 'Contact Us',
  description:
    'Visit Stock Fintech at K-4, Power House Chauraha, Ashiyana, Lucknow. Call +91 895 395 2666 or +91 955 960 1555, email contact@mystockfintech.com, or book a free demo class online.',
  path: '/contact/',
  keywords: ['Stock Fintech contact', 'stock market classes Lucknow address', 'book demo class'],
});

const channels = [
  {
    icon: 'phone' as const,
    title: 'Call us directly',
    lines: contact.phones.map((p) => ({ text: p.label, href: p.href })),
    note: contact.hours,
  },
  {
    icon: 'whatsapp' as const,
    title: 'WhatsApp',
    lines: [{ text: 'Chat with the team', href: contact.whatsapp.href }],
    note: 'Usually replies within a few minutes',
  },
  {
    icon: 'mail' as const,
    title: 'Email',
    lines: [{ text: contact.email, href: `mailto:${contact.email}` }],
    note: 'We reply within one working day',
  },
  {
    icon: 'pin' as const,
    title: 'Visit the centre',
    lines: [{ text: contact.address.full, href: '' }],
    note: 'Walk-ins welcome during market hours',
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            localBusinessLd,
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Contact', path: '/contact/' },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Get in touch"
        title="Come see a live session before you decide"
        body="Call, message or walk in. Book a free demo class and sit through a real market session with the mentor who would teach your batch — no obligation, no sales pitch."
      />

      <section className="container-x mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        {/* Channels */}
        <div>
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" gap={0.08}>
            {channels.map((c) => {
              const Glyph = Icon[c.icon];
              return (
                <StaggerItem
                  key={c.title}
                  className="flex gap-4 rounded-2xl border border-line bg-card/40 p-6"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.04] text-bull">
                    <Glyph className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-fg">
                      {c.title}
                    </h2>
                    <div className="mt-2 space-y-1">
                      {c.lines.map((l) =>
                        l.href ? (
                          <a
                            key={l.text}
                            href={l.href}
                            target={l.href.startsWith('http') ? '_blank' : undefined}
                            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="tnum block break-words text-sm font-medium text-fg transition-colors hover:text-bull"
                          >
                            {l.text}
                          </a>
                        ) : (
                          <p key={l.text} className="text-sm leading-relaxed text-fg">
                            {l.text}
                          </p>
                        )
                      )}
                    </div>
                    <p className="mt-2 text-2xs text-muted">{c.note}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          <Reveal className="mt-6 rounded-2xl border border-line bg-card/40 p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-fg">Follow along</h2>
            <p className="mt-2 text-sm text-muted">
              Market breakdowns, weekly outlooks and free sessions.
            </p>
            <div className="mt-4 flex gap-2">
              {socials.map((s) => {
                const Glyph = Icon[s.icon as keyof typeof Icon];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-muted transition-colors hover:border-bull/40 hover:text-bull"
                  >
                    <Glyph className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal variants={slideRight}>
          <ContactForm />
        </Reveal>
      </section>

      {/* Map */}
      <section className="container-x mt-20">
        <Reveal className="overflow-hidden rounded-[2rem] border border-line">
          <iframe
            title="Stock Fintech, Ashiyana, Lucknow on Google Maps"
            src="https://www.google.com/maps?q=Power%20House%20Chauraha%20Ashiyana%20Lucknow&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full grayscale-[0.4] contrast-[1.1]"
          />
        </Reveal>
      </section>
    </>
  );
}
