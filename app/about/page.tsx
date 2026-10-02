import type { Metadata } from "next"
import Image from "next/image"
import { site } from "@/config/site"
import { icons } from "@/lib/icons"
import { PageHeader } from "@/components/page-header"
import { ProcessSection } from "@/components/process-section"
import { CtaSection } from "@/components/cta-section"
import { Container, Eyebrow } from "@/components/section-heading"

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${site.business.name}: local junk removal in ${site.business.address.city} with upfront pricing and careful crews.`,
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  const { about, promises, business, images } = site
  return (
    <>
      <PageHeader eyebrow="About" title="Local. Careful." emphasis="Upfront about price." />

      <section className="bg-bone py-20 sm:py-28">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-4" data-reveal>
            <Eyebrow>Our story</Eyebrow>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <p className="headline text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.2] text-ink">{about.heading}</p>
            <div className="grid sm:grid-cols-2 gap-8 mt-10 text-[16.5px] text-stone leading-relaxed">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            {business.credentials.length > 0 && (
              <ul className="flex flex-wrap gap-2 mt-8">
                {business.credentials.map((c) => (
                  <li key={c} className="eyebrow !text-[10px] text-ink border border-line rounded-full px-3 py-1.5">{c}</li>
                ))}
              </ul>
            )}
          </div>
        </Container>

        <Container className="mt-20 sm:mt-24">
          <div className="grid lg:grid-cols-12 gap-4 sm:gap-5">
            <div className="lg:col-span-8 relative aspect-[16/10] rounded-[24px] sm:rounded-[28px] overflow-hidden elevated-lg bg-slate" data-reveal>
              <Image src={site.hero.image} alt={site.hero.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
            </div>
            <div className="lg:col-span-4 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto rounded-[24px] sm:rounded-[28px] overflow-hidden elevated-lg bg-slate" data-reveal>
              <Image src={images.recycling} alt={images.recyclingAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden />
              <p className="absolute left-5 right-5 bottom-5 sm:left-6 sm:right-6 sm:bottom-6 text-bone text-[15px] leading-snug text-pretty">
                Usable items are donated, recyclables recycled. The landfill is the last stop, not the first.
              </p>
            </div>
          </div>
        </Container>

        <Container className="mt-20">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 lg:gap-x-0 border-t border-line">
            {promises.map((p, i) => {
              const Icon = icons[p.icon]
              return (
                <li key={p.title} data-reveal className={`py-6 sm:py-8 lg:pr-6 border-b border-line lg:border-b-0 ${i > 0 ? "lg:pl-6 lg:border-l" : ""}`}>
                  <Icon className="h-5 w-5 text-accent" aria-hidden />
                  <p className="text-[16px] sm:text-[18px] leading-tight font-semibold tracking-[-0.02em] mt-4 sm:mt-5">{p.title}</p>
                  <p className="text-[14px] sm:text-[14.5px] text-stone mt-1.5 leading-snug">{p.text}</p>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>
      <ProcessSection />
      <CtaSection />
    </>
  )
}
