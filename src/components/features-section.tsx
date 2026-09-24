import { Smartphone, Target, Phone, Gauge, MapPin, Crown } from "lucide-react"

export function FeaturesSection() {
  const features = [
    { icon: Smartphone, title: "Mobile Optimized", description: "Built mobile-first for the way customers browse" },
    { icon: Target, title: "Conversion Focused", description: "Every element designed to generate calls" },
    { icon: Phone, title: "Clear CTAs", description: "Strategic call-to-action placement throughout" },
    { icon: Gauge, title: "Fast Loading", description: "Optimized performance for quick page loads" },
    { icon: MapPin, title: "Local SEO Ready", description: "Structure built for local search visibility" },
    { icon: Crown, title: "Full Ownership", description: "Complete ownership transfer after launch" },
  ]

  return (
    <section className="py-24 px-4 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">What Makes These Different</p>
          <h2 className="text-4xl md:text-5xl font-normal text-foreground font-[family-name:var(--font-playfair)]">
            Built For Results
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <feature.icon className="h-8 w-8 text-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
