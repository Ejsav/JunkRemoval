import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageSquare, Phone, Star } from "lucide-react"
import { site, phoneHref, smsHref, QUOTE_PATH, isSampleContent } from "@/config/site"
import { icons } from "@/lib/icons"
import { Container } from "@/components/section-heading"

export function HeroSection() {
  const { hero, business, promises, pricing, projects } = site
  const summary = business.reviewSummary
  const featuredTier = pricing.tiers.find((t) => t.popular) ?? pricing.tiers[0]

  return (
    <section data-section="hero" className="surface-dark grain relative overflow-hidden">
      <div className="absolute inset-0 hairline-grid pointer-events-none" aria-hidden />
      <div className="absolute -top-40 right-[-10%] h-[640px] w-[640px] rounded-full bg-accent/10 blur-[140px] pointer-events-none" aria-hidden />

      <Container className="relative z-10 pt-12 sm:pt-16 lg:pt-20 pb-10 lg:pb-14">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7 min-w-0">
            <p className="rise eyebrow text-mist flex items-center gap-2.5 mb-7">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inset-0 rounded-full bg-[#7fb58f] animate-ping opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-[#7fb58f]" />
              </span>
              {hero.eyebrow}
              <span className="hidden sm:inline">· {business.address.city}, {business.address.region}</span>
            </p>

            <h1 className="rise text-bone" style={{ "--d": "60ms" } as React.CSSProperties}>
              <span className="display block text-[clamp(3.1rem,8.2vw,7.25rem)]">{hero.headline[0]}</span>
              <span className="serif-em block text-[clamp(2.1rem,5.2vw,4.6rem)] leading-[1.02] text-accent-soft mt-2 [text-wrap:balance]">{hero.headline[1]}</span>
            </h1>

            <p className="rise lede text-mist max-w-[33rem] mt-7" style={{ "--d": "140ms" } as React.CSSProperties}>
              {hero.subhead}
            </p>

            <div className="rise flex flex-col sm:flex-row gap-3 mt-9" style={{ "--d": "220ms" } as React.CSSProperties}>
              <a href={phoneHref} data-cta="hero" className="btn btn-accent !h-14 !px-7 !text-[16px]">
                <Phone className="h-[18px] w-[18px]" aria-hidden />
                Call {business.phoneDisplay}
              </a>
              <Link href={QUOTE_PATH} data-cta="hero" className="btn btn-ghost-dark !h-14 !px-7 !text-[16px]">
                Get a free quote
                <ArrowRight className="btn-arrow h-[18px] w-[18px]" aria-hidden />
              </Link>
            </div>

            <div className="rise flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 text-[14px]" style={{ "--d": "280ms" } as React.CSSProperties}>
              {business.textEnabled && (
                <a href={smsHref} data-cta="hero" className="inline-flex items-center gap-2 text-bone/80 hover:text-bone link-draw">
                  <MessageSquare className="h-4 w-4 text-accent-soft" aria-hidden />
                  Or text a photo for a quick price
                </a>
              )}
              {summary && (
                <a href={summary.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-bone/80">
                  <span className="flex" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-star text-star" />
                    ))}
                  </span>
                  {summary.rating.toFixed(1)} · {summary.count} {summary.platform} reviews
                </a>
              )}
            </div>
          </div>

          {/* Editorial image stack */}
          <div className="lg:col-span-5 relative">
            <div className="float-in relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[28px] overflow-hidden ring-1 ring-line-dark elevated-lg" style={{ "--d": "120ms" } as React.CSSProperties}>
              <Image src={hero.image} alt={hero.imageAlt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" aria-hidden />
              <p className="hidden lg:block absolute left-5 bottom-5 eyebrow text-bone/80">Driveway pickup · {business.address.city}</p>
            </div>

            <div
              className="float-in glass rounded-[20px] p-4 w-[15.5rem] sm:w-[17rem] absolute -bottom-6 right-3 sm:right-6 lg:-left-16 lg:right-auto lg:bottom-14 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)]"
              style={{ "--d": "420ms" } as React.CSSProperties}
              aria-hidden
            >
              <div className="flex items-center justify-between mb-3">
                <span className="eyebrow !text-[9.5px] text-mist">Photo estimate</span>
                {isSampleContent && <span className="eyebrow !text-[9px] text-mist/70">Example</span>}
              </div>
              <div className="flex gap-1.5 mb-3.5">
                {projects.slice(0, 3).map((p) => (
                  <span key={p.before} className="relative h-11 flex-1 rounded-lg overflow-hidden ring-1 ring-line-dark">
                    <Image src={p.before} alt="" fill className="object-cover" sizes="80px" />
                  </span>
                ))}
              </div>
              <div className="flex items-end justify-between">
                <span>
                  <span className="block text-[13px] text-bone font-medium">{featuredTier.name}</span>
                  <span className="block text-[11px] text-mist">{featuredTier.volume}</span>
                </span>
                <span className="text-[20px] font-semibold tracking-tight text-bone">{featuredTier.price.replace("from ", "")}</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-bone/10 overflow-hidden">
                <span className="block h-full w-1/2 rounded-full bg-accent-soft" />
              </div>
            </div>
          </div>
        </div>

        {/* Promise strip */}
        <ul className="grid grid-cols-2 lg:grid-cols-4 mt-16 lg:mt-20 border-t border-line-dark">
          {promises.map((p, i) => {
            const Icon = icons[p.icon]
            return (
              <li
                key={p.title}
                data-reveal
                style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                className="flex items-start gap-3 pt-6 pr-4 border-line-dark even:pl-4 even:border-l lg:pl-6 lg:border-l lg:first:border-l-0 lg:first:pl-0"
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
