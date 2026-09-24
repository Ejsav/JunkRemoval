import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { site, isSampleContent, QUOTE_PATH } from "@/config/site"
import { SectionHeading, SampleBadge } from "@/components/section-heading"

export function ProjectsSection() {
  return (
    <section data-section="projects" className="py-20 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading
          eyebrow="Before & after"
          title="The difference, in one visit."
          aside={isSampleContent ? "Sample project photos. At launch these become your own job photos." : "Recent cleanouts from around the area."}
        />

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {site.projects.map((job) => (
            <article key={job.title} className="rounded-2xl overflow-hidden border border-border bg-card card-shadow">
              <div className="grid grid-cols-2 h-48 sm:h-56">
                {(["before", "after"] as const).map((side) => (
                  <div key={side} className={`relative bg-muted ${side === "before" ? "border-r border-border/50" : ""}`}>
                    <Image src={job[side]} alt={`${job.title}, ${side}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 17vw" />
                    <span className={`absolute top-2.5 left-2.5 text-[10px] font-black text-background px-2.5 py-1 rounded-full uppercase tracking-[0.16em] backdrop-blur-sm ${side === "before" ? "bg-foreground/80" : "bg-success/90"}`}>
                      {side}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-black text-[16px] text-foreground">{job.title}</h3>
                  {isSampleContent ? <SampleBadge /> : job.location && <span className="text-xs font-semibold text-muted-foreground">{job.location}</span>}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 bg-card rounded-2xl px-7 sm:px-10 py-6 border border-border card-shadow">
          <div className="text-center sm:text-left">
            <p className="font-black text-foreground text-lg mb-1">Want a price for your space?</p>
            <p className="text-sm text-muted-foreground">Upload a few photos and get a firm quote.</p>
          </div>
          <Link href={QUOTE_PATH} data-cta="projects" className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-black px-7 h-12 rounded-xl hover:bg-primary/90 active:scale-[0.97] transition-all text-sm btn-lift">
            Get a Photo Estimate
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
