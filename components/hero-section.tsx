import type React from "react"
import Link from "next/link"
import { ArrowRight, MapPin, MessageSquare, Star } from "lucide-react"
import { site, QUOTE_PATH, isSampleContent } from "@/config/site"
import { icons } from "@/lib/icons"
import { Container } from "@/components/section-heading"
import { BizPhone, BizRegion, CallLink, HeroImage, TextLink } from "@/components/biz"

export function HeroSection() {
  const { hero, business, promises } = site
  const summary = business.reviewSummary

  return (
    <section data-section="hero" className="surface-dark grain relative overflow-hidden">
      <div className="absolute inset-0 hairline-grid pointer-events-none" aria-hidden />

      <Container className="relative z-10 pt-10 sm:pt-16 lg:pt-20 pb-10 lg:pb-14">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          <div className="lg:col-span-7 min-w-0">
            <p className="rise eyebrow text-mist flex items-center gap-2 mb-6 sm:mb-7">
              <MapPin className="h-3.5 w-3.5 text-accent-soft" aria-hidden />
              <BizRegion />
            </p>

            <h1 className="rise text-bone" style={{ "--d": "60ms" } as React.CSSProperties}>
              <span className="display block text-[clamp(2.9rem,8.2vw,7.25rem)]">{hero.headline[0]}</span>
              <span className="serif-em block text-[clamp(2rem,5.2vw,4.6rem)] leading-[1.02] text-accent-soft mt-2 [text-wrap:balance]">{hero.headline[1]}</span>
            </h1>

            <p className="rise lede text-mist max-w-[33rem] mt-6 sm:mt-7" style={{ "--d": "140ms" } as React.CSSProperties}>
              {hero.subhead}
            </p>

            <div className="rise flex flex-col sm:flex-row gap-3 mt-8 sm:mt-9" style={{ "--d": "220ms" } as React.CSSProperties}>
              <Link href={QUOTE_PATH} data-cta="hero" className="btn btn-accent !h-14 !px-7 !text-[16px]">
                Get my exact price
                <ArrowRight className="btn-arrow h-[18px] w-[18px]" aria-hidden />
              </Link>
              {business.textEnabled && (
                <TextLink data-cta="hero" className="btn btn-ghost-dark !h-14 !px-6 !text-[15px]">
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  Text photos for a price
                </TextLink>
              )}
            </div>

            <div className="rise flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 text-[14px] text-mist" style={{ "--d": "280ms" } as React.CSSProperties}>
              <p>
                Prefer to talk?{" "}
                <CallLink data-cta="hero" className="font-mono text-bone hover:text-accent-soft transition-colors whitespace-nowrap">
                  <BizPhone />
                </CallLink>
                <span className="hidden sm:inline"> · {business.hours.label}</span>
              </p>
              {summary && (
                <a href={summary.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-bone/80 hover:text-bone">
                  <span className="flex" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-star text-star" />
                    ))}
                  </span>
                  {summary.rating.toFixed(1)} from {summary.count} {summary.platform} reviews
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="float-in relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[24px] overflow-hidden ring-1 ring-line-dark elevated-lg bg-slate" style={{ "--d": "120ms" } as React.CSSProperties}>
              <HeroImage className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              {isSampleContent && (
                <span className="absolute left-4 bottom-4 eyebrow !text-[9.5px] text-bone/80 glass rounded-full px-2.5 py-1">Sample photo</span>
              )}
            </div>
          </div>
        </div>

        {/* Promise strip */}
        <ul className="grid grid-cols-2 lg:grid-cols-4 mt-12 lg:mt-20 border-t border-line-dark">
          {promises.map((p) => {
            const Icon = icons[p.icon]
            return (
              <li
                key={p.title}
                className="flex items-start gap-3 pt-6 pr-4 border-line-dark even:pl-4 even:border-l lg:pl-6 lg:border-l lg:first:border-l-0 lg:first:pl-0 [&:nth-child(n+3)]:pb-0 [&:nth-child(-n+2)]:pb-6 lg:[&:nth-child(-n+2)]:pb-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
              >
                <Icon className="h-[18px] w-[18px] text-accent-soft shrink-0 mt-0.5" aria-hidden />
                <span>
                  <span className="block text-[14px] font-medium text-bone">{p.title}</span>
                  <span className="block text-[13px] text-mist mt-0.5 leading-snug">{p.text}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
