'use client'

import { Check } from "lucide-react"

const bullets = [
  "Fast quote and easy booking",
  "Price confirmed before the crew arrives",
  "Same-day service to clear your space",
  "Professional team handles all the heavy lifting",
]

export function PositioningSection() {
  return (
    <section className="py-14 sm:py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground
                         leading-[1.08] mb-8 text-balance">
            Built to make junk removal easy.
          </h2>

          {/* Benefit grid */}
          <div className="grid sm:grid-cols-2 gap-3 text-left stagger-children">
            {bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-3.5 bg-secondary border border-border/70
                           rounded-2xl px-5 py-4 card-shadow hover:border-primary/30
                           hover:card-shadow-md transition-all duration-250 group"
              >
                <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center
                                shrink-0 mt-0.5 group-hover:scale-105 group-hover:shadow-md
                                group-hover:shadow-accent/30 transition-all duration-250">
                  <Check className="h-3.5 w-3.5 text-accent-foreground" strokeWidth={3} />
                </div>
                <p className="text-[15px] text-foreground font-semibold leading-snug">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
