import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight, MessageSquare } from "lucide-react"
import { site, isSampleContent, quoteHref, servicePath, cityPath } from "@/config/site"
import { icons } from "@/lib/icons"
import { PageHeader } from "@/components/page-header"
import { ProcessSection } from "@/components/process-section"
import { QuoteSection } from "@/components/quote-section"
import { FaqSection } from "@/components/faq-section"
import { BeforeAfter } from "@/components/before-after-slider"
import { Container, Em, Eyebrow, SampleBadge, SectionTitle } from "@/components/section-heading"
import { BizCity, TextLink } from "@/components/biz"
import { JsonLd } from "@/components/json-ld"

export const dynamicParams = false

export function generateStaticParams() {
  return site.services.map((s) => ({ slug: s.slug }))
}

const find = (slug: string) => site.services.find((s) => s.slug === slug)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = find((await params).slug)
  if (!s) return {}
  const { city, region } = site.business.address
  return {
    title: `${s.title} in ${city}, ${region}`,
    description: `${s.summary} ${s.description}${s.priceFrom ? ` From $${s.priceFrom}, priced upfront.` : ""}`.slice(0, 160),
    alternates: { canonical: servicePath(s.slug) },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = find((await params).slug)
  if (!s) notFound()
  const { business, seo, serviceAreas, pricing, services, projects, images } = site
  const Icon = icons[s.icon]
  const proof = projects.filter((p) => p.service === s.slug)
  const related = services.filter((o) => o.slug !== s.slug).slice(0, 4)
  const faqs = [...(s.faqs ?? []), ...site.faqs.filter((f) => /cost|photos/i.test(f.q)).map(({ q, a }) => ({ q, a }))]

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.title,
        description: s.description,
        serviceType: s.title,
        provider: { "@id": `${seo.siteUrl}/#business` },
        areaServed: serviceAreas.cities.map((c) => ({ "@type": "City", name: c.name })),
        url: `${seo.siteUrl}${servicePath(s.slug)}`,
        ...(s.priceFrom && { offers: { "@type": "Offer", priceCurrency: "USD", price: s.priceFrom, description: `From $${s.priceFrom}` } }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: seo.siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${seo.siteUrl}/services` },
          { "@type": "ListItem", position: 3, name: s.title, item: `${seo.siteUrl}${servicePath(s.slug)}` },
        ],
      },
    ],
  }

  return (
    <>
      <PageHeader
        eyebrow={s.title}
        parent={{ href: "/services", label: "Services" }}
        title={s.title}
        emphasis={<>in <BizCity /> and nearby.</>}
        intro={s.description}
        image={proof[0]?.after ?? images.crew}
        imageAlt={proof[0] ? `${proof[0].title}, after` : images.crewAlt}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Link href={quoteHref({ service: s.slug })} data-cta={`service-${s.slug}`} className="btn btn-accent !h-14 !px-7">
            Get my price
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
          {business.textEnabled && (
            <TextLink data-cta={`service-${s.slug}`} className="btn btn-ghost-dark !h-14">
              <MessageSquare className="h-4 w-4" aria-hidden /> Text photos
            </TextLink>
          )}
          {s.priceFrom && (
            <p className="sm:ml-4 text-mist text-[14px]">
              From <span className="text-bone font-semibold text-[20px] tracking-tight">${s.priceFrom}</span>
              {isSampleContent && <span className="ml-2"><SampleBadge label="Example" tone="dark" /></span>}
            </p>
          )}
        </div>
      </PageHeader>

      <section className="bg-bone py-20 sm:py-28" data-section="service-detail">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <Eyebrow>
              <Icon className="h-4 w-4 text-accent" aria-hidden /> What we take
            </Eyebrow>
            <SectionTitle className="mt-6">
              {s.summary.replace(/\.$/, "")}. <Em>And the rest.</Em>
            </SectionTitle>
            {business.textEnabled && (
              <p className="text-[15px] text-stone mt-6 max-w-sm">
                Something unusual?{" "}
                <TextLink className="text-ink font-medium link-draw">Text a photo</TextLink> and we&apos;ll tell you if we can take it.
              </p>
            )}
          </div>
          <ul className="lg:col-span-6 lg:col-start-7 border-t border-line self-end" data-reveal>
            {s.examples.map((ex) => (
              <li key={ex} className="flex items-center gap-4 py-5 border-b border-line text-[18px] font-medium tracking-[-0.015em]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {ex}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {proof.length > 0 && (
        <section className="surface-dark grain relative overflow-hidden py-20 sm:py-28" data-section="service-proof">
          <Container className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4" data-reveal>
              <Eyebrow tone="dark">Before &amp; after</Eyebrow>
              <SectionTitle className="mt-6 text-bone">
                {proof[0].title}, <Em className="text-accent-soft">{proof[0].location ?? "recently"}.</Em>
              </SectionTitle>
              <p className="lede text-mist mt-6">{proof[0].description}</p>
              {isSampleContent && <p className="mt-6"><SampleBadge label="Sample project" tone="dark" /></p>}
            </div>
            <div className="lg:col-span-8" data-reveal>
              <BeforeAfter project={proof[0]} sizes="(max-width: 1024px) 100vw, 60vw" />
            </div>
          </Container>
        </section>
      )}

      <section className="bg-sand py-20 sm:py-28" data-section="service-pricing">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <Eyebrow>Pricing</Eyebrow>
            <SectionTitle className="mt-6">
              {s.priceFrom ? <>From ${s.priceFrom}. </> : null}
              <Em>Locked before we start.</Em>
            </SectionTitle>
            <p className="lede text-stone mt-6 max-w-md">{pricing.intro}</p>
            {isSampleContent && <p className="mt-6"><SampleBadge label="Example pricing" /></p>}
          </div>
          <dl className="lg:col-span-6 lg:col-start-7 border-t border-ink/80" data-reveal>
            {pricing.factors.map((f) => (
              <div key={f.title} className="grid grid-cols-[8rem_1fr] gap-6 py-5 border-b border-line">
                <dt className="text-[15px] font-semibold">{f.title}</dt>
                <dd className="text-[15px] text-stone leading-relaxed">{f.text}</dd>
              </div>
            ))}
            <div className="pt-6">
              <Link href="/pricing" className="inline-flex items-center gap-2 text-[15px] font-medium link-draw">
                See starting prices by truckload <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </dl>
        </Container>
      </section>

      <ProcessSection />
      <FaqSection items={faqs} />

      <section className="bg-bone py-20 sm:py-24 border-t border-line" data-section="service-related">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Eyebrow>Also handled</Eyebrow>
            <ul className="mt-6 border-t border-line">
              {related.map((o) => (
                <li key={o.slug}>
                  <Link href={servicePath(o.slug)} className="group flex items-center justify-between gap-4 py-4 border-b border-line">
                    <span className="text-[19px] font-semibold tracking-[-0.02em]">{o.title}</span>
                    <ArrowUpRight className="h-4 w-4 text-stone transition-transform duration-300 group-hover:rotate-45 group-hover:text-ink" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow>Where we do it</Eyebrow>
            <p className="text-[17px] leading-relaxed mt-6 text-stone">
              {serviceAreas.cities.map((c, i) => (
                <span key={c.slug}>
                  {c.detail ? (
                    <Link href={cityPath(c)} className="text-ink link-draw">{c.name}</Link>
                  ) : (
                    c.name
                  )}
                  {i < serviceAreas.cities.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </div>
        </Container>
      </section>

      <QuoteSection service={s.slug} />
      <JsonLd data={schema} />
    </>
  )
}
