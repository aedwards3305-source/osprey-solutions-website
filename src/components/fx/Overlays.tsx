"use client"

/**
 * Fine film grain over the whole viewport — adds analog texture and kills
 * gradient banding. Fixed and non-interactive.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04] mix-blend-soft-light"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  )
}

/**
 * Faint dot-grid for blueprint depth. Fades out toward the edges so it reads
 * as atmosphere, not a pattern.
 */
export function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.5]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(231,231,225,0.06) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage:
          "radial-gradient(100% 70% at 50% 30%, #000 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(100% 70% at 50% 30%, #000 0%, transparent 75%)",
      }}
    />
  )
}
