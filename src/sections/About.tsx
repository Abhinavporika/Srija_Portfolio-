import { FadeIn, WordReveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { SocialLinks } from '../components/SocialLinks'
import { siteConfig } from '../config/site'
import { resolveImage } from '../lib/drive'

const DISCIPLINES = [
  'Videography',
  'Editing & Story',
  'Colour Grading',
  'Sound Design',
]

export function About() {
  const portrait = resolveImage(siteConfig.profileImageUrl, 1200)

  return (
    <section id="about" aria-label="About Srija" className="shell scroll-mt-24 py-28 md:py-40">
      <SectionLabel index="03" title="About" />

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-14 lg:gap-x-10">
        {/* Portrait */}
        <FadeIn className="col-span-12 sm:col-span-8 lg:col-span-4">
          <figure className="lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg)]">
              {portrait ? (
                <img
                  src={portrait}
                  alt="Portrait of Srija"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale-[18%] transition-[filter,transform] duration-[1200ms] ease-out hover:scale-[1.02] hover:grayscale-0"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
                  <div className="flex flex-col items-center gap-5">
                    <span className="font-serif text-8xl italic leading-none text-[var(--color-bone)/20]">S</span>
                    <span className="label-xs text-[var(--color-muted)/60]">Portrait placeholder</span>
                  </div>
                </div>
              )}
            </div>
            <figcaption className="label-xs mt-4 flex items-center justify-between text-[var(--color-muted)]">
              <span>{siteConfig.name}</span>
              <span>{siteConfig.role}</span>
            </figcaption>
          </figure>
        </FadeIn>

        {/* Words */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-7">
          <WordReveal
            as="blockquote"
            text="“Every frame has a purpose.”"
            stagger={0.06}
            className="serif-it text-3xl leading-snug text-[var(--color-bone)] md:text-5xl md:leading-tight"
          />

          <FadeIn className="mt-10 max-w-xl space-y-6 text-base leading-relaxed text-[var(--color-muted)] md:text-lg" delay={0.1}>
            <p>
              I’m Srija — a video creator and editor obsessed with the space where technique
              meets feeling. Cameras, timelines and colour wheels are just tools; the real work
              is deciding what a moment means, and protecting that meaning all the way through
              the cut.
            </p>
            <p>
              No filler frames. No wasted seconds. Just honest pacing, careful sound and colour
              that earns its place — whether the film is sixty seconds or sixty minutes.
            </p>
          </FadeIn>

          <FadeIn className="mt-14" delay={0.15}>
            <ul aria-label="Disciplines" className="border-t border-[var(--color-line)]">
              {DISCIPLINES.map((discipline, i) => (
                <li
                  key={discipline}
                  className="group flex items-center justify-between border-b border-[var(--color-line)] py-5 transition-colors duration-300"
                >
                  <span className="text-sm uppercase tracking-[0.22em] text-[var(--color-bone)/90]">{discipline}</span>
                  <span className="text-xs tabular-nums text-[var(--color-muted)] transition-colors duration-300 group-hover:text-accent">
                    0{i + 1}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="mt-12" delay={0.2}>
            <p className="label-xs mb-4 text-[var(--color-muted)]">Elsewhere</p>
            <SocialLinks />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
