"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { Calendar } from "lucide-react"

const CAL_LINK = "antonio-ospreysolutionllc"

export default function BookCall() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: {
            "cal-bg": "#0a0a0c",
            "cal-bg-emphasis": "#141418",
            "cal-border-subtle": "rgba(255,255,255,0.08)",
            "cal-text": "#e5e5e5",
            "cal-text-emphasis": "#ffffff",
            "cal-brand": "#34d399",
            "cal-brand-emphasis": "#10b981",
            "cal-brand-text": "#ffffff",
          },
          light: {
            "cal-brand": "#10b981",
            "cal-brand-emphasis": "#059669",
          },
        },
        hideEventTypeDetails: false,
      })
    })()
  }, [])

  return (
    <section id="book" className="section-padding relative">
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-emerald/3 blur-[150px]" />

      <div className="section-container relative">
        <div className="text-center">
          <span className="section-label">
            <Calendar className="h-4 w-4" /> Book a Call
          </span>
          <h2 className="section-title">
            Schedule a free{" "}
            <span className="text-gradient-emerald">strategy call</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Pick a time that works for you. No sales pitch&mdash;just a real
            conversation about your project.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Cal
            calLink={CAL_LINK}
            config={{ layout: "month_view", theme: "dark" }}
            style={{ width: "100%", height: "100%", overflow: "auto" }}
          />
        </div>
      </div>
    </section>
  )
}
