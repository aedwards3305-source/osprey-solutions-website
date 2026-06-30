"use client"

import { usePrefersReducedMotion } from "./useReducedMotion"

/**
 * Fixed, full-viewport aurora: layered emerald/gold radial blooms drifting
 * over near-black. Purely decorative — sits behind all content and never
 * intercepts pointer events. Falls back to a static gradient under
 * reduced-motion.
 */
export default function AuroraBackground() {
  const reduced = usePrefersReducedMotion()

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-brand-black"
    >
      {/* Deep base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0B1A14_0%,#070A0B_55%)]" />

      {/* Emerald bloom — top left */}
      <div
        className={`absolute -left-[12%] -top-[18%] h-[55vw] w-[55vw] rounded-full bg-brand-emerald/25 blur-[140px] ${
          reduced ? "" : "animate-aurora-1"
        }`}
      />
      {/* Emerald-glow bloom — right */}
      <div
        className={`absolute right-[-10%] top-[18%] h-[48vw] w-[48vw] rounded-full bg-brand-emerald-glow/15 blur-[150px] ${
          reduced ? "" : "animate-aurora-2"
        }`}
      />
      {/* Gold ember — lower center, the precious accent kept scarce */}
      <div
        className={`absolute bottom-[-20%] left-[30%] h-[40vw] w-[40vw] rounded-full bg-brand-gold/8 blur-[160px] ${
          reduced ? "" : "animate-aurora-3"
        }`}
      />

      {/* Vignette to keep edges cinematic and text legible */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_40%,transparent_40%,rgba(7,10,11,0.7)_100%)]" />
    </div>
  )
}
