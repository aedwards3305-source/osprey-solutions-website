"use client"

const results = [
  "3x online bookings",
  "15 hrs/week saved",
  "42% higher AOV",
  "60% fewer support calls",
  "2x revenue in 90 days",
  "75% more new bookings",
  "50% less admin work",
  "40+ leads/month",
  "35% better retention",
  "200+ field workers onboarded",
]

export default function ResultsTicker() {
  // Double the array for seamless loop
  const doubled = [...results, ...results]

  return (
    <section className="relative overflow-hidden border-y border-brand-border/30 bg-brand-dark/50 py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((result, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm font-medium sm:mx-8 sm:text-base">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald-glow" />
            <span className="text-brand-text">{result}</span>
          </span>
        ))}
      </div>
    </section>
  )
}
