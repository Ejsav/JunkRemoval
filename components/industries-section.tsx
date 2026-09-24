import { Trash2, TreePine, Sprout, Droplet, Hammer, Home, Wind, Wrench } from "lucide-react"

export function IndustriesSection() {
  const industries = [
    { icon: Trash2, name: "Junk Removal" },
    { icon: TreePine, name: "Tree Removal" },
    { icon: Sprout, name: "Landscaping" },
    { icon: Droplet, name: "Pressure Washing" },
    { icon: Hammer, name: "Demolition" },
    { icon: Home, name: "Roofing" },
    { icon: Wind, name: "HVAC" },
    { icon: Wrench, name: "General Contracting" },
  ]

  return (
    <section className="py-24 px-4 lg:px-8 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">Adaptable Framework</p>
          <h2 className="text-4xl md:text-5xl font-normal text-foreground font-[family-name:var(--font-playfair)]">
            Industries
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="bg-background p-8 text-center hover:border-foreground transition-colors border border-border"
            >
              <industry.icon className="h-8 w-8 text-foreground mx-auto mb-4" />
              <p className="text-sm font-medium text-foreground">{industry.name}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto">
          The layout and structure are adapted to each industry while maintaining the same conversion-focused principles.
        </p>
      </div>
    </section>
  )
}
