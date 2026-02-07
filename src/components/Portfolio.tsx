"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, ChevronDown, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react"

/* ━━━ Mini Preview Components (SolarCommand-inspired) ━━━ */

function VarietyAmayaPreview() {
  return (
    <img
      src="/variety-amaya-preview.png"
      alt="Variety Amaya LLC website"
      className="h-full w-full object-cover object-top"
    />
  )
}

function SummitPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A0A] text-[8px] leading-tight">
      <div className="flex items-center justify-between px-3 py-1.5">
        <div className="flex items-center gap-1">
          <div className="h-3.5 w-3.5 rounded bg-gradient-to-br from-emerald-500 to-emerald-700 text-[5px] font-bold text-white flex items-center justify-center">S</div>
          <span className="text-[7px] font-bold text-white">Summit <span className="text-emerald-400">Fitness</span></span>
        </div>
        <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[5px] font-semibold text-white">Book Now</span>
      </div>
      <div className="px-3 py-2">
        <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[4.5px] text-emerald-400">Online booking live</span>
        <p className="mt-1.5 text-[10px] font-bold text-white leading-tight">Train smarter.</p>
        <p className="text-[10px] font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent leading-tight">Results guaranteed.</p>
      </div>
      <div className="mx-3 grid grid-cols-3 gap-1 rounded-lg border border-white/5 bg-white/[0.03] p-1.5">
        {[{ n: "500+", l: "Members" }, { n: "4.9★", l: "Rating" }, { n: "50+", l: "Classes" }].map((s) => (
          <div key={s.l} className="text-center">
            <p className="text-[7px] font-bold text-white">{s.n}</p>
            <p className="text-[4px] text-white/40">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 px-3 py-1.5">
        <p className="text-[5px] font-semibold text-white/60 mb-1">Popular classes</p>
        <div className="grid grid-cols-3 gap-1">
          {[
            { t: "HIIT Burn", c: "from-emerald-800/60 to-emerald-900/30" },
            { t: "Power Yoga", c: "from-violet-800/60 to-violet-900/30" },
            { t: "Spin Class", c: "from-amber-800/60 to-amber-900/30" },
          ].map((cls) => (
            <div key={cls.t} className={`rounded bg-gradient-to-br ${cls.c} border border-white/5 p-1`}>
              <p className="text-[5.5px] font-semibold text-white">{cls.t}</p>
              <div className="mt-0.5 rounded bg-white/10 py-0.5 text-center text-[4px] text-white/60">Book</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BrightPathPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0F1117] text-[8px] leading-tight">
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-1.5">
        <div className="flex items-center gap-1">
          <div className="h-3.5 w-3.5 rounded bg-gradient-to-br from-blue-500 to-indigo-600 text-[5px] font-bold text-white flex items-center justify-center">B</div>
          <span className="text-[7px] font-bold text-white">BrightPath <span className="text-blue-400">CRM</span></span>
        </div>
        <div className="flex gap-1">
          <span className="rounded bg-white/10 px-1 py-0.5 text-[4.5px] text-white/50">Leads</span>
          <span className="rounded bg-blue-600/30 px-1 py-0.5 text-[4.5px] text-blue-300">Pipeline</span>
          <span className="rounded bg-white/10 px-1 py-0.5 text-[4.5px] text-white/50">Reports</span>
        </div>
      </div>
      <div className="flex-1 px-3 py-2 space-y-1.5">
        {/* KPI row */}
        <div className="grid grid-cols-4 gap-1">
          {[
            { n: "847", l: "Total Leads", c: "text-white" },
            { n: "23", l: "New Today", c: "text-emerald-400" },
            { n: "$142K", l: "Pipeline", c: "text-blue-400" },
            { n: "68%", l: "Close Rate", c: "text-amber-400" },
          ].map((kpi) => (
            <div key={kpi.l} className="rounded-md border border-white/5 bg-white/[0.03] p-1.5 text-center">
              <p className={`text-[8px] font-bold ${kpi.c}`}>{kpi.n}</p>
              <p className="text-[4px] text-white/35">{kpi.l}</p>
            </div>
          ))}
        </div>
        {/* Pipeline columns */}
        <div className="grid grid-cols-4 gap-1">
          {[
            { stage: "New", count: 12, color: "bg-blue-500" },
            { stage: "Contacted", count: 8, color: "bg-amber-500" },
            { stage: "Proposal", count: 5, color: "bg-purple-500" },
            { stage: "Closed", count: 3, color: "bg-emerald-500" },
          ].map((col) => (
            <div key={col.stage} className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[4.5px] text-white/50">{col.stage}</span>
                <span className="text-[4.5px] font-bold text-white/70">{col.count}</span>
              </div>
              <div className="h-0.5 w-full rounded-full bg-white/5">
                <div className={`h-full rounded-full ${col.color}`} style={{ width: `${(col.count / 12) * 100}%` }} />
              </div>
              {[...Array(Math.min(col.count, 3))].map((_, i) => (
                <div key={i} className="rounded border border-white/5 bg-white/[0.03] p-0.5">
                  <div className="h-1 w-3/4 rounded bg-white/10" />
                  <div className="mt-0.5 h-0.5 w-1/2 rounded bg-white/5" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VerdantPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A08] text-[8px] leading-tight">
      <div className="flex items-center justify-between px-3 py-1.5">
        <div className="flex items-center gap-1">
          <div className="h-3.5 w-3.5 rounded bg-gradient-to-br from-lime-500 to-green-600 text-[5px] font-bold text-white flex items-center justify-center">V</div>
          <span className="text-[7px] font-bold text-white">Verdant <span className="text-lime-400">Market</span></span>
        </div>
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[5px] text-white/60">Cart (2)</span>
      </div>
      <div className="px-3 py-2">
        <p className="text-[10px] font-bold text-white leading-tight">Organic food,</p>
        <p className="text-[10px] font-bold bg-gradient-to-r from-lime-400 to-emerald-300 bg-clip-text text-transparent leading-tight">delivered fresh.</p>
        <div className="mt-1.5 flex gap-1">
          <span className="rounded bg-lime-600 px-1.5 py-0.5 text-[5px] font-semibold text-white">Shop Now</span>
          <span className="rounded border border-white/15 px-1.5 py-0.5 text-[5px] text-white/50">Subscribe</span>
        </div>
      </div>
      <div className="mx-3 flex gap-1">
        {["Fruits", "Vegetables", "Dairy", "Pantry"].map((cat) => (
          <div key={cat} className="flex-1 rounded bg-white/[0.04] border border-white/5 py-0.5 text-center">
            <p className="text-[5px] text-white/70">{cat}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 px-3 py-1.5">
        <div className="grid grid-cols-3 gap-1">
          {[
            { name: "Honeycrisp", price: "$4.99", tag: "Organic", c: "from-red-900/40 to-red-950/20" },
            { name: "Baby Kale", price: "$3.49", tag: "Local", c: "from-green-900/40 to-green-950/20" },
            { name: "Avocados", price: "$7.99", tag: "Best Seller", c: "from-lime-900/40 to-lime-950/20" },
          ].map((p) => (
            <div key={p.name} className={`rounded bg-gradient-to-br ${p.c} border border-white/5 p-1`}>
              <span className="text-[3.5px] text-lime-400 bg-lime-500/20 rounded-full px-1">{p.tag}</span>
              <p className="mt-0.5 text-[5.5px] font-semibold text-white">{p.name}</p>
              <p className="text-[6px] font-bold text-white">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TaskFlowPreview() {
  return (
    <div className="flex h-full w-full bg-[#0F0F14] text-[8px] leading-tight">
      {/* Simulate mobile app with centered phone frame */}
      <div className="m-auto flex h-[90%] w-[55%] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#13131A]">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-purple-900/30 px-2 py-1">
          <span className="text-[5px] text-white/60">9:41</span>
          <span className="text-[6px] font-bold text-white">TaskFlow</span>
          <div className="flex gap-0.5">
            <div className="h-1 w-2 rounded-sm bg-white/40" />
            <div className="h-1 w-1 rounded-sm bg-white/40" />
          </div>
        </div>
        {/* Header */}
        <div className="px-2 py-1.5 border-b border-white/5">
          <p className="text-[7px] font-bold text-white">Active Jobs</p>
          <p className="text-[4px] text-white/40">3 tasks need attention</p>
        </div>
        {/* Task cards */}
        <div className="flex-1 px-2 py-1 space-y-1 overflow-hidden">
          {[
            { title: "Roof Install - 42 Oak St", status: "In Progress", color: "bg-amber-500", pct: "65%" },
            { title: "Foundation - 18 Elm Dr", status: "Photos Needed", color: "bg-red-500", pct: "30%" },
            { title: "Framing - 7 Pine Ave", status: "Complete", color: "bg-emerald-500", pct: "100%" },
          ].map((task) => (
            <div key={task.title} className="rounded-lg border border-white/5 bg-white/[0.03] p-1.5">
              <div className="flex items-start justify-between">
                <p className="text-[5.5px] font-semibold text-white max-w-[70%]">{task.title}</p>
                <span className={`${task.color} rounded-full px-1 py-0 text-[3.5px] text-white font-medium`}>{task.status}</span>
              </div>
              <div className="mt-1 h-1 w-full rounded-full bg-white/5">
                <div className={`h-full rounded-full ${task.color}/70`} style={{ width: task.pct }} />
              </div>
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div className="flex justify-around border-t border-white/5 py-1">
          {["Jobs", "Map", "Camera", "Team"].map((tab) => (
            <span key={tab} className={`text-[4.5px] ${tab === "Jobs" ? "text-purple-400 font-semibold" : "text-white/30"}`}>{tab}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeritagePreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0C0A0E] text-[8px] leading-tight">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5">
        <div className="flex items-center gap-1">
          <div className="h-3.5 w-3.5 rounded bg-gradient-to-br from-rose-600 to-rose-800 text-[5px] font-bold text-white flex items-center justify-center">H</div>
          <span className="text-[7px] font-bold text-white">Heritage <span className="text-rose-400">Law</span></span>
        </div>
        <div className="flex gap-1">
          <span className="rounded bg-white/10 px-1 py-0.5 text-[4.5px] text-white/50">My Cases</span>
          <span className="rounded bg-white/10 px-1 py-0.5 text-[4.5px] text-white/50">Documents</span>
          <span className="rounded bg-rose-600/30 px-1 py-0.5 text-[4.5px] text-rose-300">Schedule</span>
        </div>
      </div>
      <div className="flex-1 px-3 py-2 space-y-1.5">
        {/* Welcome */}
        <div>
          <p className="text-[6px] text-white/40">Welcome back,</p>
          <p className="text-[9px] font-bold text-white">Robert Johnson</p>
        </div>
        {/* Case cards */}
        <div className="space-y-1">
          {[
            { title: "Estate Planning", id: "#EP-2847", status: "In Review", color: "bg-amber-500" },
            { title: "Property Transfer", id: "#PT-1093", status: "Active", color: "bg-emerald-500" },
          ].map((c) => (
            <div key={c.id} className="rounded-lg border border-white/5 bg-white/[0.03] p-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[6px] font-semibold text-white">{c.title}</p>
                  <p className="text-[4px] text-white/30">{c.id}</p>
                </div>
                <span className={`${c.color} rounded-full px-1 py-0 text-[3.5px] text-white font-medium`}>{c.status}</span>
              </div>
              <div className="mt-1 flex gap-1">
                <div className="rounded bg-white/5 px-1 py-0.5 text-[4px] text-white/40">3 documents</div>
                <div className="rounded bg-white/5 px-1 py-0.5 text-[4px] text-white/40">Next: Feb 15</div>
              </div>
            </div>
          ))}
        </div>
        {/* Recent documents */}
        <div>
          <p className="text-[5px] font-semibold text-white/50 mb-0.5">Recent Documents</p>
          {["Trust_Agreement_v3.pdf", "Property_Deed_Final.pdf"].map((doc) => (
            <div key={doc} className="flex items-center gap-1 rounded bg-white/[0.02] px-1 py-0.5 mb-0.5">
              <div className="h-2 w-2 rounded bg-rose-500/20 flex items-center justify-center text-[4px] text-rose-400">P</div>
              <span className="text-[4.5px] text-white/50">{doc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FiresidePreview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0E0906] text-[8px] leading-tight">
      <div className="flex items-center justify-between px-3 py-1.5">
        <div className="flex items-center gap-1">
          <div className="h-3.5 w-3.5 rounded bg-gradient-to-br from-orange-500 to-red-700 text-[5px] font-bold text-white flex items-center justify-center">F</div>
          <span className="text-[7px] font-bold text-white">Fireside <span className="text-orange-400">Kitchen</span></span>
        </div>
        <div className="flex gap-1">
          <span className="rounded bg-orange-600 px-1.5 py-0.5 text-[5px] font-semibold text-white">Order Online</span>
          <span className="rounded border border-white/15 px-1.5 py-0.5 text-[5px] text-white/50">Reserve</span>
        </div>
      </div>
      <div className="px-3 py-1.5">
        <p className="text-[10px] font-bold text-white leading-tight">Wood-fired flavor,</p>
        <p className="text-[10px] font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent leading-tight">delivered to your door.</p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <span className="text-[5px] text-amber-400">★★★★★</span>
            <span className="text-[4px] text-white/40">4.9 (320+)</span>
          </div>
          <span className="text-[4px] text-white/30">•</span>
          <span className="text-[4.5px] text-emerald-400">Open now</span>
          <span className="text-[4px] text-white/30">•</span>
          <span className="text-[4.5px] text-white/40">25-35 min</span>
        </div>
      </div>
      <div className="mx-3 flex gap-1 mb-1.5">
        {["Burgers", "Pizza", "Bowls", "Sides", "Drinks"].map((cat, i) => (
          <div key={cat} className={`flex-1 rounded py-0.5 text-center text-[5px] ${i === 0 ? "bg-orange-600/30 text-orange-300 font-semibold border border-orange-500/30" : "bg-white/[0.04] border border-white/5 text-white/50"}`}>
            {cat}
          </div>
        ))}
      </div>
      <div className="flex-1 px-3 space-y-1">
        {[
          { name: "Smoked BBQ Burger", desc: "Brisket, cheddar, slaw", price: "$16", tag: "Popular" },
          { name: "Truffle Mushroom", desc: "Swiss, arugula, aioli", price: "$18", tag: "New" },
          { name: "Classic Fireside", desc: "Lettuce, tomato, pickle", price: "$14", tag: null },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] p-1.5">
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <p className="text-[5.5px] font-semibold text-white">{item.name}</p>
                {item.tag && <span className={`text-[3.5px] rounded-full px-1 py-0 font-medium ${item.tag === "Popular" ? "bg-orange-500/20 text-orange-400" : "bg-emerald-500/20 text-emerald-400"}`}>{item.tag}</span>}
              </div>
              <p className="text-[4px] text-white/30">{item.desc}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[6px] font-bold text-white">{item.price}</span>
              <div className="rounded bg-orange-600/60 px-1 py-0.5 text-[4px] font-semibold text-white">Add</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-3 my-1.5 flex items-center justify-between rounded-lg bg-orange-600/20 border border-orange-500/20 p-1.5">
        <div>
          <p className="text-[4.5px] text-white/50">Your order</p>
          <p className="text-[6px] font-bold text-white">2 items &middot; $34.00</p>
        </div>
        <div className="rounded bg-orange-600 px-2 py-0.5 text-[5px] font-semibold text-white">Checkout →</div>
      </div>
    </div>
  )
}

const previewComponents = [VarietyAmayaPreview, SummitPreview, BrightPathPreview, VerdantPreview, TaskFlowPreview, HeritagePreview, FiresidePreview]

/* ━━━ Project Data ━━━ */

const projects = [
  {
    title: "Variety Amaya LLC",
    type: "Website + Lead Generation",
    url: "varietyamaya.net",
    description:
      "A professional website for a licensed general contractor serving the DMV area. 24+ service categories, online estimate requests, customer testimonials, and a mobile-optimized lead funnel.",
    outcome: "3x more estimate requests in the first 60 days",
    tech: ["Next.js", "Tailwind CSS", "Vercel", "SEO"],
    color: "from-sky-500/20 to-blue-500/10",
    caseStudy: {
      problem: "Variety Amaya had no website and relied entirely on word-of-mouth and yard signs. Potential customers searching for contractors online couldn\u2019t find them, and they were losing jobs to competitors with a digital presence.",
      solution: "We built a professional, mobile-first website showcasing all 24+ services with a fast estimate request form, customer testimonials, trust signals (licensed & insured, military discounts), and local SEO optimization for the DMV market.",
      results: "Estimate requests tripled in the first 60 days. The site ranks on page one for key local search terms. The owner reports that most new customers now find them through the website instead of referrals alone.",
    },
  },
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
  {
    title: "Fireside Kitchen",
    type: "Restaurant + Online Ordering",
    description:
      "A full-service restaurant website with online ordering, real-time menu management, table reservations, and integrated delivery tracking for a popular wood-fired grill.",
    outcome: "85% increase in takeout revenue",
    tech: ["Next.js", "Stripe", "Square POS", "Twilio"],
    color: "from-orange-500/20 to-red-500/10",
    caseStudy: {
      problem: "Fireside Kitchen was losing takeout orders to third-party apps that charged 30% commission. Their website was a static page with a PDF menu and no way to order online.",
      solution: "We built a branded ordering platform with real-time menu updates, online payments, table reservations, order-ahead scheduling, and SMS order notifications\u2014all synced with their Square POS.",
      results: "Takeout revenue jumped 85% in 8 weeks. Third-party app fees dropped by $4,200/month. Table reservations increased 50% and no-shows fell thanks to SMS confirmations.",
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

function ProjectCard({ project, index, expanded, onToggle }: { project: typeof projects[0]; index: number; expanded: boolean; onToggle: () => void }) {
  const Preview = previewComponents[index]

  return (
    <motion.div
      variants={cardVariants}
      className="glass-card-hover group flex flex-col overflow-hidden"
    >
      {/* Browser frame preview */}
      {(() => {
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
                <span className={`text-[8px] ${project.url ? "text-white/40 underline underline-offset-2" : "text-white/25"}`}>{project.url || `${project.title.toLowerCase().replace(/\s+/g, "")}.com`}</span>
              </div>
            </div>
            {/* Preview content */}
            <div className="aspect-[16/10] overflow-hidden">
              <Preview />
            </div>
            {/* Gradient fade at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-brand-card/90 to-transparent" />
          </div>
        )
        return project.url ? (
          <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer" className="block">
            {previewContent}
          </a>
        ) : previewContent
      })()}

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
              index={i}
              expanded={isExpanded(i)}
              onToggle={() => toggleRow(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
