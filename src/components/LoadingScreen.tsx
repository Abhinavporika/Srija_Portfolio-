import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'

const LETTERS = ['M', 'O', 'M', 'E', 'N', 'T', 'O']
const DURATION = 1250

interface LoadingScreenProps {
  onDone: () => void
}

/** Brief cinematic preloader — name reveal + progress hairline. */
export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (reduce) {
      onDone()
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      // ease-out for a confident finish
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else if (!doneRef.current) {
        doneRef.current = true
        setTimeout(onDone, 300)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce, onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-bg)]"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Loading Momento — video creator and editor"
    >
      <div className="flex overflow-hidden" aria-hidden="true">
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            className={cn(
              'inline-block text-[13vw] sm:text-7xl font-medium tracking-[0.08em] text-[var(--color-bone)]',
            )}
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 + i * 0.065, ease: [0.16, 1, 0.3, 1] }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="mt-8 h-px w-40 bg-[var(--color-bone)/15] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        aria-hidden="true"
      >
        <div className="h-full bg-brass" style={{ width: `${progress}%` }} />
      </motion.div>

      <span className="absolute bottom-8 right-8 text-xs tabular-nums text-[var(--color-muted)]" aria-hidden="true">
        {String(progress).padStart(3, '0')}
      </span>
    </motion.div>
  )
}
