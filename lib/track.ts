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
