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
 * Cycles through `words` in place with a vertical flip. Under reduced-motion
 * it shows the first word statically. The gradient styling is applied by the
 * caller via `className`.
 */
export default function WordRotator({
  words,
  className,
  interval = 2200,
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

  if (reduced) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={className}
          style={{ gridArea: "1 / 1" }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
