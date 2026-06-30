"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, ChevronDown, AlertTriangle, Lightbulb, BarChart3, ExternalLink } from "lucide-react"
import { Reveal, TiltCard, BrowserFrame } from "@/components/fx"

/* ━━━ Project Data ━━━ */

type Category = "Websites" | "Apps" | "E-Commerce"

interface Project {
  title: string
  type: string
  category: Category
  url?: string
  image: string
  description: string
  outcome: string
  tech: string[]
  caseStudy: { problem: string; solution: string; results: string }
}

const projects: Project[] = [
  {
    title: "Variety Amaya LLC",
    type: "Website + Lead Generation",
    category: "Websites",
    url: "https://varietyamaya.net",
    image: "/variety-amaya.png",
    description:
      "A professional website for a licensed general contractor serving the DMV area. 24+ service categories, online estimate requests, customer testimonials, and a mobile-optimized lead funnel.",
    outcome: "3x more estimate requests in the first 60 days",
    tech: ["Next.js", "Tailwind CSS", "Vercel", "SEO"],
    caseStudy: {
      problem: "Variety Amaya had no website and relied entirely on word-of-mouth and yard signs. Potential customers searching for contractors online couldn’t find them, and they were losing jobs to competitors with a digital presence.",
      solution: "We built a professional, mobile-first website showcasing all 24+ services with a fast estimate request form, customer testimonials, trust signals (licensed & insured, military discounts), and local SEO optimization for the DMV market.",
      results: "Estimate requests tripled in the first 60 days. The site ranks on page one for key local search terms. The owner reports that most new customers now find them through the website instead of referrals alone.",
    },
  },
  {
    title: "B&R Seafood and More",
    type: "Restaurant Website",
    category: "Websites",
    url: "https://brseafoodandmore.com",
    image: "/seafood-restaurant.png",
    description:
      "A stunning restaurant website for a family-owned seafood spot featuring an online menu, event bookings, ordering integration, and a brand identity that captures the warmth of Southern seafood.",
    outcome: "Online orders up 4x within the first month",
    tech: ["Next.js", "Tailwind CSS", "Vercel", "SEO"],
    caseStudy: {
      problem: "B&R Seafood had no online presence beyond a basic social media page. Customers couldn’t find their menu, hours, or location easily, and the business was invisible to anyone searching online.",
      solution: "We designed and built a polished restaurant website with a full digital menu, online ordering flow, event booking, location and hours prominently displayed, and local SEO to drive foot traffic.",
      results: "Online orders quadrupled in the first month. Google search visibility increased significantly, and the owner reports a steady stream of new customers who found them through the website.",
    },
  },
  {
    title: "SafeSpace Inspection Tool",
    type: "Web Application",
    category: "Apps",
    url: "https://safespace-jbh.vercel.app/welcome",
    image: "/safespace-inspection.png",
    description:
      "A hospital EVS inspection platform with comprehensive building cleanliness assessments, real-time scoring, mobile-first design, and professional report generation—all from a phone or tablet.",
    outcome: "Inspection time reduced by 60%",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "PDF Generation"],
    caseStudy: {
      problem: "Hospital EVS teams were using paper checklists and spreadsheets for facility cleanliness inspections. Reports took hours to compile, scores were inconsistent, and there was no way to track trends over time.",
      solution: "We built a mobile-first inspection platform with standardized scoring across 11 critical areas, voice-to-text notes, real-time dashboards, automated PDF report generation, and 24/7 offline support.",
      results: "Inspection time dropped by 60%. Reports that used to take hours are now generated instantly. Management gained real-time visibility into facility cleanliness trends across all locations.",
    },
  },
  {
    title: "Beaton Junk Removal",
    type: "Website + Lead Generation",
    category: "Websites",
    url: "https://beaton-junk-removal.vercel.app",
    image: "/beaton-junk-removal.png",
    description:
      "A high-converting website for a San Antonio junk removal company with instant quote requests, click-to-call functionality, service area mapping, and trust signals that drive bookings.",
    outcome: "2x more quote requests in the first 30 days",
    tech: ["Next.js", "Tailwind CSS", "Vercel", "SEO"],
    caseStudy: {
      problem: "Beaton Junk Removal relied on word-of-mouth and Craigslist ads. They had no professional website, making it hard to compete with established hauling companies in the San Antonio market.",
      solution: "We built a bold, conversion-focused website with prominent CTAs, click-to-call buttons, a gallery of completed jobs, customer reviews, same-day service messaging, and local SEO targeting San Antonio neighborhoods.",
      results: "Quote requests doubled in the first 30 days. The site ranks for key local search terms. The owner reports that the website now generates more leads than all other channels combined.",
    },
  },
  {
    title: "Paradise Travels",
    type: "Travel Agency Website",
    category: "Websites",
    url: "https://travel-agent-site.vercel.app",
    image: "/travel-agent-site.png",
    description:
      "A luxury travel agency website featuring Caribbean destination packages, immersive imagery, itinerary browsing, and a seamless booking inquiry flow designed to convert browsers into travelers.",
    outcome: "3x more booking inquiries in 60 days",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    caseStudy: {
      problem: "The agency was booking trips through phone calls and email chains. They had no website to showcase destinations, and potential clients couldn’t browse packages or get inspired before reaching out.",
      solution: "We designed a visually stunning website with destination showcases, curated package browsing, immersive photography, trust signals (10+ years, 4.9-star rating), and a streamlined inquiry form that captures trip preferences.",
      results: "Booking inquiries tripled within 60 days. The average trip value increased as clients came in more informed and inspired. The agency now handles 40% of initial consultations through the website.",
    },
  },
  {
    title: "New Era Studios",
    type: "E-Commerce Store",
    category: "E-Commerce",
    image: "/new-era-hair.png",
    description:
      "A premium e-commerce store for luxury virgin hair extensions, HD lace wigs, and closures. Features product filtering, bundle deals, a clean shopping experience, and a brand identity that reflects elegance.",
    outcome: "Launched with 50+ products and growing",
    tech: ["Next.js", "Stripe", "Tailwind CSS", "Vercel"],
    caseStudy: {
      problem: "New Era Studios was selling exclusively through Instagram DMs and cash transactions. There was no catalog, no inventory tracking, and the buying process was friction-heavy for customers.",
      solution: "We built a modern e-commerce storefront with product categories, bundle pricing, high-quality product photography layouts, free shipping thresholds, and secure checkout with Stripe integration.",
      results: "Launched with 50+ products. Customers can now browse and purchase 24/7 without DMs. Average order value increased thanks to bundle deals and cross-sells displayed on the site.",
    },
  },
]

