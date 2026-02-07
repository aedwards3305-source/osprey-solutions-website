"use client"

import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeftRight } from "lucide-react"

const examples = [
  {
    name: "Summit Fitness Studio",
    beforeLabel: "Outdated template site",
    afterLabel: "Custom booking platform",
    before: {
      bg: "#e8e8e8",
      header: "#999",
      accent: "#666",
      blocks: ["#ccc", "#bbb", "#ddd"],
    },
    after: {
      bg: "#0B0F10",
      header: "#14A868",
      accent: "#0E7A4E",
      blocks: ["#111819", "#0B5D3B", "#1A2425"],
    },
  },
  {
    name: "Verdant Market",
    beforeLabel: "Basic storefront",
    afterLabel: "High-converting e-commerce",
    before: {
      bg: "#f0f0f0",
      header: "#aaa",
      accent: "#888",
      blocks: ["#d4d4d4", "#c0c0c0", "#d8d8d8"],
    },
    after: {
      bg: "#0B0F10",
      header: "#D4AF37",
      accent: "#E4C65B",
      blocks: ["#111819", "#1A2425", "#0E1315"],
    },
  },
]

function MockSite({ colors, label }: { colors: typeof examples[0]["before"]; label: string }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-white/10 overflow-hidden" style={{ background: colors.bg }}>
      {/* Mock header */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: colors.header }}>
        <div className="h-2 w-2 rounded-full bg-white/40" />
        <div className="h-2 w-2 rounded-full bg-white/30" />
        <div className="h-2 w-2 rounded-full bg-white/20" />
        <div className="ml-2 h-2 w-16 rounded bg-white/20" />
      </div>
      {/* Mock hero */}
      <div className="flex-1 p-3 space-y-2">
        <div className="h-3 w-3/4 rounded" style={{ background: colors.accent }} />
        <div className="h-2 w-1/2 rounded opacity-60" style={{ background: colors.accent }} />
        <div className="mt-3 grid grid-cols-3 gap-2">
          {colors.blocks.map((c, i) => (
            <div key={i} className="aspect-square rounded" style={{ background: c }} />
          ))}
        </div>
        <div className="mt-2 h-2 w-2/3 rounded opacity-40" style={{ background: colors.accent }} />
        <div className="h-2 w-1/2 rounded opacity-30" style={{ background: colors.accent }} />
      </div>
      {/* Label */}
      <div className="px-3 py-2 text-center text-xs font-medium" style={{ color: colors.accent === "#666" || colors.accent === "#888" ? "#333" : "#fff" }}>
        {label}
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
          {examples.map((ex, i) => (
            <button
              key={ex.name}
              onClick={() => { setActiveExample(i); setSliderPos(50) }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeExample === i
                  ? "bg-brand-emerald/15 text-brand-emerald-glow border border-brand-emerald/30"
                  : "text-brand-muted hover:text-brand-text border border-brand-border/50"
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="mx-auto mt-8 max-w-2xl">
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
            <div className="absolute inset-0 p-2">
              <MockSite colors={ex.after} label={ex.afterLabel} />
            </div>

            {/* Before (clipped) */}
            <div
              className="absolute inset-0 p-2"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <MockSite colors={ex.before} label={ex.beforeLabel} />
            </div>

            {/* Divider line + handle */}
            <div
              className="absolute top-0 bottom-0 z-10 w-0.5 bg-brand-gold"
              style={{ left: `${sliderPos}%` }}
            >
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 cursor-grab items-center justify-center rounded-full border-2 border-brand-gold bg-brand-dark shadow-lg active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <ArrowLeftRight className="h-4 w-4 text-brand-gold" />
              </div>
            </div>

            {/* Labels */}
            <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              Before
            </div>
            <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-brand-emerald/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              After
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
