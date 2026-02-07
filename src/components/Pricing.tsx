"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Sparkles } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$2,500",
    period: "starting at",
    description: "Perfect for new businesses that need a professional online presence fast.",
    features: [
      "Up to 5-page responsive website",
      "Mobile-optimized design",
      "Contact form with notifications",
      "Basic SEO setup",
      "Google Analytics integration",
      "2 rounds of revisions",
      "1 month post-launch support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$6,000",
    period: "starting at",
    description: "For businesses ready to grow with a custom site that drives leads and sales.",
    features: [
      "Up to 12-page custom website",
      "Advanced UI/UX design",
      "CMS integration (blog, content)",
      "Advanced SEO & performance",
      "E-commerce or booking system",
      "Third-party integrations",
      "3 rounds of revisions",
      "3 months post-launch support",
    ],
    cta: "Request a Quote",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Pro",
    price: "$12,000",
    period: "starting at",
    description: "Full-scale web apps and platforms built to handle serious business logic.",
    features: [
      "Custom web application",
      "User authentication & roles",
      "Database design & API",
      "Admin dashboard",
      "Automated workflows",
      "Payment processing",
      "Unlimited revisions in scope",
      "6 months post-launch support",
    ],
    cta: "Request a Quote",
    highlighted: false,
  },
  {
    name: "Custom",
    price: "Let\u2019s Talk",
    period: "",
    description: "Enterprise solutions, mobile apps, or multi-platform systems built to your exact spec.",
    features: [
      "Mobile apps (iOS + Android)",
      "Complex integrations",
      "Multi-platform systems",
      "Dedicated project manager",
      "Custom SLA & support",
      "Scalable infrastructure",
      "Priority development",
      "Ongoing retainer available",
    ],
    cta: "Book a Call",
    highlighted: false,
    isCustom: true,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding relative">
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-brand-gold/3 blur-[150px]" />

      <div className="section-container relative">
        {/* Header */}
        <div className="text-center">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">
            Transparent pricing.{" "}
            <span className="text-gradient-gold">No surprises.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Every project is scoped to your needs. These starting points give you
            a clear picture of investment\u2014final pricing depends on your specific
            requirements.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
                plan.highlighted
                  ? "border-brand-emerald/40 bg-brand-card/80 shadow-lg shadow-brand-emerald/5"
                  : "border-brand-border/50 bg-brand-card/60"
              } backdrop-blur-xl`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="gold-badge">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan info */}
              <div>
                <h3 className="text-lg font-semibold text-brand-text">
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span
                    className={`text-3xl font-bold ${
                      plan.isCustom
                        ? "text-gradient-gold"
                        : "text-brand-text"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-brand-subtle">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.highlighted
                          ? "text-brand-emerald-glow"
                          : "text-brand-subtle"
                      }`}
                    />
                    <span className="text-sm text-brand-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.isCustom ? "#book" : "#contact"}
                className={`mt-8 ${
                  plan.highlighted ? "btn-primary" : "btn-secondary"
                } w-full text-sm`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-10 text-center text-sm text-brand-subtle">
          Prices are starting estimates. Final pricing is based on project scope,
          complexity, and timeline discussed during your free consultation.
        </p>
      </div>
    </section>
  )
}
