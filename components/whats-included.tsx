import { Check, Globe, Smartphone, Search, Phone, Settings, Award, FileCheck } from "lucide-react"

const features = [
  {
    icon: FileCheck,
    title: "This Exact Website",
    description: "Customized with your business name, domain, phone number, and service area",
  },
  {
    icon: Globe,
    title: "Brand-New Domain",
    description: "Buyer's choice or suggested domain name",
  },
  {
    icon: Settings,
    title: "Fully Built Website",
    description: "This exact premium junk removal design",
  },
  {
    icon: Award,
    title: "Custom Branding",
    description: "Business name, logo text, phone number & service area",
  },
  {
    icon: Smartphone,
    title: "Mobile-Optimized",
    description: "Fast loading on all devices",
  },
  {
    icon: Phone,
    title: "Contact Form + Click-to-Call",
    description: "Ready to capture leads immediately",
  },
  {
    icon: Search,
    title: "Basic SEO Setup",
    description: "On-page optimization included",
  },
]

export function WhatsIncluded() {
  return (
    <section className="py-20 md:py-28 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-primary uppercase mb-4">Website For Sale</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            What's Included With Purchase
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to launch your junk removal business online
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-primary/20 p-8 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Check className="w-6 h-6 text-[color:var(--success)]" />
            <span className="font-semibold text-lg text-foreground">Full Ownership & Transfer</span>
          </div>
          <p className="text-muted-foreground">
            You receive complete ownership of the website and all assets. No monthly fees. No strings attached.
          </p>
        </div>
      </div>
    </section>
  )
}
