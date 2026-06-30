"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Clock, Rocket, ShieldCheck, Sparkles, TrendingUp } from "lucide-react"
import {
  MagneticButton,
  WordRotator,
  Marquee,
  TiltCard,
  usePrefersReducedMotion,
} from "@/components/fx"

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

// Real client work — the strongest possible proof.
const showcase = [
  { title: "Variety Amaya", url: "varietyamaya.net", image: "/variety-amaya.png", outcome: "3x more estimate requests" },
  { title: "B&R Seafood", url: "brseafoodandmore.com", image: "/seafood-restaurant.png", outcome: "4x online orders" },
  { title: "Paradise Travels", url: "travel-agent-site.vercel.app", image: "/travel-agent-site.png", outcome: "3x booking inquiries" },
  { title: "Beaton Junk Removal", url: "beaton-junk-removal.vercel.app", image: "/beaton-junk-removal.png", outcome: "2x more quote requests" },
  { title: "New Era Studios", url: "newerastudios.com", image: "/new-era-hair.png", outcome: "50+ products launched" },
  { title: "SafeSpace", url: "safespace-jbh.vercel.app", image: "/safespace-inspection.png", outcome: "60% faster inspections" },
]

function HeroShowcase() {
  const reduced = usePrefersReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || reduced) return
    const id = window.setInterval(
      () => setI((p) => (p + 1) % showcase.length),
      3200
    )
    return () => window.clearInterval(id)
  }, [paused, reduced])

  const cur = showcase[i]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative mx-auto mt-12 mb-4 w-full max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-brand-emerald/10 blur-3xl" />

      <TiltCard max={5} className="relative [perspective:1400px]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-brand-black shadow-2xl shadow-black/50 ring-1 ring-white/5">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={cur.image}
              src={cur.image}
              alt={`${cur.title} — built by Osprey Solutions`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </AnimatePresence>

          {/* Outcome badge */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={cur.outcome}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-brand-emerald/30 bg-brand-black/70 px-3.5 py-2 text-sm font-semibold text-brand-emerald-glow backdrop-blur-md"
            >
              <TrendingUp className="h-4 w-4" />
              {cur.outcome}
            </motion.div>
          </AnimatePresence>
        </div>
      </TiltCard>

      {/* Project selector */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {showcase.map((s, idx) => (
          <button
            key={s.title}
            onClick={() => setI(idx)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 sm:text-sm ${
              idx === i
                ? "border-brand-emerald/40 bg-brand-emerald/15 text-brand-emerald-glow"
                : "border-brand-border/50 text-brand-subtle hover:border-brand-emerald/30 hover:text-brand-text"
            }`}
          >
            {s.title}
          </button>
        ))}
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

        {/* Live work showcase */}
        <div className="mt-10 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-subtle">
          <span className="h-px w-8 bg-brand-border" />
          Real sites we&apos;ve shipped
          <span className="h-px w-8 bg-brand-border" />
        </div>
        <HeroShowcase />

        {/* Tech-stack marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 w-full max-w-5xl"
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
