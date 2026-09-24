'use client'

import { Lock, DollarSign, Clock, CheckCheck, Phone } from "lucide-react"

const PHONE_HREF = "tel:4078017886"

const guarantees = [
  { icon: Lock,        text: "Price quoted and locked on the call" },
  { icon: DollarSign,  text: "No hidden fees, ever" },
  { icon: Clock,       text: "If we're late, we make it right" },
  { icon: CheckCheck,  text: "Not satisfied? We'll come back and fix it" },
]

export function OfferStackSection() {
  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-lg mx-auto">
          <div className="relative bg-foreground rounded-3xl overflow-hidden shadow-[0_16px_64px_rgba(15,23,42,0.24)] dark-panel-glow">
            {/* Accent top bar */}
            <div className="h-[3px] bg-accent w-full" />
            <div className="px-8 sm:px-10 pt-10 pb-12">
              {/* Label */}
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-accent/40 border border-accent/60" />
                <p className="text-[10px] font-black text-accent uppercase tracking-[0.28em]">Zero Risk</p>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-background mb-9 tracking-tight leading-tight">Your Guarantee</h3>
              <div className="space-y-2.5 mb-9">
                {guarantees.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-background/[0.06] border border-background/[0.09] hover:bg-background/[0.10] hover:border-background/[0.16] transition-all duration-200 group">
                    <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/25 flex items-center justify-center shrink-0 group-hover:bg-accent/30 group-hover:scale-105 transition-all duration-200">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-semibold text-background/85 leading-snug">{text}</span>
                  </div>
                ))}
              </div>
              <a
                href={PHONE_HREF}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-accent text-accent-foreground font-black text-[15px] h-14 rounded-2xl shadow-[0_4px_20px_oklch(0.628_0.222_34/0.38)] hover:bg-accent/92 hover:shadow-[0_6px_28px_oklch(0.628_0.222_34/0.46)] btn-lift cta-glow active:scale-[0.97]"
              >
                <Phone className="h-4.5 w-4.5" />
                Lock in Your Price Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
