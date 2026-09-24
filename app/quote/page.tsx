import type { Metadata } from "next"
import { site } from "@/config/site"
import { QuoteSection } from "@/components/quote-section"
import { FaqSection } from "@/components/faq-section"

export const metadata: Metadata = {
  title: "Free Junk Removal Quote",
  description: `Get a firm junk removal price from ${site.business.name}. Send details and photos, or call ${site.business.phoneDisplay}.`,
  alternates: { canonical: "/quote" },
}

export default function QuotePage() {
  return (
    <>
      <QuoteSection as="h1" />
      <FaqSection />
    </>
  )
}
