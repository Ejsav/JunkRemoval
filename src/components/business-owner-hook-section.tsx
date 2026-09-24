'use client'

import { Phone, ArrowRight } from 'lucide-react'

export function BusinessOwnerHookSection() {
  return (
    <section className="py-20 px-4 lg:px-8 bg-foreground text-background">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-4">Junk Removal Service</p>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-6 text-balance">
            Professional junk removal when you need it.
          </h2>

          <p className="text-base text-background/70 leading-snug mb-6 max-w-2xl mx-auto">
            Same-day service available. Licensed crew. Transparent pricing. Your space cleared and cleaned.
          </p>

          <p className="text-lg font-black mb-8 text-card">
            Call today for a free estimate.
          </p>

          <p className="text-xs text-background/60 mb-10 max-w-2xl mx-auto">
            Serving residential and commercial customers throughout Orlando and surrounding areas.
          </p>

          <a
            href="tel:4078017886"
            className="inline-flex items-center justify-center gap-2 text-foreground font-black text-sm h-12 px-8 rounded-lg hover:bg-accent/90 active:scale-[0.98] transition-all bg-chart-4"
          >
            <Phone className="h-4 w-4" />
            Call Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
