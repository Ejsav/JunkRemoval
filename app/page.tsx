import { HeroSection } from "@/components/hero-section"
import { PainSection } from "@/components/pain-section"
import { PositioningSection } from "@/components/positioning-section"
import { ActiveBookings } from "@/components/active-bookings"
import { TrustBar } from "@/components/trust-bar"
import { OfferStackSection } from "@/components/offer-stack-section"
import { ServicesSection } from "@/components/services-section"
import { BeforeAfterSection } from "@/components/before-after-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { ProcessSection } from "@/components/process-section"
import { ValueCostSection } from "@/components/value-cost-section"
import { TransparentPricingSection } from "@/components/transparent-pricing-section"
import { PricingPreviewSection } from "@/components/pricing-preview-section"
import { ReviewsSection } from "@/components/reviews-section"
import { GuaranteeSection } from "@/components/guarantee-section"
import { ServiceArea } from "@/components/service-area"
import { ContactForm } from "@/components/contact-form"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <PainSection />
      <PositioningSection />
      <ActiveBookings />
      <TrustBar />
      <OfferStackSection />
      <ServicesSection />
      <BeforeAfterSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <ValueCostSection />
      <TransparentPricingSection />
      <PricingPreviewSection />
      <ReviewsSection />
      <GuaranteeSection />
      <ServiceArea />
      <ContactForm />
      <FinalCTA />
      <Footer />
    </main>
  )
}
