import { site } from "@/config/site"
import { SectionHeading } from "@/components/section-heading"

export function ProcessSection() {
  return (
    <section id="how-it-works" data-section="process" className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading eyebrow="How it works" title="Three steps. No surprises." aside="Most jobs take under two hours from arrival to swept floor." />
        <ol className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {site.process.map((step, i) => (
            <li key={step.title} className="bg-card border border-border rounded-2xl p-7 sm:p-8 card-shadow">
              <span className="block text-5xl font-black text-accent/25 leading-none mb-6" aria-hidden>
                0{i + 1}
              </span>
              <h3 className="text-lg font-black text-foreground mb-2.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
