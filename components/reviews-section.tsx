import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { site, isSampleContent } from "@/config/site"
import { SectionHeading, SampleBadge } from "@/components/section-heading"

export function ReviewsSection({ limit, as = "h2" }: { limit?: number; as?: "h1" | "h2" }) {
  const reviews = limit ? site.reviews.slice(0, limit) : site.reviews
  const summary = site.business.reviewSummary

  return (
    <section id="reviews" data-section="reviews" className="py-20 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading
          as={as}
          eyebrow="Reviews"
          title="What customers say."
          aside={
            summary ? (
              <a href={summary.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                <strong className="text-foreground">{summary.rating.toFixed(1)} stars</strong> from {summary.count} {summary.platform} reviews
              </a>
            ) : isSampleContent ? (
              "Sample reviews. At launch these are replaced with your real Google reviews."
            ) : undefined
          }
        />

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <li key={r.name + r.text.slice(0, 12)} className="bg-card rounded-2xl p-7 border border-border card-shadow flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="flex" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-[color:var(--star)] text-[color:var(--star)]" : "text-border"}`} aria-hidden />
                  ))}
                </span>
                {isSampleContent && <SampleBadge label="Sample review" />}
              </div>
              <blockquote className="text-[15px] text-foreground leading-relaxed flex-1">“{r.text}”</blockquote>
              <footer className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
                <span className="font-black text-sm text-foreground">
                  {r.name}
                  {r.location && <span className="font-medium text-muted-foreground">, {r.location}</span>}
                </span>
                {r.service && <span className="text-xs font-semibold text-muted-foreground text-right">{r.service}</span>}
              </footer>
            </li>
          ))}
        </ul>

        {limit && site.reviews.length > limit && (
          <div className="mt-8 text-center">
            <Link href="/reviews" className="inline-flex items-center gap-2 font-black text-foreground hover:text-accent transition-colors">
              Read all reviews <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
