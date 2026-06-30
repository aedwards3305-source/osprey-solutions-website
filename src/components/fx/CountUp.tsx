"use client"

import { useEffect, useRef, useState } from "react"
import { usePrefersReducedMotion } from "./useReducedMotion"

interface CountUpProps {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  /** Animation length in ms. */
  duration?: number
  className?: string
}

/**
 * Counts from zero up to `to` when scrolled into view (once). Honors
 * reduced-motion by rendering the final value immediately.
 */
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1800,
  className,
}: CountUpProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (reduced) {
      setValue(to)
      return
    }
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(eased * to)
          if (p < 1) requestAnimationFrame(tick)
          else setValue(to)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
