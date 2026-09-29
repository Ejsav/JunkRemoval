import type { Metadata } from "next"
import { site } from "@/config/site"
import { QuoteSection } from "@/components/quote-section"
import { FaqSection } from "@/components/faq-section"

export const metadata: Metadata = {
  title: "Get a Junk Removal Price",
  description: `Get a firm junk removal price from ${site.business.name}. Send details and photos, or call ${site.business.phoneDisplay}.`,
  alternates: { canonical: "/quote" },
}

/** Keeps context from the link that brought them here, e.g. /quote?service=garage-cleanouts */
export default async function QuotePage({ searchParams }: { searchParams: Promise<{ service?: string; location?: string }> }) {
  const { service, location } = await searchParams
  return (
    <>
      <QuoteSection
        as="h1"
        service={site.services.some((s) => s.slug === service) ? service : undefined}
        location={typeof location === "string" ? location.slice(0, 60) : undefined}
      />
      <FaqSection />
    </>
  )
}
