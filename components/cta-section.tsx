import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageSquare, Phone } from "lucide-react"
import { site, phoneHref, smsHref, QUOTE_PATH } from "@/config/site"
import { Container, Em } from "@/components/section-heading"

export function CtaSection({ title = "Ready when you are.", emphasis = "Same-day slots go early." }: { title?: string; emphasis?: string }) {
  const { business, images } = site
  return (
    <section data-section="final-cta" className="bg-bone py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] surface-dark grain min-h-[22rem] flex items-end">
          <Image src={images.finished} alt="" fill className="object-cover opacity-35" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden />
          <div className="relative z-10 w-full p-8 sm:p-14 grid lg:grid-cols-12 gap-8 items-end">
            <h2 className="lg:col-span-7 headline text-[clamp(2.4rem,5vw,4.5rem)] text-bone">
              {title} <Em className="text-accent-soft block">{emphasis}</Em>
            </h2>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3">
              <a href={phoneHref} className="btn btn-accent">
                <Phone className="h-4 w-4" aria-hidden />
                {business.phoneDisplay}
              </a>
              {business.textEnabled && (
                <a href={smsHref} className="btn btn-ghost-dark">
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  Text
                </a>
              )}
              <Link href={QUOTE_PATH} className="btn btn-bone">
                Free quote
                <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
