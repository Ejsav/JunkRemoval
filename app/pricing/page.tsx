import type { Metadata } from "next"
import { site } from "@/config/site"
import { PageHeader } from "@/components/page-header"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Junk Removal Pricing",
  description: `How junk removal pricing works at ${site.business.name}: priced by truck space, locked before we start. Single items from $89.`,
  alternates: { canonical: "/pricing" },
}

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Simple pricing, locked before we start." intro={site.pricing.intro} />
      <PricingSection />
      <FaqSection />
      <CtaSection title="Want your exact price?" />
    </>
  )
}
