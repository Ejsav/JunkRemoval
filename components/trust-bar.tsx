import { Star } from "lucide-react"

const stats = [
  { value: "600+",    label: "Jobs completed" },
  { value: "4.9★",   label: "Google rating" },
  { value: "Same-day", label: "Available" },
  { value: "Licensed", label: "& insured" },
]

export function TrustBar() {
  return (
    <section
      className="bg-card border-b border-border"
      aria-label="Trust statistics"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative text-center px-6 sm:px-8 py-7 sm:py-9 group
                         hover:bg-secondary/50 transition-colors duration-250 cursor-default
                         overflow-hidden"
            >
              {/* Subtle accent dot top center */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px]
                              bg-accent/0 group-hover:bg-accent/60 transition-all duration-300 rounded-b-full" />
              <p className="text-[clamp(1.75rem,4vw,3rem)] font-black text-foreground
                            tracking-tight group-hover:text-accent transition-colors duration-250
                            leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-[11px] font-bold text-muted-foreground
                            uppercase tracking-[0.18em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
