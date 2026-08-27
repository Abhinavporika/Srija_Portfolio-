import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

interface WordRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div' | 'blockquote' | 'figure'
  className?: string
  delay?: number
  stagger?: number
  active?: boolean
}

/** Splits text into words and reveals each with a clipped rise. */
export function WordReveal({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  stagger = 0.055,
  active = true,
}: WordRevealProps) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: '115%' }}
            animate={
              reduce
                ? { y: 0 }
                : active
                  ? { y: '0%' }
                  : { y: '115%' }
            }
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Simple scroll-triggered fade/rise for blocks. */
export function FadeIn({ children, className, delay = 0, y = 28 }: FadeInProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Hairline that draws itself in when scrolled into view. */
export function LineReveal({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn('h-px bg-bone/15 origin-left', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.2, ease: EASE }}
    />
  )
}
