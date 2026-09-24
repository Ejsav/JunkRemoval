import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, MessageSquare, Phone, Star } from "lucide-react"
import { site, phoneHref, smsHref, QUOTE_PATH } from "@/config/site"

export function HeroSection() {
  const { hero, business } = site
  const summary = business.reviewSummary

  return (
    <section data-section="hero" className="relative bg-foreground overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <Image src={hero.image} alt={hero.imageAlt} fill priority className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 58vw" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-foreground via-foreground/55 to-transparent" />
        <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-foreground/85 via-foreground/70 to-foreground/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl min-h-[calc(100svh-104px)] lg:min-h-[640px] flex items-center">
        <div className="max-w-[580px] lg:max-w-[50%] py-14 lg:py-24">
          <div className="inline-flex items-center gap-2.5 border border-background/20 bg-background/10 backdrop-blur-md px-4 py-2 rounded-full mb-7">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-[13px] font-semibold text-background/90">{hero.eyebrow}</span>
          </div>

          <h1 className="font-black text-background tracking-[-0.035em] mb-6 text-balance" style={{ fontSize: "clamp(2.5rem, 5.2vw, 4.25rem)", lineHeight: 1.04 }}>
            {hero.headline[0]}
            <span className="block text-accent mt-1">{hero.headline[1]}</span>
          </h1>

          <p className="text-[17px] text-background/80 leading-[1.6] mb-7 max-w-[460px] font-medium">{hero.subhead}</p>

          <ul className="mb-9 space-y-2.5 max-w-[460px]">
            {hero.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-accent/25 border border-accent/50 flex items-center justify-center shrink-0 mt-0.5" aria-hidden>
                  <Check className="h-3 w-3 text-accent" strokeWidth={3} />
                </span>
                <span className="text-[15px] text-background/85 font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <a
              href={phoneHref}
              data-cta="hero"
              className="inline-flex items-center justify-center gap-2.5 font-black text-[16px] h-14 px-8 rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/40 hover:bg-accent/92 btn-lift active:scale-[0.97] group"
            >
              <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden />
              Call {business.phoneDisplay}
            </a>
            <Link
              href={QUOTE_PATH}
              data-cta="hero"
              className="inline-flex items-center justify-center gap-2.5 bg-background/12 backdrop-blur-md border border-background/30 text-background font-black text-[16px] h-14 px-8 rounded-2xl hover:bg-background/20 btn-lift group"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden />
            </Link>
          </div>

          {business.textEnabled && (
            <a href={smsHref} data-cta="hero" className="inline-flex items-center gap-2 text-sm font-bold text-background/80 hover:text-background underline-offset-4 hover:underline">
              <MessageSquare className="h-4 w-4 text-accent" aria-hidden />
              Or text us a photo for a quick price
            </a>
          )}

          {summary && (
            <a href={summary.url} target="_blank" rel="noopener noreferrer" className="mt-8 pt-6 border-t border-background/15 flex items-center gap-3 text-background">
              <span className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[color:var(--star)] text-[color:var(--star)]" />
                ))}
              </span>
              <span className="font-black">{summary.rating.toFixed(1)}</span>
              <span className="text-sm text-background/70">from {summary.count} {summary.platform} reviews</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
