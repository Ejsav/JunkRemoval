'use client'

export function ValueCostSection() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[10px] font-black text-accent uppercase tracking-[0.25em] mb-3">The Real Cost</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-[1.08] text-balance">
            What happens if you wait?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Left - Cost */}
          <div className="bg-card rounded-2xl p-8 sm:p-10 border border-border card-shadow-md hover:card-shadow-lg transition-all group">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                <span className="text-destructive font-black text-sm">✕</span>
              </div>
              <h3 className="text-xl font-black text-foreground">The cost of waiting</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Wasted garage or storage space",
                "Mental load—it's always there",
                "Projects you want to start",
                "Compound stress over time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5 py-3 border-b border-border/50 last:border-0">
                  <span className="text-destructive font-black text-base shrink-0 mt-0.5">✕</span>
                  <span className="text-sm text-foreground/80 font-semibold leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Solution */}
          <div className="bg-foreground rounded-2xl p-8 sm:p-10 border border-foreground card-shadow-md hover:card-shadow-lg transition-all group dark-panel-glow">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-8 rounded-lg bg-accent/25 flex items-center justify-center shrink-0">
                <span className="text-accent font-black text-sm">✓</span>
              </div>
              <h3 className="text-xl font-black text-background">Two hours from now</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Empty room. Full capacity.",
                "Mental clarity restored",
                "Ready to move forward",
                "Problem permanently solved",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5 py-3 border-b border-background/[0.08] last:border-0">
                  <span className="text-accent font-black text-base shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-background/75 font-semibold leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <a
            href="tel:4078017886"
            className="inline-flex items-center justify-center gap-2.5 bg-accent text-accent-foreground font-black text-base h-14 px-10 rounded-2xl shadow-lg shadow-accent/25 hover:bg-accent/90 hover:shadow-xl btn-lift active:scale-[0.97]"
          >
            Get Your Free Quote
          </a>
        </div>
      </div>
    </section>
  )
}
