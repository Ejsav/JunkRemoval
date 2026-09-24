import { Phone, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { StickyCallButton } from "@/components/sticky-call-button"

export const metadata = {
  title: "Junk Removal Pricing | Transparent Rates in Orlando, FL",
  description:
    "Clear, transparent junk removal pricing in Orlando. Single item pickup from $89. No hidden fees. Free estimates. Same-day service available.",
  keywords:
    "junk removal cost, junk removal prices, Orlando, affordable junk removal, haul away, debris removal",
}

export default function PricingPage() {
  const phoneNumber = "(407) 801-7886"

  const pricingTiers = [
    {
      size: "Single Item",
      price: "$89–$149",
      capacity: "Express Pickup",
      description: "One item fast",
      features: [
        "Single furniture piece or appliance",
        "Sofa, mattress, refrigerator, etc.",
        "Price confirmed before arrival",
        "Same-day slots available",
      ],
    },
    {
      size: "Small Load",
      price: "$199–$299",
      capacity: "1/4 Truck",
      description: "Small cleanouts",
      features: [
        "Small room or storage unit",
        "A few pieces of furniture",
        "Light garage declutter",
        "Price confirmed before arrival",
      ],
    },
    {
      size: "Medium Load",
      price: "$349–$449",
      capacity: "1/2 Truck",
      description: "Garages & multiple rooms",
      features: [
        "Garage or 2–3 room cleanout",
        "Mixed furniture & debris",
        "Most popular choice",
        "Price confirmed before arrival",
      ],
      featured: true,
    },
    {
      size: "Full Load",
      price: "$549–$699",
      capacity: "Full Truck",
      description: "Whole house & estates",
      features: [
        "Whole-house or estate cleanouts",
        "Large commercial jobs",
        "Multiple crew members",
        "Price confirmed before arrival",
      ],
    },
  ]

  return (
    <main className="min-h-screen pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="py-24 px-4 lg:px-8 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">Transparent Pricing</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6">
            Simple, Fair Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            No hidden fees. No surprises. You approve the price before any work begins — guaranteed.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative flex flex-col p-8 ${tier.featured ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
              >
                {tier.featured && (
                  <span className="absolute top-4 right-4 text-xs uppercase tracking-wider font-medium bg-primary-foreground text-primary px-2 py-1">
                    Most Popular
                  </span>
                )}
                <p className={`text-xs uppercase tracking-widest mb-2 ${tier.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {tier.capacity}
                </p>
                <h2 className={`text-2xl font-bold mb-1 font-[family-name:var(--font-playfair)] ${tier.featured ? "text-primary-foreground" : "text-foreground"}`}>
                  {tier.size}
                </h2>
                <p className={`text-xs mb-4 ${tier.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {tier.description}
                </p>
                <p className={`text-4xl font-bold mb-6 font-[family-name:var(--font-playfair)] ${tier.featured ? "text-primary-foreground" : "text-primary"}`}>
                  {tier.price}
                </p>
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${tier.featured ? "text-primary-foreground" : "text-primary"}`} />
                      <span className={tier.featured ? "text-primary-foreground/90" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:4078017886"
                  className={`mt-8 flex items-center justify-center gap-2 h-11 font-black text-sm uppercase tracking-wide transition-all active:scale-[0.98] ${
                    tier.featured
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  <Phone className="h-3.5 w-3.5" />
                  Get This Price
                </a>
              </div>
            ))}
          </div>

          {/* Trust note */}
          <div className="mt-10 bg-secondary border border-border p-6 text-center">
            <p className="text-base font-bold text-foreground mb-1">You approve the price before any work begins.</p>
            <p className="text-sm text-muted-foreground">No hidden fees. No surprise charges. If it changes, we call you first.</p>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-sm text-primary uppercase tracking-wider mb-8">Same-day service available — call before 2 pm</p>
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
                  Get Your Free Quote
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCallButton />
    </main>
  )
}
