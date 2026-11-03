import type { Metadata } from 'next';
import Link from 'next/link';
import { contact } from '@/lib/site';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/ui';
import { Reveal } from '@/components/motion';

export const metadata: Metadata = pageMeta({
  title: 'Refund Policy',
  description:
    'Stock Fintech refund policy — the 7-day window, what qualifies, what does not, how to request a refund and how long it takes to process.',
  path: '/refund-policy/',
});

const UPDATED = '17 October 2026';

export default function RefundPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Refund Policy"
        body={`When you can get your money back, when you cannot, and how to ask. Last updated ${UPDATED}.`}
      />

      <section className="container-x mt-14 pb-10">
        <Reveal amount={0.01} className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-line bg-card/40 p-8 sm:p-10">
            <div className="prose-sf">
              <h2>1. The 7-day window</h2>
              <p>
                Attend the first two sessions of your batch. If you decide the program is not
                right for you, email us within <strong>7 days of the batch start date</strong>{' '}
                and we will refund your fee in full, less any payment-gateway charges actually
                incurred.
              </p>

              <h2>2. What qualifies</h2>
              <ul>
                <li>Request made within 7 days of the batch start date.</li>
                <li>No more than two sessions attended.</li>
                <li>
                  Course material downloaded for personal reference is fine; bulk downloading of
                  the full library is not.
                </li>
              </ul>

              <h2>3. What does not qualify</h2>
              <ul>
                <li>Requests made after the 7-day window has closed.</li>
                <li>
                  One-on-one mentorship once the diagnostic session has been delivered, since it
                  is prepared individually for you.
                </li>
                <li>
                  Enrolments terminated by us for breach of the{' '}
                  <Link href="/terms/">Terms &amp; Conditions</Link>, such as sharing recordings
                  or reselling material.
                </li>
                <li>
                  The official NISM examination fee, which you pay to NISM directly and which we
                  never hold.
                </li>
                <li>Dissatisfaction with trading results. We teach a method; we do not sell outcomes.</li>
              </ul>

              <h2>4. If we cancel</h2>
              <p>
                If Stock Fintech cancels a batch outright and cannot offer you a place in an
                equivalent batch, you receive a <strong>full refund</strong> with no deductions,
                regardless of how much of the course has run.
              </p>

              <h2>5. Transfers instead of refunds</h2>
              <p>
                If the timing simply does not work, you can transfer to a later batch of the
                same program at no charge, once, within six months of your original enrolment.
                Many students prefer this to a refund.
              </p>

              <h2>6. Instalment plans</h2>
              <p>
                If you are paying in instalments and cancel within the window, we refund what
                you have paid and cancel the remaining instalments. Cancelling after the window
                does not cancel your obligation for the remaining instalments.
              </p>

              <h2>7. How to request a refund</h2>
              <ol>
                <li>
                  Email <a href={`mailto:${contact.email}`}>{contact.email}</a> with the subject
                  line &ldquo;Refund request&rdquo;.
                </li>
                <li>
                  Include your full name, registered phone number, program name, batch start
                  date and payment reference.
                </li>
                <li>Tell us briefly why — it is not required, but it helps us improve.</li>
              </ol>

              <h2>8. How long it takes</h2>
              <p>
                We acknowledge every request within 2 working days and approve or explain within
                5 working days. Approved refunds are initiated within 7 working days and are
                credited to the original payment method. Your bank may take a further 5 to 10
                working days to post it.
              </p>

              <h2>9. Questions</h2>
              <p>
                Call {contact.phones[0].label} or email{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>. If something about your
                situation is not covered here, ask — we would rather talk it through than hide
                behind a clause.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
