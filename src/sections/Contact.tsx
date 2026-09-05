import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import type { ComponentType } from 'react'
import { FadeIn, WordReveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { SocialLinks } from '../components/SocialLinks'
import { WhatsappIcon } from '../components/BrandIcons'
import { siteConfig } from '../config/site'
import { telLink, whatsappLink } from '../lib/utils'
import { ContactForm } from './ContactForm'

interface Rail {
  label: string
  value: string
  href: string
  external?: boolean
  Icon: ComponentType<{ className?: string }>
}

export function Contact() {
  const rails: Rail[] = [
    {
      label: 'Call Now',
      value: siteConfig.phone,
      href: telLink(siteConfig.phone),
      Icon: Phone,
    },
    {
      label: 'WhatsApp',
      value: 'Message on WhatsApp',
      href: whatsappLink(siteConfig.whatsapp, 'Hi Momento — I have a project in mind.'),
      external: true,
      Icon: WhatsappIcon,
    },
    {
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      Icon: Mail,
    },
  ]

  return (
    <section id="contact" aria-label="Contact" className="shell scroll-mt-24 py-28 md:py-44">
      <SectionLabel index="04" title="Contact" />

      <h2 className="mt-12 leading-[0.95]">
        <WordReveal
          as="span"
          text="LET’S CREATE"
          className="block text-[clamp(3rem,10.5vw,10rem)] font-semibold uppercase tracking-tight text-[var(--color-bone)]"
        />
        <WordReveal
          as="span"
          text="something."
          delay={0.25}
          className="serif-it block pl-[6vw] text-[clamp(2.8rem,9vw,8.5rem)] text-brass"
        />
      </h2>

      <FadeIn className="mt-8 max-w-xl">
        <p className="text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
          Have an idea, a project, or a story to tell? Let’s talk.
        </p>
      </FadeIn>

      <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-16 lg:gap-x-16">
        {/* Direct contact */}
        <FadeIn className="col-span-12 lg:col-span-5">
          <p className="label-xs text-[var(--color-muted)]">Direct line</p>
          <a
            href={telLink(siteConfig.phone)}
            data-cursor="open"
            className="mt-4 inline-flex items-center gap-4 text-3xl font-medium tracking-tight text-[var(--color-bone)] transition-colors duration-300 hover:text-accent md:text-4xl"
          >
            <Phone className="h-7 w-7 text-accent" aria-hidden="true" />
            {siteConfig.phone}
          </a>

          <ul className="mt-14 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {rails.map((rail) => (
              <li key={rail.label}>
                <a
                  href={rail.href}
                  target={rail.external ? '_blank' : undefined}
                  rel={rail.external ? 'noreferrer noopener' : undefined}
                  data-cursor="open"
                  className="group flex items-center justify-between gap-6 py-6"
                >
                  <span className="flex items-center gap-5">
                    <rail.Icon className="h-5 w-5 shrink-0 text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-bone)]" aria-hidden="true" />
                    <span>
                      <span className="label-xs block text-[var(--color-muted)]">{rail.label}</span>
                      <span className="mt-1.5 block break-all text-base text-[var(--color-bone)/90] transition-colors duration-300 group-hover:text-[var(--color-bone)] md:text-lg">
                        {rail.value}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-[var(--color-muted)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-bone)]"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <SocialLinks />
          </div>
        </FadeIn>

        {/* Enquiry form */}
        <FadeIn className="col-span-12 lg:col-span-7 lg:col-start-7" delay={0.1}>
          <p className="label-xs mb-8 text-[var(--color-muted)]">Or leave a note</p>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  )
}
