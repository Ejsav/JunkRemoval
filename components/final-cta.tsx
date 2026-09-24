import { Phone, ArrowRight } from "lucide-react"

const PHONE = "(407) 801-7886"
const PHONE_HREF = "tel:4078017886"

export function FinalCTA() {
  return (
    <section className="relative bg-foreground overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Large background text — decorative */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[clamp(5rem,18vw,16rem)] font-black text-background/[0.035] leading-none whitespace-nowrap tracking-tighter">
          JUNK OUT
        </span>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[10px] font-black text-accent uppercase tracking-[0.28em] mb-5">Same-day service available</p>
        <h2 className="text-[clamp(2rem,5.5vw,3.75rem)] font-black tracking-tight text-background leading-[1.08] mb-4 text-balance mx-auto max-w-3xl">
          Ready to clear your space today?
        </h2>
        <p className="text-base sm:text-lg text-accent font-black mb-5">Call before 2pm for same-day pickup.</p>
        <p className="text-background/60 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
          Firm price locked before we arrive. No hidden fees. We do all the heavy lifting and leave your space spotless.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2.5 bg-accent text-accent-foreground font-black text-base h-14 sm:h-13 px-8 sm:px-10 rounded-xl shadow-md shadow-accent/20 hover:bg-accent/90 btn-lift active:scale-[0.97] group"
          >
            <Phone className="h-4.5 w-4.5 group-hover:scale-110 transition-transform" />
            Call for Same-Day Pickup
          </a>
          <a
            href="#quote"
            className="inline-flex items-center justify-center gap-2.5 bg-background/12 border border-background/25 text-background font-black text-base h-14 sm:h-13 px-8 sm:px-10 rounded-xl hover:bg-background/20 hover:border-background/35 btn-lift active:scale-[0.97] group"
          >
            Get Your Free Quote
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-background/40 font-medium">
          Serving Orlando and Central Florida. Licensed and insured.
        </p>
      </div>
    </section>
  )
}
