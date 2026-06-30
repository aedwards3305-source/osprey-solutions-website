"use client"

import type { ReactNode } from "react"

interface BrowserFrameProps {
  url?: string
  children: ReactNode
  className?: string
}

/**
 * macOS-style browser chrome wrapping a screenshot or live preview. Used to
 * present portfolio work as if it's sitting in a real browser.
 */
export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#15151b] shadow-2xl shadow-black/40 ${
        className ?? ""
      }`}
    >
      <div className="flex items-center gap-2 border-b border-white/5 bg-[#1a1a1f] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        {url && (
          <div className="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/40">
            {url}
          </div>
        )}
      </div>
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
