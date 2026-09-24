import { ChevronDown } from "lucide-react"
import { site } from "@/config/site"
import { SectionHeading } from "@/components/section-heading"

export function FaqSection() {
  return (
    <section id="faq" data-section="faq" className="py-20 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <div className="flex flex-col gap-3">
          {site.faqs.map((f) => (
            <details key={f.q} className="group bg-card border border-border rounded-2xl px-6 open:shadow-md transition-shadow">
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-black text-foreground text-[16px] [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 group-open:rotate-180 transition-transform" aria-hidden />
              </summary>
              <p className="pb-5 -mt-1 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
