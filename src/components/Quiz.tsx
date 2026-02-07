"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, HelpCircle, Globe, ShoppingCart, LayoutDashboard, Smartphone } from "lucide-react"

const questions = [
  {
    question: "What\u2019s your biggest challenge right now?",
    options: [
      { label: "I need an online presence", value: "presence", icon: Globe },
      { label: "I want to sell products online", value: "ecommerce", icon: ShoppingCart },
      { label: "I need to streamline operations", value: "operations", icon: LayoutDashboard },
      { label: "I need a mobile app", value: "mobile", icon: Smartphone },
    ],
  },
  {
    question: "How soon do you need it?",
    options: [
      { label: "ASAP \u2014 yesterday!", value: "urgent" },
      { label: "Within a month", value: "soon" },
      { label: "Within a quarter", value: "quarter" },
      { label: "Just exploring", value: "exploring" },
    ],
  },
  {
    question: "What\u2019s your team size?",
    options: [
      { label: "Just me", value: "solo" },
      { label: "2\u201310 people", value: "small" },
      { label: "11\u201350 people", value: "medium" },
      { label: "50+ people", value: "large" },
    ],
  },
]

type Recommendation = {
  title: string
  description: string
  services: string[]
}

function getRecommendation(answers: string[]): Recommendation {
  const challenge = answers[0]
  if (challenge === "presence") {
    return {
      title: "Custom Website",
      description:
        "A fast, modern website designed to convert visitors into customers. Includes responsive design, SEO, and analytics.",
      services: ["Website Design", "SEO Setup", "Analytics", "Hosting"],
    }
  }
  if (challenge === "ecommerce") {
    return {
      title: "E-Commerce Platform",
      description:
        "A full online store with product management, secure checkout, inventory tracking, and automated emails.",
      services: ["Storefront Design", "Payment Processing", "Inventory System", "Email Automation"],
    }
  }
  if (challenge === "mobile") {
    return {
      title: "Mobile Application",
      description:
        "A cross-platform mobile app for iOS and Android that keeps your customers engaged on the go.",
      services: ["App Design", "iOS & Android Build", "Push Notifications", "Backend API"],
    }
  }
  return {
    title: "Custom Web Application",
    description:
      "A tailored dashboard or internal tool to automate workflows, reduce manual work, and grow your team\u2019s efficiency.",
    services: ["Custom Dashboard", "Workflow Automation", "User Management", "Reporting"],
  }
}

export default function Quiz() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const handleAnswer = (value: string) => {
    const next = [...answers, value]
    setAnswers(next)
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1)
    } else {
      setDone(true)
    }
  }

  const restart = () => {
    setCurrent(0)
    setAnswers([])
    setDone(false)
  }

  const recommendation = done ? getRecommendation(answers) : null

  return (
    <section className="section-padding relative">
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-emerald/3 blur-[150px]" />

      <div className="section-container relative">
        <div className="text-center">
          <span className="section-label">
            <HelpCircle className="h-4 w-4" /> Find Your Fit
          </span>
          <h2 className="section-title">
            Not sure what you need?{" "}
            <span className="text-gradient-emerald">Let us help</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Answer 3 quick questions and we&apos;ll recommend the right solution for your business.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <div className="glass-card min-h-[280px] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Progress */}
                  <div className="mb-6 flex gap-2">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= current ? "bg-brand-emerald-glow" : "bg-brand-border"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs font-medium uppercase tracking-wider text-brand-subtle">
                    Question {current + 1} of {questions.length}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-brand-text">
                    {questions[current].question}
                  </h3>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {questions[current].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(opt.value)}
                        className="flex items-center gap-3 rounded-xl border border-brand-border/50 p-4 text-left transition-all hover:border-brand-emerald/40 hover:bg-brand-emerald/5"
                      >
                        {"icon" in opt && opt.icon && (
                          <opt.icon className="h-5 w-5 shrink-0 text-brand-emerald-glow" />
                        )}
                        <span className="text-sm font-medium text-brand-text">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-brand-emerald-glow">
                    We recommend
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-brand-text">
                    {recommendation?.title}
                  </h3>
                  <p className="mt-3 text-brand-muted">{recommendation?.description}</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {recommendation?.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-brand-emerald/10 px-3 py-1 text-xs font-medium text-brand-emerald-glow"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <a href="#contact" className="btn-primary">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </a>
                    <button onClick={restart} className="btn-ghost text-sm">
                      Retake Quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
