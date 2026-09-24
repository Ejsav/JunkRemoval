import Link from "next/link"
import { MapPin } from "lucide-react"
import { site, phoneHref } from "@/config/site"
import { SectionHeading } from "@/components/section-heading"

export function ServiceAreasSection({ as = "h2" }: { as?: "h1" | "h2" }) {
  const { serviceAreas, business } = site
  return (
    <section id="service-areas" data-section="service-areas" className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading as={as} eyebrow="Service areas" title={`Junk removal across ${business.address.city} and nearby.`} aside={serviceAreas.intro} />
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {serviceAreas.cities.map((city) => (
            <li key={city} className="flex items-center gap-2.5 bg-card border border-border rounded-xl px-4 py-3.5 font-bold text-foreground text-[15px]">
              <MapPin className="h-4 w-4 text-accent shrink-0" aria-hidden />
              {city}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-muted-foreground font-medium">
          Don&apos;t see your town?{" "}
          <a href={phoneHref} data-cta="service-areas" className="font-black text-foreground hover:text-accent underline underline-offset-4">
            Call {business.phoneDisplay}
          </a>{" "}
          or{" "}
          <Link href="/quote" className="font-black text-foreground hover:text-accent underline underline-offset-4">
            request a quote
          </Link>
          . We often travel further.
        </p>
      </div>
    </section>
  )
}
