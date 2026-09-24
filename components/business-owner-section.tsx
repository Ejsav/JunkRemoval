import { Button } from "@/components/ui/button"
import { ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"

export function BusinessOwnerSection() {
  return (
    <section className="py-24 px-4 lg:px-8 bg-foreground">
      <div className="container mx-auto max-w-5xl">

        {/* Label */}
        <p className="text-xs font-black text-accent uppercase tracking-[0.25em] mb-5 text-center">For Business Owners Seeing This</p>

        {/* Headline */}
        <h2 className="text-4xl md:text-[3.25rem] font-black text-background leading-[1.05] tracking-tight text-balance text-center max-w-3xl mx-auto mb-6">
          This Is the Level of Website That Modern Top-Performing Service Businesses Use.
        </h2>
        <p className="text-background/55 text-lg leading-relaxed text-center max-w-2xl mx-auto mb-12">
          Most competitors in your market don't have this. That gap is a direct advantage for the business that moves first.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Left — pitch */}
          <div className="bg-background/5 border border-background/10 rounded-2xl p-8">
            <h3 className="font-black text-background text-xl mb-4">What this site generates:</h3>
            <ul className="space-y-3 mb-8">
              {[
                "Consistent inbound calls from local search",
                "Immediate trust from first-time visitors",
                "Higher close rates from clear pricing",
                "Repeat bookings from follow-up systems",
                "Referrals amplified by social proof",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[color:var(--success)] font-black mt-0.5 shrink-0">✓</span>
                  <span className="text-sm text-background/70">{item}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-background/10 pt-6">
              <p className="text-xs text-background/40 uppercase tracking-widest font-bold mb-1">Availability</p>
              <p className="text-background/80 text-sm font-semibold">Limited builds available per month. We only take on a small number of businesses per market — first come, first served.</p>
            </div>
          </div>

          {/* Right — what you get */}
          <div className="bg-background/5 border border-accent/20 rounded-2xl p-8">
            <h3 className="font-black text-background text-xl mb-1">What You Get:</h3>
            <p className="text-xs text-background/40 uppercase tracking-widest font-bold mb-5">Ready in days. Not months.</p>
            <ul className="space-y-3 mb-8">
              {[
                "High-converting design, customized to your brand",
                "Mobile-optimized — built for how customers search",
                "Your services, area, and contact info throughout",
                "Customer testimonials and review integration",
                "Before/after gallery",
                "Lead capture and inquiry tracking",
                "Local SEO structure built in",
                "On-time arrival guarantee messaging",
                "Upfront pricing presentation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent font-black mt-0.5 shrink-0">✓</span>
                  <span className="text-sm text-background/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scarcity bar */}
        <div className="flex items-start gap-3 bg-accent/10 border border-accent/25 rounded-xl px-6 py-4 mb-8 max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-background/70">
            <span className="font-black text-background">One business per market.</span> If your competitor gets here first, they're the ones customers see, trust, and call.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="uppercase tracking-widest font-black px-10 h-14 text-sm" asChild>
            <Link href="/contact">
              Get This Website For Your Business
              <ArrowRight className="ml-3 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-background/35 text-xs mt-4 uppercase tracking-widest">Limited build availability each month</p>
        </div>

      </div>
    </section>
  )
}
