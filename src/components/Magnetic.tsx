import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { cn } from '../lib/utils'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

/** Gently pulls its child toward the pointer, springing back on leave. */
export function Magnetic({ children, className, strength = 0.32 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 160, damping: 14, mass: 0.35 })
  const y = useSpring(rawY, { stiffness: 160, damping: 14, mass: 0.35 })

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn('inline-block', className)}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        rawX.set((e.clientX - (rect.left + rect.width / 2)) * strength)
        rawY.set((e.clientY - (rect.top + rect.height / 2)) * strength)
      }}
      onMouseLeave={() => {
        rawX.set(0)
        rawY.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
