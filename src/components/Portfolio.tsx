"use client"

import { motion } from "framer-motion"
import { ExternalLink, TrendingUp } from "lucide-react"

const projects = [
  {
    title: "Summit Fitness Studio",
    type: "Website + Booking System",
    description:
      "A modern marketing site with integrated class booking, membership management, and automated email sequences for a boutique fitness studio.",
    outcome: "3x more online bookings in the first month",
    tech: ["Next.js", "Stripe", "Tailwind CSS", "Supabase"],
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "BrightPath CRM",
    type: "Custom Web Application",
    description:
      "A full-featured CRM built for a growing consulting firm. Pipeline management, automated follow-ups, and client reporting\u2014all in one place.",
    outcome: "Saved 15 hours per week in manual data entry",
    tech: ["React", "Node.js", "PostgreSQL", "REST API"],
    color: "from-blue-500/20 to-indigo-500/10",
  },
  {
    title: "Verdant Market",
    type: "E-Commerce Platform",
    description:
      "A high-performance online store for an organic foods company with subscription management, inventory sync, and delivery zone routing.",
    outcome: "42% increase in average order value",
    tech: ["Next.js", "Shopify API", "Tailwind CSS", "Vercel"],
    color: "from-amber-500/20 to-orange-500/10",
  },
  {
    title: "TaskFlow Mobile",
    type: "Cross-Platform Mobile App",
    description:
      "A team productivity app for a construction company. Task assignment, photo documentation, GPS check-ins, and real-time progress updates.",
    outcome: "Adopted by 200+ field workers in 3 months",
    tech: ["React Native", "Firebase", "Maps API", "Push Notifications"],
    color: "from-purple-500/20 to-pink-500/10",
  },
  {
    title: "Heritage Law Group",
    type: "Website + Client Portal",
    description:
      "A professional website with a secure client portal for document sharing, appointment scheduling, and case status tracking.",
    outcome: "60% fewer status inquiry calls",
    tech: ["Next.js", "Auth0", "AWS S3", "Tailwind CSS"],
    color: "from-rose-500/20 to-red-500/10",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Portfolio() {
  return (
    <section id="work" className="section-padding relative">
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-brand-emerald/3 blur-[150px]" />

      <div className="section-container relative">
        {/* Header */}
        <div className="text-center">
          <span className="section-label">Featured Work</span>
          <h2 className="section-title">
            Real results for{" "}
            <span className="text-gradient-emerald">real businesses</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Every project starts with a business problem and ends with measurable
            impact. Here are a few we&apos;re proud of.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="glass-card-hover group flex flex-col overflow-hidden"
            >
              {/* Color bar top */}
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${project.color}`}
              />

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <span className="text-xs font-medium uppercase tracking-wider text-brand-subtle">
                  {project.type}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-brand-text">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">
                  {project.description}
                </p>

                {/* Outcome */}
                <div className="mt-5 flex items-start gap-2 rounded-lg bg-brand-emerald/8 p-3">
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-brand-emerald-glow" />
                  <span className="text-sm font-medium text-brand-emerald-glow">
                    {project.outcome}
                  </span>
                </div>

                {/* Tech */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-brand-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
