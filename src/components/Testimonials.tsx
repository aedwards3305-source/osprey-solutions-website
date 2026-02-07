"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Owner",
    business: "Summit Fitness Studio",
    quote:
      "Osprey Solutions took our outdated website and turned it into a booking machine. Online sign-ups tripled in the first month, and the whole process was painless. They kept us in the loop every step of the way.",
    result: "3x online bookings",
  },
  {
    name: "James Rivera",
    role: "Founder",
    business: "BrightPath Consulting",
    quote:
      "We needed a CRM that actually fit how we work\u2014not another off-the-shelf tool we\u2019d fight with. Osprey Solutions built exactly what we asked for, on time, and it\u2019s saving our team 15 hours a week.",
    result: "15 hrs/week saved",
  },
  {
    name: "Lisa Chen",
    role: "Operations Director",
    business: "Verdant Market",
    quote:
      "The team at Osprey Solutions understood our business from day one. Our new e-commerce platform is fast, beautiful, and our average order value jumped 42%. Best investment we\u2019ve made this year.",
    result: "42% higher AOV",
  },
  {
    name: "David Kowalski",
    role: "Managing Partner",
    business: "Heritage Law Group",
    quote:
      "Our client portal cut status-inquiry calls by 60%. Osprey Solutions delivered ahead of schedule and the quality blew us away. We\u2019ve already referred two other firms.",
    result: "60% fewer support calls",
  },
  {
    name: "Maria Santos",
    role: "CEO",
    business: "Bloom Floral Co.",
    quote:
      "We went from zero online presence to a beautiful e-commerce site in five weeks. Osprey Solutions handled everything\u2014design, payments, shipping logic. Sales doubled in our first quarter online.",
    result: "2x revenue in 90 days",
  },
  {
    name: "Kevin Tran",
    role: "Owner",
    business: "Precision Auto Care",
    quote:
      "Our old site looked like it was built in 2005. Osprey Solutions gave us a modern site with online appointment scheduling and we saw a 75% jump in new customer bookings within weeks. Wish we\u2019d done this sooner.",
    result: "75% more new bookings",
  },
  {
    name: "Rachel Hoffman",
    role: "Founder",
    business: "Bright Minds Tutoring",
    quote:
      "Osprey Solutions built us a parent portal with scheduling, progress tracking, and payments all in one place. Parents love it, and we cut our admin time in half. The team was incredibly responsive throughout.",
    result: "50% less admin work",
  },
  {
    name: "Marcus Williams",
    role: "General Manager",
    business: "Coastal Property Group",
    quote:
      "We needed a property listing platform that stood out from cookie-cutter templates. Osprey Solutions delivered a custom site with virtual tours and lead capture that generates 40+ qualified leads a month.",
    result: "40+ leads/month",
  },
  {
    name: "Amanda Foster",
    role: "Co-Founder",
    business: "PurePlate Meal Prep",
    quote:
      "From subscription management to delivery zone mapping, Osprey Solutions nailed every detail of our meal prep platform. Customer retention is up 35% since launch and the dashboard saves us hours every day.",
    result: "35% better retention",
  },
  {
    name: "Tony Bassett",
    role: "Director",
    business: "Iron Bridge Construction",
    quote:
      "We were drowning in spreadsheets for project tracking. Osprey Solutions built us a custom job management app that our whole crew actually uses. Change orders, timelines, budgets\u2014all in one place now.",
    result: "Zero spreadsheet chaos",
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
  }),
}

export default function Testimonials() {
  const [[current, direction], setCurrent] = useState([0, 0])
  const [isPaused, setIsPaused] = useState(false)

  const paginate = useCallback(
    (dir: number) => {
      setCurrent(([prev]) => {
        const next = (prev + dir + testimonials.length) % testimonials.length
        return [next, dir]
      })
    },
    []
  )

  // Auto-scroll every 3.5 seconds
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => paginate(1), 3500)
    return () => clearInterval(timer)
  }, [isPaused, paginate])

  const t = testimonials[current]

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-emerald/3 blur-[150px]" />

      <div className="section-container relative">
        {/* Header */}
        <div className="text-center">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            Trusted by businesses{" "}
            <span className="text-gradient-emerald">that ship</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Don&apos;t take our word for it&mdash;hear from founders and operators
            who chose Osprey Solutions.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative mx-auto mt-16 max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card area with fixed height */}
          <div className="relative min-h-[320px] sm:min-h-[280px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute inset-0"
              >
                <div className="glass-card flex h-full flex-col p-8 sm:p-10">
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
                  <div className="relative mt-6 flex-1">
                    <Quote className="absolute -left-1 -top-1 h-8 w-8 text-brand-emerald/15" />
                    <p className="relative text-base leading-relaxed text-brand-muted sm:text-lg">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author */}
                  <div className="mt-8 flex items-center justify-between border-t border-brand-border/30 pt-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar initial */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-emerald/15 text-sm font-bold text-brand-emerald-glow">
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-text">{t.name}</p>
                        <p className="text-sm text-brand-subtle">
                          {t.role}, {t.business}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-brand-emerald/10 px-3 py-1 text-xs font-medium text-brand-emerald-glow">
                      {t.result}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {/* Prev */}
            <button
              onClick={() => paginate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border/50 text-brand-subtle transition-all hover:border-brand-emerald/40 hover:text-brand-emerald-glow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent([i, i > current ? 1 : -1])}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-brand-emerald-glow"
                      : "w-2 bg-brand-border hover:bg-brand-subtle"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => paginate(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border/50 text-brand-subtle transition-all hover:border-brand-emerald/40 hover:text-brand-emerald-glow"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
