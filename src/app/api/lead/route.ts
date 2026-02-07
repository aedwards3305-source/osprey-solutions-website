import { NextRequest, NextResponse } from "next/server"

interface LeadPayload {
  name?: string
  email: string
  phone?: string
  projectType?: string
  budget?: string
  timeline?: string
  message?: string
  type?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json()

    // Basic validation
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { ok: false, error: "Valid email is required" },
        { status: 400 }
      )
    }

    // Minimum message length for quote requests
    if (
      body.type === "quote-request" &&
      (!body.message || body.message.trim().length < 10)
    ) {
      return NextResponse.json(
        { ok: false, error: "Please provide more project details" },
        { status: 400 }
      )
    }

    // Log the lead
    const lead = {
      timestamp: new Date().toISOString(),
      name: body.name || "",
      email: body.email,
      phone: body.phone || "",
      projectType: body.projectType || "",
      budget: body.budget || "",
      timeline: body.timeline || "",
      message: body.message || "",
      type: body.type || "general",
    }

    console.log("=== NEW LEAD ===")
    console.log(JSON.stringify(lead, null, 2))
    console.log("================")

    // Optionally, you could store leads in a database here.
    // For demo purposes, we just log to console.

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    )
  }
}
