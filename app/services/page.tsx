import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { site, QUOTE_PATH } from "@/config/site"
import { icons } from "@/lib/icons"
import { PageHeader } from "@/components/page-header"
import { ProcessSection } from "@/components/process-section"
import { CtaSection } from "@/components/cta-section"
import { Container } from "@/components/section-heading"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Junk Removal Services",
  description: `Furniture, appliance, garage, estate, commercial and yard debris removal in ${site.business.address.city} and nearby. Upfront pricing.`,
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  const { services, business, seo, serviceAreas, images } = site
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
      <PageHeader
        eyebrow="Services"
        title="Everything, gone."
        emphasis={`Across ${business.address.city}.`}
        intro={business.description}
        image={images.crew}
        imageAlt={images.crewAlt}
      />

      <section className="bg-bone py-20 sm:py-28" data-section="services-list">
        <Container>
          {services.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <article
                id={s.slug}
                key={s.slug}
                data-reveal
                className="scroll-mt-28 grid lg:grid-cols-12 gap-x-10 gap-y-6 py-12 sm:py-14 border-t border-line last:border-b"
              >
                <div className="lg:col-span-5">
                  <p className="font-mono text-[12px] text-stone flex items-center gap-3">
                    {String(i + 1).padStart(2, "0")}
                    <Icon className="h-4 w-4 text-accent" aria-hidden />
                  </p>
                  <h2 className="headline text-[clamp(2rem,3.4vw,3rem)] mt-4">{s.title}</h2>
                  <p className="text-[16.5px] text-stone leading-relaxed mt-4 max-w-md">{s.description}</p>
                </div>
                <ul className="lg:col-span-4 lg:col-start-7 self-center grid gap-0 border-t border-line lg:border-t-0">
                  {s.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-3 py-3 border-b border-line text-[15px] text-ink">
                      <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                      {ex}
                    </li>
                  ))}
                </ul>
                <div className="lg:col-span-2 self-center flex lg:flex-col items-center lg:items-end justify-between gap-4">
                  {s.priceFrom && (
                    <p className="lg:text-right">
                      <span className="eyebrow !text-[10px] text-stone block">from</span>
                      <span className="text-[34px] font-semibold tracking-[-0.04em] leading-none">${s.priceFrom}</span>
                    </p>
                  )}
                  <Link href={QUOTE_PATH} data-cta={`service-${s.slug}`} className="btn btn-ink !h-11 !px-5 !text-[14px]">
                    Quote <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </article>
            )
          })}
        </Container>
      </section>
      <ProcessSection />
      <CtaSection />
      <JsonLd data={schema} />
    </>
  )
}
