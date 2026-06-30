"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useIsPointerFine, usePrefersReducedMotion } from "./useReducedMotion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max rotation in degrees at the card edges. */
  max?: number
}

/**
 * 3D tilt-on-hover wrapper. The card rotates toward the cursor and lifts
 * slightly, with a moving sheen highlight. No-ops (renders flat) on touch
 * devices and under reduced-motion.
 */
export default function TiltCard({ children, className, max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pointerFine = useIsPointerFine()
  const reduced = usePrefersReducedMotion()
  const active = pointerFine && !reduced

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  })

  function handleMove(e: MouseEvent) {
    if (!active || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  if (!active) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ z: 20, scale: 1.015 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
