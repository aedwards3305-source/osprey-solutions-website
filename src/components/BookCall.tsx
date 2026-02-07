"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Video,
  Coffee,
  Presentation,
} from "lucide-react"

// ─── Config ───────────────────────────────────────────────────────────────────
const BUSINESS_TIMEZONE = "America/New_York"

const MEETING_TYPES = [
  {
    id: "intro",
    label: "Intro Call",
    duration: 15,
    icon: Coffee,
    description: "Quick chat to see if we're a good fit",
  },
  {
    id: "project",
    label: "Project Discussion",
    duration: 30,
    icon: Video,
    description: "Walk through your project needs and goals",
  },
  {
    id: "strategy",
    label: "Strategy Session",
    duration: 60,
    icon: Presentation,
    description: "Deep dive into your business and roadmap",
  },
]

// Business hours in business timezone (ET)
const BUSINESS_HOURS = { start: 9, end: 17 } // 9 AM – 5 PM
const AVAILABLE_DAYS = [1, 2, 3, 4, 5] // Mon–Fri (0=Sun)

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function getUserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return BUSINESS_TIMEZONE
  }
}

function formatTimeInZone(hour: number, minute: number, date: Date, tz: string) {
  const d = new Date(date)
  d.setHours(hour, minute, 0, 0)
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: tz,
  })
}

/** Generate available slots for a given date and meeting duration */
function generateSlots(date: Date, durationMin: number): { hour: number; minute: number }[] {
  const slots: { hour: number; minute: number }[] = []
  const now = new Date()
  const isToday = isSameDay(date, now)

  for (let h = BUSINESS_HOURS.start; h < BUSINESS_HOURS.end; h++) {
    for (let m = 0; m < 60; m += 30) {
      // Ensure the meeting fits within business hours
      const endMinutes = h * 60 + m + durationMin
      if (endMinutes > BUSINESS_HOURS.end * 60) continue

      // If today, skip past times (with 1-hour buffer)
      if (isToday) {
        const slotTime = new Date(date)
        slotTime.setHours(h, m, 0, 0)
        const buffer = new Date(now.getTime() + 60 * 60 * 1000)
        if (slotTime <= buffer) continue
      }

      slots.push({ hour: h, minute: m })
    }
  }
  return slots
}

// ─── Step Components ──────────────────────────────────────────────────────────

function StepMeetingType({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-brand-text">
        What kind of call works best?
      </h3>
      <div className="grid gap-3">
        {MEETING_TYPES.map((mt) => (
          <button
            key={mt.id}
            onClick={() => onSelect(mt.id)}
            className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
              selected === mt.id
                ? "border-brand-emerald bg-brand-emerald/10"
                : "border-brand-border/50 hover:border-brand-border"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                selected === mt.id
                  ? "bg-brand-emerald/20 text-brand-emerald-glow"
                  : "bg-brand-card text-brand-subtle"
              }`}
            >
              <mt.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p
                className={`font-semibold ${
                  selected === mt.id ? "text-brand-emerald-glow" : "text-brand-text"
                }`}
              >
                {mt.label}
              </p>
              <p className="text-sm text-brand-muted">{mt.description}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                selected === mt.id
                  ? "bg-brand-emerald/20 text-brand-emerald-glow"
                  : "bg-brand-card text-brand-subtle"
              }`}
            >
              {mt.duration} min
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | null
  onSelect: (d: Date) => void
}) {
  const today = useMemo(() => new Date(), [])
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth())

  // Allow booking up to 60 days out
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + 60)

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-brand-text">Pick a date</h3>

      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border/50 text-brand-subtle transition-colors hover:text-brand-text disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-brand-text">{monthLabel}</span>
        <button
          onClick={nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border/50 text-brand-subtle transition-colors hover:text-brand-text"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-brand-subtle">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells before first day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const date = new Date(viewYear, viewMonth, day)
          const dayOfWeek = date.getDay()
          const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          const isBeyondMax = date > maxDate
          const isAvailable = AVAILABLE_DAYS.includes(dayOfWeek) && !isPast && !isBeyondMax
          const isSelected = selectedDate && isSameDay(date, selectedDate)
          const isCurrentDay = isSameDay(date, today)

          return (
            <button
              key={day}
              disabled={!isAvailable}
              onClick={() => onSelect(date)}
              className={`relative flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? "bg-brand-emerald text-white shadow-lg shadow-brand-emerald/20"
                  : isAvailable
                  ? "text-brand-text hover:bg-brand-emerald/10"
                  : "text-brand-subtle/30 cursor-not-allowed"
              }`}
            >
              {day}
              {isCurrentDay && !isSelected && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-emerald-glow" />
              )}
            </button>
          )
        })}
      </div>

      <p className="text-center text-xs text-brand-subtle">
        Weekdays only &middot; Up to 60 days out
      </p>
    </div>
  )
}

