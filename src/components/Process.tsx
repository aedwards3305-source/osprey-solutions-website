"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  LifeBuoy,
} from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discovery",
    timeline: "Day 1",
    description:
      "We learn your business, goals, audience, and competition. You get a clear project brief and roadmap.",
    deliverables: [
      "Kickoff call",
      "Project brief",
      "Scope & timeline document",
      "Competitive audit",
    ],
  },
  {
    icon: PenTool,
    title: "Design",
    timeline: "Day 1",
    description:
      "Wireframes, mockups, and a visual design you approve before a single line of code is written.",
    deliverables: [
      "Wireframes",
      "Visual mockups",
      "Design review",
      "Revision round",
    ],
  },
  {
    icon: Code2,
    title: "Build",
    timeline: "Day 2",
    description:
      "We build your project with clean, tested code. You see progress demos every week\u2014no disappearing acts.",
    deliverables: [
      "Weekly demos",
      "Staging environment",
      "Code in your repo",
      "QA testing",
    ],
  },
  {
    icon: Rocket,
    title: "Launch",
    timeline: "Day 3",
    description:
      "Final review, performance optimization, and launch day. We handle hosting setup, DNS, and analytics.",
    deliverables: [
      "Performance audit",
      "SEO setup",
      "Hosting & DNS",
      "Analytics install",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Support",
    timeline: "Ongoing",
    description:
      "Post-launch support to fix bugs, make updates, and help you grow. We don\u2019t just build and vanish.",
    deliverables: [
      "Bug fixes",
      "Content updates",
      "Performance monitoring",
      "Growth consulting",
    ],
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className={`relative flex flex-col gap-6 lg:flex-row lg:items-start ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="glass-card p-6 sm:p-8 lg:inline-block"
        >
          <div className={`flex items-center gap-3 ${isEven ? "lg:justify-end" : ""}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald-glow lg:hidden">
              <step.icon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-brand-gold">
                {step.timeline}
              </span>
              <h3 className="text-xl font-semibold text-brand-text">
                {step.title}
              </h3>
            </div>
          </div>
          <p className="mt-3 text-brand-muted leading-relaxed">
            {step.description}
          </p>
          <ul className={`mt-4 flex flex-wrap gap-2 ${isEven ? "lg:justify-end" : ""}`}>
            {step.deliverables.map((d) => (
              <li
                key={d}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-brand-subtle"
              >
                {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Center icon (desktop) */}
      <div className="absolute left-1/2 top-6 z-10 hidden -translate-x-1/2 lg:flex">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-emerald/30 bg-brand-dark text-brand-emerald-glow shadow-lg shadow-brand-emerald/10"
        >
          <step.icon className="h-5 w-5" />
        </motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden flex-1 lg:block" />
    </motion.div>
  )
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="process" className="section-padding relative">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-emerald/3 blur-[150px]" />

      <div className="section-container relative">
        {/* Header */}
        <div className="text-center">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">
            From idea to launch in{" "}
            <span className="text-gradient-emerald">under 72 hours</span>
          </h2>
          <p className="section-subtitle mx-auto">
            No mystery. No scope creep. You know exactly what&apos;s happening at
            every stage&mdash;and you approve before we move forward.
          </p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative mt-16">
          {/* Static vertical line (background) */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-brand-border/30 lg:left-1/2 lg:block" />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-6 top-0 hidden w-px bg-gradient-to-b from-brand-emerald-glow to-brand-emerald/40 lg:left-1/2 lg:block"
            style={{ height: lineHeight }}
          />

          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
