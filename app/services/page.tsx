import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { site, QUOTE_PATH } from "@/config/site"
import { icons } from "@/lib/icons"
import { PageHeader } from "@/components/page-header"
import { ProcessSection } from "@/components/process-section"
import { CtaSection } from "@/components/cta-section"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Junk Removal Services",
  description: `Furniture, appliance, garage, estate, commercial and yard debris removal in ${site.business.address.city} and nearby. Upfront pricing.`,
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  const { services, business, seo, serviceAreas } = site
  const schema = {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      name: s.title,
      description: s.description,
      serviceType: "Junk removal",
      provider: { "@id": `${seo.siteUrl}/#business` },
      areaServed: serviceAreas.cities.map((name) => ({ "@type": "City", name })),
      url: `${seo.siteUrl}/services#${s.slug}`,
      ...(s.priceFrom && { offers: { "@type": "Offer", priceCurrency: "USD", price: s.priceFrom, description: `From $${s.priceFrom}` } }),
    })),
  }

  return (
    <>
      <PageHeader eyebrow="Services" title={`Junk removal services in ${business.address.city}`} intro={business.description} />
      <section className="py-16 sm:py-24 bg-background" data-section="services-list">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-5">
          {services.map((s) => {
            const Icon = icons[s.icon]
            return (
              <article id={s.slug} key={s.slug} className="scroll-mt-24 bg-card border border-border rounded-2xl p-7 sm:p-10 card-shadow grid lg:grid-cols-[1fr_1fr_auto] gap-8 lg:items-center">
                <div>
                  <span className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5" aria-hidden>
                    <Icon className="h-6 w-6 text-accent" />
                  </span>
                  <h2 className="text-2xl font-black text-foreground mb-2">{s.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {s.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2.5 text-[15px] font-semibold text-foreground">
                      <Check className="h-4 w-4 text-accent shrink-0" aria-hidden />
                      {ex}
                    </li>
                  ))}
                </ul>
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4">
                  {s.priceFrom && (
                    <p className="text-sm text-muted-foreground">
                      From <span className="text-2xl font-black text-foreground">${s.priceFrom}</span>
                    </p>
                  )}
                  <Link href={QUOTE_PATH} data-cta={`service-${s.slug}`} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-black px-6 h-12 rounded-xl hover:bg-primary/90 transition-all text-sm btn-lift whitespace-nowrap">
                    Get a Quote <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
      <ProcessSection />
      <CtaSection />
      <JsonLd data={schema} />
    </>
  )
}
