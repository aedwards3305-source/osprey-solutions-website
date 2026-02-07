"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Owner",
    business: "Summit Fitness Studio",
    quote:
      "Osprey took our outdated website and turned it into a booking machine. Online sign-ups tripled in the first month, and the whole process was painless. They kept us in the loop every step of the way.",
    result: "3x online bookings",
  },
  {
    name: "James Rivera",
    role: "Founder",
    business: "BrightPath Consulting",
    quote:
      "We needed a CRM that actually fit how we work\u2014not another off-the-shelf tool we\u2019d fight with. Osprey built exactly what we asked for, on time, and it\u2019s saving our team 15 hours a week.",
    result: "15 hrs/week saved",
  },
  {
    name: "Lisa Chen",
    role: "Operations Director",
    business: "Verdant Market",
    quote:
      "The team at Osprey understood our business from day one. Our new e-commerce platform is fast, beautiful, and our average order value jumped 42%. Best investment we\u2019ve made this year.",
    result: "42% higher AOV",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Testimonials() {
  return (
    <section className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            Trusted by businesses{" "}
            <span className="text-gradient-emerald">that ship</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Don&apos;t take our word for it\u2014hear from founders and operators
            who chose Osprey.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="glass-card flex flex-col p-6 sm:p-8"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mt-5 flex-1">
                <Quote className="absolute -left-1 -top-1 h-6 w-6 text-brand-emerald/20" />
                <p className="relative text-sm leading-relaxed text-brand-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 flex items-center justify-between border-t border-brand-border/30 pt-5">
                <div>
                  <p className="font-semibold text-brand-text">{t.name}</p>
                  <p className="text-sm text-brand-subtle">
                    {t.role}, {t.business}
                  </p>
                </div>
                <span className="rounded-full bg-brand-emerald/10 px-3 py-1 text-xs font-medium text-brand-emerald-glow">
                  {t.result}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
