import { Phone, Zap } from "lucide-react"

const PHONE_HREF = "tel:4078017886"

export function ActiveBookings() {
  return (
    <section
      className="relative bg-accent overflow-hidden py-4 sm:py-5"
      aria-label="Booking urgency bar"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 48px)",
        }}
      />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">

          {/* Left — label + message */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-foreground opacity-50" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-foreground" />
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
              <p className="text-[10px] font-black text-accent-foreground/65 uppercase tracking-[0.22em]">
                Limited availability
              </p>
              <span className="hidden sm:inline text-accent-foreground/35 text-sm">—</span>
              <p className="text-sm sm:text-[15px] font-black text-accent-foreground leading-snug">
                Same-day slots fill up fast
              </p>
            </div>
          </div>

          {/* Center */}
          <p className="hidden md:block text-accent-foreground/65 text-sm font-semibold">
            Call now to check open times
          </p>

          {/* CTA */}
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 bg-accent-foreground text-accent font-black text-[13px]
                       h-9 px-5 rounded-lg hover:bg-accent-foreground/92 active:scale-[0.97]
                       transition-all shrink-0 shadow-sm btn-lift"
          >
            <Phone className="h-3.5 w-3.5" />
            Call Now
          </a>
        </div>
      </div>
    </section>
  )
}
