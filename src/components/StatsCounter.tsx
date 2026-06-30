"use client"

import { Briefcase, Clock, Rocket, Star } from "lucide-react"
import { CountUp, Reveal } from "@/components/fx"

const stats = [
  { icon: Briefcase, to: 50, decimals: 0, suffix: "+", label: "Projects Delivered" },
  { icon: Rocket, to: 72, decimals: 0, suffix: "h", label: "Typical Launch Time" },
  { icon: Clock, to: 98, decimals: 0, suffix: "%", label: "On-Time Delivery" },
  { icon: Star, to: 5, decimals: 1, suffix: "", label: "Average Rating" },
]

export default function StatsCounter() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="section-container">
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-3xl border border-brand-border/50 bg-gradient-to-br from-brand-card/70 to-brand-dark/40 p-2 backdrop-blur-sm">
            {/* Inner glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_-20%,rgba(20,168,104,0.12),transparent)]" />
            <div className="relative grid grid-cols-2 divide-y divide-brand-border/30 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center px-6 py-8 text-center"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-emerald/10 text-brand-emerald-glow ring-1 ring-brand-emerald/20 transition-all duration-300 group-hover:bg-brand-emerald/20 group-hover:ring-brand-emerald/40">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <CountUp
                    to={stat.to}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    className="font-display text-4xl font-bold tracking-tight text-brand-text sm:text-5xl"
                  />
                  <p className="mt-2 text-sm font-medium text-brand-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