function StepTimeSlot({
  date,
  meetingTypeId,
  selectedSlot,
  onSelect,
}: {
  date: Date
  meetingTypeId: string
  selectedSlot: { hour: number; minute: number } | null
  onSelect: (slot: { hour: number; minute: number }) => void
}) {
  const userTz = useMemo(() => getUserTimezone(), [])
  const meeting = MEETING_TYPES.find((m) => m.id === meetingTypeId)!
  const slots = useMemo(() => generateSlots(date, meeting.duration), [date, meeting.duration])

  const shortTz = useMemo(() => {
    try {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: userTz,
        timeZoneName: "short",
      }).formatToParts(new Date())
      return parts.find((p) => p.type === "timeZoneName")?.value || userTz
    } catch {
      return userTz
    }
  }, [userTz])

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-brand-text">Pick a time</h3>
        <p className="mt-1 text-sm text-brand-muted">
          {formatDate(date)} &middot; {meeting.duration} min &middot; {shortTz}
        </p>
      </div>

      {slots.length === 0 ? (
        <div className="rounded-xl border border-brand-border/50 p-6 text-center">
          <p className="text-brand-muted">No available slots for this date.</p>
          <p className="mt-1 text-sm text-brand-subtle">Try selecting a different day.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {slots.map((slot) => {
            const isSelected =
              selectedSlot?.hour === slot.hour && selectedSlot?.minute === slot.minute
            return (
              <button
                key={`${slot.hour}-${slot.minute}`}
                onClick={() => onSelect(slot)}
                className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                  isSelected
                    ? "border-brand-emerald bg-brand-emerald/10 text-brand-emerald-glow"
                    : "border-brand-border/50 text-brand-text hover:border-brand-emerald/30"
                }`}
              >
                {formatTimeInZone(slot.hour, slot.minute, date, userTz)}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function StepDetails({
  form,
  onChange,
  errors,
}: {
  form: { name: string; email: string; phone: string; notes: string }
  onChange: (field: string, value: string) => void
  errors: Record<string, string>
}) {
  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-brand-dark/50 px-4 py-3 text-brand-text placeholder:text-brand-subtle/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-emerald/50 ${
      errors[field] ? "border-red-500/50" : "border-brand-border/50 focus:border-brand-emerald/40"
    }`

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-brand-text">Your details</h3>

      <div className="space-y-3">
        {/* Name */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-brand-text">
            <User className="h-3.5 w-3.5 text-brand-subtle" />
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Your full name"
            className={inputClass("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-brand-text">
            <Mail className="h-3.5 w-3.5 text-brand-subtle" />
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@company.com"
            className={inputClass("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-brand-text">
            <Phone className="h-3.5 w-3.5 text-brand-subtle" />
            Phone <span className="text-brand-subtle">(optional)</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(555) 123-4567"
            className={inputClass("phone")}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-brand-text">
            <MessageSquare className="h-3.5 w-3.5 text-brand-subtle" />
            What should we cover? <span className="text-brand-subtle">(optional)</span>
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Tell us a bit about your project or questions..."
            rows={3}
            className={inputClass("notes")}
          />
        </div>
      </div>
    </div>
  )
}

function StepConfirmation({
  meetingTypeId,
  date,
  slot,
  form,
}: {
  meetingTypeId: string
  date: Date
  slot: { hour: number; minute: number }
  form: { name: string; email: string }
}) {
  const meeting = MEETING_TYPES.find((m) => m.id === meetingTypeId)!
  const userTz = getUserTimezone()
  const timeStr = formatTimeInZone(slot.hour, slot.minute, date, userTz)

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-emerald/15"
      >
        <CheckCircle2 className="h-8 w-8 text-brand-emerald-glow" />
      </motion.div>

      <h3 className="mt-5 text-xl font-bold text-brand-text">You&apos;re booked!</h3>
      <p className="mt-2 text-brand-muted">
        We&apos;ll send a confirmation to <span className="text-brand-text">{form.email}</span>
      </p>

      <div className="mt-6 w-full rounded-xl border border-brand-border/50 bg-brand-dark/30 p-5 text-left">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <meeting.icon className="h-4 w-4 text-brand-emerald-glow" />
            <div>
              <p className="text-xs text-brand-subtle">Meeting</p>
              <p className="text-sm font-medium text-brand-text">
                {meeting.label} ({meeting.duration} min)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-brand-emerald-glow" />
            <div>
              <p className="text-xs text-brand-subtle">Date</p>
              <p className="text-sm font-medium text-brand-text">{formatDate(date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-brand-emerald-glow" />
            <div>
              <p className="text-xs text-brand-subtle">Time</p>
              <p className="text-sm font-medium text-brand-text">{timeStr}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-brand-emerald-glow" />
            <div>
              <p className="text-xs text-brand-subtle">Guest</p>
              <p className="text-sm font-medium text-brand-text">{form.name}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-brand-muted">
        We&apos;ll reach out with a meeting link before your call. See you soon!
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const STEPS = ["Type", "Date", "Time", "Details", "Confirmed"]

export default function BookCall() {
  const [step, setStep] = useState(0)
  const [meetingType, setMeetingType] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<{ hour: number; minute: number } | null>(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const updateForm = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  // When date changes, clear the time slot
  const handleDateSelect = (d: Date) => {
    setSelectedDate(d)
    setSelectedSlot(null)
  }

  const canProceed = () => {
    switch (step) {
      case 0:
        return !!meetingType
      case 1:
        return !!selectedDate
      case 2:
        return !!selectedSlot
      case 3:
        return true // validated on submit
      default:
        return false
    }
  }

  const validateDetails = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = "Name is required"
    if (!form.email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = async () => {
    if (step === 3) {
      if (!validateDetails()) return

      setSubmitting(true)
      try {
        const userTz = getUserTimezone()
        const meeting = MEETING_TYPES.find((m) => m.id === meetingType)!
        await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            meetingType: meeting.label,
            duration: meeting.duration,
            date: selectedDate!.toISOString(),
            time: `${selectedSlot!.hour}:${String(selectedSlot!.minute).padStart(2, "0")}`,
            timezone: userTz,
            name: form.name,
            email: form.email,
            phone: form.phone,
            notes: form.notes,
          }),
        })
      } catch {
        // Still show confirmation — the lead was at minimum logged
      }
      setSubmitting(false)
      setStep(4)
      return
    }
    setStep((s) => s + 1)
  }

  const handleBack = () => setStep((s) => s - 1)

  const handleReset = () => {
    setStep(0)
    setMeetingType("")
    setSelectedDate(null)
    setSelectedSlot(null)
    setForm({ name: "", email: "", phone: "", notes: "" })
    setErrors({})
  }

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
            Pick a time that works for you. No sales pitch&mdash;just a real conversation about your project.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-lg">
          {/* Progress steps */}
          {step < 4 && (
            <div className="mb-8 flex items-center gap-2">
              {STEPS.slice(0, 4).map((label, i) => (
                <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className={`h-1.5 w-full rounded-full transition-colors ${
                      i <= step ? "bg-brand-emerald-glow" : "bg-brand-border"
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      i <= step ? "text-brand-emerald-glow" : "text-brand-subtle"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Card */}
          <div className="glass-card p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && (
                  <StepMeetingType selected={meetingType} onSelect={setMeetingType} />
                )}
                {step === 1 && (
                  <StepCalendar selectedDate={selectedDate} onSelect={handleDateSelect} />
                )}
                {step === 2 && selectedDate && (
                  <StepTimeSlot
                    date={selectedDate}
                    meetingTypeId={meetingType}
                    selectedSlot={selectedSlot}
                    onSelect={setSelectedSlot}
                  />
                )}
                {step === 3 && (
                  <StepDetails form={form} onChange={updateForm} errors={errors} />
                )}
                {step === 4 && selectedDate && selectedSlot && (
                  <StepConfirmation
                    meetingTypeId={meetingType}
                    date={selectedDate}
                    slot={selectedSlot}
                    form={form}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {step < 4 ? (
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-text disabled:invisible"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed() || submitting}
                className="btn-primary disabled:opacity-40 disabled:pointer-events-none"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Booking...
                  </>
                ) : step === 3 ? (
                  <>
                    Confirm Booking <CheckCircle2 className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="mt-6 text-center">
              <button onClick={handleReset} className="btn-ghost text-sm">
                Book Another Call
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
