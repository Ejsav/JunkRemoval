import type { Metadata } from "next"
import Image from "next/image"
import { site } from "@/config/site"
import { icons } from "@/lib/icons"
import { PageHeader } from "@/components/page-header"
import { ProcessSection } from "@/components/process-section"
import { CtaSection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${site.business.name}: local junk removal in ${site.business.address.city} with upfront pricing and careful crews.`,
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  const { about, promises, business } = site
  return (
    <>
      <PageHeader eyebrow="About" title={about.heading} />
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            {business.credentials.length > 0 && (
              <ul className="flex flex-wrap gap-2 pt-2">
                {business.credentials.map((c) => (
                  <li key={c} className="text-sm font-bold text-foreground bg-secondary border border-border px-3 py-1.5 rounded-full">{c}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden card-shadow-lg">
            <Image src="/junk-removal-workers-loading-truck.jpg" alt="Crew loading furniture into a junk removal truck" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
        <ul className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promises.map((p) => {
            const Icon = icons[p.icon]
            return (
              <li key={p.title} className="bg-card border border-border rounded-2xl p-6 card-shadow">
                <Icon className="h-6 w-6 text-accent mb-4" aria-hidden />
                <p className="font-black text-foreground">{p.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{p.text}</p>
              </li>
            )
          })}
        </ul>
      </section>
      <ProcessSection />
      <CtaSection />
    </>
  )
}
