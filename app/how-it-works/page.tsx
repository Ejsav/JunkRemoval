import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works | Custom Service Business Websites",
  description:
    "Learn about the custom website build process for local service businesses. Timeline, customization, ownership transfer, and what you receive.",
}

export default function HowItWorksPage() {
  const included = [
    "Mobile-optimized responsive design",
    "Conversion-focused layout structure",
    "Service pages customized to your business",
    "Contact forms with email notification",
    "Local SEO-ready page structure",
    "Fast-loading optimized performance",
    "Full ownership after launch",
  ]

  const timeline = [
    { phase: "Discovery Call", duration: "30 minutes", description: "Discuss your business, services, and goals" },
    { phase: "Custom Build", duration: "7-10 days", description: "Your website is built using the proven framework" },
    { phase: "Review & Revisions", duration: "2-3 days", description: "Make adjustments and approve final version" },
    { phase: "Launch", duration: "1 day", description: "Site goes live and ownership transfers to you" },
  ]

  return (
    <main className="min-h-screen">
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6">The Process</p>
          <h1 className="text-5xl md:text-6xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-6">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A straightforward process to get your business a high-converting website that generates calls.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-12">
            What You Receive
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-12">
            Timeline
          </h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={item.phase} className="flex gap-6 pb-6 border-b border-border">
                <span className="text-2xl font-[family-name:var(--font-playfair)] text-muted-foreground/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl font-normal text-foreground">{item.phase}</h3>
                    <span className="text-sm text-muted-foreground">{item.duration}</span>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-8">
            What Information Is Needed
          </h2>
          <div className="space-y-4 mb-8">
            <p className="text-muted-foreground leading-relaxed">
              To build your custom site, I'll need basic information about your business:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Business name and service area</li>
              <li>• Services you offer</li>
              <li>• Contact information (phone, email)</li>
              <li>• Any photos or branding assets (logo, service photos)</li>
              <li>• Preferred domain name if you have one</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-8">
            Hosting & Ownership
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Your website will be hosted on modern, reliable infrastructure. After launch, full ownership and access transfers to you. You control everything.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Hosting costs are separate and typically run $15-25/month depending on your needs and traffic.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-8">
            Optional Add-Ons
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Local SEO Setup</h3>
              <p className="text-muted-foreground">
                Optimize your site structure and content for local search visibility in your service area.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Service Area Pages</h3>
              <p className="text-muted-foreground">
                Additional location-specific pages to target multiple cities or neighborhoods.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Ongoing Updates</h3>
              <p className="text-muted-foreground">
                Monthly retainer for content updates, new pages, or ongoing optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-normal text-foreground font-[family-name:var(--font-playfair)] mb-8">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Let's discuss your business and build a website that generates leads.
          </p>
          <Button size="lg" className="text-sm px-10 py-6 h-auto uppercase tracking-[0.2em]" asChild>
            <a href="/contact">
              Request A Build
              <ArrowRight className="ml-3 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </main>
  )
}
