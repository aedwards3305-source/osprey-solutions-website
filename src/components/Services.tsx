"use client"

import {
  Globe,
  Smartphone,
  Monitor,
  Workflow,
  Puzzle,
  Search,
} from "lucide-react"
import { Reveal, Stagger, TiltCard } from "@/components/fx"

const services = [
  {
    icon: Globe,
    title: "Websites",
    description:
      "Fast, responsive websites that convert visitors into customers. SEO-optimized and built to grow with your business.",
    details: ["Marketing sites", "E-commerce", "Landing pages", "Blogs & CMS"],
  },
  {
    icon: Monitor,
    title: "Web Apps",
    description:
      "Custom web applications that streamline operations and deliver real business value from day one.",
    details: ["Dashboards", "SaaS platforms", "Client portals", "Internal tools"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-quality mobile apps for iOS and Android that your customers will love using.",
    details: ["Cross-platform", "iOS & Android", "App Store submission", "Push notifications"],
  },
  {
    icon: Workflow,
    title: "AI & Automation",
    description:
      "From AI chatbots to smart workflows, we build intelligent automations that save hours and surface insights you’d miss.",
    details: ["AI chatbots", "Smart workflows", "Predictive analytics", "Process automation"],
  },
  {
    icon: Puzzle,
    title: "Integrations",
    description:
      "Connect your tools so your data flows where it needs to go—without manual effort.",
    details: ["API integrations", "Payment systems", "CRM connections", "Third-party APIs"],
  },
  {
    icon: Search,
    title: "SEO",
    description:
      "Get found on Google. We optimize your site structure, content, and technical performance so customers find you first.",
    details: ["Technical SEO", "On-page optimization", "Local SEO", "Analytics & reporting"],
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <Reveal className="text-center">
          <span className="section-label">What We Build</span>
          <h2 className="section-title">
            Everything you need to{" "}
            <span className="text-gradient-emerald">grow online</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From landing pages to AI-powered platforms, we handle the entire build
            so you can focus on running your business.
          </p>
        </Reveal>

        {/* Grid */}
        <Stagger
          gap={0.07}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [perspective:1200px]"
        >
          {services.map((service) => (
            <Reveal key={service.title}>
              <TiltCard className="h-full" max={6}>
                <div className="gradient-border group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border/50 bg-brand-card/40 p-6 backdrop-blur-sm transition-colors duration-300 sm:p-8">
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-emerald/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon tile */}
                  <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-emerald/10 text-brand-emerald-glow ring-1 ring-brand-emerald/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand-emerald/20 group-hover:ring-brand-emerald/40">
                    <service.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <h3 className="relative text-xl font-semibold text-brand-text">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 flex-1 leading-relaxed text-brand-muted">
                    {service.description}
                  </p>
                  <ul className="relative mt-5 flex flex-wrap gap-2">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-brand-subtle transition-colors group-hover:border-brand-emerald/20"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