const filters: Array<"All" | Category> = ["All", "Websites", "Apps", "E-Commerce"]

/* ━━━ Project Card ━━━ */

function ProjectCard({
  project,
  expanded,
  onToggle,
}: {
  project: Project
  expanded: boolean
  onToggle: () => void
}) {
  const preview = (
    <BrowserFrame className="transition-shadow duration-300 group-hover:shadow-brand-emerald/10">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} website screenshot`}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
      </div>
      {project.url && (
        <div className="pointer-events-none absolute right-3 top-12 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ExternalLink className="h-3 w-3" /> Visit live site
        </div>
      )}
    </BrowserFrame>
  )

  return (
    <TiltCard className="h-full [perspective:1000px]" max={5}>
      <div className="glass-card-hover group flex h-full flex-col overflow-hidden rounded-2xl">
        {/* Device-framed preview */}
        <div className="p-4 pb-0">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
              {preview}
            </a>
          ) : (
            preview
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <span className="text-xs font-medium uppercase tracking-wider text-brand-subtle">
            {project.type}
          </span>
          <h3 className="mt-2 text-xl font-semibold text-brand-text">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">
            {project.description}
          </p>

          {/* Outcome */}
          <div className="mt-5 flex items-start gap-2 rounded-lg bg-brand-emerald/8 p-3 ring-1 ring-brand-emerald/15">
            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-brand-emerald-glow" />
            <span className="text-sm font-medium text-brand-emerald-glow">{project.outcome}</span>
          </div>

          {/* Tech */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-brand-subtle">
                {t}
              </span>
            ))}
          </div>

          {/* Expand toggle */}
          <button
            onClick={onToggle}
            className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-emerald-glow transition-colors hover:text-brand-emerald-light"
          >
            {expanded ? "Hide" : "View"} Case Study
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>

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
      </div>
    </TiltCard>
  )
}

/* ━━━ Section ━━━ */

export default function Portfolio() {
  const [active, setActive] = useState<"All" | Category>("All")
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  )

  const toggle = (title: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      return next
    })

  return (
    <section id="work" className="section-padding relative">
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-brand-emerald/3 blur-[150px]" />

      <div className="section-container relative">
        {/* Header */}
        <Reveal className="text-center">
          <span className="section-label">Featured Work</span>
          <h2 className="section-title">
            Real results for <span className="text-gradient-emerald">real businesses</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Every project starts with a business problem and ends with measurable impact.
            Here are a few we&apos;re proud of.
          </p>
        </Reveal>

        {/* Filter tabs */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2" delay={0.1}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                active === f
                  ? "border-brand-emerald/40 bg-brand-emerald/15 text-brand-emerald-glow"
                  : "border-brand-border/50 text-brand-muted hover:border-brand-emerald/30 hover:text-brand-text"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard
                  project={project}
                  expanded={expanded.has(project.title)}
                  onToggle={() => toggle(project.title)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
