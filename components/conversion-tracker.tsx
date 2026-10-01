"use client"

import { useEffect } from "react"
import { captureLeadSource, trackEvent } from "@/lib/track"
import { QUOTE_PATH } from "@/config/site"

/** One delegated listener tracks every call, text, email and quote CTA on the site. */
export function ConversionTracker() {
  useEffect(() => {
    captureLeadSource()
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest("a")
      if (!link) return
      const href = link.getAttribute("href") ?? ""
      const location =
        link.dataset.cta ?? link.closest("[data-section]")?.getAttribute("data-section") ?? "unknown"
      // /demo contacts are prospects calling the builder, not customers calling the business.
      const props = { location, audience: window.location.pathname.startsWith("/demo") ? "owner" : "customer" }

      if (href.startsWith("tel:")) trackEvent("call_click", props)
      else if (href.startsWith("sms:")) trackEvent("text_click", props)
      else if (href.startsWith("mailto:")) trackEvent("email_click", props)
      else if (href.startsWith(QUOTE_PATH) || href.endsWith("#quote")) trackEvent("quote_cta_click", props)
      else if (href.startsWith("/demo")) trackEvent("demo_cta_click", props)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])
  return null
}
