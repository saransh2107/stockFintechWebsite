import Link from 'next/link';
import BrandMark from './BrandMark';

/**
 * Lockup: the disc mark plus the wordmark.
 *
 * "Stock" keeps the brand violet from the original artwork; "Fintech" uses the
 * theme foreground so the lockup reads correctly on both light and dark.
 */
export default function Logo({
  className = '',
  compact = false,
  interactive = true,
}: {
  className?: string;
  compact?: boolean;
  interactive?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label="Stock Fintech — home"
    >
      <BrandMark className="h-9 w-9 shrink-0" interactive={interactive} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.02rem] font-bold tracking-tight">
            <span className="text-brand">Stock</span>{' '}
            <span className="text-fg">Fintech</span>
          </span>
          <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-muted">
            Learn · Grow · Shine
          </span>
        </span>
      )}
    </Link>
  );
}
