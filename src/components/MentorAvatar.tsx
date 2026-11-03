import type { Mentor } from '@/lib/site';

type Props = {
  mentor: Mentor;
  /** Tailwind size classes for the tile, e.g. 'h-20 w-20'. */
  size: string;
  /** Tailwind text size for the initials fallback. */
  text?: string;
  className?: string;
};

/**
 * A mentor's headshot, falling back to an initials tile when no photo is set.
 *
 * Plain <img> rather than next/image: the site is a static export with
 * `images.unoptimized`, so next/image would add a client component and a
 * wrapper for no benefit. Dimensions are set so the tile does not shift
 * layout while the file loads.
 */
export function MentorAvatar({ mentor, size, text = 'text-2xl', className = '' }: Props) {
  const base = `${size} shrink-0 overflow-hidden rounded-3xl ${className}`;

  if (mentor.photo) {
    return (
      <img
        src={mentor.photo}
        alt={`${mentor.name}, ${mentor.role} at Stock Fintech`}
        width={400}
        height={400}
        loading="lazy"
        decoding="async"
        className={`${base} border border-line object-cover`}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={`${base} grid place-items-center bg-gradient-to-br from-bull to-cyan font-display ${text} font-extrabold text-ink`}
    >
      {mentor.initials}
    </span>
  );
}
