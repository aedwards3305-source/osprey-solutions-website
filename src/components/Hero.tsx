"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Clock, GripVertical, Rocket, ShieldCheck, Sparkles } from "lucide-react"
import { MagneticButton, WordRotator, Marquee } from "@/components/fx"

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Supabase",
  "Stripe",
  "Vercel",
  "OpenAI",
  "Node.js",
]

// Floating glass badges that parallax-bob beside the headline on large screens.
const floatChips = [
  { icon: Rocket, text: "72h launch", className: "left-[3%] top-[150px]", anim: "animate-float-slow" },
  { icon: ShieldCheck, text: "You own the code", className: "right-[2%] top-[120px]", anim: "animate-float-slower" },
  { icon: Clock, text: "98% on-time", className: "left-[7%] top-[300px]", anim: "animate-float-slower" },
  { icon: Sparkles, text: "AI-powered", className: "right-[6%] top-[290px]", anim: "animate-float-slow" },
]


function BeforeSite() {
  return (
    <div className="flex h-full w-full flex-col bg-[#f5f5f0] leading-snug overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-[#0d1f33] px-4 py-1">
        <span className="text-[7px] text-blue-200/50">Call us: (555) 123-4567</span>
        <div className="flex gap-2">
          <span className="text-[7px] text-blue-200/50">Mon-Fri 8am-5pm</span>
          <span className="text-[7px] text-blue-200/50">FB</span>
          <span className="text-[7px] text-blue-200/50">YT</span>
        </div>
      </div>
      {/* Nav */}
      <div className="flex items-center justify-between bg-[#1a3a5c] px-4 py-2">
        <span className="text-[12px] font-bold text-white tracking-wide" style={{ fontFamily: "serif" }}>JOE&apos;S PLUMBING</span>
        <div className="flex gap-3">
          {["Home", "About Us", "Services", "Gallery", "Testimonials", "Blog", "FAQ", "Contact Us"].map((n) => (
            <span key={n} className="text-[8px] text-blue-200/70 hover:text-white">{n}</span>
          ))}
        </div>
      </div>
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-[#1a3a5c] to-[#2a5a8c] px-6 py-5 text-center">
        <p className="text-[18px] font-bold text-white" style={{ fontFamily: "serif" }}>Welcome To Joe&apos;s Plumbing Services LLC</p>
        <p className="mt-1 text-[9px] text-blue-200/60">Serving the greater metro area since 1987 &bull; Licensed &amp; Insured &bull; BBB Accredited &bull; Call us today!</p>
        <div className="mx-auto mt-2.5 flex justify-center gap-2">
          <span className="rounded bg-yellow-500 px-3 py-1 text-[9px] font-bold text-black shadow animate-pulse">CALL NOW!!!</span>
          <span className="rounded bg-red-600 px-3 py-1 text-[9px] font-bold text-white shadow">FREE QUOTE</span>
          <span className="rounded bg-green-600 px-3 py-1 text-[9px] font-bold text-white shadow">COUPONS</span>
        </div>
      </div>
      {/* Content area */}
      <div className="flex flex-1 gap-3 px-4 py-3">
        {/* Main content */}
        <div className="flex-1 space-y-3">
          {/* Service boxes */}
          <div className="grid grid-cols-3 gap-2">
            {["Drain Cleaning", "Water Heaters", "Emergency 24/7", "Pipe Repair", "Bathroom Remodel", "Sewer Line"].map((s) => (
              <div key={s} className="rounded border border-gray-300 bg-white p-2 text-center shadow-sm">
                <div className="mx-auto mb-1 h-6 w-6 rounded-full bg-[#1a3a5c]/15 flex items-center justify-center">
                  <span className="text-[8px] text-[#1a3a5c]">🔧</span>
                </div>
                <p className="text-[9px] font-bold text-[#1a3a5c]">{s}</p>
                <p className="text-[6px] text-gray-400 mt-0.5">Click here to learn more</p>
              </div>
            ))}
          </div>
          {/* About blurb */}
          <div className="rounded bg-white p-3 shadow-sm border border-gray-200">
            <p className="text-[11px] font-bold text-[#1a3a5c]" style={{ fontFamily: "serif" }}>Why Choose Joe&apos;s Plumbing?</p>
            <p className="text-[7px] text-gray-500 mt-1 leading-relaxed">With over 35 years of experience serving homeowners and businesses in the greater metro area, Joe&apos;s Plumbing has built a reputation for reliable, honest, and affordable plumbing services. We treat every home like our own!</p>
            <div className="mt-2 flex gap-3">
              <div className="text-center">
                <p className="text-[10px] font-bold text-[#1a3a5c]">35+</p>
                <p className="text-[6px] text-gray-400">Years Exp.</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-[#1a3a5c]">5,000+</p>
                <p className="text-[6px] text-gray-400">Jobs Done</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-[#1a3a5c]">4.2★</p>
                <p className="text-[6px] text-gray-400">Google</p>
              </div>
            </div>
          </div>
          {/* Testimonials */}
          <div className="rounded border-l-2 border-yellow-500 bg-white p-2.5 shadow-sm">
            <p className="text-[8px] text-gray-500 italic">&quot;Joe fixed our sink. He showed up and did a good job. Would recommend.&quot;</p>
            <p className="text-[6px] text-gray-400 mt-1">- Happy Customer, Google Review (2019)</p>
          </div>
          <div className="rounded border-l-2 border-yellow-500 bg-white p-2.5 shadow-sm">
            <p className="text-[8px] text-gray-500 italic">&quot;Called them for an emergency and they came next day. Pretty good price.&quot;</p>
            <p className="text-[6px] text-gray-400 mt-1">- Mike T., Yelp Review</p>
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-[22%] space-y-2.5">
          <div className="rounded bg-[#1a3a5c] p-2.5 text-center">
            <p className="text-[9px] font-bold text-yellow-400">SPECIAL OFFER!</p>
            <p className="text-[7px] text-white mt-0.5">$25 OFF</p>
            <p className="text-[6px] text-blue-200/60">Any service over $100</p>
            <p className="text-[5px] text-blue-200/40 mt-1">Expires 12/31/2019</p>
          </div>
          <div className="rounded border border-gray-300 bg-white p-2.5">
            <p className="text-[8px] font-bold text-[#1a3a5c] text-center">Request a Quote</p>
            <div className="mt-1.5 space-y-1">
              <div className="h-4 rounded border border-gray-300 bg-gray-50" />
              <div className="h-4 rounded border border-gray-300 bg-gray-50" />
              <div className="h-4 rounded border border-gray-300 bg-gray-50" />
              <div className="h-8 rounded border border-gray-300 bg-gray-50" />
              <div className="rounded bg-[#1a3a5c] py-1 text-center text-[7px] font-bold text-white">SUBMIT</div>
            </div>
          </div>
          <div className="rounded border border-gray-300 bg-white p-2 text-center">
            <p className="text-[7px] text-gray-400">Visitors</p>
            <p className="text-[10px] font-bold text-gray-600 font-mono">004,523</p>
          </div>
          <div className="rounded border border-gray-300 bg-white p-2 text-center">
            <p className="text-[7px] text-gray-400">BBB Rating</p>
            <p className="text-[10px] font-bold text-green-700">A+</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-[#0d1f33] px-4 py-2 text-center">
        <p className="text-[6px] text-blue-200/40">Copyright 2019 Joe&apos;s Plumbing LLC | All Rights Reserved | Site by Joe&apos;s nephew</p>
      </div>
    </div>
  )
}

function AfterSite() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A0A] leading-snug overflow-hidden">
      {/* Modern nav */}
      <div className="flex items-center justify-between px-5 py-2 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-700 text-[8px] font-bold text-white flex items-center justify-center">J</div>
          <span className="text-[11px] font-bold text-white">Joe&apos;s <span className="text-emerald-400">Plumbing</span></span>
        </div>
        <div className="flex items-center gap-4">
          {["Services", "Work", "Reviews", "About"].map((n) => (
            <span key={n} className="text-[8px] text-white/40">{n}</span>
          ))}
          <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-[8px] font-semibold text-white">Get a Quote</span>
        </div>
      </div>
      {/* Hero */}
      <div className="flex px-5 pt-4 pb-3">
        <div className="flex-1">
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[6px] text-emerald-400 font-medium">Licensed &amp; Insured &bull; Same-Day Available</span>
          <p className="mt-2 text-[20px] font-bold text-white leading-[1.1]">Plumbing done right.</p>
          <p className="text-[20px] font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent leading-[1.1]">On time, every time.</p>
          <p className="mt-1.5 text-[7px] text-white/40 max-w-[85%] leading-relaxed">Trusted by 2,400+ homeowners in the DMV area. Transparent pricing, no hidden fees, and a 100% satisfaction guarantee on every job.</p>
          <div className="mt-2.5 flex gap-2 items-center">
            <span className="rounded-md bg-emerald-600 px-3 py-1.5 text-[8px] font-semibold text-white">Book Now →</span>
            <span className="rounded-md border border-white/10 px-3 py-1.5 text-[8px] font-medium text-white/60">Call (555) 123-4567</span>
          </div>
        </div>
        {/* Hero right - quick form */}
        <div className="w-[35%] rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-[9px] font-bold text-white text-center">Get a Free Estimate</p>
          <p className="text-[5px] text-white/30 text-center mt-0.5">Response within 2 hours</p>
          <div className="mt-2 space-y-1.5">
            <div className="h-4 rounded-md border border-white/10 bg-white/[0.03] px-1.5 flex items-center">
              <span className="text-[5px] text-white/20">Full name</span>
            </div>
            <div className="h-4 rounded-md border border-white/10 bg-white/[0.03] px-1.5 flex items-center">
              <span className="text-[5px] text-white/20">Phone number</span>
            </div>
            <div className="h-4 rounded-md border border-white/10 bg-white/[0.03] px-1.5 flex items-center">
              <span className="text-[5px] text-white/20">Service needed</span>
            </div>
            <div className="rounded-md bg-emerald-600 py-1 text-center text-[7px] font-semibold text-white">Get My Free Quote</div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="mx-5 grid grid-cols-4 gap-1.5">
        {[{ n: "2,400+", l: "Jobs Done" }, { n: "4.9★", l: "Google" }, { n: "15+", l: "Years" }, { n: "<2hr", l: "Response" }].map((s) => (
          <div key={s.l} className="rounded-lg border border-white/5 bg-white/[0.03] py-1.5 text-center">
            <p className="text-[10px] font-bold text-white">{s.n}</p>
            <p className="text-[5px] text-white/30">{s.l}</p>
          </div>
        ))}
      </div>
      {/* Services section */}
      <div className="mx-5 mt-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[6px] font-medium text-emerald-400 uppercase tracking-wider">Our Services</p>
            <p className="text-[11px] font-bold text-white mt-0.5">What we do best</p>
          </div>
          <span className="text-[6px] text-white/30">View all services →</span>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {[
            { t: "Emergency Repair", i: "🚨" },
            { t: "Drain Cleaning", i: "🪠" },
            { t: "Water Heaters", i: "🔥" },
            { t: "Bathroom Remodel", i: "🛁" },
          ].map((svc) => (
            <div key={svc.t} className="rounded-lg border border-white/5 bg-white/[0.03] p-2 text-center">
              <span className="text-[11px]">{svc.i}</span>
              <p className="text-[6px] font-semibold text-white mt-1">{svc.t}</p>
              <p className="text-[4px] text-emerald-400/60 mt-0.5">Learn more →</p>
            </div>
          ))}
        </div>
      </div>
      {/* Why Choose Us */}
      <div className="mx-5 mt-3 rounded-xl border border-white/5 bg-gradient-to-br from-emerald-950/30 to-transparent p-3">
        <p className="text-[6px] font-medium text-emerald-400 uppercase tracking-wider">Why Joe&apos;s?</p>
        <p className="text-[10px] font-bold text-white mt-0.5">The difference is in the details</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            { t: "Upfront Pricing", d: "Know the cost before we start. No surprises, ever." },
            { t: "Licensed Pros", d: "Background-checked, certified plumbers on every job." },
            { t: "Guaranteed Work", d: "Not happy? We'll come back and make it right, free." },
          ].map((item) => (
            <div key={item.t}>
              <p className="text-[6px] font-semibold text-white">{item.t}</p>
              <p className="text-[4.5px] text-white/30 mt-0.5 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="mx-5 mt-3">
        <p className="text-[6px] font-medium text-emerald-400 uppercase tracking-wider">Reviews</p>
        <p className="text-[10px] font-bold text-white mt-0.5">What our customers say</p>
        <div className="mt-2 flex gap-1.5">
          {[
            { q: "Fixed our burst pipe in under an hour. Fair price and super professional.", n: "Sarah M.", l: "Homeowner" },
            { q: "Best plumber we've ever hired. On time, clean, and honest about what we needed.", n: "Mark R.", l: "Property Manager" },
            { q: "Same-day response for our water heater. Saved us thousands vs. replacement.", n: "Lisa K.", l: "Homeowner" },
          ].map((r) => (
            <div key={r.n} className="flex-1 rounded-lg border border-white/5 bg-white/[0.02] p-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <span key={s} className="text-[5px] text-yellow-500">★</span>)}
              </div>
              <p className="text-[5px] text-white/40 mt-1 italic leading-relaxed">&quot;{r.q}&quot;</p>
              <p className="text-[5px] text-white/60 mt-1 font-medium">{r.n}</p>
              <p className="text-[4px] text-white/20">{r.l}</p>
            </div>
          ))}
        </div>
      </div>
      {/* CTA Banner */}
      <div className="mx-5 mt-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-3 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold text-white">Need a plumber today?</p>
          <p className="text-[6px] text-emerald-100/60">Same-day service available. Call now or book online.</p>
        </div>
        <div className="flex gap-1.5">
          <span className="rounded-md bg-white px-2.5 py-1 text-[7px] font-semibold text-emerald-700">Book Online</span>
          <span className="rounded-md border border-white/30 px-2.5 py-1 text-[7px] font-medium text-white">(555) 123-4567</span>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-3 border-t border-white/5 px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 rounded bg-gradient-to-br from-emerald-500 to-emerald-700 text-[5px] font-bold text-white flex items-center justify-center">J</div>
          <span className="text-[7px] font-semibold text-white/50">Joe&apos;s Plumbing</span>
        </div>
        <div className="flex gap-3">
          {["Privacy", "Terms", "Sitemap"].map((l) => (
            <span key={l} className="text-[5px] text-white/20">{l}</span>
          ))}
        </div>
        <p className="text-[5px] text-white/15">&copy; 2026 Joe&apos;s Plumbing LLC</p>
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
      className="relative mx-auto mt-12 mb-8 w-full"
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
          className="relative aspect-[16/11] cursor-col-resize select-none overflow-hidden"
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
    <section className="relative overflow-hidden pb-12">
      {/* Floating glass badges (desktop only) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[560px] lg:block" aria-hidden>
        {floatChips.map((chip) => (
          <div
            key={chip.text}
            className={`absolute ${chip.className} ${chip.anim} flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-brand-text shadow-xl shadow-black/30 backdrop-blur-md`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-emerald/15 text-brand-emerald-glow">
              <chip.icon className="h-3.5 w-3.5" />
            </span>
            {chip.text}
          </div>
        ))}
      </div>

      <div className="section-container relative flex flex-col items-center pt-28 sm:pt-36 text-center">
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
          className="mt-8 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Apps, websites &amp; AI systems that{" "}
          <span className="whitespace-nowrap">
            win{" "}
            <WordRotator
              words={["customers", "leads", "revenue", "bookings"]}
              className="text-gradient-emerald"
            />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-brand-muted sm:text-xl"
        >
          We build custom apps, websites, and AI-driven solutions for small businesses
          and growing teams. Faster than DIY. Smarter than big agencies. You own every pixel.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton href="/#contact" className="btn-primary text-base px-8 py-4">
            Request a Quote <ArrowRight className="h-5 w-5" />
          </MagneticButton>
          <MagneticButton href="/book" className="btn-secondary text-base px-8 py-4">
            Book a Call
          </MagneticButton>
        </motion.div>

        {/* Before/After mockup */}
        <HeroBeforeAfter />

        {/* Tech-stack marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 w-full max-w-5xl"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-brand-subtle">
            Built on a modern, future-proof stack
          </p>
          <Marquee speed={32}>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="mx-3 rounded-full border border-white/8 bg-white/[0.03] px-5 py-2 text-sm font-medium text-brand-muted"
              >
                {tech}
              </span>
            ))}
          </Marquee>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-black to-transparent" />
    </section>
  )
}
