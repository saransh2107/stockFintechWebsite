import Link from 'next/link';
import type { Landing, Section } from '@/lib/landings';
import { contact } from '@/lib/site';
import { Icon } from './Icons';
import { Reveal, StaggerGroup, StaggerItem } from './motion';
import { PageHero, SectionHeading, Accordion, CTABand, CheckItem } from './ui';

/** Renders one SEO landing page from its content definition. */
export default function LandingPage({ data }: { data: Landing }) {
  return (
    <>
      <PageHero eyebrow={data.eyebrow} title={data.h1} body={data.intro}>
        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/contact/" className="btn-primary group">
            Book a free demo class
            <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a href={contact.phones[0].href} className="btn-ghost">
            <Icon.phone className="h-4 w-4 text-brand" />
            {contact.phones[0].label}
          </a>
        </Reveal>
      </PageHero>

      <div className="container-x mt-16 space-y-20">
        {data.sections.map((s, i) => (
          <SectionBlock key={i} section={s} />
        ))}
      </div>

      {/* FAQ */}
      <section className="container-x mt-20">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Common <span className="text-gradient">questions</span>
            </>
          }
          align="center"
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={data.faqs} />
        </div>
      </section>

      {/* Internal links — helps crawlers and spreads authority across the site */}
      <section className="container-x mt-20">
        <Reveal className="rounded-[2rem] border border-line bg-card/40 p-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Keep reading
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {data.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-fg transition-colors hover:border-brand/40 hover:text-brand"
              >
                {r.label}
                <Icon.arrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <CTABand />
    </>
  );
}

function SectionBlock({ section: s }: { section: Section }) {
  switch (s.type) {
    case 'prose':
      return (
        <Reveal as="section" className="max-w-3xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{s.h2}</h2>
          <div className="mt-5 space-y-4">
            {s.paras.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      );

    case 'cards':
      return (
        <section>
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{s.h2}</h2>
            {s.intro && <p className="mt-4 text-base leading-relaxed text-muted">{s.intro}</p>}
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
            {s.items.map((it) => (
              <StaggerItem
                key={it.title}
                className="rounded-2xl border border-line bg-card/50 p-6"
              >
                <h3 className="text-lg font-bold leading-snug">{it.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{it.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      );

    case 'checks':
      return (
        <section>
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{s.h2}</h2>
            {s.intro && <p className="mt-4 text-base leading-relaxed text-muted">{s.intro}</p>}
          </Reveal>
          <StaggerGroup
            className="mt-8 grid max-w-4xl gap-3.5 sm:grid-cols-2"
            gap={0.05}
          >
            {s.items.map((it) => (
              <CheckItem key={it}>{it}</CheckItem>
            ))}
          </StaggerGroup>
        </section>
      );

    case 'steps':
      return (
        <section>
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{s.h2}</h2>
            {s.intro && <p className="mt-4 text-base leading-relaxed text-muted">{s.intro}</p>}
          </Reveal>
          <StaggerGroup className="mt-10 space-y-4" gap={0.07}>
            {s.items.map((it, i) => (
              <StaggerItem
                key={it.title}
                className="flex gap-5 rounded-2xl border border-line bg-card/40 p-6"
              >
                <span className="tnum shrink-0 font-display text-sm font-bold text-brand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-semibold">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{it.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      );

    case 'table':
      return (
        <section>
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{s.h2}</h2>
            {s.intro && <p className="mt-4 text-base leading-relaxed text-muted">{s.intro}</p>}
          </Reveal>
          <Reveal className="mt-8 overflow-x-auto rounded-2xl border border-line bg-card/40">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line">
                  {s.head.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="p-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.rows.map((row, i) => (
                  <tr key={i} className="border-b border-line last:border-0">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`p-5 ${j === 0 ? 'font-semibold text-fg' : 'text-muted'}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </section>
      );

    case 'callout': {
      const tone =
        s.tone === 'amber'
          ? 'border-amber/20 bg-amber/[0.04] text-amber'
          : 'border-brand/25 bg-brand/[0.05] text-brand';
      return (
        <Reveal as="section" className={`rounded-[2rem] border p-8 ${tone}`}>
          <div className="flex gap-4">
            <Icon.shield className="mt-1 h-5 w-5 shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-fg">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          </div>
        </Reveal>
      );
    }
  }
}
