"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion, useIsPointerFine } from "./useReducedMotion"

/**
 * A soft emerald glow that trails the cursor, lighting the page like a
 * follow-spot. Rendered only on fine-pointer devices and never under
 * reduced-motion. Uses a ref + rAF so pointer moves don't trigger React
 * re-renders.
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const pointerFine = useIsPointerFine()

  useEffect(() => {
    if (reduced || !pointerFine) return
    const el = ref.current
    if (!el) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        el.style.opacity = "1"
      })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced, pointerFine])

  if (reduced || !pointerFine) return null

  return (
    <div
      ref={ref}
      aria-hidden
      className="glow-radial pointer-events-none fixed left-0 top-0 -z-10 h-[600px] w-[600px] opacity-0 transition-opacity duration-500"
      style={{ marginLeft: "-300px", marginTop: "-300px" }}
    />
  )
}
