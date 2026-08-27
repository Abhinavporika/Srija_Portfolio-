import { useEffect } from 'react'

/** Locks body scroll while `locked` is true (menus, lightbox…). */
export function useBodyLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}
