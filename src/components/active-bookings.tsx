export function ActiveBookings() {
  return (
    <section className="bg-secondary border-t border-border/30 py-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold text-accent uppercase tracking-wide">Limited availability</p>
            <p className="text-lg font-black text-foreground mt-1">Same-day slots fill up fast</p>
          </div>
          <div className="flex gap-4 text-center text-xs">
            <p className="font-semibold text-foreground">
              Call now to check open times
            </p>
          </div>
          <a
            href="tel:4078017886"
            className="bg-accent hover:bg-accent/90 text-foreground font-black px-5 py-2 rounded-lg transition-colors shrink-0 text-sm"
          >
            Call Now
          </a>
        </div>
      </div>
    </section>
  )
}
