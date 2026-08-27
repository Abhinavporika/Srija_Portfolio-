import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { Magnetic } from './Magnetic'
import { SocialLinks } from './SocialLinks'
import { LineReveal } from './Reveal'
import { siteConfig } from '../config/site'

export function Footer() {
  const reduce = useReducedMotion()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-line)]">
      <div className="shell py-16 md:py-20">
        <p
          aria-hidden="true"
          className="text-outline select-none text-center text-[clamp(4rem,15vw,14rem)] font-semibold uppercase leading-[0.85] tracking-tight"
        >
          Srija
        </p>

        <LineReveal className="mt-12" />

        <div className="mt-10 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="label-xs text-[var(--color-muted)]">{siteConfig.role}</p>
            <p className="mt-4 text-sm text-[var(--color-muted)]">© {year} {siteConfig.name}. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-10">
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-bone)]"
                >
                  Email
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`} className="text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-bone)]">
                  Phone
                </a>
              </li>
            </ul>
            <SocialLinks />
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
                aria-label="Back to top"
                data-cursor="open"
                className="grid h-12 w-12 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] transition-colors duration-300 hover:border-[var(--color-bone)] hover:text-[var(--color-bone)]"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  )
}
