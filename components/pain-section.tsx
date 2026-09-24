'use client'

import { Phone, AlertCircle } from "lucide-react"

const PHONE_HREF = "tel:4078017886"
const PHONE = "(407) 801-7886"

const painPoints = [
  "It keeps taking up space you could actually use",
  "You keep putting it off because it's a pain to deal with",
  "It slowly turns into a bigger problem than it should be",
]

export function PainSection() {
  return (
    <section className="py-20 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">

          {/* Overline */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-4 h-px bg-destructive/60" />
            <p className="text-[10px] font-black text-destructive uppercase tracking-[0.28em]">The Gap</p>
            <div className="w-4 h-px bg-destructive/60" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground
                         leading-[1.08] mb-10 text-balance">
            The longer it sits, the worse it gets.
          </h2>

          {/* Pain points */}
          <div className="space-y-3 mb-10 text-left max-w-md mx-auto stagger-children">
            {painPoints.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 bg-card border border-border/80 rounded-2xl
                           px-5 py-4 card-shadow hover:border-destructive/25 hover:card-shadow-md
                           transition-all duration-250 group"
              >
                <div className="w-6 h-6 rounded-full bg-destructive/10 border border-destructive/20
                                flex items-center justify-center shrink-0 mt-0.5
                                group-hover:bg-destructive/15 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                </div>
                <p className="text-[15px] text-foreground/85 font-semibold leading-snug">{item}</p>
              </div>
            ))}
          </div>

          {/* Punchline */}
          <p className="text-lg sm:text-xl font-black text-destructive mb-9 tracking-tight">
            Call once, we handle the rest.
          </p>

          {/* CTA */}
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2.5 bg-foreground text-background
                       font-black text-[15px] h-14 px-10 rounded-2xl
                       shadow-[0_4px_20px_rgba(15,23,42,0.20)] hover:bg-foreground/90
                       btn-lift active:scale-[0.97]"
          >
            <Phone className="h-4.5 w-4.5" />
            {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}
