import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight, MessageSquare } from "lucide-react"
import { site, isSampleContent, quoteHref, servicePath, cityPages, cityPath } from "@/config/site"
import { PageHeader } from "@/components/page-header"
import { QuoteSection } from "@/components/quote-section"
import { ReviewsSection } from "@/components/reviews-section"
import { BeforeAfter } from "@/components/before-after-slider"
import { Container, Em, Eyebrow, SampleBadge, SectionTitle } from "@/components/section-heading"
import { TextLink } from "@/components/biz"
import { JsonLd } from "@/components/json-ld"

export const dynamicParams = false

export function generateStaticParams() {
  return cityPages.map((c) => ({ slug: c.slug }))
}

const find = (slug: string) => cityPages.find((c) => c.slug === slug)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = find((await params).slug)
  if (!c) return {}
  return {
    title: `Junk Removal in ${c.name}, ${site.business.address.region}`,
    description: `Junk removal and cleanouts in ${c.name}. ${c.detail}`.slice(0, 160),
    alternates: { canonical: cityPath(c) },
  }
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug)
  if (!c) notFound()
  const { business, seo, services, projects, reviews, serviceAreas, images } = site
  const local = projects.find((p) => p.location === c.name)
  const hasLocalReviews = reviews.some((r) => r.location === c.name)
  const nearby = serviceAreas.cities.filter((o) => o.slug !== c.slug)

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: seo.siteUrl },
      { "@type": "ListItem", position: 2, name: "Service areas", item: `${seo.siteUrl}/service-areas` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${seo.siteUrl}${cityPath(c)}` },
    ],
  }

  return (
    <>
      <PageHeader
        eyebrow={c.name}
        parent={{ href: "/service-areas", label: "Service areas" }}
        title={`Junk removal in ${c.name}.`}
        emphasis="Priced before we lift a thing."
        intro={c.detail}
        image={local?.after ?? images.crew}
        imageAlt={local ? `${local.title} in ${c.name}, after` : images.crewAlt}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={quoteHref({ location: c.name })} data-cta={`city-${c.slug}`} className="btn btn-accent !h-14 !px-7">
            Get my price in {c.name}
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
          {business.textEnabled && (
            <TextLink data-cta={`city-${c.slug}`} className="btn btn-ghost-dark !h-14">
              <MessageSquare className="h-4 w-4" aria-hidden /> Text photos
            </TextLink>
          )}
        </div>
        <p className="text-[14px] text-mist mt-5">
          {business.hours.label}. Same-day slots depend on the day&apos;s schedule, so call or text early.
        </p>
      </PageHeader>

      <section className="bg-bone py-20 sm:py-28" data-section="city-services">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-4" data-reveal>
            <Eyebrow>Services in {c.name}</Eyebrow>
            <SectionTitle className="mt-6">
              Everything we do, <Em>done here.</Em>
            </SectionTitle>
          </div>
          <ul className="lg:col-span-8 border-t border-line" data-reveal>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={servicePath(s.slug)} className="group grid grid-cols-[1fr_auto_auto] items-center gap-5 py-5 border-b border-line">
                  <span>
                    <span className="block text-[20px] font-semibold tracking-[-0.025em]">{s.title}</span>
                    <span className="block text-[14.5px] text-stone mt-0.5">{s.summary}</span>
                  </span>
                  {s.priceFrom && <span className="font-mono text-[13px] whitespace-nowrap">from ${s.priceFrom}</span>}
                  <ArrowUpRight className="h-4 w-4 text-stone transition-transform duration-300 group-hover:rotate-45 group-hover:text-ink" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {local && (
        <section className="surface-dark grain relative overflow-hidden py-20 sm:py-28" data-section="city-proof">
          <Container className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4" data-reveal>
              <Eyebrow tone="dark">A recent {c.name} job</Eyebrow>
              <SectionTitle className="mt-6 text-bone">{local.title}.</SectionTitle>
              <p className="lede text-mist mt-6">{local.description}</p>
              {isSampleContent && <p className="mt-6"><SampleBadge label="Sample project" tone="dark" /></p>}
            </div>
            <div className="lg:col-span-8" data-reveal>
              <BeforeAfter project={local} sizes="(max-width: 1024px) 100vw, 60vw" />
            </div>
          </Container>
        </section>
      )}

      {hasLocalReviews && <ReviewsSection limit={3} items={[...reviews].sort((a, b) => Number(b.location === c.name) - Number(a.location === c.name))} />}

      <section className="bg-paper py-16 sm:py-20 border-t border-line" data-section="city-nearby">
        <Container>
          <Eyebrow>Also serving</Eyebrow>
          <p className="headline text-[clamp(1.5rem,2.6vw,2.2rem)] !leading-[1.3] mt-6 text-stone/80">
            {nearby.map((o, i) => (
              <span key={o.slug}>
                {o.detail ? (
                  <Link href={cityPath(o)} className="text-ink underline decoration-line decoration-1 underline-offset-[0.18em] hover:decoration-ink">{o.name}</Link>
                ) : (
                  o.name
                )}
                {i < nearby.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </Container>
      </section>

      <QuoteSection location={c.name} />
      <JsonLd data={schema} />
    </>
  )
}
