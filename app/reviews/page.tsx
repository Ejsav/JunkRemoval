import type { Metadata } from "next"
import { site } from "@/config/site"
import { PageHeader } from "@/components/page-header"
import { ReviewsSection } from "@/components/reviews-section"
import { ProjectsSection } from "@/components/projects-section"
import { CtaSection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: `What customers say about ${site.business.name} junk removal in ${site.business.address.city}.`,
  alternates: { canonical: "/reviews" },
}

export default function ReviewsPage() {
  return (
    <>
      <PageHeader eyebrow="Reviews" title="Straight from" emphasis="our customers." />
      <ReviewsSection />
      <ProjectsSection />
      <CtaSection />
    </>
  )
}
