"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Calculator, Check, Sparkles } from "lucide-react"

const projectTypes = [
  { id: "website", label: "Website", base: 2000, description: "Marketing site, landing pages" },
  { id: "ecommerce", label: "E-Commerce", base: 4000, description: "Online store with payments" },
  { id: "webapp", label: "Web Application", base: 5000, description: "Custom dashboard, portal, CRM" },
  { id: "mobile", label: "Mobile App", base: 6000, description: "iOS & Android application" },
]

const features = [
  { id: "design", label: "Custom Design", cost: 1000 },
  { id: "cms", label: "Content Management", cost: 800 },
  { id: "auth", label: "User Authentication", cost: 1200 },
  { id: "payments", label: "Payment Processing", cost: 1000 },
  { id: "analytics", label: "Analytics Dashboard", cost: 1500 },
  { id: "api", label: "Third-Party Integrations", cost: 1000 },
  { id: "seo", label: "SEO Optimization", cost: 600 },
  { id: "email", label: "Email Automation", cost: 800 },
]

const timelines = [
  { id: "standard", label: "Standard", multiplier: 1, description: "Regular timeline" },
  { id: "rush", label: "Rush", multiplier: 1.3, description: "Priority delivery" },
]

export default function CostEstimator() {
  const [step, setStep] = useState(0)
  const [projectType, setProjectType] = useState("")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [timeline, setTimeline] = useState("standard")

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const calculateEstimate = () => {
    const base = projectTypes.find((p) => p.id === projectType)?.base || 0
    const featureCost = selectedFeatures.reduce((sum, fId) => {
      const feature = features.find((f) => f.id === fId)
      return sum + (feature?.cost || 0)
    }, 0)
    const mult = timelines.find((t) => t.id === timeline)?.multiplier || 1
    const total = (base + featureCost) * mult
    return { low: Math.round(total * 0.85), high: Math.round(total * 1.15) }
  }

  const canProceed = step === 0 ? !!projectType : step === 1 ? selectedFeatures.length > 0 : true

  const estimate = calculateEstimate()

  return (
    <section id="estimator" className="section-padding relative">
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-brand-gold/3 blur-[150px]" />

      <div className="section-container relative">
        <div className="text-center">
          <span className="section-label">
            <Calculator className="h-4 w-4" /> Instant Estimate
          </span>
          <h2 className="section-title">
            Get a ballpark in{" "}
            <span className="text-gradient-gold">60 seconds</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Configure your project and see an instant estimate. No commitment, no email required.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          {/* Progress bar */}
          <div className="mb-8 flex items-center gap-2">
            {["Project Type", "Features", "Timeline", "Estimate"].map((label, i) => (
              <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={`h-1.5 w-full rounded-full transition-colors ${
                    i <= step ? "bg-brand-gold" : "bg-brand-border"
                  }`}
                />
                <span className={`text-xs ${i <= step ? "text-brand-gold" : "text-brand-subtle"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="glass-card min-h-[340px] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="type"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-brand-text">What are you building?</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setProjectType(type.id)}
                        className={`rounded-xl border p-4 text-left transition-all ${
                          projectType === type.id
                            ? "border-brand-gold bg-brand-gold/10"
                            : "border-brand-border/50 hover:border-brand-border"
                        }`}
                      >
                        <p className={`font-semibold ${projectType === type.id ? "text-brand-gold" : "text-brand-text"}`}>
                          {type.label}
                        </p>
                        <p className="mt-1 text-sm text-brand-muted">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-brand-text">What features do you need?</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {features.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                          selectedFeatures.includes(feature.id)
                            ? "border-brand-gold bg-brand-gold/10"
                            : "border-brand-border/50 hover:border-brand-border"
                        }`}
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                            selectedFeatures.includes(feature.id)
                              ? "border-brand-gold bg-brand-gold text-brand-black"
                              : "border-brand-border"
                          }`}
                        >
                          {selectedFeatures.includes(feature.id) && <Check className="h-3 w-3" />}
                        </div>
                        <span className={`text-sm font-medium ${selectedFeatures.includes(feature.id) ? "text-brand-gold" : "text-brand-text"}`}>
                          {feature.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-brand-text">What&apos;s your timeline?</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {timelines.map((tl) => (
                      <button
                        key={tl.id}
                        onClick={() => setTimeline(tl.id)}
                        className={`rounded-xl border p-4 text-left transition-all ${
                          timeline === tl.id
                            ? "border-brand-gold bg-brand-gold/10"
                            : "border-brand-border/50 hover:border-brand-border"
                        }`}
                      >
                        <p className={`font-semibold ${timeline === tl.id ? "text-brand-gold" : "text-brand-text"}`}>
                          {tl.label}
                        </p>
                        <p className="mt-1 text-sm text-brand-muted">{tl.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="estimate"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-4 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/10">
                    <Sparkles className="h-8 w-8 text-brand-gold" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-brand-text">Your Estimated Investment</h3>
                  <p className="mt-4 text-5xl font-bold tracking-tight text-brand-text">
                    ${estimate.low.toLocaleString()}&ndash;${estimate.high.toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-brand-muted">
                    Based on your selections. Final pricing after a discovery call.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a href="#contact" className="btn-primary">
                      Get Exact Quote <ArrowRight className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => {
                        setStep(0)
                        setProjectType("")
                        setSelectedFeatures([])
                        setTimeline("standard")
                      }}
                      className="btn-ghost"
                    >
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {step < 3 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                className="flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-text disabled:invisible"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed}
                className="btn-primary disabled:opacity-40 disabled:pointer-events-none"
              >
                {step === 2 ? "See Estimate" : "Next"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
