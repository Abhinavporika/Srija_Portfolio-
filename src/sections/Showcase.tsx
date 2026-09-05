import { ArrowUpRight } from 'lucide-react'
import { FadeIn, WordReveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { siteConfig } from '../config/site'
import { Magnetic } from '../components/Magnetic'

export function Showcase() {
  return (
    <section id="work" aria-label="FEATURED work" className="shell scroll-mt-24 py-28 md:py-40">
      <SectionLabel index="02" title="FEATURED Work" />

      <div className="mt-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <h2 aria-label="FEATURED work" className="leading-none">
          <WordReveal
            as="span"
            text="FEATURED "
            className="inline-block font-semibold uppercase tracking-tight text-[var(--color-bone)] text-[clamp(2.8rem,7vw,6.5rem)]"
          />{' '}
          <WordReveal
            as="span"
            text="work"
            delay={0.18}
            className="serif-it inline-block text-[clamp(2.6rem,6.6vw,6rem)] text-brass"
          />
        </h2>
        <FadeIn delay={0.2}>
          <Magnetic>
            <a
              href={siteConfig.portfolioUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-solid"
              data-cursor="open"
            >
              View Portfolio
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </FadeIn>
      </div>

      <FadeIn delay={0.3}>
        <p className="max-w-xs pb-2 text-base leading-relaxed text-[var(--color-muted)]">
  A glimpse into the moments we've captured, one frame at a time.
</p>
      </FadeIn>

      <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-16 lg:mt-28 lg:gap-y-20">
        {projects.map((project) => (
          <FadeIn
            key={project.id}
            className="col-span-12"
            y={44}
          >
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-32 flex flex-col items-center gap-5 text-center" delay={0.1}>
        <span aria-hidden="true" className="h-px w-16 bg-[var(--color-line)]" />
        <p className="label-xs text-[var(--color-muted)]">End of collection — your story is next</p>
      </FadeIn>
    </section>
  )
}