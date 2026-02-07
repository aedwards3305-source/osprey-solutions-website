"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Shield, Clock, Headphones, GripVertical } from "lucide-react"

const trustItems = [
  { icon: Zap, text: "Launch in under 72 hours" },
  { icon: Shield, text: "You own everything" },
  { icon: Clock, text: "98% on-time delivery" },
  { icon: Headphones, text: "Direct communication" },
]

function BeforeSite() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f5f5f0] text-[8px] leading-tight">
      {/* Ugly nav */}
      <div className="flex items-center justify-between bg-[#1a3a5c] px-3 py-1.5">
        <span className="text-[7px] font-bold text-white tracking-wide">JOE&apos;S PLUMBING</span>
        <div className="flex gap-2">
          {["Home", "About", "Services", "Gallery", "Testimonials", "Blog", "FAQ", "Contact"].map((n) => (
            <span key={n} className="text-[4.5px] text-blue-200/60">{n}</span>
          ))}
        </div>
      </div>
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-[#1a3a5c] to-[#2a5a8c] px-4 py-3 text-center">
        <p className="text-[11px] font-bold text-white" style={{ fontFamily: "serif" }}>Welcome To Joe&apos;s Plumbing Services LLC</p>
        <p className="mt-0.5 text-[5px] text-blue-200/50">Serving the greater metro area since 1987 &bull; Licensed &amp; Insured &bull; Call us today!</p>
        <div className="mx-auto mt-1.5 flex justify-center gap-1.5">
          <span className="rounded bg-yellow-500 px-2 py-0.5 text-[5px] font-bold text-black shadow">CALL NOW!!!</span>
          <span className="rounded bg-red-600 px-2 py-0.5 text-[5px] font-bold text-white shadow">FREE QUOTE</span>
        </div>
      </div>
      {/* Content area */}
      <div className="flex-1 px-3 py-2 space-y-1.5">
        {/* Service boxes */}
        <div className="grid grid-cols-3 gap-1">
          {["Drain Cleaning", "Water Heaters", "Emergency 24/7"].map((s) => (
            <div key={s} className="rounded border border-gray-300 bg-white p-1.5 text-center shadow-sm">
              <div className="mx-auto mb-0.5 h-4 w-4 rounded-full bg-[#1a3a5c]/20" />
              <p className="text-[5.5px] font-bold text-[#1a3a5c]">{s}</p>
              <p className="text-[4px] text-gray-400 mt-0.5">Click here to learn more about our {s.toLowerCase()} services</p>
            </div>
          ))}
        </div>
        {/* Testimonial */}
        <div className="rounded border-l-2 border-yellow-500 bg-white p-1.5 shadow-sm">
          <p className="text-[5px] text-gray-500 italic">&quot;Joe fixed our sink. Good job.&quot;</p>
          <p className="text-[4px] text-gray-400 mt-0.5">- Happy Customer, Google Review</p>
        </div>
        {/* Footer-ish */}
        <div className="text-center text-[4px] text-gray-400">
          <p>Copyright 2019 Joe&apos;s Plumbing LLC | All Rights Reserved | Site by Joe&apos;s nephew</p>
        </div>
      </div>
    </div>
  )
}

