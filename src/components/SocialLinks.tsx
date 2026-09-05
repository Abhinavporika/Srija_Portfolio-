import { siteConfig } from '../config/site'
import { isConfigured } from '../lib/drive'
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from './BrandIcons'
import type { SVGProps } from 'react'
import type { ComponentType } from 'react'

interface Entry {
  label: string
  url: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

/** Renders only the social links that have been configured. */
export function SocialLinks({ className }: { className?: string }) {
  const entries: Entry[] = [
    { label: 'Instagram', url: siteConfig.social.instagram, Icon: InstagramIcon },
    { label: 'YouTube', url: siteConfig.social.youtube, Icon: YoutubeIcon },
    { label: 'LinkedIn', url: siteConfig.social.linkedin, Icon: LinkedinIcon },
  ]

  return (
    <ul className={`flex items-center gap-3 ${className ?? ''}`}>
      {entries
        .filter((e) => isConfigured(e.url))
        .map(({ label, url, Icon }) => (
          <li key={label}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Momento on ${label}`}
              data-cursor="open"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] transition-colors duration-300 hover:border-[var(--color-bone)] hover:text-[var(--color-bone)]"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>
        ))}
    </ul>
  )
}
