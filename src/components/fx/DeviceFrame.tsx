"use client"

import type { ReactNode } from "react"

interface BrowserFrameProps {
  children: ReactNode
  className?: string
}

/**
 * Clean framed container for a screenshot or live preview. Used to present
 * portfolio work in a rounded, shadowed frame.
 */
export function BrowserFrame({ children, className }: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#15151b] shadow-2xl shadow-black/40 ${
        className ?? ""
      }`}
    >
      <div className="relative">{children}</div>
    </div>
  )
}

interface PhoneFrameProps {
  children: ReactNode
  className?: string
}

/**
 * Slim phone bezel for mobile-first work. Includes a notch and rounded
 * corners; children fill the screen area.
 */
export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[260px] rounded-[2rem] border border-white/12 bg-[#15151b] p-2 shadow-2xl shadow-black/50 ${
        className ?? ""
      }`}
    >
      <div className="absolute left-1/2 top-2 z-10 h-4 w-24 -translate-x-1/2 rounded-b-xl bg-[#15151b]" />
      <div className="overflow-hidden rounded-[1.5rem]">{children}</div>
    </div>
  )
}
