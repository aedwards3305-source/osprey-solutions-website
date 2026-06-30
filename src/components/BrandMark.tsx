"use client"

interface BrandMarkProps {
  className?: string
  /** Animate the stroke drawing in on mount. */
  animate?: boolean
}

/**
 * Osprey monogram — a stylized raptor wing sweeping into a feather, drawn in
 * the brand emerald→gold gradient. Used in the header and footer. When
 * `animate` is set, the strokes draw themselves in (neutralized under the
 * global reduced-motion rule).
 */
export default function BrandMark({ className, animate = false }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label="Osprey Solutions"
    >
      <defs>
        <linearGradient id="osprey-grad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14A868" />
          <stop offset="0.6" stopColor="#0E7A4E" />
          <stop offset="1" stopColor="#D4AF37" />
        </linearGradient>
      </defs>

      {/* Outer wing sweep */}
      <path
        d="M8 34C14 30 18 22 22 12C24 20 26 26 32 30C28 31 24 33 22 38C19 34 14 33 8 34Z"
        stroke="url(#osprey-grad)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={animate ? "[stroke-dasharray:1] [stroke-dashoffset:1] animate-draw [pathLength:1]" : ""}
        pathLength={1}
      />
      {/* Feather quills */}
      <path
        d="M22 12C24 18 25 24 24 34"
        stroke="url(#osprey-grad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
        className={animate ? "[stroke-dasharray:1] [stroke-dashoffset:1] animate-draw [pathLength:1]" : ""}
        pathLength={1}
        style={animate ? { animationDelay: "0.3s" } : undefined}
      />
      {/* Eye / talon accent */}
      <circle cx="33" cy="16" r="2.4" fill="#D4AF37" />
    </svg>
  )
}
