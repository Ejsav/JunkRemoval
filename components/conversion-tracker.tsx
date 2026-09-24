"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/track"
import { QUOTE_PATH } from "@/config/site"

/** One delegated listener tracks every call, text, email and quote CTA on the site. */
export function ConversionTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest("a")
      if (!link) return
      const href = link.getAttribute("href") ?? ""
      const location =
        link.dataset.cta ?? link.closest("[data-section]")?.getAttribute("data-section") ?? "unknown"

      if (href.startsWith("tel:")) trackEvent("call_click", { location })
      else if (href.startsWith("sms:")) trackEvent("text_click", { location })
      else if (href.startsWith("mailto:")) trackEvent("email_click", { location })
      else if (href === QUOTE_PATH || href.endsWith("#quote")) trackEvent("quote_cta_click", { location })
      else if (href === "/demo") trackEvent("demo_cta_click", { location })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])
  return null
}
