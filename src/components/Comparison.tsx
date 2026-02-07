"use client"

import { motion } from "framer-motion"
import { Check, X, Minus, Crown } from "lucide-react"

type FeatureValue = "yes" | "no" | "partial" | string

interface ComparisonRow {
  feature: string
  diy: FeatureValue
  freelancer: FeatureValue
  agency: FeatureValue
  osprey: FeatureValue
}

const rows: ComparisonRow[] = [
  {
    feature: "Custom design & UX",
    diy: "no",
    freelancer: "partial",
    agency: "yes",
    osprey: "yes",
  },
  {
    feature: "Built for your business",
    diy: "no",
    freelancer: "partial",
    agency: "yes",
    osprey: "yes",
  },
  {
    feature: "Launch in weeks",
    diy: "no",
    freelancer: "partial",
    agency: "no",
    osprey: "yes",
  },
  {
    feature: "Affordable for small business",
    diy: "yes",
    freelancer: "yes",
    agency: "no",
    osprey: "yes",
  },
  {
    feature: "Direct communication",
    diy: "no",
    freelancer: "partial",
    agency: "no",
    osprey: "yes",
  },
  {
    feature: "You own all code & assets",
    diy: "partial",
    freelancer: "partial",
    agency: "partial",
    osprey: "yes",
  },
  {
    feature: "Ongoing support included",
    diy: "no",
    freelancer: "no",
    agency: "partial",
    osprey: "yes",
  },
  {
    feature: "No monthly platform lock-in",
    diy: "no",
    freelancer: "yes",
    agency: "partial",
    osprey: "yes",
  },
]

function CellIcon({ value }: { value: FeatureValue }) {
  if (value === "yes")
    return <Check className="h-5 w-5 text-brand-emerald-glow" />
  if (value === "no") return <X className="h-5 w-5 text-red-400/70" />
  if (value === "partial")
    return <Minus className="h-5 w-5 text-brand-gold-dim" />
  return <span className="text-sm text-brand-muted">{value}</span>
}

export default function Comparison() {
  return (
    <section className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center">
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
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 overflow-x-auto"
        >
          <div className="min-w-[640px]">
            <div className="glass-card overflow-hidden">
              {/* Header row */}
              <div className="grid grid-cols-5 border-b border-brand-border/50">
                <div className="p-4 sm:p-5" />
                <div className="p-4 text-center sm:p-5">
                  <span className="text-sm font-medium text-brand-subtle">
                    DIY Platforms
                  </span>
                  <p className="mt-0.5 text-xs text-brand-subtle/60">
                    Wix, Squarespace
                  </p>
                </div>
                <div className="p-4 text-center sm:p-5">
                  <span className="text-sm font-medium text-brand-subtle">
                    Freelancers
                  </span>
                  <p className="mt-0.5 text-xs text-brand-subtle/60">
                    Upwork, Fiverr
                  </p>
                </div>
                <div className="p-4 text-center sm:p-5">
                  <span className="text-sm font-medium text-brand-subtle">
                    Big Agencies
                  </span>
                  <p className="mt-0.5 text-xs text-brand-subtle/60">
                    $50k+ retainers
                  </p>
                </div>
                <div className="relative p-4 text-center sm:p-5">
                  <div className="absolute inset-0 bg-brand-emerald/5" />
                  <div className="relative">
                    <div className="mb-1 flex items-center justify-center gap-1">
                      <Crown className="h-3.5 w-3.5 text-brand-gold" />
                    </div>
                    <span className="text-sm font-semibold text-brand-emerald-glow">
                      Osprey Solutions
                    </span>
                    <p className="mt-0.5 text-xs text-brand-emerald-glow/60">
                      Best of all worlds
                    </p>
                  </div>
                </div>
              </div>

              {/* Data rows */}
              {rows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-5 ${
                    i < rows.length - 1 ? "border-b border-brand-border/30" : ""
                  }`}
                >
                  <div className="flex items-center p-4 sm:p-5">
                    <span className="text-sm font-medium text-brand-text">
                      {row.feature}
                    </span>
                  </div>
                  {(["diy", "freelancer", "agency", "osprey"] as const).map(
                    (col) => (
                      <div
                        key={col}
                        className={`flex items-center justify-center p-4 sm:p-5 ${
                          col === "osprey" ? "bg-brand-emerald/5" : ""
                        }`}
                      >
                        <CellIcon value={row[col]} />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
