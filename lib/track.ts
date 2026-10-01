import { track as vercelTrack } from "@vercel/analytics"

export type ConversionEvent =
  | "call_click"
  | "text_click"
  | "email_click"
  | "quote_cta_click"
  | "quote_form_start"
  | "quote_form_submit"
  | "quote_form_error"
  | "photo_estimate_submit"
  | "photo_upload_error"
  | "demo_cta_click"
  | "preview_customise"
  | "preview_request_submit"

type Props = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(name: ConversionEvent, props: Props = {}) {
  if (typeof window === "undefined") return
  const payload = { ...props, page_path: window.location.pathname }
  window.gtag?.("event", name, payload)
  window.dataLayer?.push({ event: name, ...payload })
  try {
    vercelTrack(name, payload)
  } catch {
    // Custom events need a paid Vercel plan; GA4 still records them.
  }
}

const SOURCE_KEY = "lead-source"

/** Remembers how the visitor arrived (first page, referrer, UTM tags) for the rest of the visit. */
export function captureLeadSource() {
  try {
    if (sessionStorage.getItem(SOURCE_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const source: Record<string, string> = { landing_page: window.location.pathname }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) source.referrer = document.referrer
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"]) {
      const v = params.get(k)
      if (v) source[k] = v.slice(0, 120)
    }
    sessionStorage.setItem(SOURCE_KEY, JSON.stringify(source))
  } catch {}
}

/** Attached to every lead so the owner knows which page, ad or search brought it in. */
export function getLeadSource(): Record<string, string> {
  const current = { submitted_from: window.location.pathname }
  try {
    return { ...JSON.parse(sessionStorage.getItem(SOURCE_KEY) || "{}"), ...current }
  } catch {
    return current
  }
}
