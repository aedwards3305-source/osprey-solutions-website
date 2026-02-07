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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SUMMIT FITNESS — BEFORE (dated 2012-era template)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SummitBefore() {
  return (
    <div className="flex h-full w-full flex-col bg-white text-[10px] leading-tight overflow-hidden">
      {/* Top bar — garish gradient */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 px-3 py-0.5 text-[7px] text-white/90 flex justify-between">
        <span>Call us: (555) 123-4567</span>
        <span>Mon-Fri 6am-9pm</span>
      </div>
      {/* Nav — clunky tabs */}
      <div className="flex items-center justify-between border-b-2 border-orange-400 bg-gray-100 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-[8px] font-black text-white">S</div>
          <span className="font-black text-[11px] text-gray-700 tracking-tight">Summit Fitness</span>
        </div>
        <div className="flex gap-0.5">
          {["HOME", "ABOUT", "CLASSES", "PRICING", "CONTACT"].map((item) => (
            <span
              key={item}
              className="rounded-t border border-b-0 border-gray-300 bg-white px-1.5 py-0.5 text-[6.5px] font-bold text-gray-500"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      {/* Hero — low-quality feel */}
      <div className="relative bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 px-4 py-5 text-center">
        {/* Fake overlay pattern (dated diagonal lines) */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 3px, white 3px, white 4px)" }} />
        <p className="relative text-[14px] font-black uppercase tracking-wider text-white drop-shadow-md" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
          Welcome to Summit Fitness!
        </p>
        <p className="relative mt-1 text-[8px] text-orange-300 font-bold italic">
          &quot;Your journey to a healthier you starts here!&quot;
        </p>
        <div className="relative mt-2 inline-block rounded bg-orange-500 px-3 py-1 text-[8px] font-bold uppercase text-white shadow">
          Learn More &gt;&gt;
        </div>
      </div>
      {/* Content — cramped and generic */}
      <div className="flex-1 px-3 py-2 space-y-2">
        {/* Services row with awful clip-art style boxes */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { bg: "from-red-200 to-red-100", icon: "🏋️", title: "Weight Training", text: "Build strength and tone your body" },
            { bg: "from-blue-200 to-blue-100", icon: "🧘", title: "Yoga Classes", text: "Find your inner peace and flexibility" },
            { bg: "from-green-200 to-green-100", icon: "🏃", title: "Cardio Zone", text: "Burn calories and boost energy" },
          ].map((card) => (
            <div key={card.title} className={`rounded border border-gray-200 bg-gradient-to-b ${card.bg} p-1.5 text-center`}>
              <span className="text-[14px]">{card.icon}</span>
              <p className="mt-0.5 text-[7px] font-extrabold text-gray-700 uppercase">{card.title}</p>
              <p className="mt-0.5 text-[6px] text-gray-500 italic">{card.text}</p>
            </div>
          ))}
        </div>
        {/* Text block */}
        <div className="rounded border border-gray-200 bg-gray-50 p-2">
          <p className="text-[8px] font-bold text-orange-600 uppercase">Why Choose Us?</p>
          <p className="mt-0.5 text-[7px] text-gray-600 leading-relaxed">
            Summit Fitness has been serving the community since 2008. We have over 15 years of experience helping people reach their fitness goals. Our certified trainers are here for YOU!
          </p>
        </div>
        {/* Testimonial — cheesy */}
        <div className="rounded border-l-3 border-l-orange-400 bg-orange-50 p-1.5">
          <p className="text-[7px] italic text-gray-600">&quot;Great gym! Love the classes!&quot;</p>
          <p className="mt-0.5 text-[6px] font-bold text-orange-500">— Happy Customer</p>
        </div>
      </div>
      {/* Footer — dated */}
      <div className="bg-gray-800 px-3 py-1.5 text-center">
        <p className="text-[6px] text-gray-400">&copy; 2019 Summit Fitness. All rights reserved. | Designed by MyFreeSiteBuilder</p>
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SUMMIT FITNESS — AFTER (modern Osprey-built)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SummitAfter() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A0A] text-[10px] leading-tight overflow-hidden">
      {/* Nav */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-emerald-700 text-[7px] font-bold text-white">S</div>
          <span className="text-[10px] font-bold text-white tracking-tight">Summit <span className="text-emerald-400">Fitness</span></span>
        </div>
        <div className="flex items-center gap-3">
          {["Classes", "Trainers", "Pricing"].map((item) => (
            <span key={item} className="text-[7px] text-white/50 font-medium">{item}</span>
          ))}
          <span className="rounded-md bg-gradient-to-r from-emerald-600 to-emerald-500 px-2 py-0.5 text-[7px] font-semibold text-white">Book Now</span>
        </div>
      </div>
      {/* Hero — dark + modern */}
      <div className="relative px-4 py-5">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-transparent" />
        <div className="relative">
          <span className="inline-block rounded-full bg-emerald-500/15 px-2 py-0.5 text-[6px] font-medium text-emerald-400">New: Online booking is live</span>
          <p className="mt-2 text-[16px] font-bold text-white leading-[1.15]">
            Train smarter.<br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Results guaranteed.</span>
          </p>
          <p className="mt-1.5 text-[7.5px] text-white/50 max-w-[65%]">
            Book classes instantly. Track your progress. Join a community that pushes you forward.
          </p>
          <div className="mt-2.5 flex gap-1.5">
            <span className="rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-1 text-[7.5px] font-semibold text-white">Start Free Trial</span>
            <span className="rounded-lg border border-white/15 px-2.5 py-1 text-[7.5px] text-white/60">View Schedule</span>
          </div>
        </div>
      </div>
      {/* Stats row */}
      <div className="mx-4 grid grid-cols-3 gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-2">
        {[
          { num: "500+", label: "Active members" },
          { num: "4.9★", label: "Google rating" },
          { num: "50+", label: "Weekly classes" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-[11px] font-bold text-white">{stat.num}</p>
            <p className="text-[6px] text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>
      {/* Class cards */}
      <div className="flex-1 px-4 py-3 space-y-2">
        <p className="text-[8px] font-semibold text-white/80">Popular classes</p>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { title: "HIIT Burn", time: "6:00 AM", color: "from-emerald-800/60 to-emerald-900/30", spots: "3 spots left" },
            { title: "Power Yoga", time: "7:30 AM", color: "from-violet-800/60 to-violet-900/30", spots: "5 spots left" },
            { title: "Spin Class", time: "12:00 PM", color: "from-amber-800/60 to-amber-900/30", spots: "8 spots left" },
          ].map((cls) => (
            <div key={cls.title} className={`rounded-lg bg-gradient-to-br ${cls.color} border border-white/5 p-1.5`}>
              <p className="text-[7.5px] font-semibold text-white">{cls.title}</p>
              <p className="text-[6px] text-white/40">{cls.time}</p>
              <p className="mt-1 text-[5.5px] text-emerald-400">{cls.spots}</p>
              <div className="mt-1 rounded bg-white/10 px-1.5 py-0.5 text-center text-[6px] font-medium text-white/70">Book</div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-white/5 px-4 py-1.5 flex justify-between items-center">
        <span className="text-[6px] text-white/25">&copy; 2026 Summit Fitness</span>
        <span className="text-[5.5px] text-white/15">Built by Osprey Solutions</span>
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VERDANT MARKET — BEFORE (basic generic store)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function VerdantBefore() {
  return (
    <div className="flex h-full w-full flex-col bg-white text-[10px] leading-tight overflow-hidden">
      {/* Nav — generic green theme */}
      <div className="flex items-center justify-between bg-green-700 px-3 py-1.5">
        <div className="flex items-center gap-1">
          <span className="text-[12px]">🌿</span>
          <span className="text-[11px] font-bold text-white">Verdant Market</span>
        </div>
        <div className="flex items-center gap-2">
          {["Shop", "About", "Contact"].map((item) => (
            <span key={item} className="text-[7px] font-bold text-white/80 underline">{item}</span>
          ))}
          <span className="text-[8px] text-yellow-300 font-bold">🛒 Cart (0)</span>
        </div>
      </div>
      {/* Banner — stock photo feel */}
      <div className="relative bg-gradient-to-r from-green-100 via-yellow-50 to-green-100 px-4 py-4 text-center border-b-2 border-green-300">
        <p className="text-[13px] font-extrabold text-green-800" style={{ fontFamily: "Georgia, serif" }}>
          Fresh Organic Produce
        </p>
        <p className="text-[8px] text-green-600 font-medium italic">
          Delivered to your door since 2015
        </p>
        <div className="mt-2 inline-block rounded bg-green-600 px-3 py-1 text-[8px] font-bold text-white uppercase">
          Shop Now!
        </div>
      </div>
      {/* Products — flat and basic */}
      <div className="flex-1 px-3 py-2 space-y-2">
        <p className="text-[8px] font-bold text-green-700 uppercase border-b border-green-200 pb-0.5">Featured Products</p>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: "Organic Apples", price: "$4.99/lb", bg: "bg-red-50" },
            { name: "Fresh Kale Bundle", price: "$3.49", bg: "bg-green-50" },
            { name: "Avocado Pack (4)", price: "$7.99", bg: "bg-lime-50" },
          ].map((product) => (
            <div key={product.name} className={`rounded border border-gray-200 ${product.bg} p-1.5 text-center`}>
              <div className="mx-auto h-8 w-8 rounded bg-gray-200 flex items-center justify-center text-[12px]">📦</div>
              <p className="mt-1 text-[7px] font-bold text-gray-700">{product.name}</p>
              <p className="text-[7px] font-extrabold text-green-600">{product.price}</p>
              <div className="mt-1 rounded bg-green-600 px-1 py-0.5 text-[6px] font-bold text-white uppercase">Add to Cart</div>
            </div>
          ))}
        </div>
        {/* Promo banner */}
        <div className="rounded border-2 border-dashed border-yellow-400 bg-yellow-50 p-1.5 text-center">
          <p className="text-[8px] font-extrabold text-red-600 uppercase">🔥 SALE! 20% OFF FIRST ORDER 🔥</p>
          <p className="text-[6.5px] text-gray-500">Use code: FRESH20 at checkout</p>
        </div>
        {/* Trust — messy */}
        <div className="flex justify-around py-1 border-t border-gray-200">
          {["✅ Free Shipping", "✅ 100% Organic", "✅ Easy Returns"].map((t) => (
            <span key={t} className="text-[6px] text-gray-500 font-medium">{t}</span>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="bg-green-800 px-3 py-1.5 text-center">
        <p className="text-[6px] text-green-300">&copy; 2020 Verdant Market | Privacy | Terms | Sitemap</p>
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VERDANT MARKET — AFTER (high-converting e-commerce)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function VerdantAfter() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A08] text-[10px] leading-tight overflow-hidden">
      {/* Nav */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-lime-500 to-green-600 text-[8px] font-bold text-white">V</div>
          <span className="text-[10px] font-bold text-white tracking-tight">Verdant <span className="text-lime-400">Market</span></span>
        </div>
        <div className="flex items-center gap-3">
          {["Shop", "Subscribe", "About"].map((item) => (
            <span key={item} className="text-[7px] text-white/50 font-medium">{item}</span>
          ))}
          <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[7px] text-white/70">Cart (2)</span>
        </div>
      </div>
      {/* Hero */}
      <div className="relative px-4 py-5">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-900/15 via-transparent to-transparent" />
        <div className="relative">
          <span className="inline-block rounded-full bg-lime-500/15 px-2 py-0.5 text-[6px] font-medium text-lime-400">Free delivery on orders $50+</span>
          <p className="mt-2 text-[15px] font-bold text-white leading-[1.15]">
            Organic food,<br />
            <span className="bg-gradient-to-r from-lime-400 to-emerald-300 bg-clip-text text-transparent">delivered fresh.</span>
          </p>
          <p className="mt-1.5 text-[7.5px] text-white/50 max-w-[60%]">
            Farm-to-door in 24 hours. Subscribe weekly and save 15% on every order.
          </p>
          <div className="mt-2.5 flex gap-1.5">
            <span className="rounded-lg bg-gradient-to-r from-lime-600 to-green-600 px-3 py-1 text-[7.5px] font-semibold text-white">Browse Products</span>
            <span className="rounded-lg border border-white/15 px-2.5 py-1 text-[7.5px] text-white/60">Start Subscription</span>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="mx-4 flex gap-1.5 overflow-hidden">
        {[
          { label: "Fruits", color: "from-red-800/50 to-red-900/30" },
          { label: "Vegetables", color: "from-green-800/50 to-green-900/30" },
          { label: "Dairy", color: "from-amber-800/50 to-amber-900/30" },
          { label: "Pantry", color: "from-orange-800/50 to-orange-900/30" },
        ].map((cat) => (
          <div key={cat.label} className={`flex-1 rounded-lg bg-gradient-to-br ${cat.color} border border-white/5 p-1.5 text-center`}>
            <p className="text-[7px] font-semibold text-white">{cat.label}</p>
          </div>
        ))}
      </div>
      {/* Products */}
      <div className="flex-1 px-4 py-2.5 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[8px] font-semibold text-white/80">Trending this week</p>
          <span className="text-[6px] text-lime-400">View all</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: "Honeycrisp Apples", price: "$4.99", tag: "Organic", color: "from-red-900/40 to-red-950/20" },
            { name: "Baby Kale Mix", price: "$3.49", tag: "Local Farm", color: "from-green-900/40 to-green-950/20" },
            { name: "Hass Avocados", price: "$7.99", tag: "Best Seller", color: "from-lime-900/40 to-lime-950/20" },
          ].map((product) => (
            <div key={product.name} className={`rounded-lg bg-gradient-to-br ${product.color} border border-white/5 p-1.5`}>
              <div className="flex justify-between items-start">
                <span className="rounded-full bg-lime-500/20 px-1 py-0 text-[5px] text-lime-400 font-medium">{product.tag}</span>
              </div>
              <p className="mt-1.5 text-[7px] font-semibold text-white">{product.name}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[8px] font-bold text-white">{product.price}</span>
                <span className="rounded bg-white/10 px-1 py-0.5 text-[5.5px] text-white/60">Add</span>
              </div>
            </div>
          ))}
        </div>
        {/* Subscription CTA */}
        <div className="rounded-lg border border-lime-500/20 bg-lime-500/5 p-2 flex items-center justify-between">
          <div>
            <p className="text-[7.5px] font-semibold text-white">Weekly Box Subscription</p>
            <p className="text-[6px] text-white/40">Curated organic produce &mdash; save 15%</p>
          </div>
          <span className="rounded-md bg-lime-600 px-2 py-0.5 text-[6.5px] font-semibold text-white shrink-0">Subscribe</span>
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-white/5 px-4 py-1.5 flex justify-between items-center">
        <span className="text-[6px] text-white/25">&copy; 2026 Verdant Market</span>
        <span className="text-[5.5px] text-white/15">Built by Osprey Solutions</span>
      </div>
    </div>
  )
}

/* Map example index to components */
const beforeComponents = [SummitBefore, VerdantBefore]
const afterComponents = [SummitAfter, VerdantAfter]

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
  const BeforeSite = beforeComponents[activeExample]
  const AfterSite = afterComponents[activeExample]

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
        <div className="mx-auto mt-8 max-w-3xl">
          {/* Labels above slider */}
          <div className="mb-3 flex justify-between px-1">
            <span className="text-sm font-medium text-brand-subtle">{ex.beforeLabel}</span>
            <span className="text-sm font-medium text-brand-emerald-glow">{ex.afterLabel}</span>
          </div>

          <div
            ref={containerRef}
            className="relative aspect-[16/10] cursor-col-resize overflow-hidden rounded-2xl border border-brand-border/50 select-none shadow-2xl shadow-black/40"
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
