import Image from "next/image"
import { ArrowRight } from "lucide-react"

const jobs = [
  {
    label: "Garage Cleanout",
    location: "Winter Park, FL",
    description: "8 years of accumulated clutter cleared in 90 minutes.",
    beforeImage: "/garage-before.jpg",
    afterImage: "/garage-after.jpg",
  },
  {
    label: "Estate Cleanout",
    location: "Lake Nona, FL",
    description: "Complete 4-bedroom home emptied in a single day.",
    beforeImage: "/estate-before.jpg",
    afterImage: "/estate-after.jpg",
  },
  {
    label: "Office Cleanout",
    location: "Downtown Orlando, FL",
    description: "3,000 sq ft commercial space cleared before new tenant.",
    beforeImage: "/office-before.jpg",
    afterImage: "/office-after.jpg",
  },
]

export function BeforeAfterSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 pb-10 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.28em]">Real Results</p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.06] text-balance">
              Before &amp; After.<br />The Proof Is Clear.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs leading-relaxed font-medium text-sm sm:text-base">
            Recent cleanouts from across Central Florida. Every job gets the same attention and care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {jobs.map((job) => (
            <div key={job.label} className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 card-shadow">
              {/* Before/after image pair */}
              <div className="grid grid-cols-2 h-52 sm:h-56 overflow-hidden">
                <div className="relative overflow-hidden bg-muted border-r border-border/50">
                  <Image
                    src={job.beforeImage}
                    alt={`Before: ${job.label}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="20vw"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-black text-background/95 bg-foreground/80 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-[0.18em]">
                    Before
                  </span>
                </div>
                <div className="relative overflow-hidden bg-muted">
                  <Image
                    src={job.afterImage}
                    alt={`After: ${job.label}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="20vw"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-black text-background px-2.5 py-1 rounded-full uppercase tracking-[0.18em] bg-success/85 backdrop-blur-sm">
                    After
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <p className="font-black text-[16px] text-foreground leading-tight">{job.label}</p>
                  <span className="text-[11px] font-semibold text-muted-foreground shrink-0 mt-0.5">{job.location}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 bg-card rounded-2xl px-7 sm:px-10 py-6 sm:py-7 border border-border card-shadow hover:shadow-lg transition-all">
          <div>
            <p className="font-black text-foreground text-lg mb-1">Ready to see results like these?</p>
            <p className="text-sm text-muted-foreground">Book your cleanout today — same-day available.</p>
          </div>
          <a
            href="#quote"
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-black px-7 py-3.5 rounded-xl hover:bg-primary/90 active:scale-[0.97] transition-all text-sm shadow-md shadow-primary/20 btn-lift"
          >
            Get Your Free Quote
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
