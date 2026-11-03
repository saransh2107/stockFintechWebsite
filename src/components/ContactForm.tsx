'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { courses } from '@/lib/courses';
import { contact } from '@/lib/site';
import { Icon } from './Icons';

/**
 * Enquiry form.
 *
 * The site is a static export, so there is no server action to post to. Set
 * NEXT_PUBLIC_FORM_ENDPOINT to a form backend (Formspree, Web3Forms, Basin,
 * or your own handler) and submissions POST there as JSON. With no endpoint
 * configured the form falls back to opening a pre-filled email, so the page
 * is never a dead end.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '';

type State = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-bull/50 focus:outline-none focus:ring-1 focus:ring-bull/30';

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Honeypot: real users never fill this.
    if (data.company) return;

    if (!ENDPOINT) {
      const body = [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Interested in: ${data.course}`,
        `Preferred mode: ${data.mode}`,
        '',
        data.message,
      ].join('\n');
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        `Course enquiry — ${data.name}`
      )}&body=${encodeURIComponent(body)}`;
      setState('sent');
      setMessage('Your email client should have opened with the enquiry ready to send.');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
      setMessage('Thanks — we have your enquiry and will call you back within one working day.');
      form.reset();
    } catch {
      setState('error');
      setMessage(
        `Something went wrong sending that. Please call us on ${contact.phones[0].label} or message us on WhatsApp.`
      );
    }
  }

  return (
    <div className="relative rounded-[2rem] border border-line bg-card/60 p-7 sm:p-9">
      <AnimatePresence mode="wait">
        {state === 'sent' ? (
          <m.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <m.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-bull/15 text-bull"
            >
              <Icon.check className="h-8 w-8" />
            </m.span>
            <h3 className="mt-6 text-xl font-bold">Enquiry received</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{message}</p>
            <button
              type="button"
              onClick={() => setState('idle')}
              className="btn-ghost mt-7"
            >
              Send another
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
            noValidate={false}
          >
            <div>
              <h2 className="text-xl font-bold">Book a free demo class</h2>
              <p className="mt-1.5 text-sm text-muted">
                Fill this in and we will call you back within one working day.
              </p>
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">Full name *</span>
                <input
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  className={field}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">Phone *</span>
                <input
                  required
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="[0-9+\s-]{10,15}"
                  placeholder="+91 98765 43210"
                  className={field}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted">Email *</span>
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={field}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">
                  Interested in
                </span>
                <select name="course" defaultValue={courses[0].shortTitle} className={field}>
                  {courses.map((c) => (
                    <option key={c.slug} value={c.shortTitle} className="bg-card">
                      {c.shortTitle}
                    </option>
                  ))}
                  <option value="Not sure yet" className="bg-card">
                    Not sure yet
                  </option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">
                  Preferred mode
                </span>
                <select name="mode" defaultValue="Classroom (Lucknow)" className={field}>
                  <option className="bg-card">Classroom (Lucknow)</option>
                  <option className="bg-card">Live online</option>
                  <option className="bg-card">Recorded only</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted">
                Anything we should know?
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="Your experience level, what you want to achieve, preferred timings…"
                className={`${field} resize-y`}
              />
            </label>

            {state === 'error' && (
              <m.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-bear/30 bg-bear/10 px-4 py-3 text-xs text-bear"
                role="alert"
              >
                {message}
              </m.p>
            )}

            <m.button
              type="submit"
              disabled={state === 'sending'}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full disabled:opacity-60"
            >
              {state === 'sending' ? 'Sending…' : 'Request my free demo'}
              {state !== 'sending' && <Icon.arrowRight className="h-4 w-4" />}
            </m.button>

            <p className="text-center text-2xs leading-relaxed text-muted">
              By submitting you agree to be contacted about Stock Fintech programs. We never sell
              your details or send trading tips.
            </p>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
