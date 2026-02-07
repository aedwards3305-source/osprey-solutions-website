"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, Shield, Clock, Headphones } from "lucide-react"

const trustItems = [
  { icon: Zap, text: "Launch in weeks, not months" },
  { icon: Shield, text: "You own everything" },
  { icon: Clock, text: "Transparent timelines" },
  { icon: Headphones, text: "Direct communication" },
]

function HeroDashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative mx-auto mt-16 mb-8 max-w-3xl"
    >
      {/* Glow behind */}
      <div className="absolute -inset-4 rounded-3xl bg-brand-emerald/5 blur-2xl" />

      {/* Browser chrome */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-border/50 bg-brand-card/80 shadow-2xl shadow-brand-emerald/5 backdrop-blur">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-brand-border/30 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
          <div className="ml-3 flex-1 rounded-md bg-brand-dark/80 px-3 py-1">
            <div className="h-2 w-32 rounded bg-brand-subtle/30" />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-12 gap-4">
            {/* Sidebar */}
            <div className="col-span-3 hidden space-y-3 sm:block">
              <div className="h-3 w-full rounded bg-brand-emerald/20" />
              <div className="h-2 w-4/5 rounded bg-brand-border/40" />
              <div className="h-2 w-3/5 rounded bg-brand-border/40" />
              <div className="h-2 w-4/5 rounded bg-brand-border/40" />
              <div className="h-2 w-2/5 rounded bg-brand-border/40" />
              <div className="mt-4 h-2 w-full rounded bg-brand-border/20" />
              <div className="h-2 w-3/4 rounded bg-brand-border/40" />
              <div className="h-2 w-4/5 rounded bg-brand-border/40" />
            </div>

            {/* Main area */}
            <div className="col-span-12 space-y-4 sm:col-span-9">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Revenue", val: "$24,500", color: "bg-brand-emerald/15", textColor: "text-brand-emerald-glow" },
                  { label: "Customers", val: "1,248", color: "bg-brand-gold/10", textColor: "text-brand-gold" },
                  { label: "Conversion", val: "4.2%", color: "bg-blue-500/10", textColor: "text-blue-400" },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + idx * 0.15 }}
                    className={`rounded-xl ${stat.color} p-3`}
                  >
                    <div className="h-1.5 w-12 rounded bg-brand-subtle/20" />
                    <p className={`mt-2 text-sm font-bold ${stat.textColor} sm:text-lg`}>{stat.val}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="rounded-xl bg-brand-dark/50 p-4">
                <div className="mb-3 h-2 w-20 rounded bg-brand-subtle/30" />
                <div className="flex items-end gap-1.5 h-20">
                  {[35, 50, 40, 65, 55, 75, 60, 80, 70, 90, 85, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: 1.2 + i * 0.05 }}
                      className="flex-1 rounded-t bg-gradient-to-t from-brand-emerald/40 to-brand-emerald-glow/60"
                    />
                  ))}
                </div>
              </div>

              {/* Table rows */}
              <div className="space-y-2">
                {[1, 2, 3].map((row) => (
                  <motion.div
                    key={row}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.5 + row * 0.1 }}
                    className="flex items-center gap-3 rounded-lg bg-brand-dark/30 px-3 py-2"
                  >
                    <div className="h-6 w-6 rounded-full bg-brand-border/40" />
                    <div className="h-2 w-24 rounded bg-brand-border/40" />
                    <div className="ml-auto h-2 w-12 rounded bg-brand-emerald/20" />
                  </motion.div>
                ))}
              </div>
            </div>
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
          <a href="#contact" className="btn-primary text-base px-8 py-4">
            Request a Quote <ArrowRight className="h-5 w-5" />
          </a>
          <a href="#book" className="btn-secondary text-base px-8 py-4">
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

        {/* Dashboard mockup */}
        <HeroDashboardMockup />
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-black to-transparent" />
    </section>
  )
}
