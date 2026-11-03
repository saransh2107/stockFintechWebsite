'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/** Counts up to `value` the first time it scrolls into view. */
export default function Counter({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20, mass: 0.8 });

  const format = (n: number) =>
    prefix +
    n.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix;

  useEffect(() => {
    if (!ref.current) return;
    if (reduce) {
      ref.current.textContent = format(value);
      return;
    }
    if (inView) mv.set(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce]);

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = format(v);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spring]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {format(0)}
    </span>
  );
}
