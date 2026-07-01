"use client"

import { useState, FormEvent } from "react"
import { CheckCircle2, Loader2, Send, Search, Smartphone, Gauge, TrendingUp } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Reveal, Stagger } from "@/components/fx"

const FORM_ENDPOINT = "/api/lead"

const whatYouGet = [
  { icon: Gauge, title: "Speed & performance check", text: "How fast your site loads and where it's costing you visitors." },
  { icon: Smartphone, title: "Mobile experience review", text: "Most customers are on their phone — we'll show you what they actually see." },
  { icon: Search, title: "Google visibility (SEO)", text: "Why customers can (or can't) find you when they search." },
  { icon: TrendingUp, title: "Conversion opportunities", text: "The 3 quickest changes to turn more visitors into calls and quotes." },
]

export default function FreeAuditPage() {
  const [form, setForm] = useState({ name: "", email: "", website: "", _honeypot: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  function validate() {
    const errs: typeof errors = {}
    if (!form.name.trim()) errs.name = "Name is required"
    if (!form.email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function update(field: keyof typeof form, value: string) {
    setForm((p) => ({ ...p, [field]: value }))
    if (field in errors) setErrors((p) => ({ ...p, [field]: undefined }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
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
          website: form.website,
          type: "free-audit",
          message: `Free website audit request. Site: ${form.website || "(none provided)"}`,
        }),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    "w-full rounded-xl border border-brand-border/50 bg-brand-dark/80 px-4 py-3.5 text-brand-text placeholder:text-brand-subtle transition-colors focus:border-brand-emerald/50 focus:outline-none focus:ring-2 focus:ring-brand-emerald/20"

  return (
    <>
      <Header />
      <main className="section-container relative flex min-h-screen flex-col items-center pt-28 pb-20 sm:pt-36">
        {/* Header */}
        <Reveal className="text-center">
          <span className="section-label">Free · No obligation</span>
          <h1 className="section-title mx-auto max-w-3xl">
            Get a free audit of your{" "}
            <span className="text-gradient-emerald">website</span>
          </h1>
          <p className="section-subtitle mx-auto">
            In 24 hours we&apos;ll send you a short, plain-English breakdown of what&apos;s
            working, what&apos;s costing you customers, and the fastest fixes — whether you
            hire us or not.
          </p>
        </Reveal>

        <div className="mt-14 grid w-full max-w-5xl gap-10 lg:grid-cols-5">
          {/* What you get */}
          <div className="lg:col-span-2">
            <Stagger className="space-y-5" gap={0.08}>
              {whatYouGet.map((item) => (
                <Reveal key={item.title}>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald-glow ring-1 ring-brand-emerald/20">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-text">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-brand-muted">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </Stagger>
            <p className="mt-8 text-sm text-brand-subtle">
              No sales pitch. Just a genuinely useful review from{" "}
              <span className="text-brand-text">Osprey Solutions</span>.
            </p>
          </div>

          {/* Form */}
          <Reveal className="lg:col-span-3" delay={0.15}>
            <div className="glass-card p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-emerald/20">
                    <CheckCircle2 className="h-8 w-8 text-brand-emerald-glow" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-brand-text">You&apos;re on the list!</h3>
                  <p className="mt-2 max-w-sm text-brand-muted">
                    We&apos;ll send your free website audit within 24 hours. Keep an eye on
                    your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form._honeypot}
                      onChange={(e) => update("_honeypot", e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-text">
                      Your name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
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
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@business.com"
                      className={inputClass}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="website" className="mb-1.5 block text-sm font-medium text-brand-text">
                      Your website <span className="text-brand-subtle">(optional)</span>
                    </label>
                    <input
                      id="website"
                      type="text"
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                      placeholder="yourbusiness.com — or leave blank if you don't have one yet"
                      className={inputClass}
                    />
                  </div>

                  <button type="submit" disabled={status === "loading"} className="btn-primary w-full text-base">
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" /> Get my free audit
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-center text-sm text-red-400">
                      Something went wrong. Email us at{" "}
                      <a href="mailto:antonio@ospreysolutionsllc.com" className="underline">
                        antonio@ospreysolutionsllc.com
                      </a>
                    </p>
                  )}

                  <p className="text-center text-xs text-brand-subtle">
                    You&apos;ll get your audit within 24 hours. No spam, no pressure.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  )
}
