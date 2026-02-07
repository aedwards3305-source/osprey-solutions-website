"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, Shield, Clock, Headphones } from "lucide-react"

const trustItems = [
  { icon: Zap, text: "Launch in weeks, not months" },
  { icon: Shield, text: "You own everything" },
  { icon: Clock, text: "Transparent timelines" },
  { icon: Headphones, text: "Direct communication" },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-gradient">
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
            Now accepting new projects for 2025
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
          <a
            href="https://calendly.com/osprey-solutions/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base px-8 py-4"
          >
            Book a Call
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8"
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
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-black to-transparent" />
    </section>
  )
}
