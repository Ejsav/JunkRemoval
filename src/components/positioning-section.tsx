'use client'

export function PositioningSection() {
  return (
    <section className="py-16 px-4 lg:px-8 bg-card border-b border-border">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-[1.1] mb-8">
            Built to make junk removal easy.
          </h2>

          <div className="space-y-3 text-left bg-secondary rounded-2xl p-8 border border-border card-shadow">
            {[
              "Fast quote and easy booking",
              "Price confirmed before the crew arrives",
              "Same-day service to clear your space",
              "Professional team handles all the heavy lifting",
            ].map((bullet, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-accent font-black text-sm mt-1 shrink-0">→</span>
                <p className="text-base text-foreground font-semibold leading-tight">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
