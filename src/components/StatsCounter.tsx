"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Users, Clock, Star } from "lucide-react"

const stats = [
  { icon: Briefcase, value: 50, suffix: "+", label: "Projects Delivered" },
  { icon: Users, value: 30, suffix: "+", label: "Happy Clients" },
  { icon: Clock, value: 98, suffix: "%", label: "On-Time Delivery" },
  { icon: Star, value: 5, suffix: ".0", label: "Average Rating" },
]

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * value)
      setDisplay(start)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="section-padding relative">
      <div className="section-container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-emerald/10 text-brand-emerald-glow transition-colors group-hover:bg-brand-emerald/20">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-4xl font-bold tracking-tight text-brand-text sm:text-5xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              </p>
              <p className="mt-2 text-sm font-medium text-brand-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
