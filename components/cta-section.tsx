import Link from "next/link"
import { ArrowRight, MessageSquare, Phone } from "lucide-react"
import { site, phoneHref, smsHref, QUOTE_PATH } from "@/config/site"

export function CtaSection({ title = "Ready to get your space back?" }: { title?: string }) {
  const { business } = site
  return (
    <section data-section="final-cta" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-7 sm:px-12 py-12 sm:py-14 shadow-[0_8px_48px_rgba(15,23,42,0.22)]">
          <div className="absolute top-0 inset-x-0 h-1 bg-accent" aria-hidden />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-background tracking-tight text-balance mb-3">{title}</h2>
              <p className="text-background/70 font-medium">
                {business.hours.label}. Firm price before we start.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href={phoneHref} className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-black h-14 px-7 rounded-2xl hover:bg-accent/90 btn-lift active:scale-[0.97] transition-all">
                <Phone className="h-5 w-5" aria-hidden />
                {business.phoneDisplay}
              </a>
              {business.textEnabled && (
                <a href={smsHref} className="inline-flex items-center justify-center gap-2 border border-background/25 text-background font-black h-14 px-6 rounded-2xl hover:bg-background/10 transition-all">
                  <MessageSquare className="h-5 w-5" aria-hidden />
                  Text
                </a>
              )}
              <Link href={QUOTE_PATH} className="inline-flex items-center justify-center gap-2 bg-background text-foreground font-black h-14 px-7 rounded-2xl hover:bg-background/90 btn-lift active:scale-[0.97] transition-all">
                Free Quote
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
