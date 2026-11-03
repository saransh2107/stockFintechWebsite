'use client';

import { useState } from 'react';
import { AnimatePresence, m, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { contact } from '@/lib/site';
import { Icon } from './Icons';

/** Thin reading-progress bar pinned under the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <m.div
      aria-hidden
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-bull via-cyan to-violet"
    />
  );
}

/** WhatsApp bubble that appears after the fold, with a dismissible prompt. */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const [bubble, setBubble] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 520));

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="fixed bottom-5 right-5 z-40 flex items-end gap-3"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          <AnimatePresence>
            {bubble && (
              <m.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12, transition: { duration: 0.18 } }}
                transition={{ delay: 0.35 }}
                className="hidden max-w-[220px] rounded-2xl rounded-br-sm border border-line bg-card px-4 py-3 shadow-xl shadow-black/40 sm:block"
              >
                <button
                  type="button"
                  onClick={() => setBubble(false)}
                  aria-label="Dismiss message"
                  className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-line bg-raised text-muted hover:text-fg"
                >
                  <Icon.close className="h-3 w-3" />
                </button>
                <p className="text-xs font-semibold text-fg">Questions about a course?</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Message us on WhatsApp — we usually reply within a few minutes.
                </p>
              </m.div>
            )}
          </AnimatePresence>

          <m.a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Stock Fintech on WhatsApp"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30"
          >
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/50" />
            <Icon.whatsapp className="relative h-7 w-7" />
          </m.a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
