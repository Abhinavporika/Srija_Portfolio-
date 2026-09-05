import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { navLinks, siteConfig } from '../config/site'
import { isConfigured } from '../lib/drive'
import { cn, telLink } from '../lib/utils'
import { useBodyLock } from '../hooks/useBodyLock'
import { Magnetic } from './Magnetic'
import { SocialLinks } from './SocialLinks'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 32)
    setHidden(y > previous && y > 200)
  })

  useBodyLock(open)

  const jumpTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })
    }, 60)
  }

  const isWorkLink = (href: string) => href === '#work'
  const getLinkHref = (href: string) => (isWorkLink(href) ? siteConfig.portfolioUrl : href)
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isWorkLink(href)) return
    jumpTo(e, href)
  }

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled || open ? 'border-b border-line/50 bg-[var(--color-bg)]/70 backdrop-blur-md' : 'border-b border-transparent',
        )}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            onClick={(e) => jumpTo(e, '#top')}
            className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-bone)]"
            aria-label="Momento — back to top"
          >
            Momento
          </a>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={getLinkHref(link.href)}
                onClick={(e) => handleLinkClick(e, link.href)}
                target={isWorkLink(link.href) ? '_blank' : undefined}
                rel={isWorkLink(link.href) ? 'noreferrer noopener' : undefined}
                className="group relative text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-bone)]"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-px w-0 bg-[var(--color-bone)] transition-all duration-400 group-hover:w-full"
                />
              </a>
            ))}
            <Magnetic strength={0.25}>
              <a href="#contact" onClick={(e) => jumpTo(e, '#contact')} className="btn-ghost px-5! py-2.5!" data-cursor="open">
                Let's Create
              </a>
            </Magnetic>
          </nav>

          <button
            type="button"
            className="relative z-[86] grid h-10 w-10 place-items-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              aria-hidden="true"
              className={cn(
                'absolute h-px w-6 text-[var(--color-bone)] transition-all duration-300',
                open ? 'rotate-45' : '-translate-y-[3.5px]',
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                'absolute h-px w-6 text-[var(--color-bone)] transition-all duration-300',
                open ? '-rotate-45' : 'translate-y-[3.5px]',
              )}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[75] flex flex-col bg-[var(--color-bg)] md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="shell flex flex-1 flex-col justify-center gap-2 pt-16">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.a
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    target={isWorkLink(link.href) ? '_blank' : undefined}
                    rel={isWorkLink(link.href) ? 'noreferrer noopener' : undefined}
                    className="flex items-baseline gap-4 py-3 text-5xl font-medium uppercase tracking-tight text-[var(--color-bone)]"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-xs tabular-nums text-[var(--color-muted)]">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                </div>
              ))}

              <motion.div
                className="mt-14 flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a href={telLink(siteConfig.phone)} className="label-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-bone)]">
                  {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="label-xs break-all text-[var(--color-muted)] transition-colors hover:text-[var(--color-bone)]">
                  {isConfigured(siteConfig.email) ? siteConfig.email : ''}
                </a>
                <SocialLinks className="mt-2" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