function AfterSite() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A0A] text-[8px] leading-tight">
      {/* Modern nav */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5">
        <div className="flex items-center gap-1">
          <div className="h-3.5 w-3.5 rounded bg-gradient-to-br from-emerald-500 to-emerald-700 text-[5px] font-bold text-white flex items-center justify-center">J</div>
          <span className="text-[7px] font-bold text-white">Joe&apos;s <span className="text-emerald-400">Plumbing</span></span>
        </div>
        <div className="flex items-center gap-2">
          {["Services", "Work", "Reviews"].map((n) => (
            <span key={n} className="text-[5px] text-white/40">{n}</span>
          ))}
          <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[5px] font-semibold text-white">Get a Quote</span>
        </div>
      </div>
      {/* Hero */}
      <div className="px-3 py-2.5">
        <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[4.5px] text-emerald-400">Now booking same-day service</span>
        <p className="mt-1.5 text-[11px] font-bold text-white leading-tight">Plumbing done right.</p>
        <p className="text-[11px] font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent leading-tight">On time, every time.</p>
        <p className="mt-1 text-[5px] text-white/40">Licensed pros. Transparent pricing. 4.9-star rated.</p>
      </div>
      {/* Stats */}
      <div className="mx-3 grid grid-cols-3 gap-1">
        {[{ n: "2,400+", l: "Jobs Done" }, { n: "4.9★", l: "Rating" }, { n: "Same Day", l: "Service" }].map((s) => (
          <div key={s.l} className="rounded-lg border border-white/5 bg-white/[0.03] p-1.5 text-center">
            <p className="text-[7px] font-bold text-white">{s.n}</p>
            <p className="text-[4px] text-white/35">{s.l}</p>
          </div>
        ))}
      </div>
      {/* Growth chart */}
      <div className="mx-3 mt-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[5px] font-semibold text-white/50">Monthly Bookings</span>
          <span className="text-[5px] font-bold text-emerald-400">+340%</span>
        </div>
        <div className="flex items-end gap-[3px] h-10">
          {[15, 18, 22, 30, 35, 45, 42, 55, 60, 72, 68, 85].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-emerald-600/50 to-emerald-400/70" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-0.5">
          <span className="text-[3.5px] text-white/20">Jan</span>
          <span className="text-[3.5px] text-white/20">Dec</span>
        </div>
      </div>
      {/* Service cards */}
      <div className="mx-3 mt-1.5 grid grid-cols-3 gap-1">
        {[
          { t: "Emergency", c: "from-red-900/40 to-red-950/20" },
          { t: "Remodel", c: "from-blue-900/40 to-blue-950/20" },
          { t: "Maintenance", c: "from-emerald-900/40 to-emerald-950/20" },
        ].map((svc) => (
          <div key={svc.t} className={`rounded-lg bg-gradient-to-br ${svc.c} border border-white/5 p-1.5`}>
            <p className="text-[5.5px] font-semibold text-white">{svc.t}</p>
            <div className="mt-0.5 rounded bg-white/10 py-0.5 text-center text-[4px] text-white/50">Book</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroBeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPos, setSliderPos] = useState(35)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPos(pct)
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      e.preventDefault()
      updatePosition(e.clientX)
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return
      updatePosition(e.touches[0].clientX)
    }
    const handleUp = () => { isDragging.current = false }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleUp)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleUp)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleUp)
    }
  }, [updatePosition])

  const handleStart = useCallback((clientX: number) => {
    isDragging.current = true
    updatePosition(clientX)
  }, [updatePosition])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative mx-auto mt-16 mb-8 max-w-3xl"
    >
      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-brand-emerald/5 blur-2xl" />

      {/* Browser chrome wrapper */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-border/50 shadow-2xl shadow-brand-emerald/5">
        {/* Browser title bar */}
        <div className="flex items-center gap-2 border-b border-brand-border/30 bg-[#1a1a1f] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <div className="ml-3 flex-1 rounded-md bg-white/5 px-3 py-1">
            <span className="text-xs text-white/25">joesplumbing.com</span>
          </div>
        </div>

        {/* Slider area */}
        <div
          ref={containerRef}
          className="relative aspect-[16/10] cursor-col-resize select-none overflow-hidden"
          onMouseDown={(e) => handleStart(e.clientX)}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        >
          {/* After layer (full width, behind) */}
          <div className="absolute inset-0">
            <AfterSite />
          </div>

          {/* Before layer (clipped from left) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <BeforeSite />
          </div>

          {/* Slider line + handle */}
          <div
            className="absolute top-0 bottom-0 z-10"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />

            {/* Drag handle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-brand-dark/90 shadow-lg shadow-black/40 backdrop-blur-sm">
                <GripVertical className="h-4 w-4 text-white/80" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="pointer-events-none absolute top-3 left-3 z-10">
            <span className="rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-lg">Before</span>
          </div>
          <div className="pointer-events-none absolute top-3 right-3 z-10">
            <span className="rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-lg">After</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pb-12">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-emerald/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-brand-gold/3 blur-[100px]" />
      </div>

      <div className="section-container relative flex min-h-screen flex-col items-center justify-center pt-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="gold-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-glow-pulse" />
            Now accepting new projects for 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Apps, websites, and digital systems that{" "}
          <span className="text-gradient-emerald">win customers</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-brand-muted sm:text-xl"
        >
          We build custom digital solutions for small businesses and growing teams.
          Faster than doing it yourself. Better than big agencies. And you own every pixel.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a href="/#contact" className="btn-primary text-base px-8 py-4">
            Request a Quote <ArrowRight className="h-5 w-5" />
          </a>
          <a href="/book" className="btn-secondary text-base px-8 py-4">
            Book a Call
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8"
        >
          {trustItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2.5 text-sm text-brand-muted"
            >
              <item.icon className="h-4 w-4 shrink-0 text-brand-emerald-glow" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Before/After mockup */}
        <HeroBeforeAfter />
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-black to-transparent" />
    </section>
  )
}
