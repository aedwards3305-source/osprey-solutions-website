"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/**
 * Thin emerald→gold progress bar pinned to the very top of the viewport,
 * tracking page scroll. Spring-smoothed so it glides rather than jumps.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-emerald-glow via-brand-emerald-light to-brand-gold"
    />
  )
}
