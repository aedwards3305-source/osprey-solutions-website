"use client"

import { useState, useRef, useCallback } from "react"
import { ArrowLeftRight } from "lucide-react"

const examples = [
  {
    name: "Summit Fitness Studio",
    beforeLabel: "Outdated template site",
    afterLabel: "Custom booking platform",
  },
  {
    name: "Verdant Market",
    beforeLabel: "Basic storefront",
    afterLabel: "High-converting e-commerce",
  },
]

/* ── Realistic "Before" mockup ── */
function BeforeSite() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f5f5f5]">
      {/* Ugly nav bar */}
      <div className="flex items-center justify-between bg-white px-4 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-gray-300" />
          <div className="h-2.5 w-20 rounded bg-gray-300" />
        </div>
        <div className="flex gap-3">
          <div className="h-2 w-10 rounded bg-gray-200" />
          <div className="h-2 w-10 rounded bg-gray-200" />
          <div className="h-2 w-10 rounded bg-gray-200" />
        </div>
      </div>
      {/* Bland hero */}
      <div className="flex flex-col items-center bg-gray-200 px-4 py-6">
        <div className="h-3 w-48 rounded bg-gray-400" />
        <div className="mt-2 h-2 w-32 rounded bg-gray-300" />
        <div className="mt-3 h-6 w-20 rounded bg-gray-400" />
      </div>
      {/* Content blocks */}
      <div className="flex-1 space-y-3 p-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-[4/3] rounded bg-gray-200" />
          <div className="aspect-[4/3] rounded bg-gray-200" />
          <div className="aspect-[4/3] rounded bg-gray-200" />
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded bg-gray-200" />
          <div className="h-2 w-4/5 rounded bg-gray-200" />
          <div className="h-2 w-3/5 rounded bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-12 rounded bg-gray-200" />
          <div className="h-12 rounded bg-gray-200" />
        </div>
      </div>
      {/* Ugly footer */}
      <div className="bg-gray-300 px-4 py-2">
        <div className="h-2 w-24 rounded bg-gray-400" />
      </div>
    </div>
  )
}

/* ── Polished "After" mockup (Osprey style) ── */
function AfterSite() {
  return (
    <div className="flex h-full w-full flex-col bg-[#070A0B]">
      {/* Modern nav */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-700" />
          <div className="h-2.5 w-20 rounded bg-white/20" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-8 rounded bg-white/15" />
          <div className="h-2 w-8 rounded bg-white/15" />
          <div className="h-5 w-14 rounded-md bg-gradient-to-r from-emerald-600 to-emerald-500" />
        </div>
      </div>
      {/* Dark hero with gradient */}
      <div className="flex flex-col items-center bg-gradient-to-b from-[#070A0B] to-[#0B1A14] px-4 py-6">
        <div className="h-1.5 w-20 rounded-full bg-emerald-500/20" />
        <div className="mt-2.5 h-3.5 w-52 rounded bg-white/80" />
        <div className="mt-1.5 h-2 w-36 rounded bg-white/30" />
        <div className="mt-3 flex gap-2">
          <div className="h-6 w-20 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500" />
          <div className="h-6 w-16 rounded-lg border border-amber-500/40" />
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 space-y-3 p-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-emerald-500/10 p-2">
            <div className="h-1 w-6 rounded bg-white/20" />
            <div className="mt-1.5 h-3 w-10 rounded bg-emerald-400/70" />
          </div>
          <div className="rounded-lg bg-amber-500/10 p-2">
            <div className="h-1 w-6 rounded bg-white/20" />
            <div className="mt-1.5 h-3 w-8 rounded bg-amber-400/70" />
          </div>
          <div className="rounded-lg bg-blue-500/10 p-2">
            <div className="h-1 w-6 rounded bg-white/20" />
            <div className="mt-1.5 h-3 w-7 rounded bg-blue-400/70" />
          </div>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-white/5 bg-white/5 p-2">
            <div className="aspect-[4/3] rounded bg-gradient-to-br from-emerald-900/40 to-transparent" />
            <div className="mt-1.5 h-1.5 w-3/4 rounded bg-white/20" />
          </div>
          <div className="rounded-lg border border-white/5 bg-white/5 p-2">
            <div className="aspect-[4/3] rounded bg-gradient-to-br from-blue-900/40 to-transparent" />
            <div className="mt-1.5 h-1.5 w-3/4 rounded bg-white/20" />
          </div>
        </div>
        {/* Text lines */}
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-4/5 rounded bg-white/8" />
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-white/5 px-4 py-2">
        <div className="h-1.5 w-20 rounded bg-white/10" />
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const [activeExample, setActiveExample] = useState(0)
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPos(pct)
  }, [])

  const handleMouseDown = () => { dragging.current = true }
  const handleMouseUp = () => { dragging.current = false }
  const handleMouseMove = (e: React.MouseEvent) => { if (dragging.current) updateSlider(e.clientX) }
  const handleTouchMove = (e: React.TouchEvent) => { updateSlider(e.touches[0].clientX) }

  const ex = examples[activeExample]

  return (
    <section className="section-padding relative">
      <div className="section-container relative">
        <div className="text-center">
          <span className="section-label">
            <ArrowLeftRight className="h-4 w-4" /> Before & After
          </span>
          <h2 className="section-title">
            See the{" "}
            <span className="text-gradient-emerald">transformation</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Drag the slider to compare. Real projects, real results.
          </p>
        </div>

        {/* Example selector */}
        <div className="mt-10 flex justify-center gap-3">
          {examples.map((item, i) => (
            <button
              key={item.name}
              onClick={() => { setActiveExample(i); setSliderPos(50) }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeExample === i
                  ? "bg-brand-emerald/15 text-brand-emerald-glow border border-brand-emerald/30"
                  : "text-brand-muted hover:text-brand-text border border-brand-border/50"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="mx-auto mt-8 max-w-2xl">
          {/* Labels above slider */}
          <div className="mb-3 flex justify-between px-1">
            <span className="text-sm font-medium text-brand-subtle">{ex.beforeLabel}</span>
            <span className="text-sm font-medium text-brand-emerald-glow">{ex.afterLabel}</span>
          </div>

          <div
            ref={containerRef}
            className="relative aspect-[16/10] cursor-col-resize overflow-hidden rounded-2xl border border-brand-border/50 select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* After (full width behind) */}
            <div className="absolute inset-0">
              <AfterSite />
            </div>

            {/* Before (clipped from right) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <BeforeSite />
            </div>

            {/* Divider line + handle */}
            <div
              className="absolute top-0 bottom-0 z-10 w-0.5 bg-brand-gold"
              style={{ left: `${sliderPos}%` }}
            >
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 cursor-grab items-center justify-center rounded-full border-2 border-brand-gold bg-brand-dark shadow-lg shadow-black/50 active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <ArrowLeftRight className="h-4 w-4 text-brand-gold" />
              </div>
            </div>

            {/* Corner labels */}
            <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur">
              Before
            </div>
            <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand-emerald/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              After
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
