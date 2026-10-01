/**
 * Forwards each quote request to a Google Sheet (see integrations/google-sheet-leads.gs).
 * Optional: without LEADS_SHEET_URL it returns 204 and the email path carries the lead alone.
 * Server-side so the sheet URL and secret never reach the browser.
 */

// Only photos this site uploaded can appear in the sheet (each becomes an =IMAGE() thumbnail).
const PHOTO_URL = /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/quote-photos\/[\w.%-]+$/i
const text = (v: unknown, max = 500) => (typeof v === "string" ? v.slice(0, max) : "")

export async function POST(request: Request) {
  const url = process.env.LEADS_SHEET_URL
  if (!url) return new Response(null, { status: 204 })

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 })
  }
  // Honeypot filled in: pretend success, store nothing.
  if (body._gotcha) return Response.json({ ok: true })

  const photos = Array.isArray(body.photos) ? body.photos.filter((p): p is string => typeof p === "string" && PHOTO_URL.test(p)).slice(0, 6) : []
  const lead = {
    secret: process.env.LEADS_SHEET_SECRET ?? "",
    name: text(body.name, 80),
    phone: text(body.phone, 30),
    email: text(body.email, 120),
    location: text(body.location, 80),
    service: text(body.service, 80),
    details: text(body.details, 1000),
    preferred_contact: text(body.preferred_contact, 10),
    photos,
    source: [text(body.landing_page, 200), text(body.referrer, 200), text(body.utm_source, 60), text(body.utm_campaign, 60)].filter(Boolean).join(" · "),
  }
  if (lead.name.length < 2 || lead.phone.replace(/\D/g, "").length < 10) return Response.json({ error: "Missing details" }, { status: 400 })

  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), redirect: "follow" })
    const out = (await res.json().catch(() => null)) as { ok?: boolean } | null
    if (!res.ok || !out?.ok) throw new Error(`sheet responded ${res.status}`)
    return Response.json({ ok: true })
  } catch (error) {
    console.error("Lead sheet failed:", (error as Error).message)
    return Response.json({ error: "Sheet unavailable" }, { status: 502 })
  }
}
