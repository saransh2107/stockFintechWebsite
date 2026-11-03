'use client';

import { m, type Variants, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

/**
 * Shared scroll-reveal primitives.
 *
 * Everything uses `whileInView` with `once: true` so an element animates a
 * single time and then stops costing anything on scroll.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: ElementType;
  amount?: number;
} & Omit<HTMLMotionProps<'div'>, 'variants' | 'children'>;

/** Animates itself into view once. */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = 'div',
  amount = 0.25,
  ...rest
}: RevealProps) {
  const Tag = m[as as 'div'] ?? m.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: '0px 0px -80px 0px' }}
      variants={variants}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers its `<Stagger.Item>` children into view. */
export function StaggerGroup({
  children,
  className,
  gap = 0.08,
  delay = 0,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: '0px 0px -60px 0px' }}
      variants={stagger(gap, delay)}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
} & Omit<HTMLMotionProps<'div'>, 'variants' | 'children'>) {
  return (
    <m.div className={className} variants={variants} {...rest}>
      {children}
    </m.div>
  );
}

/** Lifts and brightens on hover — used on every card. */
export const hoverLift = {
  whileHover: { y: -6, transition: { duration: 0.25, ease: EASE } },
  whileTap: { y: -2 },
};
