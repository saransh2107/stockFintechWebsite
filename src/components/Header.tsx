'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, m, useScroll, useMotionValueEvent } from 'framer-motion';
import { nav } from '@/lib/site';
import { Icon } from './Icons';
import Logo from './Logo';
import { ThemeToggle } from './theme';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12));

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <>
      <m.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? 'border-b border-line bg-ink/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-bull'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <Icon.chevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </Link>

                {item.children && (
                  <div className="invisible absolute left-0 top-full w-60 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <m.div className="overflow-hidden rounded-2xl border border-line bg-card/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-fg"
                        >
                          {child.label}
                          <Icon.arrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover/item:opacity-100" />
                        </Link>
                      ))}
                    </m.div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact/" className="btn-primary hidden text-xs sm:inline-flex">
              Book a free demo
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-fg lg:hidden"
            >
              {open ? <Icon.close /> : <Icon.menu />}
            </button>
          </div>
        </div>
      </m.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            <m.div
              className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <m.nav
              aria-label="Mobile"
              className="fixed inset-x-0 top-[72px] z-40 max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-line bg-surface px-5 pb-8 pt-4 lg:hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <m.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                className="flex flex-col gap-1"
              >
                {nav.map((item) => (
                  <m.li
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenGroup((g) => (g === item.label ? null : item.label))
                          }
                          aria-expanded={openGroup === item.label}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium text-fg"
                        >
                          {item.label}
                          <Icon.chevronDown
                            className={`h-4 w-4 text-muted transition-transform duration-300 ${
                              openGroup === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {openGroup === item.label && (
                            <m.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 flex flex-col gap-0.5 border-l border-line pl-3 pb-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="rounded-lg px-3 py-2.5 text-sm text-muted hover:text-fg"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block rounded-xl px-3 py-3 text-base font-medium ${
                          isActive(item.href) ? 'text-bull' : 'text-fg'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </m.li>
                ))}
              </m.ul>

              <Link href="/contact/" className="btn-primary mt-5 w-full">
                Book a free demo
              </Link>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
