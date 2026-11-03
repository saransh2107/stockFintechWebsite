'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * The Stock Fintech disc mark.
 *
 * Traced from the original brand PNG (brand-assets/logo-original-wide.png) to
 * vector: five diagonal bars rising left-to-right with a corner arrowhead on
 * the longest one, knocked out of a cyan-to-magenta gradient disc. Geometry
 * was measured off the source art and verified at ~96% pixel agreement.
 *
 * The bars are a real knockout (mask), not filled navy, so whatever is behind
 * the logo shows through — which is what lets one mark work on both themes.
 *
 * `interactive` adds the premium treatment: the disc tilts in 3D toward the
 * pointer, a specular sheen tracks across it, and it lifts off its shadow.
 */

/* --- geometry, viewBox 0 0 120 120, disc centre (60,60) r 56 --- */
const BARS: [number, number, number, number][] = [
  [30.0, 35.8, 36.7, 29.1], // short, upper-left
  [29.5, 62.6, 63.8, 28.4],
  [30.9, 90.7, 91.9, 29.2], // longest — carries the arrowhead
  [57.4, 90.5, 91.6, 56.3],
  [84.7, 91.1, 91.6, 84.1], // short, lower-right
];
const ARROW = 'M81.8 29.2 H91.9 V38.2';
const BAR_W = 12.9;

export default function BrandMark({
  className = '',
  interactive = false,
  title,
}: {
  className?: string;
  interactive?: boolean;
  title?: string;
}) {
  /*
   * Per-instance ids for the gradients and mask, so two marks on one page
   * cannot collide.
   *
   * This MUST come from useId(). A module-level counter looks like it works
   * but desyncs: the server keeps incrementing it across every component it
   * renders, while the browser starts again from zero — so the markup says
   * `bm5-g` on the server and `bm1-g` on the client and hydration fails.
   *
   * useId() emits delimiters (`«r0»` / `:r0:`) that are not safe inside an
   * SVG `url(#...)` reference, so strip everything non-alphanumeric.
   */
  const id = `bm${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 220, damping: 18, mass: 0.4 });

  const rotateY = useTransform(sx, [0, 1], [-16, 16]);
  const rotateX = useTransform(sy, [0, 1], [14, -14]);
  const sheenX = useTransform(sx, [0, 1], ['-40%', '140%']);
  const glowOp = useTransform(sy, [0, 1], [0.55, 0.2]);

  /**
   * The 3D treatment is held back until after mount.
   *
   * useReducedMotion() cannot know the user's setting while rendering on the
   * server, so it reports false there and may report true on the client. The
   * server would then emit the perspective style and the client would not,
   * which fails hydration and makes React throw away and re-render the tree.
   * Deferring means both renders start from the same markup.
   *
   * Nothing visible is lost: perspective and preserve-3d only matter once a
   * transform is applied, and the tilt is driven by the pointer, which cannot
   * have moved before mount.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const live = mounted && interactive && !reduce;

  function onMove(e: React.PointerEvent) {
    if (!live || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const wrapStyle: CSSProperties = live
    ? { perspective: 420, transformStyle: 'preserve-3d' }
    : {};

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={wrapStyle}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <m.div
        className="relative h-full w-full"
        style={
          live
            ? { rotateX, rotateY, transformStyle: 'preserve-3d' }
            : undefined
        }
        whileHover={live ? { scale: 1.06 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <svg
          viewBox="0 0 120 120"
          className="h-full w-full overflow-visible"
          role={title ? 'img' : 'presentation'}
          aria-label={title}
          aria-hidden={title ? undefined : true}
        >
          <defs>
            {/* Brand gradient: magenta at bottom-left -> cyan at top-right */}
            <linearGradient id={`${id}-g`} x1="0.08" y1="0.95" x2="0.95" y2="0.08">
              <stop offset="0%" stopColor="#BC06F5" />
              <stop offset="28%" stopColor="#A13BFB" />
              <stop offset="55%" stopColor="#8A7CFF" />
              <stop offset="78%" stopColor="#4ADDFF" />
              <stop offset="100%" stopColor="#16F1FF" />
            </linearGradient>

            {/* Specular highlight, upper-left — reads as a lit sphere */}
            <radialGradient id={`${id}-spec`} cx="0.32" cy="0.26" r="0.62">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* Contact shade, lower-right — gives the disc volume */}
            <radialGradient id={`${id}-shade`} cx="0.74" cy="0.8" r="0.6">
              <stop offset="0%" stopColor="#1B0340" stopOpacity="0.42" />
              <stop offset="70%" stopColor="#1B0340" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#1B0340" stopOpacity="0" />
            </radialGradient>

            {/* Glossy rim light */}
            <linearGradient id={`${id}-rim`} x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.28" />
            </linearGradient>

            {/* Knockout: white keeps the disc, black punches the bars through */}
            <mask id={`${id}-m`}>
              <circle cx="60" cy="60" r="56" fill="#fff" />
              <g
                stroke="#000"
                strokeWidth={BAR_W}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                {BARS.map(([x1, y1, x2, y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                ))}
                <path d={ARROW} />
              </g>
            </mask>
          </defs>

          {/* Cast shadow — sits behind, and the tilt lifts the disc off it */}
          <ellipse
            cx="62"
            cy="112"
            rx="40"
            ry="7"
            fill="#000"
            opacity="0.28"
            style={{ filter: 'blur(5px)' }}
          />

          <g mask={`url(#${id}-m)`}>
            <circle cx="60" cy="60" r="56" fill={`url(#${id}-g)`} />
            <circle cx="60" cy="60" r="56" fill={`url(#${id}-shade)`} />
            <circle cx="60" cy="60" r="56" fill={`url(#${id}-spec)`} />
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke={`url(#${id}-rim)`}
              strokeWidth="1.6"
            />
          </g>
        </svg>

        {/* Sheen that tracks the pointer across the disc */}
        {live && (
          <m.span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-300 [mask-image:radial-gradient(circle,#000_68%,transparent_70%)] group-hover:opacity-100"
            style={{ opacity: glowOp }}
          >
            <m.span
              className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent blur-[2px]"
              style={{ left: sheenX }}
            />
          </m.span>
        )}
      </m.div>
    </div>
  );
}
