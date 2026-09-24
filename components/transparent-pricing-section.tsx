import { CheckCircle } from "lucide-react"

const pricingTiers = [
  {
    name: "Single Item",
    description: "From $89",
    price: "Chair • Appliance • TV",
    items: [
      "Same-day pickup available",
      "Crew handles all lifting",
      "Locked price before we arrive",
    ],
  },
  {
    name: "Quarter Truck",
    description: "From $199",
    price: "Sofa • Mattress • Furniture",
    items: [
      "Same-day pickup available",
      "Heavy items included",
      "No hidden disposal fees",
    ],
  },
  {
    name: "Half Truck",
    description: "From $349",
    price: "Garage or Bedroom Cleanout",
    items: [
      "Same-day pickup available",
      "Multiple items and appliances",
      "Satisfaction guaranteed",
    ],
    featured: true,
  },
  {
    name: "Full Truck",
    description: "From $549",
    price: "Estate or Complete Cleanout",
    items: [
      "Same-day pickup available",
      "Full-capacity crew load",
      "No hidden fees — ever",
    ],
  },
]

export function TransparentPricingSection() {
  return (
    <section className="py-20 px-4 lg:px-8 bg-secondary">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-black text-accent uppercase tracking-widest mb-4">Fixed Pricing — Starting at $89</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 leading-[1.1]">
              You Know the Price Before We Start
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-3">
              No surprises. No overages. Pick a tier or call for a custom quote. Final price locked in on the phone.
            </p>
            <p className="text-sm font-bold text-secondary-foreground">
              Average job: $150–$600. Price approved before work begins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 flex flex-col transition-all ${
                  tier.featured
                    ? "bg-foreground text-background ring-2 ring-accent scale-105 md:scale-100 shadow-xl"
                    : "bg-background border border-border hover:border-accent/50"
                }`}
              >
                {tier.featured && (
                  <div className="text-xs font-black text-accent uppercase tracking-widest mb-3">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-lg font-black mb-1 ${tier.featured ? "text-background" : ""}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-4 ${tier.featured ? "text-background/70" : "text-muted-foreground"}`}>
                  {tier.description}
                </p>
                <div className={`text-2xl font-black mb-6 ${tier.featured ? "text-background" : "text-foreground"}`}>
                  {tier.price}
                </div>
                <ul className="space-y-3 flex-1">
                  {tier.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2 text-sm ${
                        tier.featured ? "text-background/90" : "text-muted-foreground"
                      }`}
                    >
                      <CheckCircle
                        className={`h-4 w-4 shrink-0 mt-0.5 ${
                          tier.featured ? "text-background" : "text-accent"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-background border border-border rounded-2xl p-8 text-center">
            <p className="text-foreground font-black mb-2">Not sure what you need?</p>
            <p className="text-muted-foreground">
              Call or fill out a quick form for a free quote tailored to your specific job. No obligation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
