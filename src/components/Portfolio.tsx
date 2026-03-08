"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, ChevronDown, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react"

/* ━━━ Project Data ━━━ */

const projects = [
  {
    title: "Variety Amaya LLC",
    type: "Website + Lead Generation",
    url: "https://varietyamaya.net",
    image: "/variety-amaya.png",
    description:
      "A professional website for a licensed general contractor serving the DMV area. 24+ service categories, online estimate requests, customer testimonials, and a mobile-optimized lead funnel.",
    outcome: "3x more estimate requests in the first 60 days",
    tech: ["Next.js", "Tailwind CSS", "Vercel", "SEO"],
    caseStudy: {
      problem: "Variety Amaya had no website and relied entirely on word-of-mouth and yard signs. Potential customers searching for contractors online couldn\u2019t find them, and they were losing jobs to competitors with a digital presence.",
      solution: "We built a professional, mobile-first website showcasing all 24+ services with a fast estimate request form, customer testimonials, trust signals (licensed & insured, military discounts), and local SEO optimization for the DMV market.",
      results: "Estimate requests tripled in the first 60 days. The site ranks on page one for key local search terms. The owner reports that most new customers now find them through the website instead of referrals alone.",
    },
  },
  {
    title: "B&R Seafood and More",
    type: "Restaurant Website",
    url: "https://brseafoodandmore.com",
    image: "/seafood-restaurant.png",
    description:
      "A stunning restaurant website for a family-owned seafood spot featuring an online menu, event bookings, ordering integration, and a brand identity that captures the warmth of Southern seafood.",
    outcome: "Online orders up 4x within the first month",
    tech: ["Next.js", "Tailwind CSS", "Vercel", "SEO"],
    caseStudy: {
      problem: "B&R Seafood had no online presence beyond a basic social media page. Customers couldn\u2019t find their menu, hours, or location easily, and the business was invisible to anyone searching online.",
      solution: "We designed and built a polished restaurant website with a full digital menu, online ordering flow, event booking, location and hours prominently displayed, and local SEO to drive foot traffic.",
      results: "Online orders quadrupled in the first month. Google search visibility increased significantly, and the owner reports a steady stream of new customers who found them through the website.",
    },
  },
  {
    title: "SafeSpace Inspection Tool",
    type: "Web Application",
    url: "https://safespace-jbh.vercel.app/welcome",
    image: "/safespace-inspection.png",
    description:
      "A hospital EVS inspection platform with comprehensive building cleanliness assessments, real-time scoring, mobile-first design, and professional report generation\u2014all from a phone or tablet.",
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
    url: "https://travel-agent-site.vercel.app",
    image: "/travel-agent-site.png",
    description:
      "A luxury travel agency website featuring Caribbean destination packages, immersive imagery, itinerary browsing, and a seamless booking inquiry flow designed to convert browsers into travelers.",
    outcome: "3x more booking inquiries in 60 days",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    caseStudy: {
      problem: "The agency was booking trips through phone calls and email chains. They had no website to showcase destinations, and potential clients couldn\u2019t browse packages or get inspired before reaching out.",
      solution: "We designed a visually stunning website with destination showcases, curated package browsing, immersive photography, trust signals (10+ years, 4.9-star rating), and a streamlined inquiry form that captures trip preferences.",
      results: "Booking inquiries tripled within 60 days. The average trip value increased as clients came in more informed and inspired. The agency now handles 40% of initial consultations through the website.",
    },
  },
  {
    title: "New Era Studios",
    type: "E-Commerce Store",
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

/* ━━━ Card + Section Components ━━━ */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function ProjectCard({ project, expanded, onToggle }: { project: typeof projects[0]; expanded: boolean; onToggle: () => void }) {
  const displayUrl = project.url ? project.url.replace(/^https?:\/\//, "") : `${project.title.toLowerCase().replace(/\s+/g, "")}.com`

  const previewContent = (
    <div className="relative">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 bg-[#1a1a1f] px-3 py-1.5 border-b border-white/5">
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
          <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
          <div className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-2 rounded-md bg-white/5 px-2 py-0.5">
          <span className={`text-[8px] ${project.url ? "text-white/40 underline underline-offset-2" : "text-white/25"}`}>{displayUrl}</span>
        </div>
      </div>
      {/* Preview screenshot */}
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} website screenshot`}
          className="h-full w-full object-cover object-top"
        />
      </div>
      {/* Gradient fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-brand-card/90 to-transparent" />
    </div>
  )

  return (
    <motion.div
      variants={cardVariants}
      className="glass-card-hover group flex flex-col overflow-hidden"
    >
      {/* Browser frame preview */}
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
          {previewContent}
        </a>
      ) : previewContent}

      {/* Card body */}
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
          onClick={onToggle}
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
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const [cols, setCols] = useState(3)

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 1024) setCols(3)
      else if (window.innerWidth >= 768) setCols(2)
      else setCols(1)
    }
    updateCols()
    window.addEventListener("resize", updateCols)
    return () => window.removeEventListener("resize", updateCols)
  }, [])

  const toggleRow = useCallback((index: number) => {
    const row = Math.floor(index / cols)
    setExpandedRows(prev => {
      const next = new Set(prev)
      if (next.has(row)) next.delete(row)
      else next.add(row)
      return next
    })
  }, [cols])

  const isExpanded = useCallback((index: number) => {
    return expandedRows.has(Math.floor(index / cols))
  }, [expandedRows, cols])

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
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              expanded={isExpanded(i)}
              onToggle={() => toggleRow(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
