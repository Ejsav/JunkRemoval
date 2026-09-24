import type { MetadataRoute } from "next"
import { site } from "@/config/site"

// Crawling stays open in every mode: demo and preview pages carry a noindex tag,
// and crawlers must be able to fetch a page to see it and drop it from results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.seo.siteUrl}/sitemap.xml`,
  }
}
