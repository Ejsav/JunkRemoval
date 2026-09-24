import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { site, isSampleContent, QUOTE_PATH } from "@/config/site"
import { Container, Em, Eyebrow, SampleBadge, SectionTitle } from "@/components/section-heading"

const FILL = [0.12, 0.25, 0.5, 1]

function TruckGauge({ fill, dark }: { fill: number; dark?: boolean }) {
  return (
    <span className="flex items-center gap-1 w-full" aria-hidden>
      <span className={`relative flex-1 h-9 rounded-l-lg rounded-r-sm overflow-hidden border ${dark ? "border-line-dark bg-bone/[0.04]" : "border-line bg-bone"}`}>
        <span className="absolute inset-y-0 left-0 bg-accent/90 transition-[width] duration-1000" style={{ width: `${fill * 100}%` }} />
        {[25, 50, 75].map((x) => (
          <span key={x} className={`absolute inset-y-1.5 w-px ${dark ? "bg-bone/15" : "bg-ink/10"}`} style={{ left: `${x}%` }} />
        ))}
      </span>
      <span className={`h-6 w-7 rounded-r-lg rounded-l-sm border ${dark ? "border-line-dark bg-bone/[0.06]" : "border-line bg-sand"}`} />
    </span>
  )
}

export function PricingSection({ as = "h2", n }: { as?: "h1" | "h2"; n?: string }) {
  const { pricing } = site
  return (
    <section id="pricing" data-section="pricing" className="bg-sand py-24 sm:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12 lg:mb-16" data-reveal>
          <div className="lg:col-span-7">
            <Eyebrow index={n}>Pricing</Eyebrow>
            <SectionTitle as={as} className="mt-6">
              Priced by the truckload. <Em>Locked before we start.</Em>
            </SectionTitle>
          </div>
          <p className="lg:col-span-5 lede text-stone">{pricing.intro}</p>
        </div>

        <ul className="rounded-[28px] overflow-hidden bg-paper border border-line elevated">
          {pricing.tiers.map((t, i) => (
            <li
              key={t.name}
              data-reveal
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
              className={`relative grid grid-cols-[1fr_auto] lg:grid-cols-[1.1fr_1.6fr_0.8fr] items-center gap-x-6 gap-y-4 px-6 sm:px-10 py-7 sm:py-8 ${
                t.popular ? "bg-ink text-bone" : "border-b border-line last:border-b-0"
              }`}
            >
              <span>
                <span className="flex items-center gap-3">
                  <span className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.025em]">{t.name}</span>
                  {t.popular && <span className="eyebrow !text-[9.5px] rounded-full bg-accent text-white px-2.5 py-1">Most booked</span>}
                </span>
                <span className={`block text-[14px] mt-1 ${t.popular ? "text-mist" : "text-stone"}`}>{t.description}</span>
              </span>
              <span className="col-span-2 lg:col-span-1 row-start-2 lg:row-start-auto flex items-center gap-4">
                <span className={`font-mono text-[11px] w-16 shrink-0 ${t.popular ? "text-mist" : "text-stone"}`}>{t.volume}</span>
                <TruckGauge fill={FILL[i] ?? 1} dark={t.popular} />
              </span>
              <span className="text-right">
                <span className={`block eyebrow !text-[10px] ${t.popular ? "text-mist" : "text-stone"}`}>from</span>
                <span className="block text-[28px] sm:text-[34px] font-semibold tracking-[-0.04em] leading-none mt-1">
                  {t.price.replace(/^from\s*/i, "")}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-[14px] text-stone max-w-2xl flex flex-wrap items-center gap-3">
            {isSampleContent && <SampleBadge label="Example pricing" />}
            {pricing.note}
          </p>
          <Link href={QUOTE_PATH} data-cta="pricing" className="btn btn-ink shrink-0">
            Get your exact price
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  )
}
