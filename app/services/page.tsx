import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { StickyCallButton } from "@/components/sticky-call-button"
import { BeforeAfterSection } from "@/components/before-after-section"
import { ServiceArea } from "@/components/service-area"
import Link from "next/link"

export const metadata = {
  title: "Junk Removal Services | Orlando, FL",
  description:
    "Professional junk removal services in Orlando. Residential & commercial hauling, garage cleanouts, estate cleanouts, furniture removal, yard debris. Free quote.",
  keywords:
    "junk removal services, residential junk removal, commercial junk removal, garage cleanout, estate cleanout, appliance removal, furniture removal, yard debris removal",
}

export default function ServicesPage() {
  const phoneNumber = "(407) 801-7886"

  const services = [
    {
      title: "Residential Junk Removal",
      description:
        "We remove unwanted items from homes quickly and responsibly, making cleanouts stress-free for homeowners throughout Orlando.",
      pricingNote: "From $199 · 1/4 truck load",
    },
    {
      title: "Furniture Removal",
      description:
        "We remove sofas, mattresses, and heavy furniture with care so you don't have to lift a thing. We donate usable pieces when possible.",
      pricingNote: "Single item from $89",
    },
    {
      title: "Yard Debris Removal",
      description:
        "Branches, leaves, old lumber, fence posts — we haul it all away so your yard is clear and clean without you breaking a sweat.",
      pricingNote: "From $199 · 1/4 truck load",
    },
    {
      title: "Garage Cleanouts",
      description:
        "Clear out cluttered garages and reclaim your space. We handle everything from old furniture to seasonal equipment.",
      pricingNote: "From $349 · 1/2 truck load",
    },
    {
      title: "Estate Cleanouts",
      description:
        "Compassionate and thorough estate cleanout services helping families during difficult transitions.",
      pricingNote: "From $549 · full truck",
    },
    {
      title: "Appliance Removal",
      description:
        "Safe removal and disposal of old appliances including refrigerators, washers, dryers, and more.",
      pricingNote: "Single item from $89",
    },
    {
      title: "Commercial Junk Removal",
      description:
        "Efficient junk removal for businesses, offices, and commercial properties with minimal disruption to your operations.",
      pricingNote: "Call for commercial quote",
    },
    {
      title: "Construction Debris Removal",
      description:
        "Post-renovation cleanup and construction debris removal. We handle drywall, lumber, flooring, and waste.",
      pricingNote: "From $349 · 1/2 truck load",
    },
  ]

  return (
    <main className="min-h-screen pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="py-24 px-4 lg:px-8 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">What We Do</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6">
            Junk Removal Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Fast and reliable junk removal for residential and commercial customers throughout Orlando and surrounding areas.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-1">
            {services.map((service, index) => (
              <div
                key={index}
                className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-secondary hover:bg-primary transition-colors duration-300"
              >
                <div className="mb-4 md:mb-0 flex-1">
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary-foreground transition-colors font-[family-name:var(--font-playfair)] mb-2">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground group-hover:text-primary-foreground/80 transition-colors max-w-xl mb-2">
                    {service.description}
                  </p>
                  <Link
                    href="/pricing"
                    className="text-xs font-black text-primary group-hover:text-primary-foreground/70 uppercase tracking-wide transition-colors"
                  >
                    {service.pricingNote} →
                  </Link>
                </div>
                <ArrowRight className="h-6 w-6 text-primary group-hover:text-primary-foreground group-hover:translate-x-2 transition-all shrink-0 ml-6" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-base font-bold text-foreground mb-2">Not sure what you need?</p>
            <p className="text-sm text-primary uppercase tracking-wider mb-8">Call now for a free quote — no obligation</p>
            <a href={`tel:${phoneNumber}`} className="group inline-flex items-center gap-4 mb-8">
              <span className="text-4xl md:text-5xl font-bold text-foreground tracking-tight font-[family-name:var(--font-playfair)] group-hover:text-primary transition-colors">
                {phoneNumber}
              </span>
              <ArrowRight className="h-8 w-8 text-primary group-hover:translate-x-2 transition-transform" />
            </a>
            <div>
              <Button size="lg" className="text-base px-8 py-6 h-auto uppercase tracking-wider" asChild>
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call for Free Quote
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterSection />
      <ServiceArea />
      <Footer />
      <StickyCallButton />
    </main>
  )
}
