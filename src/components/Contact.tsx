"use client"

import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import {
  Send,
  CheckCircle2,
  Loader2,
  Mail,
  Clock,
  Shield,
  Calendar,
} from "lucide-react"

const FORM_ENDPOINT = "/api/lead"
// To use Formspree instead, uncomment the line below and add your form ID:
// const FORM_ENDPOINT = "https://formspree.io/f/xxxxxx"

const projectTypes = [
  "Website",
  "Web App",
  "Mobile App",
  "E-Commerce",
  "Automation",
  "Branding / Design",
  "Other",
]

const budgetRanges = [
  "Under $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Not sure yet",
]

const timelines = [
  "ASAP",
  "1–2 months",
  "2–4 months",
  "Flexible",
]

interface FormData {
  name: string
  email: string
  phone: string
  projectType: string
  budget: string
  timeline: string
  message: string
  _honeypot: string
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    _honeypot: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  function validate(): boolean {
    const errs: typeof errors = {}
    if (!form.name.trim()) errs.name = "Name is required"
    if (!form.email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email"
    if (!form.message.trim()) errs.message = "Tell us about your project"
    else if (form.message.trim().length < 10)
      errs.message = "Please provide a bit more detail (10+ characters)"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Honeypot check
    if (form._honeypot) return

    if (!validate()) return

    setStatus("loading")
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          projectType: form.projectType,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
          type: "quote-request",
        }),
      })
      if (res.ok) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-xl border bg-brand-dark/80 px-4 py-3.5 text-brand-text placeholder:text-brand-subtle transition-colors focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20"
        : "border-brand-border/50 focus:border-brand-emerald/50 focus:ring-brand-emerald/20"
    }`

  return (
    <section id="contact" className="section-padding relative">
      <div className="pointer-events-none absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-brand-emerald/3 blur-[150px]" />

      <div className="section-container relative">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center">
            <span className="section-label">Get Started</span>
            <h2 className="section-title">
              Let&apos;s build something{" "}
              <span className="text-gradient-emerald">great together</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Tell us about your project and we&apos;ll get back to you with a
              clear plan, timeline, and quote\u2014no obligation.
            </p>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-5">
            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-2">
              <div className="glass-card p-6">
                <h3 className="font-semibold text-brand-text">
                  What happens next?
                </h3>
                <ul className="mt-4 space-y-4">
                  {[
                    {
                      icon: Mail,
                      text: "We review your project details",
                    },
                    {
                      icon: Calendar,
                      text: "We schedule a free discovery call",
                    },
                    {
                      icon: Clock,
                      text: "You receive a detailed proposal",
                    },
                    {
                      icon: Shield,
                      text: "You approve before any work begins",
                    },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/10">
                        <item.icon className="h-4 w-4 text-brand-emerald-glow" />
                      </div>
                      <span className="text-sm text-brand-muted">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-6">
                <p className="text-sm text-brand-muted">
                  Prefer to talk live?
                </p>
                <a
                  href="https://calendly.com/osprey-solutions/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-3 w-full text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  Book a Call
                </a>
              </div>

              <p className="text-center text-sm text-brand-subtle lg:text-left">
                Or email us directly at{" "}
                <a
                  href="mailto:hello@ospreysolutions.io"
                  className="text-brand-emerald-glow underline underline-offset-4"
                >
                  hello@ospreysolutions.io
                </a>
              </p>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 sm:p-8 lg:col-span-3"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-emerald/20">
                    <CheckCircle2 className="h-8 w-8 text-brand-emerald-glow" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-brand-text">
                    Message received!
                  </h3>
                  <p className="mt-2 max-w-sm text-brand-muted">
                    We&apos;ll review your project details and get back to you
                    within 24 hours with next steps.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle")
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        projectType: "",
                        budget: "",
                        timeline: "",
                        message: "",
                        _honeypot: "",
                      })
                    }}
                    className="btn-ghost mt-6 text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <input
                      type="text"
                      name="_honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form._honeypot}
                      onChange={(e) => updateField("_honeypot", e.target.value)}
                    />
                  </div>

                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-text">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Your name"
                        className={inputClass("name")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-text">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="you@company.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-text">
                      Phone <span className="text-brand-subtle">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                      className={inputClass("phone")}
                    />
                  </div>

                  {/* Project type + Budget */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="projectType" className="mb-1.5 block text-sm font-medium text-brand-text">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        value={form.projectType}
                        onChange={(e) => updateField("projectType", e.target.value)}
                        className={`${inputClass("projectType")} appearance-none`}
                      >
                        <option value="">Select a type</option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-brand-text">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        value={form.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                        className={`${inputClass("budget")} appearance-none`}
                      >
                        <option value="">Select a range</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium text-brand-text">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      value={form.timeline}
                      onChange={(e) => updateField("timeline", e.target.value)}
                      className={`${inputClass("timeline")} appearance-none`}
                    >
                      <option value="">When do you need this?</option>
                      {timelines.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-text">
                      Project Details <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Tell us about your project\u2014what you need, who it's for, and what success looks like."
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full text-base"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Request a Quote
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-center text-sm text-red-400">
                      Something went wrong. Please try again or email us at{" "}
                      <a
                        href="mailto:hello@ospreysolutions.io"
                        className="underline"
                      >
                        hello@ospreysolutions.io
                      </a>
                    </p>
                  )}

                  <p className="text-center text-xs text-brand-subtle">
                    You&apos;ll hear back within 24 hours. No spam, no pressure.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
