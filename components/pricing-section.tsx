import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { site, isSampleContent, QUOTE_PATH } from "@/config/site"
import { SectionHeading, SampleBadge } from "@/components/section-heading"

export function PricingSection({ as = "h2" }: { as?: "h1" | "h2" }) {
  const { pricing } = site
  return (
    <section id="pricing" data-section="pricing" className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading as={as} eyebrow="Pricing guide" title="Know the price before we start." aside={pricing.intro} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricing.tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-7 border flex flex-col ${
                t.popular ? "bg-foreground text-background border-foreground shadow-xl" : "bg-card border-border card-shadow"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-7 text-[10px] font-black uppercase tracking-[0.16em] bg-accent text-accent-foreground px-3 py-1 rounded-full">
                  Most booked
                </span>
              )}
              <p className={`text-xs font-black uppercase tracking-[0.16em] mb-1 ${t.popular ? "text-background/60" : "text-muted-foreground"}`}>{t.volume}</p>
              <h3 className="text-lg font-black mb-4">{t.name}</h3>
              <p className={`text-3xl font-black tracking-tight mb-3 ${t.popular ? "text-accent" : "text-foreground"}`}>{t.price}</p>
              <p className={`text-sm leading-relaxed flex-1 ${t.popular ? "text-background/75" : "text-muted-foreground"}`}>{t.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <p className="text-sm text-muted-foreground max-w-2xl flex flex-wrap items-center gap-2">
            {isSampleContent && <SampleBadge label="Example pricing" />}
            {pricing.note}
          </p>
          <Link href={QUOTE_PATH} data-cta="pricing" className="shrink-0 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-black px-7 h-12 rounded-xl hover:bg-primary/90 transition-all text-sm btn-lift">
            Get Your Exact Price
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
