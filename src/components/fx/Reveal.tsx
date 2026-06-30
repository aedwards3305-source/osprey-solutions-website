"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ReactElement,
} from "react"
import { motion } from "framer-motion"
import { usePrefersReducedMotion } from "./useReducedMotion"

interface RevealProps {
  children: ReactNode
  /** Seconds to wait before animating in. Stagger injects this automatically. */
  delay?: number
  /** Pixels to travel upward into place. */
  y?: number
  className?: string
  /** Render as a different element wrapper (default div). */
  as?: "div" | "li" | "span" | "section"
}

/**
 * Fade/rise-into-view wrapper. Bulletproof against blank sections: it tracks
 * visibility with an IntersectionObserver AND a fallback timer, so content
 * always becomes visible even if the observer never fires (e.g. headless
 * capture, odd layouts). Under reduced-motion it renders fully visible with
 * no transform.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (reduced) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    )
    observer.observe(el)

    // Safety net: never leave content invisible.
    const timer = window.setTimeout(() => setShown(true), 1400)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [reduced])

  const MotionTag = motion[as]

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.5, 0.31, 1] }}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerProps {
  children: ReactNode
  /** Seconds between each child's reveal. */
  gap?: number
  /** Delay before the first child. */
  start?: number
  className?: string
}

/**
 * Wraps a list of <Reveal> children and injects an increasing `delay` so they
 * cascade into view. Non-Reveal children are passed through untouched.
 */
export function Stagger({ children, gap = 0.08, start = 0, className }: StaggerProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child
        return cloneElement(child as ReactElement<RevealProps>, {
          delay: start + i * gap,
        })
      })}
    </div>
  )
}
