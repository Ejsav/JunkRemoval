import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const pricingTiers = [
  {
    name: "Small load",
    range: "$150–$250",
  },
  {
    name: "Medium load",
    range: "$300–$450",
  },
  {
    name: "Full load",
    range: "$500–$700",
  },
]

export function Pricing() {
  const phoneNumber = "860-406-0262"

  return (
    <section className="bg-muted py-16 px-4 md:py-20">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-balance mb-4 md:text-4xl">Simple & Fair Pricing</h2>

        <p className="text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Pricing is based on how much space your junk takes up in our truck.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {pricingTiers.map((tier) => (
            <Card key={tier.name}>
              <CardHeader>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{tier.range}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-base text-foreground mb-8 font-medium">
          You approve the price before any work begins.
        </p>

        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
            <a href={`tel:${phoneNumber}`}>Call Now</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
