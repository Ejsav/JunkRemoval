import type React from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { site, isSampleContent, type Review } from "@/config/site"
import { Container, Em, Eyebrow, SampleBadge, SectionTitle } from "@/components/section-heading"

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? "fill-star text-star" : "text-line"}`} aria-hidden />
      ))}
    </span>
  )
}

function Byline({ r }: { r: Review }) {
  return (
    <span className="flex items-center gap-3">
      <span className="h-9 w-9 rounded-full bg-sand text-ink flex items-center justify-center text-[13px] font-semibold" aria-hidden>
        {r.name.charAt(0)}
      </span>
      <span>
        <span className="block text-[14px] font-medium text-ink">{r.name}</span>
        <span className="block text-[12.5px] text-stone">{[r.location, r.service].filter(Boolean).join(" · ")}</span>
      </span>
    </span>
  )
}

export function ReviewsSection({ limit, as = "h2", n }: { limit?: number; as?: "h1" | "h2"; n?: string }) {
  const reviews = limit ? site.reviews.slice(0, limit) : site.reviews
  const [featured, ...rest] = reviews
  const summary = site.business.reviewSummary

  return (
    <section id="reviews" data-section="reviews" className="bg-bone py-24 sm:py-32">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14" data-reveal>
          <div>
            <Eyebrow index={n}>Reviews</Eyebrow>
            <SectionTitle as={as} className="mt-6">
              Said by <Em>customers.</Em>
            </SectionTitle>
          </div>
          <div className="lg:text-right">
            {summary ? (
              <a href={summary.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3">
                <Stars rating={5} />
                <span className="text-[15px] text-ink font-medium">
                  {summary.rating.toFixed(1)} from {summary.count} {summary.platform} reviews
                </span>
              </a>
            ) : (
              isSampleContent && (
                <p className="text-stone max-w-xs text-[14.5px]">
                  <SampleBadge label="Sample reviews" /> <span className="block mt-2">Replaced with the client&apos;s real Google reviews at launch.</span>
                </p>
              )
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          <figure className={`lg:col-span-7 bg-ink text-bone rounded-[28px] p-8 sm:p-12 flex flex-col justify-between min-h-[22rem] relative overflow-hidden grain`} data-reveal>
            <span className="absolute top-2 right-8 serif-em text-[11rem] leading-[0.8] text-bone/[0.06] select-none" aria-hidden>
              &ldquo;
            </span>
            <div className="relative z-10">
              <Stars rating={featured.rating} />
              <blockquote className="serif-em text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.18] mt-6 text-bone">{featured.text}</blockquote>
            </div>
            <figcaption className="relative z-10 mt-10 flex items-center justify-between gap-4">
              <span className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-bone/10 flex items-center justify-center text-[13px] font-semibold" aria-hidden>
                  {featured.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-[14px] font-medium">{featured.name}</span>
                  <span className="block text-[12.5px] text-mist">{[featured.location, featured.service].filter(Boolean).join(" · ")}</span>
                </span>
              </span>
              {isSampleContent && <SampleBadge label="Sample" tone="dark" />}
            </figcaption>
          </figure>

          <div className={`grid gap-5 ${limit ? "lg:col-span-5" : "lg:col-span-5 lg:grid-rows-1"}`}>
            {(limit ? rest : rest.slice(0, 1)).map((r, i) => (
              <figure
                key={r.name + i}
                data-reveal
                style={{ "--d": `${(i + 1) * 80}ms` } as React.CSSProperties}
                className="bg-paper rounded-[24px] p-7 border border-line elevated flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Stars rating={r.rating} />
                    {isSampleContent && <SampleBadge />}
                  </div>
                  <blockquote className="text-[15.5px] text-ink leading-relaxed mt-4">&ldquo;{r.text}&rdquo;</blockquote>
                </div>
                <figcaption>
                  <Byline r={r} />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {!limit && rest.length > 1 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {rest.slice(1).map((r, i) => (
              <figure
                key={r.name + i}
                data-reveal
                style={{ "--d": `${(i + 1) * 70}ms` } as React.CSSProperties}
                className="bg-paper rounded-[24px] p-7 border border-line elevated flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Stars rating={r.rating} />
                    {isSampleContent && <SampleBadge />}
                  </div>
                  <blockquote className="text-[15.5px] text-ink leading-relaxed mt-4">&ldquo;{r.text}&rdquo;</blockquote>
                </div>
                <figcaption>
                  <Byline r={r} />
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {limit && site.reviews.length > limit && (
          <Link href="/reviews" className="inline-flex items-center gap-2 mt-10 text-[15px] font-medium text-ink link-draw">
            Read all reviews <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </Container>
    </section>
  )
}
