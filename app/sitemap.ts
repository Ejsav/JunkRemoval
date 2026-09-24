import type { MetadataRoute } from "next"
import { site, QUOTE_PATH } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/pricing", "/reviews", "/service-areas", "/about", QUOTE_PATH, "/privacy-policy", "/terms-of-service"]
  return paths.map((p) => ({
    url: `${site.seo.siteUrl}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p === QUOTE_PATH || p === "/services" ? 0.8 : 0.5,
  }))
}
