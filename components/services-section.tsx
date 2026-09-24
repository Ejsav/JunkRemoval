import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { site, QUOTE_PATH } from "@/config/site"
import { icons } from "@/lib/icons"
import { SectionHeading } from "@/components/section-heading"

export function ServicesSection() {
  return (
    <section id="services" data-section="services" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading eyebrow="What we remove" title="If it needs to go, we take it." aside="Single items to full-property cleanouts, residential and commercial." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/70 rounded-2xl overflow-hidden card-shadow">
          {site.services.map((s) => {
            const Icon = icons[s.icon]
            return (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                className="group bg-card p-5 sm:p-8 hover:bg-primary transition-colors duration-200 grid grid-cols-[auto_1fr] sm:flex sm:flex-col items-start sm:items-stretch gap-x-4"
              >
                <span className="w-11 h-11 rounded-xl bg-accent/10 group-hover:bg-primary-foreground/15 border border-accent/20 group-hover:border-primary-foreground/20 flex items-center justify-center sm:mb-5 transition-colors" aria-hidden>
                  <Icon className="h-5 w-5 text-accent group-hover:text-primary-foreground transition-colors" />
                </span>
                <span className="sm:flex-1 min-w-0">
                  <h3 className="font-black text-[16px] sm:text-[17px] text-foreground group-hover:text-primary-foreground sm:mb-2 transition-colors">{s.title}</h3>
                  <p className="text-[13px] sm:text-sm text-muted-foreground group-hover:text-primary-foreground/80 leading-snug sm:leading-relaxed font-medium transition-colors">{s.summary}</p>
                </span>
                <span className="col-start-2 mt-2 sm:mt-5 flex items-center sm:justify-between gap-2 text-sm font-black whitespace-nowrap text-foreground group-hover:text-primary-foreground transition-colors">
                  {s.priceFrom ? `From $${s.priceFrom}` : "Get a price"}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden />
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-muted-foreground font-medium">Not sure if we take it? Send a photo and ask.</p>
          <Link href={QUOTE_PATH} data-cta="services" className="inline-flex items-center gap-2 text-foreground font-black hover:text-accent transition-colors group">
            Get a free estimate
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
