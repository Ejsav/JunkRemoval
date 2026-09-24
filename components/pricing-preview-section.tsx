import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

export function PricingPreviewSection() {
  const phoneNumber = "(407) 801-7886"
  const phoneHref = "tel:4078017886"

  const pricingTiers = [
    {
      size: "Single Item",
      price: "$89–$149",
      capacity: "Express Pickup",
      features: ["One item fast", "Sofa, mattress, appliance", "Same-day slots available"],
    },
    {
      size: "Small Load",
      price: "$199–$299",
      capacity: "1/4 Truck",
      features: ["Small room or storage unit", "Light garage declutter", "Price locked before arrival"],
    },
    {
      size: "Medium Load",
      price: "$349–$449",
      capacity: "1/2 Truck",
      features: ["Garage or 2–3 room cleanout", "Most popular choice", "Crew handles all lifting"],
      featured: true,
    },
    {
      size: "Full Load",
      price: "$549–$699",
      capacity: "Full Truck",
      features: ["Whole house or estate cleanout", "Large commercial jobs", "No hidden disposal fees"],
    },
  ]

  return (
    <section className="py-24 px-4 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 mb-16 pb-12 border-b border-border md:flex-row md:items-end md:gap-8">
          <div>
            <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">Transparent Pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
              Simple Rates
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              No hidden fees. No surprises. Fair pricing approved before work begins.
            </p>
          </div>
          <Button size="lg" className="px-8 py-6 h-auto uppercase tracking-wider" variant="outline" asChild>
            <a href="/pricing">
              View Full Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 stagger-children">
          {pricingTiers.map((tier) => (
            <div
              key={tier.size}
              className={`rounded-xl border transition-all flex flex-col group ${
                tier.featured
                  ? "border-primary bg-primary/8 shadow-lg hover:shadow-2xl hover:-translate-y-1 scale-105 origin-bottom"
                  : "border-border bg-card card-shadow hover:card-shadow-md hover:border-primary/40 hover:-translate-y-0.5"
              }`}
            >
              <div className="p-8 flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-xs font-black text-primary/70 uppercase tracking-widest mb-2">{tier.capacity}</p>
                  <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">{tier.size}</h3>
                </div>

                <div className="mb-8">
                  <p className="text-5xl font-black text-foreground">{tier.price}</p>
                </div>

                <div className="space-y-3.5 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm font-medium leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={phoneHref}
                  className={`w-full inline-flex items-center justify-center font-black h-13 rounded-lg transition-all btn-lift text-sm uppercase tracking-wide ${
                    tier.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/25"
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Call Now
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          All prices subject to on-site confirmation. Volume discounts available for larger jobs.
        </p>
      </div>
    </section>
  )
}
