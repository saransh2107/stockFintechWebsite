import type { Metadata } from 'next';
import Link from 'next/link';
import { site, contact } from '@/lib/site';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/ui';
import { Reveal } from '@/components/motion';

export const metadata: Metadata = pageMeta({
  title: 'Terms & Conditions',
  description:
    'Terms and conditions governing enrolment in Stock Fintech courses, use of the website, intellectual property, payments and limitation of liability.',
  path: '/terms/',
});

const UPDATED = '17 October 2026';

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        body={`These terms govern your use of ${site.url} and your enrolment in any Stock Fintech program. Last updated ${UPDATED}.`}
      />

      <section className="container-x mt-14 pb-10">
        <Reveal amount={0.01} className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-line bg-card/40 p-8 sm:p-10">
            <div className="prose-sf">
              <h2>1. Who we are</h2>
              <p>
                {site.name} (&ldquo;Stock Fintech&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a
                market education institute managed by M/s KOSOVO INDIA INC., operating from{' '}
                {contact.address.full}. You can reach us at{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a> or{' '}
                {contact.phones[0].label}.
              </p>

              <h2>2. Educational services only</h2>
              <p>
                Stock Fintech provides <strong>education and training</strong>. We are{' '}
                <strong>not</strong> a SEBI-registered Investment Adviser, Research Analyst,
                Portfolio Manager or stock broker. Nothing on this website or in any course,
                session, recording, document or communication constitutes investment advice, a
                recommendation to buy or sell any security, or a solicitation of any kind.
              </p>
              <ul>
                <li>We do not provide buy/sell tips, calls or trading signals.</li>
                <li>We do not manage anyone&rsquo;s funds or operate a PMS.</li>
                <li>We do not promise, guarantee or indicate any level of returns.</li>
                <li>
                  Any price levels, charts or instruments discussed in class are illustrative
                  teaching examples, not recommendations.
                </li>
              </ul>

              <h2>3. Market risk</h2>
              <p>
                Investment and trading in securities, derivatives, currencies and digital assets
                carry substantial risk, including the total loss of capital. Leverage magnifies
                both gains and losses. Past performance of any strategy, instrument or mentor is
                not indicative of future results. You are solely responsible for every trading
                and investment decision you make, and you should consult a SEBI-registered
                adviser before investing.
              </p>

              <h2>4. Enrolment and eligibility</h2>
              <ul>
                <li>You must be at least 18 years old to enrol, or have guardian consent.</li>
                <li>
                  The information you provide at enrolment must be accurate and kept up to date.
                </li>
                <li>
                  Enrolment is personal to you and may not be transferred, resold or shared.
                </li>
              </ul>

              <h2>5. Fees and payment</h2>
              <p>
                Course fees are stated on the{' '}
                <Link href="/pricing/">pricing page</Link> and are payable in full before a batch
                begins, unless an instalment plan has been agreed in writing. Fees are quoted in
                Indian Rupees and are exclusive of any taxes that may apply. The official NISM
                examination fee is payable by you directly to NISM and is not included.
              </p>

              <h2>6. Refunds</h2>
              <p>
                Refunds are governed by our <Link href="/refund-policy/">Refund Policy</Link>,
                which forms part of these terms.
              </p>

              <h2>7. Course content and intellectual property</h2>
              <p>
                All course material — recordings, slides, notes, question banks, templates and
                written content on this website — is the intellectual property of Stock Fintech
                and is licensed to you for personal, non-commercial learning only. You may not:
              </p>
              <ul>
                <li>record, screen-capture, re-stream or redistribute any session;</li>
                <li>share your login, material or recordings with any third party;</li>
                <li>reproduce, resell or teach our material commercially.</li>
              </ul>
              <p>
                Breach of this clause may result in immediate termination of access without
                refund, in addition to any legal remedy available to us.
              </p>

              <h2>8. Batch schedules and changes</h2>
              <p>
                We may reschedule a session, change a mentor, or move a batch between classroom
                and online delivery where circumstances require it. Where a change is material we
                will give you as much notice as is practicable and, where a session cannot be
                rescheduled, provide a recording or equivalent make-up session.
              </p>

              <h2>9. Acceptable conduct</h2>
              <p>
                We expect respectful conduct in classrooms, online sessions and community groups.
                Soliciting other students, promoting tip services, abusive behaviour or sharing
                of paid material will result in removal without refund.
              </p>

              <h2>10. Third-party platforms</h2>
              <p>
                Brokers, exchanges, charting platforms and payment gateways referenced in our
                teaching are independent third parties. We are not responsible for their
                services, outages, charges or decisions, and we receive no consideration for
                naming them in class.
              </p>

              <h2>11. Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, Stock Fintech&rsquo;s total liability
                arising out of or relating to your use of this website or any program is limited
                to the fees you actually paid for that program. We are not liable for any
                trading or investment losses, lost profits, or indirect or consequential loss of
                any kind.
              </p>

              <h2>12. Privacy</h2>
              <p>
                Our handling of your personal data is described in our{' '}
                <Link href="/privacy/">Privacy Policy</Link>.
              </p>

              <h2>13. Changes to these terms</h2>
              <p>
                We may update these terms from time to time. The version published on this page
                is the one in force, and the &ldquo;last updated&rdquo; date above tells you when
                it changed. Continued use of the website or a program after a change constitutes
                acceptance.
              </p>

              <h2>14. Governing law</h2>
              <p>
                These terms are governed by the laws of India. The courts at Lucknow, Uttar
                Pradesh have exclusive jurisdiction over any dispute arising from them.
              </p>

              <h2>15. Contact</h2>
              <p>
                Questions about these terms? Write to{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a> or call{' '}
                {contact.phones[0].label}.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
