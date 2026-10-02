import type React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { site, QUOTE_PATH } from "@/config/site"
import { Container, Em, Eyebrow, SectionTitle } from "@/components/section-heading"

export function ServicesSection({ n }: { n?: string } = {}) {
  return (
    <section id="services" data-section="services" className="bg-bone py-20 sm:py-28 lg:py-32">
      <Container className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-10">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start" data-reveal>
          <Eyebrow index={n}>Services</Eyebrow>
          <SectionTitle className="mt-6">
            If it needs to go, <Em>we take it.</Em>
          </SectionTitle>
          <p className="lede text-stone mt-5 sm:mt-6 max-w-sm">Single items to full-property cleanouts, for homes and businesses. Every price is locked before we start.</p>
          <Link href={QUOTE_PATH} data-cta="services" className="btn btn-ink mt-8 sm:mt-9">
            Price my job
            <ArrowUpRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="lg:col-span-8 border-t border-line -mx-5 sm:mx-0">
          {site.services.map((s, i) => (
            <li key={s.slug} data-reveal style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
              <Link
                href={`/services#${s.slug}`}
                className="group grid grid-cols-[2rem_1fr_auto] sm:grid-cols-[3.5rem_1fr_auto_auto] items-center gap-x-3 sm:gap-x-6 py-5 sm:py-7 border-b border-line transition-colors duration-300 hover:bg-paper active:bg-paper px-5 sm:px-3 focus-visible:outline-offset-[-2px]"
              >
                <span className="font-mono text-[12px] text-stone self-start sm:self-center pt-[7px] sm:pt-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="block text-[20px] sm:text-[26px] leading-tight font-semibold tracking-[-0.03em] text-ink transition-transform duration-300 group-hover:translate-x-1">
                    {s.title}
                  </span>
                  <span className="block text-[14.5px] text-stone mt-1.5 sm:mt-1 leading-snug text-pretty">{s.summary}</span>
                  {s.priceFrom && <span className="sm:hidden block font-mono text-[12px] text-ink mt-2">from ${s.priceFrom}</span>}
                </span>
                {s.priceFrom && <span className="hidden sm:block font-mono text-[13px] text-ink whitespace-nowrap">from ${s.priceFrom}</span>}
                <span className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-line flex items-center justify-center text-ink transition-[background-color,color,border-color,transform] duration-300 group-hover:bg-ink group-hover:text-bone group-hover:border-ink group-hover:rotate-45 group-active:scale-90">
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
