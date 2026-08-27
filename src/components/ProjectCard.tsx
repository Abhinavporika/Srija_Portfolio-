import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Project } from '../data/projects'
import { cn } from '../lib/utils'

interface ProjectCardProps {
  project: Project
}

const CATEGORY_CLASSES: Record<Project['category'], string> = {
  Wedding: 'bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-red-900/20',
  Commercial: 'bg-gradient-to-br from-slate-900/20 via-blue-900/10 to-indigo-900/20',
  Events: 'bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-rose-900/20',
  Reels: 'bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-cyan-900/20',
  Showreel: 'bg-gradient-to-br from-zinc-900/20 via-neutral-900/10 to-stone-900/20',
}

const CATEGORY_BADGE: Record<Project['category'], string> = {
  Wedding: 'text-amber-400',
  Commercial: 'text-blue-400',
  Events: 'text-pink-400',
  Reels: 'text-teal-400',
  Showreel: 'text-zinc-400',
}

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const categoryBg = CATEGORY_CLASSES[project.category]
  const categoryBadgeColor = CATEGORY_BADGE[project.category]

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-5, 5])

  return (
    <motion.article
      ref={ref}
      style={{ y: reduce ? 0 : y }}
      className={cn(
        'group relative col-span-12 grid grid-cols-12 gap-x-6 gap-y-6',
        'rounded-2xl border border-[var(--color-line)] p-8 md:p-12',
        'transition-all duration-500 ease-expo',
        'hover:border-accent hover:shadow-[0_0_40px_-20px_var(--color-accent)]',
        'bg-[var(--color-bg)]',
        categoryBg,
        'card-grain'
      )}
    >
      <div className="col-span-12 lg:col-span-10 lg:col-start-2 flex flex-col justify-center min-h-[280px] md:min-h-[340px]">
        <div className="mb-6 flex items-center justify-between">
          <span className={cn('label-xs tabular-nums font-medium', categoryBadgeColor)}>
            {project.category.toUpperCase()}
          </span>
          <span className="text-outline select-none text-7xl font-semibold leading-none lg:text-8xl text-[var(--color-line)]">
            {project.id}
          </span>
        </div>

        <h3 className="serif-it text-[clamp(2.5rem,5vw,4rem)] font-medium tracking-tight text-[var(--color-bone)] leading-[0.95] max-w-3xl md:max-w-2xl">
          {project.title}
        </h3>

        <p className="mt-6 max-w-2xl text-[clamp(1.125rem,2.5vw,1.5rem)] leading-relaxed text-[var(--color-muted)]">
          {project.tagline}
        </p>
      </div>
    </motion.article>
  )
}