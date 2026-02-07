"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, ChevronDown, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react"

const projects = [
  {
    title: "Summit Fitness Studio",
    type: "Website + Booking System",
    description:
      "A modern marketing site with integrated class booking, membership management, and automated email sequences for a boutique fitness studio.",
    outcome: "3x more online bookings in the first month",
    tech: ["Next.js", "Stripe", "Tailwind CSS", "Supabase"],
    color: "from-emerald-500/20 to-teal-500/10",
    caseStudy: {
      problem: "Summit was using a basic template site with no online booking. Customers had to call or walk in to sign up for classes, creating friction and lost revenue.",
      solution: "We built a custom website with real-time class scheduling, online membership sign-ups, automated confirmation emails, and a member dashboard.",
      results: "Online bookings tripled in the first month. No-show rates dropped 25% thanks to automated reminders. The owner saved 10+ hours per week on admin.",
    },
  },
  {
    title: "BrightPath CRM",
    type: "Custom Web Application",
    description:
      "A full-featured CRM built for a growing consulting firm. Pipeline management, automated follow-ups, and client reporting\u2014all in one place.",
    outcome: "Saved 15 hours per week in manual data entry",
    tech: ["React", "Node.js", "PostgreSQL", "REST API"],
    color: "from-blue-500/20 to-indigo-500/10",
    caseStudy: {
      problem: "BrightPath was juggling spreadsheets, email threads, and sticky notes to track 200+ client relationships. Leads were falling through the cracks.",
      solution: "We built a custom CRM with pipeline visualization, automated follow-up sequences, client reporting dashboards, and integration with their email and calendar.",
      results: "The team saves 15 hours per week. Lead response time dropped from 48 hours to under 2 hours. Close rate improved by 20%.",
    },
  },
  {
    title: "Verdant Market",
    type: "E-Commerce Platform",
    description:
      "A high-performance online store for an organic foods company with subscription management, inventory sync, and delivery zone routing.",
    outcome: "42% increase in average order value",
    tech: ["Next.js", "Shopify API", "Tailwind CSS", "Vercel"],
    color: "from-amber-500/20 to-orange-500/10",
    caseStudy: {
      problem: "Verdant Market had a basic Shopify theme that didn\u2019t support subscriptions or local delivery zones. Cart abandonment was over 70%.",
      solution: "We built a custom storefront with smart product bundling, subscription management, delivery zone routing, and a streamlined 2-step checkout.",
      results: "Average order value jumped 42%. Cart abandonment dropped to 35%. Subscription revenue now accounts for 40% of monthly sales.",
    },
  },
  {
    title: "TaskFlow Mobile",
    type: "Cross-Platform Mobile App",
    description:
      "A team productivity app for a construction company. Task assignment, photo documentation, GPS check-ins, and real-time progress updates.",
    outcome: "Adopted by 200+ field workers in 3 months",
    tech: ["React Native", "Firebase", "Maps API", "Push Notifications"],
    color: "from-purple-500/20 to-pink-500/10",
    caseStudy: {
      problem: "Field crews relied on group texts and paper forms to track job progress. Photos got lost, tasks were duplicated, and managers had no real-time visibility.",
      solution: "We built a cross-platform mobile app with GPS check-ins, photo documentation tied to tasks, real-time progress dashboards, and push notification alerts.",
      results: "200+ field workers adopted the app within 3 months. Project completion time improved by 18%. Photo documentation disputes dropped to near zero.",
    },
  },
  {
    title: "Heritage Law Group",
    type: "Website + Client Portal",
    description:
      "A professional website with a secure client portal for document sharing, appointment scheduling, and case status tracking.",
    outcome: "60% fewer status inquiry calls",
    tech: ["Next.js", "Auth0", "AWS S3", "Tailwind CSS"],
    color: "from-rose-500/20 to-red-500/10",
    caseStudy: {
      problem: "The firm\u2019s outdated site didn\u2019t reflect their premium brand. Clients called constantly for case updates, overwhelming the support staff.",
      solution: "We redesigned the website to match their prestige and added a secure client portal with document uploads, appointment scheduling, and real-time case status tracking.",
      results: "Status inquiry calls dropped 60%. Client satisfaction scores improved by 35%. The firm signed 25% more new clients from organic website traffic.",
    },
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

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      className="glass-card-hover group flex flex-col overflow-hidden"
    >
      {/* Color bar top */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${project.color}`} />

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

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-emerald-glow transition-colors hover:text-brand-emerald-light"
        >
          {expanded ? "Hide" : "View"} Case Study
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>

        {/* Case Study Expander */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4 border-t border-brand-border/30 pt-4">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-400">Problem</p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-muted">{project.caseStudy.problem}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Solution</p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-muted">{project.caseStudy.solution}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-brand-emerald-glow" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-emerald-glow">Results</p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-muted">{project.caseStudy.results}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
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
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
