import { Metadata } from "next"
import { Trash2, TreePine, Sprout, Droplet, Hammer, Home, Wind, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Industries | Custom Websites For Service Businesses",
  description:
    "Website framework adaptable to multiple service industries including junk removal, tree removal, landscaping, pressure washing, roofing, HVAC, and contracting.",
}

export default function IndustriesPage() {
  const industries = [
    {
      icon: Trash2,
      name: "Junk Removal",
      description: "Service pages, pricing structures, before/after galleries, service area coverage",
    },
    {
      icon: TreePine,
      name: "Tree Removal",
      description: "Emergency service callouts, project galleries, equipment showcases, safety credentials",
    },
    {
      icon: Sprout,
      name: "Landscaping",
      description: "Seasonal services, maintenance packages, portfolio showcases, consultation bookings",
    },
    {
      icon: Droplet,
      name: "Pressure Washing",
      description: "Residential and commercial services, surface types, before/after comparisons",
    },
    {
      icon: Hammer,
      name: "Demolition",
      description: "Project scope pages, safety certifications, commercial vs residential services",
    },
    {
      icon: Home,
      name: "Roofing",
      description: "Material options, inspection services, warranty information, emergency repairs",
    },
    {
      icon: Wind,
      name: "HVAC",
      description: "Installation, repair, maintenance plans, emergency service availability",
    },
    {
      icon: Wrench,
      name: "General Contracting",
      description: "Project types, portfolio galleries, licensing info, consultation requests",
    },
  ]

  const adaptableElements = [
    "Service page content tailored to your offerings",
    "Pricing structures adapted to your business model",
    "Lead capture forms customized to your needs",
    "Service area pages for your locations",
    "Image galleries showcasing your work",
    "Testimonial sections for social proof",
  ]

  return (
    <main className="min-h-screen">
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6">Adaptable Framework</p>
          <h1 className="text-5xl md:text-6xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-6">
            Built For Multiple Industries
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The same conversion-focused framework adapts to different service businesses while maintaining the structure that generates leads.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-16 text-center">
            Service Industries
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <div key={industry.name} className="bg-background p-8 border border-border">
                <industry.icon className="h-10 w-10 text-foreground mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">{industry.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-12">
            How The Framework Adapts
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            While each industry has unique service offerings and customer needs, the core website structure remains consistent. This proven framework includes:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {adaptableElements.map((element) => (
              <div key={element} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-foreground mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">{element}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-8">
            Example Sections
          </h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-4">Service Pages</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Each service you offer gets its own dedicated page with clear descriptions, benefits, process explanations, and calls to action. The junk removal demo shows this with pages for residential, commercial, estate cleanouts, and more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-foreground mb-4">Pricing Structure</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Transparent pricing builds trust. Whether you charge by the hour, by project scope, or with tiered packages, the framework adapts to show pricing in a way that makes sense for your business.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-foreground mb-4">Service Area Coverage</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Location matters for local service businesses. The demo includes service area mapping, city-specific content, and clear coverage communication to help customers know if you serve them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-foreground mb-4">Lead Capture Forms</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Multiple contact forms throughout the site make it easy for customers to request quotes or ask questions. Forms are customized to collect the information your business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-8">
            Not seeing your industry?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            This framework works for most local service businesses. Let's discuss how it can be customized for your specific industry.
          </p>
          <Button size="lg" className="text-sm px-10 py-6 h-auto uppercase tracking-[0.2em]" asChild>
            <a href="/contact">
              Get In Touch
              <ArrowRight className="ml-3 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </main>
  )
}
