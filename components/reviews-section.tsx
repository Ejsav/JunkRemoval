import { Star, ExternalLink } from "lucide-react"

const reviews = [
  {
    name: "Sarah M.",
    neighborhood: "Winter Park, FL",
    date: "March 2026",
    rating: 5,
    text: "They came same-day and cleared out my entire garage in under 2 hours. Super professional, crew was polite, and the price matched what they quoted exactly. Highly recommend.",
    job: "Garage Cleanout",
    featured: true,
  },
  {
    name: "Marcus T.",
    neighborhood: "Lake Nona, FL",
    date: "February 2026",
    rating: 5,
    text: "Called at 9 am, they were there by noon. Hauled a broken hot tub, old furniture, and construction debris. No hidden charges — exactly what they quoted on the phone.",
    job: "Hot Tub + Debris",
    featured: false,
  },
  {
    name: "Jennifer L.",
    neighborhood: "Ocoee, FL",
    date: "January 2026",
    rating: 5,
    text: "We needed an estate cleanout after losing my mom. They were respectful, patient, and incredibly thorough. Made a very hard day much easier. I can't thank them enough.",
    job: "Estate Cleanout",
    featured: true,
  },
  {
    name: "David K.",
    neighborhood: "Kissimmee, FL",
    date: "December 2025",
    rating: 5,
    text: "Called Friday afternoon, they showed up Saturday morning. Hauled three truckloads from my rental property. Fast, professional, fair price. Will use again for sure.",
    job: "Property Cleanout",
    featured: false,
  },
  {
    name: "Amanda P.",
    neighborhood: "Maitland, FL",
    date: "November 2025",
    rating: 5,
    text: "Love that they actually recycle and donate items instead of just dumping everything. Great service with a conscience. My cleared-out basement looks incredible.",
    job: "Basement Cleanout",
    featured: false,
  },
  {
    name: "Robert H.",
    neighborhood: "Sanford, FL",
    date: "October 2025",
    rating: 5,
    text: "Used them for a commercial office cleanout — 3,000 sq ft of old furniture and equipment. Done in one day. Highly efficient and a great deal compared to competitors.",
    job: "Office Cleanout",
    featured: true,
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 pb-8 border-b border-border/50">
          <div>
            <p className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-3">Real Customer Reviews</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.0] text-balance">
              600+ jobs. 4.9★ average.
            </h2>
          </div>
          <div className="flex items-center gap-5 bg-card border border-border/50 rounded-lg px-6 py-4 shrink-0">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[color:var(--star)] text-[color:var(--star)]" />
              ))}
            </div>
            <div className="border-l border-border/50 pl-5">
              <p className="text-base font-black text-foreground">4.9 / 5.0</p>
              <p className="text-xs text-muted-foreground mt-0.5">600+ Google Reviews</p>
            </div>
          </div>
        </div>

        {/* Review grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {reviews.map((review) => (
            <div
              key={review.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 group hover:-translate-y-1 ${
                review.featured
                  ? "bg-foreground text-background card-shadow-lg hover:card-shadow-lg"
                  : "bg-card border border-border card-shadow hover:border-primary/25 hover:card-shadow-md"
              }`}
            >
              {/* Giant quote mark */}
              <span
                className={`absolute top-6 right-8 text-[5rem] font-black leading-none select-none pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity ${
                  review.featured ? "text-background/20" : "text-foreground/10"
                }`}
                aria-hidden
              >
                "
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-[color:var(--star)] text-[color:var(--star)]" />
                ))}
              </div>

              {/* Quote */}
              <p className={`text-[15px] leading-relaxed flex-1 mb-7 font-medium ${review.featured ? "text-background/85" : "text-foreground"}`}>
                "{review.text}"
              </p>

              {/* Footer */}
              <div className={`flex items-center justify-between pt-6 border-t ${review.featured ? "border-background/15" : "border-border"}`}>
                <div>
                  <p className={`font-black text-sm ${review.featured ? "text-background" : "text-foreground"}`}>{review.name}</p>
                  <p className={`text-xs mt-1 ${review.featured ? "text-background/50" : "text-muted-foreground"}`}>{review.neighborhood} · {review.date}</p>
                </div>
                <span className={`text-[11px] font-black px-3.5 py-2 rounded-full uppercase tracking-wider whitespace-nowrap ${review.featured ? "bg-background/15 text-background/70" : "bg-primary/10 text-primary"}`}>
                  {review.job}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Review CTA */}
        <div className="mt-12 bg-card border border-border rounded-2xl p-9 flex flex-col md:flex-row items-center justify-between gap-8 card-shadow hover:card-shadow-md transition-all">
          <div>
            <p className="font-black text-lg text-foreground mb-2">Happy with our service?</p>
            <p className="text-sm text-muted-foreground max-w-xs">Leave us a Google review — it helps other Orlando families find us.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://g.page/r/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-foreground text-foreground font-black text-sm h-13 px-7 rounded-lg hover:bg-foreground hover:text-background transition-all btn-lift"
            >
              Leave a Google Review
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="tel:4078017886"
              className="inline-flex items-center justify-center gap-2 bg-accent text-foreground font-black text-sm h-13 px-7 rounded-lg hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 transition-all btn-lift"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
