import { NextRequest, NextResponse } from "next/server"

interface BookingPayload {
  meetingType: string
  duration: number
  date: string
  time: string
  timezone: string
  name: string
  email: string
  phone?: string
  notes?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingPayload = await request.json()

    // Validation
    if (!body.name?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name is required" },
        { status: 400 }
      )
    }

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { ok: false, error: "Valid email is required" },
        { status: 400 }
      )
    }

    if (!body.date || !body.time || !body.meetingType) {
      return NextResponse.json(
        { ok: false, error: "Meeting details are incomplete" },
        { status: 400 }
      )
    }

    const booking = {
      timestamp: new Date().toISOString(),
      meetingType: body.meetingType,
      duration: body.duration,
      date: body.date,
      time: body.time,
      timezone: body.timezone,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      notes: body.notes || "",
    }

    console.log("=== NEW BOOKING ===")
    console.log(JSON.stringify(booking, null, 2))
    console.log("====================")

    // TODO: Send confirmation email, store in database, etc.

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    )
  }
}
