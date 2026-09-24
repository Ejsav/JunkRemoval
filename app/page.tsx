import { HeroSection } from "@/components/hero-section"
import { PromisesBar } from "@/components/promises-bar"
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
      <PromisesBar />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <ReviewsSection limit={3} />
      <PricingSection />
      <QuoteSection />
      <ServiceAreasSection />
      <FaqSection />
    </>
  )
}
