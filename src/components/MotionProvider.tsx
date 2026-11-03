'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Loads only the animation features this site actually uses.
 *
 * The full `motion` component bundles drag, layout projection and pan
 * gestures that nothing here needs. `domAnimation` covers animation, exit
 * (AnimatePresence), whileInView, hover, tap and focus, which is everything
 * we use — and costs roughly half the JavaScript.
 *
 * `strict` makes a stray `motion.div` throw instead of silently pulling the
 * full bundle back in, so the saving cannot regress unnoticed. Use `m.div`.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
