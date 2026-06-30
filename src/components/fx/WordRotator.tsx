"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePrefersReducedMotion } from "./useReducedMotion"

interface WordRotatorProps {
  words: string[]
  className?: string
  /** Milliseconds each word is held. */
  interval?: number
}

/**
 * Cycles through `words` in place with a clean crossfade. Only one word is
 * ever visible (mode="wait"), and the slot reserves the width/height of the
 * longest word so the headline never reflows or shows overlapping text. Under
 * reduced-motion it shows the first word statically.
 */
export default function WordRotator({
  words,
  className,
  interval = 2400,
}: WordRotatorProps) {
  const reduced = usePrefersReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduced || words.length < 2) return
    const id = window.setInterval(
      () => setI((prev) => (prev + 1) % words.length),
      interval
    )
    return () => window.clearInterval(id)
  }, [reduced, words.length, interval])

  // Widest word reserves the slot so nothing shifts as words swap.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "")

  if (reduced) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className="relative inline-block whitespace-nowrap align-bottom">
      {/* Invisible sizer */}
      <span className={`invisible ${className ?? ""}`} aria-hidden>
        {longest}
      </span>
      {/* Crossfading active word, left-aligned over the sizer */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`absolute inset-0 text-left ${className ?? ""}`}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
