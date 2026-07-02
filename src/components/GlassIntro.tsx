"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePrefersReducedMotion } from "@/components/fx"

const COLS = 7
const ROWS = 5

// A handful of shards carry brand phrases as they fly off.
const SHARD_LABELS: Record<number, string> = {
  9: "You own the code",
  16: "AI-powered",
  22: "72h launch",
  25: "98% on-time",
  31: "win customers",
}

// Deterministic pseudo-random so shard motion is stable across renders.
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

// Play the real glass-shatter sample when the gate breaks. It fires cleanly
// because enter() runs from a user tap (satisfies autoplay policies).
function playGlassBreak() {
  try {
    const audio = new Audio("/sounds/glass-break.mp3")
    audio.volume = 0.7
    void audio.play().catch(() => {})
  } catch {
    /* audio is a nice-to-have; never block entering */
  }
}

interface Shard {
  i: number
  col: number
  row: number
  dx: number
  dy: number
  rot: number
  delay: number
  label?: string
}

export default function GlassIntro() {
  const reduced = usePrefersReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)
  const [breaking, setBreaking] = useState(false)

  // Decide on the client only — avoids hydration mismatch and respects the
  // once-per-session rule.
  useEffect(() => {
    setMounted(true)
    if (reduced) return
    try {
      if (!sessionStorage.getItem("osprey-entered")) setShow(true)
    } catch {
      setShow(true)
    }
  }, [reduced])

  // Lock scroll while the gate is up.
  useEffect(() => {
    if (show) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [show])

  const shards = useMemo<Shard[]>(() => {
    const list: Shard[] = []
    for (let i = 0; i < COLS * ROWS; i++) {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      const cx = (col + 0.5) / COLS - 0.5 // -0.5..0.5
      const cy = (row + 0.5) / ROWS - 0.5
      const spread = 1.6
      list.push({
        i,
        col,
        row,
        dx: cx * 140 * spread + (rand(i) - 0.5) * 40,
        dy: cy * 140 * spread + (rand(i + 99) - 0.5) * 40,
        rot: (rand(i + 7) - 0.5) * 160,
        delay: (Math.abs(cx) + Math.abs(cy)) * 0.12,
        label: SHARD_LABELS[i],
      })
    }
    return list
  }, [])

  function enter() {
    if (breaking) return
    playGlassBreak()
    setBreaking(true)
    try {
      sessionStorage.setItem("osprey-entered", "1")
    } catch {
      /* ignore */
    }
    // Remove from the tree once shards have flown.
    window.setTimeout(() => setShow(false), 1500)
  }

  if (!mounted || reduced) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden"
          onClick={enter}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-label="Tap to enter"
          role="button"
        >
          {/* Shard grid — together they read as one frosted pane until they fly apart */}
          {shards.map((s) => (
            <motion.div
              key={s.i}
              className="absolute flex items-center justify-center border border-white/[0.06] bg-white/[0.06] backdrop-blur-xl"
              style={{
                left: `${(s.col / COLS) * 100}%`,
                top: `${(s.row / ROWS) * 100}%`,
                width: `${100 / COLS + 0.2}%`,
                height: `${100 / ROWS + 0.2}%`,
                boxShadow: breaking
                  ? "inset 0 0 0 1px rgba(20,168,104,0.35)"
                  : "inset 0 0 0 0.5px rgba(255,255,255,0.04)",
              }}
              animate={
                breaking
                  ? {
                      x: `${s.dx}vw`,
                      y: `${s.dy}vh`,
                      rotate: s.rot,
                      opacity: 0,
                      scale: 0.7,
                    }
                  : { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }
              }
              transition={
                breaking
                  ? { duration: 1.1, delay: s.delay, ease: [0.3, 0.8, 0.4, 1] }
                  : { duration: 0 }
              }
            >
              {s.label && (
                <span className="pointer-events-none hidden whitespace-nowrap rounded-full border border-brand-emerald/30 bg-brand-black/50 px-3 py-1 text-xs font-semibold text-brand-emerald-glow sm:inline-block sm:text-sm">
                  {s.label}
                </span>
              )}
            </motion.div>
          ))}

          {/* Center prompt — fades out the instant it breaks */}
          <AnimatePresence>
            {!breaking && (
              <motion.div
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="font-display text-3xl font-bold tracking-tight text-brand-text sm:text-5xl">
                    Osprey Solutions
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
