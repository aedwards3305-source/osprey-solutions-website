"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useIsPointerFine, usePrefersReducedMotion } from "./useReducedMotion"

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  className?: string
  /** How far the element eases toward the cursor (px at edge). */
  strength?: number
  target?: string
  rel?: string
  onClick?: () => void
}

/**
 * A link/button that eases toward the cursor while hovered, then springs back
 * on leave. Magnetism is disabled on touch devices and under reduced-motion,
 * where it renders as a normal element.
 */
export default function MagneticButton({
  children,
  href,
  className,
  strength = 18,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const pointerFine = useIsPointerFine()
  const reduced = usePrefersReducedMotion()
  const active = pointerFine && !reduced

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })

  function handleMove(e: MouseEvent) {
    if (!active || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set((relX / rect.width) * strength * 2)
    y.set((relY / rect.height) * strength * 2)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const MotionComp = href ? motion.a : motion.button

  return (
    <MotionComp
      ref={ref as never}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={active ? { x: sx, y: sy } : undefined}
      className={className}
    >
      {children}
    </MotionComp>
  )
}
