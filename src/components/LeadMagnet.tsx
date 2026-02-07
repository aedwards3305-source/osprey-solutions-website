"use client"

import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import { FileText, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

export default function LeadMagnet() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email,
          type: "lead-magnet",
          message: "Free 15-minute build plan request",
        }),
      })
      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-brand-gold/20 bg-gradient-to-br from-brand-card to-brand-dark p-8 sm:p-12"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-gold/5 blur-[80px]" />

          <div className="relative text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold/10">
              <FileText className="h-7 w-7 text-brand-gold" />
            </div>

            <h2 className="text-2xl font-bold text-brand-text sm:text-3xl">
              Free 15-Minute Build Plan
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-muted">
              Tell us your email and we&apos;ll send you a personalized project
              outline&mdash;what to build, what it costs, and how fast we can ship it.
              No commitment.
            </p>

            {status === "success" ? (
              <div className="mt-8 flex items-center justify-center gap-2 text-brand-emerald-glow">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">
                  Check your inbox&mdash;your build plan is on the way.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 rounded-xl border border-brand-border/50 bg-brand-dark/80 px-4 py-3.5 text-brand-text placeholder:text-brand-subtle focus:border-brand-gold/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-secondary whitespace-nowrap px-6"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Get My Plan <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-3 text-sm text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <p className="mt-4 text-xs text-brand-subtle">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
