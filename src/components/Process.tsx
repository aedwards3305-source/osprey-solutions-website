"use client"

import { motion } from "framer-motion"
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
    timeline: "Week 1",
    description:
      "We learn your business, goals, audience, and competition. You walk away with a clear project brief and roadmap.",
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
    timeline: "Weeks 2\u20133",
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
    timeline: "Weeks 3\u20136",
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
    timeline: "Week 6\u20137",
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function Process() {
  return (
    <section id="process" className="section-padding relative">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-emerald/3 blur-[150px]" />

      <div className="section-container relative">
        {/* Header */}
        <div className="text-center">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">
            From idea to launch in{" "}
            <span className="text-gradient-emerald">5 clear steps</span>
          </h2>
          <p className="section-subtitle mx-auto">
            No mystery. No scope creep. You know exactly what&apos;s happening at
            every stage&mdash;and you approve before we move forward.
          </p>
        </div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-16"
        >
          {/* Vertical line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-brand-emerald/40 via-brand-emerald/20 to-transparent lg:left-1/2 lg:block" />

          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className={`relative flex flex-col gap-6 lg:flex-row lg:items-start ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div className={`flex-1 ${i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                  <div className="glass-card p-6 sm:p-8 lg:inline-block">
                    <div className={`flex items-center gap-3 ${i % 2 === 0 ? "lg:justify-end" : ""}`}>
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
                    <ul className={`mt-4 flex flex-wrap gap-2 ${i % 2 === 0 ? "lg:justify-end" : ""}`}>
                      {step.deliverables.map((d) => (
                        <li
                          key={d}
                          className="rounded-full bg-white/5 px-3 py-1 text-xs text-brand-subtle"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center icon (desktop) */}
                <div className="absolute left-1/2 top-6 z-10 hidden -translate-x-1/2 lg:flex">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-emerald/30 bg-brand-dark text-brand-emerald-glow shadow-lg shadow-brand-emerald/10">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
