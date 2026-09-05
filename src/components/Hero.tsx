import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/site'
import { resolveImage, resolveVideo } from '../lib/drive'
import { Magnetic } from './Magnetic'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const LETTERS = ['S', 'R', 'I', 'J', 'A']

interface HeroProps {
  /** Gates the entrance sequence until the preloader has finished */
  active: boolean
}

export function Hero({ active }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  // Attach the hero video after first paint so the poster (and page) load instantly.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const videoUrl = resolveVideo(siteConfig.hero.videoUrl)
  const posterUrl = resolveImage(siteConfig.hero.posterUrl, 1920)
  const reveal = active && !reduce

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction — Momento, video creator and editor"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* ── Media layer ─────────────────────────────────────────── */}
      <motion.div aria-hidden="true" style={{ y: mediaY, scale: mediaScale }} className="absolute inset-0">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.62]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1916_0%,#0a0a0a_65%)]" />
        )}

        {!reduce && !posterUrl && (
          <span className="pointer-events-none absolute inset-0 grid place-items-center font-serif text-[42vw] italic leading-none text-[var(--color-bone)]/[0.035] select-none">
            S
          </span>
        )}

        {videoUrl && mounted && (
          <video
            className="absolute inset-0 h-full w-full object-cover brightness-[0.62]"
            src={videoUrl}
            poster={posterUrl ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            aria-hidden="true"
          />
        )}
      </motion.div>

      {/* Legibility gradients */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/70 via-transparent to-[var(--color-bg)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/30 to-transparent" />

      {/* ── Content ─────────────────────────────────────────────── */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="shell relative z-10 pb-24 pt-36 md:pb-28">
        <div className="flex items-center gap-4 overflow-hidden">
          <motion.span
            aria-hidden="true"
            className="h-px w-10 bg-brass"
            initial={reduce ? false : { scaleX: 0 }}
            animate={reveal ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            style={{ originX: 0 }}
          />
          <motion.p
            className="label-xs text-[var(--color-bone)/80]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reveal ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          >
            Video Creator &amp; Editor
          </motion.p>
        </div>

        <h1 className="mt-5 flex overflow-hidden text-[clamp(4.8rem,17.5vw,16rem)] leading-[0.88] font-semibold tracking-[-0.02em] text-[var(--color-bone)]">
          {LETTERS.map((letter, i) => (
            <span key={i} className="overflow-hidden" aria-hidden="true">
              <motion.span
                className="inline-block will-change-transform"
                initial={reduce ? false : { y: '112%' }}
                animate={reveal ? { y: 0 } : {}}
                transition={{ duration: 1.15, delay: 0.15 + i * 0.065, ease: EASE }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
          <span className="sr-only">Momento</span>
        </h1>

        <div className="mt-7 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="serif-it max-w-md text-xl text-[var(--color-bone)/85] sm:text-2xl"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reveal ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reveal ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
          >
            <Magnetic>
              <a href="#work" className="btn-solid" data-cursor="open">
                View My Work
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost" data-cursor="open">
                Let’s Create
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll cue ──────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={reduce ? false : { opacity: 0 }}
        animate={reveal ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="label-xs text-[var(--color-muted)]">Scroll</span>
        <span className="scroll-cue-line block h-12 w-px bg-gradient-to-b from-bone/60 to-transparent" />
      </motion.div>
    </section>
  )
}
