export function TrustBadges() {
  const stats = [
    { number: "500+", label: "Jobs Completed" },
    { number: "4.9", label: "Average Rating" },
    { number: "Same Day", label: "Service Available" },
  ]

  return (
    <section className="py-16 px-4 border-y border-border bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-normal text-foreground font-[family-name:var(--font-playfair)]">
                {stat.number}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
