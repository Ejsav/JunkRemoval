import { Phone, ArrowRight, Star, Check } from "lucide-react"
import Image from "next/image"

const PHONE = "(407) 801-7886"
const PHONE_HREF = "tel:4078017886"

const benefits = [
  "Based in Orlando, serving all of Central Florida",
  "600+ jobs completed — 60% donated or recycled",
  "Firm price locked before we arrive — no surprises",
]

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-64px)] md:min-h-[calc(100svh-72px)] bg-foreground overflow-hidden">

      {/* ── Full-bleed background image ─────────────────────── */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <Image
          src="/b8706813-3650-4cb7-8945-b201bd527f10.png"
          alt="Orlando Junk Removal truck parked at a residential home with furniture and boxes"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
        {/* Left fade — content panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/82 to-foreground/10
                        lg:via-foreground/55 lg:to-transparent" />
        {/* Bottom fade — mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/25
                        to-transparent lg:hidden" />
      </div>

      {/* ── Subtle noise overlay for depth ──────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.028] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl
                      min-h-[calc(100svh-64px)] md:min-h-[calc(100svh-72px)] flex items-center">
        <div className="max-w-[580px] lg:max-w-[50%] py-16 lg:py-24">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2.5 border border-background/20 bg-background/10
                          backdrop-blur-md px-4 py-2 rounded-full mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-[13px] font-semibold text-background/85 tracking-tight">
              Same-day slots fill up — call before 2 pm
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-black text-background tracking-[-0.035em] mb-6 text-balance animate-fade-up"
              style={{ fontSize: "clamp(2.6rem, 5.2vw, 4.25rem)", lineHeight: 1.05 }}>
            {"Clear Your Junk Today –"}
            <span className="block text-accent mt-1">{"Same-Day Removal"}</span>
            {"Across Orlando"}
          </h1>

          {/* Sub */}
          <p className="text-[17px] text-background/75 leading-[1.6] mb-8 max-w-[440px] font-medium animate-fade-up"
             style={{ animationDelay: "0.08s" }}>
            We show up on time, agree on a firm price before we arrive, and remove everything fast — so you can reclaim your space today.
          </p>

          {/* Benefits list */}
          <ul className="mb-10 space-y-2.5 max-w-[440px] animate-fade-up" style={{ animationDelay: "0.14s" }}>
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-accent/25 border border-accent/50 flex items-center
                                  justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-accent" strokeWidth={3} />
                </span>
                <span className="text-[14px] text-background/72 font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-11 animate-fade-up" style={{ animationDelay: "0.20s" }}>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2.5 font-black text-[15px]
                         h-[56px] sm:h-[52px] px-8 rounded-2xl bg-accent text-accent-foreground
                         shadow-[0_4px_20px_oklch(0.628_0.222_34/0.42)] hover:bg-accent/92
                         hover:shadow-[0_6px_28px_oklch(0.628_0.222_34/0.50)]
                         btn-lift active:scale-[0.97] cta-glow group"
            >
              <Phone className="h-4.5 w-4.5 group-hover:scale-110 transition-transform shrink-0" />
              <span>Call for Same-Day Pickup</span>
            </a>
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2.5 bg-background/12 backdrop-blur-md
                         border border-background/25 text-background font-black text-[15px]
                         h-[56px] sm:h-[52px] px-8 rounded-2xl hover:bg-background/20
                         hover:border-background/40 btn-lift group"
            >
              Get Your Free Quote
              <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Social proof row */}
          <div
            className="flex flex-wrap items-center gap-x-7 gap-y-3 pt-7 border-t border-background/12
                        animate-fade-up"
            style={{ animationDelay: "0.26s" }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[22px] font-black text-background leading-none tracking-tight">600+</span>
              <span className="text-[10px] text-background/45 font-bold uppercase tracking-[0.16em]">Jobs Done</span>
            </div>
            <div className="w-px h-7 bg-background/18" />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <span className="text-[22px] font-black text-background leading-none tracking-tight">4.9</span>
                <Star className="h-4 w-4 fill-[color:var(--star)] text-[color:var(--star)] mb-0.5" />
              </div>
              <span className="text-[10px] text-background/45 font-bold uppercase tracking-[0.16em]">Google Rating</span>
            </div>
            <div className="w-px h-7 bg-background/18" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[22px] font-black text-background leading-none tracking-tight">7 Days</span>
              <span className="text-[10px] text-background/45 font-bold uppercase tracking-[0.16em]">Always Open</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
