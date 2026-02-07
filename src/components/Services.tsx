"use client"

import { motion } from "framer-motion"
import {
  Globe,
  Smartphone,
  Monitor,
  Workflow,
  Puzzle,
  Palette,
} from "lucide-react"

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
    title: "Automation",
    description:
      "Stop doing repetitive tasks manually. We build automations that save hours every week.",
    details: ["Workflow automation", "Email sequences", "Data pipelines", "Scheduled tasks"],
  },
  {
    icon: Puzzle,
    title: "Integrations",
    description:
      "Connect your tools so your data flows where it needs to go\u2014without manual effort.",
    details: ["API integrations", "Payment systems", "CRM connections", "Third-party APIs"],
  },
  {
    icon: Palette,
    title: "Branding & UX",
    description:
      "Clean, modern design that makes your business look as good as it performs.",
    details: ["UI/UX design", "Brand identity", "Design systems", "Prototyping"],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center">
          <span className="section-label">What We Build</span>
          <h2 className="section-title">
            Everything you need to{" "}
            <span className="text-gradient-emerald">grow online</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From landing pages to full-scale platforms, we handle the entire build
            so you can focus on running your business.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="glass-card-hover group p-6 sm:p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald-glow transition-colors group-hover:bg-brand-emerald/20">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-brand-text">
                {service.title}
              </h3>
              <p className="mt-3 text-brand-muted leading-relaxed">
                {service.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.details.map((detail) => (
                  <li
                    key={detail}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-brand-subtle"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
