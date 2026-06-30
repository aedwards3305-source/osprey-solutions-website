"use client"

import type { ReactNode } from "react"

interface MarqueeProps {
  children: ReactNode
  /** Seconds for one full loop. Lower = faster. */
  speed?: number
  reverse?: boolean
  className?: string
  /** Pause the scroll on hover. */
  pauseOnHover?: boolean
}

/**
 * Infinite horizontal scroller. Renders its children twice and translates by
 * -50% so the loop is seamless. Edges fade out via a mask. Respects
 * reduced-motion through the global CSS safety net (animation is neutralized,
 * leaving the first copy statically visible).
 */
export default function Marquee({
  children,
  speed = 30,
  reverse = false,
  className,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={`group relative flex overflow-hidden ${className ?? ""}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className={`flex ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <span className="flex shrink-0 items-center">{children}</span>
        <span aria-hidden className="flex shrink-0 items-center">
          {children}
        </span>
      </div>
    </div>
  )
}
