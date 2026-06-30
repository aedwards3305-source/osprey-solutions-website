"use client"

import { motion } from "framer-motion"
import { Check, X, Minus, Crown } from "lucide-react"
import { Reveal } from "@/components/fx"

type FeatureValue = "yes" | "no" | "partial" | string

interface ComparisonRow {
  feature: string
  diy: FeatureValue
  freelancer: FeatureValue
  agency: FeatureValue
  osprey: FeatureValue
}

const rows: ComparisonRow[] = [
  { feature: "Custom design & UX", diy: "no", freelancer: "partial", agency: "yes", osprey: "yes" },
  { feature: "Built for your business", diy: "no", freelancer: "partial", agency: "yes", osprey: "yes" },
  { feature: "Launch in weeks", diy: "no", freelancer: "partial", agency: "no", osprey: "yes" },
  { feature: "Affordable for small business", diy: "yes", freelancer: "yes", agency: "no", osprey: "yes" },
  { feature: "Direct communication", diy: "no", freelancer: "partial", agency: "no", osprey: "yes" },
  { feature: "You own all code & assets", diy: "partial", freelancer: "partial", agency: "partial", osprey: "yes" },
  { feature: "Ongoing support included", diy: "no", freelancer: "no", agency: "partial", osprey: "yes" },
  { feature: "AI-powered features built in", diy: "no", freelancer: "no", agency: "partial", osprey: "yes" },
  { feature: "No monthly platform lock-in", diy: "no", freelancer: "yes", agency: "partial", osprey: "yes" },
]

function CellIcon({ value }: { value: FeatureValue }) {
  let inner
  if (value === "yes") inner = <Check className="h-5 w-5 text-brand-emerald-glow" />
  else if (value === "no") inner = <X className="h-5 w-5 text-red-400/70" />
  else if (value === "partial") inner = <Minus className="h-5 w-5 text-brand-gold-dim" />
  else return <span className="text-sm text-brand-muted">{value}</span>

  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className="inline-flex"
    >
      {inner}
    </motion.span>
  )
}

export default function Comparison() {
  return (
    <section className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <Reveal className="text-center">
          <span className="section-label">Why Osprey Solutions</span>
          <h2 className="section-title">
            Better than DIY.{" "}
            <span className="text-gradient-gold">Faster than agencies.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            DIY platforms leave you with cookie-cutter sites. Big agencies charge
            $50k and take 6 months. Osprey Solutions gives you agency quality at a pace and
            price that actually works.
          </p>
        </Reveal>

        {/* Table */}
        <Reveal className="mt-16 overflow-x-auto" delay={0.1}>
          <div className="min-w-[640px]">
            <div className="glass-card relative overflow-hidden">
              {/* Osprey column glow */}
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-1/5 bg-gradient-to-b from-brand-emerald/15 via-brand-emerald/8 to-transparent" />
              <div className="pointer-events-none absolute -top-10 right-0 h-40 w-1/5 bg-brand-emerald/20 blur-3xl" />

              {/* Header row */}
              <div className="relative grid grid-cols-5 border-b border-brand-border/50">
                <div className="p-4 sm:p-5" />
                {[
                  { label: "DIY Platforms", sub: "Wix, Squarespace" },
                  { label: "Freelancers", sub: "Upwork, Fiverr" },
                  { label: "Big Agencies", sub: "$50k+ retainers" },
                ].map((col) => (
                  <div key={col.label} className="p-4 text-center sm:p-5">
                    <span className="text-sm font-medium text-brand-subtle">{col.label}</span>
                    <p className="mt-0.5 text-xs text-brand-subtle/60">{col.sub}</p>
                  </div>
                ))}
                {/* Osprey header — raised + glowing */}
                <div className="relative -my-px rounded-t-xl p-4 text-center ring-1 ring-brand-emerald/30 sm:p-5">
                  <div className="mb-1 flex items-center justify-center">
                    <Crown className="h-4 w-4 text-brand-gold" />
                  </div>
                  <span className="text-sm font-semibold text-brand-emerald-glow">Osprey Solutions</span>
                  <p className="mt-0.5 text-xs text-brand-emerald-glow/60">Best of all worlds</p>
                </div>
              </div>

              {/* Data rows */}
              {rows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`relative grid grid-cols-5 ${
                    i < rows.length - 1 ? "border-b border-brand-border/30" : ""
                  }`}
                >
                  <div className="flex items-center p-4 sm:p-5">
                    <span className="text-sm font-medium text-brand-text">{row.feature}</span>
                  </div>
                  {(["diy", "freelancer", "agency", "osprey"] as const).map((col) => (
                    <div
                      key={col}
                      className={`flex items-center justify-center p-4 sm:p-5 ${
                        col === "osprey" ? "relative ring-1 ring-inset ring-brand-emerald/15" : ""
                      }`}
                    >
                      <CellIcon value={row[col]} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
