import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { StickyCallButton } from "@/components/sticky-call-button"
import { ServiceArea } from "@/components/service-area"

export const metadata: Metadata = {
  title: "Service Areas | Junk Removal Orlando & Surrounding Counties",
  description:
    "We serve Orlando, Orange County, Osceola County, Seminole County, and surrounding areas. Same-day junk removal available throughout Central Florida.",
  keywords: "junk removal Orlando, Orange County, Osceola County, Seminole County, Central Florida, service areas",
}

export default function ServiceAreasPage() {
  const phoneNumber = "(407) 801-7886"

  const primaryAreas = [
    "Orlando",
    "Winter Park",
    "Maitland",
    "Altamonte Springs",
    "Kissimmee",
    "St. Cloud",
    "Sanford",
    "Lake Mary",
    "Longwood",
    "Oviedo",
    "Winter Springs",
    "Apopka",
  ]

  const counties = [
    {
      name: "Orange County",
      coverage: "100% Coverage",
      description: "Full junk removal service throughout Orange County including Orlando and surrounding cities.",
    },
    {
      name: "Osceola County",
      coverage: "100% Coverage",
      description: "Complete service area coverage including Kissimmee, St. Cloud, and surrounding areas.",
    },
    {
      name: "Seminole County",
      coverage: "100% Coverage",
      description: "Serving Sanford, Altamonte Springs, Lake Mary, Longwood, and all Seminole County locations.",
    },
  ]

  return (
    <main className="min-h-screen pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="py-24 px-4 lg:px-8 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">Our Coverage</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6">
            Service Areas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We service all of Central Florida. Fast, reliable junk removal throughout Orange, Osceola, and Seminole counties.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <ServiceArea />

      {/* Primary Service Areas */}
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-12">
            Primary Service Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {primaryAreas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* County Coverage */}
      <section className="py-24 px-4 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-12">
            County Coverage
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {counties.map((county) => (
              <div key={county.name} className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{county.name}</h3>
                    <p className="text-sm font-medium text-primary mt-1">{county.coverage}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{county.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Promise */}
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-12">
            Same-Day Service Available
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Fast Response Times</h3>
              <p className="text-muted-foreground leading-relaxed">
                We understand that junk removal is often urgent. That's why we offer same-day service throughout our entire service area when availability allows. Call early in the day for the best chance at same-day scheduling.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Professional & Courteous</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every crew member is trained to treat your property with respect. We arrive on time, work efficiently, and leave your space clean. We handle your items carefully and dispose of everything responsibly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Not Listed? */}
      <section className="py-24 px-4 lg:px-8 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6">
            Don't See Your Area?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We may still be able to service your location. Give us a call and we'll let you know if we can help.
          </p>
          <a href={`tel:${phoneNumber}`} className="group inline-flex items-center gap-4 mb-8">
            <span className="text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-playfair)] group-hover:text-primary transition-colors">
              {phoneNumber}
            </span>
            <ArrowRight className="h-8 w-8 text-primary group-hover:translate-x-2 transition-transform" />
          </a>
          <div>
            <Button size="lg" className="text-base px-8 py-6 h-auto uppercase tracking-wider" asChild>
              <a href={`tel:${phoneNumber}`}>
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCallButton phoneNumber={phoneNumber} />
    </main>
  )
}
