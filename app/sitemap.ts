import type { MetadataRoute } from "next"
import { site, QUOTE_PATH, cityPages, cityPath, servicePath } from "@/config/site"

/**
 * live    → every customer page, including each service and city page.
 * demo    → only /demo. The fictional company must never look like a real provider in search.
 * preview → nothing. Previews are private links for one prospect.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${site.seo.siteUrl}${p}`
  if (site.mode === "demo") return [{ url: url("/demo"), changeFrequency: "monthly", priority: 1 }]
  if (site.mode === "preview") return []

  const core = ["", "/services", "/pricing", "/reviews", "/service-areas", "/about", QUOTE_PATH]
  return [
    ...core.map((p) => ({ url: url(p), changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...site.services.map((s) => ({ url: url(servicePath(s.slug)), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...cityPages.map((c) => ({ url: url(cityPath(c)), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...["/privacy-policy", "/terms-of-service"].map((p) => ({ url: url(p), changeFrequency: "yearly" as const, priority: 0.2 })),
  ]
}
