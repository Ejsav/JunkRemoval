import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { ProcessSection } from "@/components/process-section"
import { PricingSection } from "@/components/pricing-section"
import { ReviewsSection } from "@/components/reviews-section"
import { ServiceAreasSection } from "@/components/service-areas-section"
import { QuoteSection } from "@/components/quote-section"
import { FaqSection } from "@/components/faq-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection n="01" />
      <ProjectsSection n="02" />
      <ProcessSection n="03" />
      <ReviewsSection limit={3} n="04" />
      <PricingSection n="05" />
      <QuoteSection n="06" />
      <ServiceAreasSection n="07" />
      <FaqSection n="08" />
    </>
  )
}
