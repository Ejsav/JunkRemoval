import type React from "react"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { site, phoneHref, QUOTE_PATH } from "@/config/site"
import { Container, Em, Eyebrow, SectionTitle } from "@/components/section-heading"

export function ServiceAreasSection({ as = "h2", n }: { as?: "h1" | "h2"; n?: string }) {
  const { serviceAreas, business } = site
  const [home, ...rest] = serviceAreas.cities

  return (
    <section id="service-areas" data-section="service-areas" className="bg-bone py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_80%_30%,black,transparent_65%)] pointer-events-none" aria-hidden />
      <Container className="relative grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-10">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start" data-reveal>
          <Eyebrow index={n}>Service area</Eyebrow>
          <SectionTitle as={as} className="mt-6">
            Local to <Em>{business.address.city}.</Em>
          </SectionTitle>
          <p className="lede text-stone mt-5 sm:mt-6 max-w-sm">{serviceAreas.intro}</p>
          <Link href={QUOTE_PATH} data-cta="service-areas" className="btn btn-ink mt-8 sm:mt-9">
            Check availability
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="lg:col-span-8 lg:pl-10" data-reveal>
          {/* Home base gets its own row; the rest sit in an even, hairline grid. */}
          <div className="flex items-center justify-between gap-4 py-5 sm:py-6 border-y border-ink/80">
            <span className="flex items-center gap-3.5 min-w-0">
              <span className="h-10 w-10 shrink-0 rounded-full bg-accent text-white flex items-center justify-center ring-4 ring-accent/15">
                <MapPin className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-[clamp(1.5rem,5vw,2.25rem)] font-semibold tracking-[-0.035em] leading-none text-ink truncate">{home}</span>
            </span>
            <span className="eyebrow !text-[10px] text-stone shrink-0">Home base</span>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 sm:gap-x-8">
            {rest.map((city, i) => (
              <li
                key={city}
                className="flex items-baseline gap-2.5 sm:gap-3 py-4 sm:py-5 border-b border-line text-[15.5px] sm:text-[19px] leading-tight font-medium tracking-[-0.02em] text-ink min-w-0"
                style={{ "--d": `${i * 30}ms` } as React.CSSProperties}
              >
                <span className="font-mono text-[10.5px] text-stone tabular-nums shrink-0">{String(i + 2).padStart(2, "0")}</span>
                <span className="min-w-0 text-balance">{city}</span>
              </li>
            ))}
          </ul>
          <p className="text-[14.5px] text-stone mt-7 text-pretty">
            Don&apos;t see your town?{" "}
            <a href={phoneHref} data-cta="service-areas" className="text-ink font-medium link-draw whitespace-nowrap">
              Call {business.phoneDisplay}
            </a>
            . We often travel further.
          </p>
        </div>
      </Container>
    </section>
  )
}
