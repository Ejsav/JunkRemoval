import type { Metadata } from "next"
import { site } from "@/config/site"
import { PageHeader } from "@/components/page-header"
import { ServiceAreasSection } from "@/components/service-areas-section"
import { CtaSection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Service Areas",
  description: `Junk removal in ${site.serviceAreas.cities.slice(0, 6).join(", ")} and nearby. Same-day pickup often available.`,
  alternates: { canonical: "/service-areas" },
}

export default function ServiceAreasPage() {
  return (
    <>
      <PageHeader eyebrow="Service areas" title={`Where we work`} intro={site.serviceAreas.intro} />
      <ServiceAreasSection />
      <CtaSection />
    </>
  )
}
