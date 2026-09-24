import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { site, phoneHref, QUOTE_PATH } from "@/config/site"
import { Container, Em, Eyebrow, SectionTitle } from "@/components/section-heading"

export function ServiceAreasSection({ as = "h2", n }: { as?: "h1" | "h2"; n?: string }) {
  const { serviceAreas, business } = site
  const { cities } = serviceAreas

  return (
    <section id="service-areas" data-section="service-areas" className="bg-bone py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_80%_30%,black,transparent_65%)] pointer-events-none" aria-hidden />
      <Container className="relative grid lg:grid-cols-12 gap-12 lg:gap-10">
        <div className="lg:col-span-4" data-reveal>
          <Eyebrow index={n}>Service area</Eyebrow>
          <SectionTitle as={as} className="mt-6">
            Local to <Em>{business.address.city}.</Em>
          </SectionTitle>
          <p className="lede text-stone mt-6 max-w-sm">{serviceAreas.intro}</p>
          <p className="text-[14.5px] text-stone mt-8">
            Don&apos;t see your town?{" "}
            <a href={phoneHref} data-cta="service-areas" className="text-ink font-medium link-draw">
              Call {business.phoneDisplay}
            </a>
            . We often travel further.
          </p>
        </div>

        <div className="lg:col-span-8 lg:pl-10">
          <p className="headline !leading-[1.22] text-[clamp(1.75rem,3.4vw,3rem)] text-ink" data-reveal>
            {cities.map((city, i) => (
              <span key={city}>
                <span className={`whitespace-nowrap ${i === 0 ? "inline-flex items-center gap-3" : "text-stone/75 hover:text-ink transition-colors duration-300"}`}>
                  {i === 0 && <span className="h-3 w-3 rounded-full bg-accent ring-4 ring-accent/15" aria-hidden />}
                  {city}
                  {i < cities.length - 1 && <span className="text-line font-light ml-2 sm:ml-3" aria-hidden>/</span>}
                </span>{" "}
              </span>
            ))}
          </p>
          <Link href={QUOTE_PATH} data-cta="service-areas" className="btn btn-ink mt-12">
            Check availability
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  )
}
