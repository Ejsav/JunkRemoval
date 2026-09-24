import { Clock, MessageSquare, Phone, ShieldCheck } from "lucide-react"
import { site, phoneHref, smsHref } from "@/config/site"
import { QuoteForm } from "@/components/quote-form"
import { Container, Em, Eyebrow } from "@/components/section-heading"

export function QuoteSection({ as = "h2", n }: { as?: "h1" | "h2"; n?: string }) {
  const { business } = site
  const Heading = as
  return (
    <section id="quote" data-section="quote" className="surface-dark grain relative overflow-hidden scroll-mt-20 py-20 sm:py-28">
      <div className="absolute inset-0 hairline-grid pointer-events-none" aria-hidden />
      <Container className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <Eyebrow index={n} tone="dark">Free quote</Eyebrow>
          <Heading className="headline text-[clamp(2.5rem,5vw,4.5rem)] text-bone mt-6">
            Get a firm price <Em className="text-accent-soft">in minutes.</Em>
          </Heading>
          <p className="lede text-mist mt-6 max-w-md">
            Send the details and a few photos. You get a locked price and an arrival window, with no obligation to book.
          </p>

          <div className="hidden lg:block mt-12 border-t border-line-dark">
            <a href={phoneHref} className="group flex items-center justify-between py-5 border-b border-line-dark">
              <span>
                <span className="eyebrow !text-[10px] text-mist block">Fastest · Call</span>
                <span className="block text-[26px] font-semibold tracking-[-0.03em] text-bone mt-1">{business.phoneDisplay}</span>
              </span>
              <span className="h-11 w-11 rounded-full bg-accent text-white flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <Phone className="h-4 w-4" aria-hidden />
              </span>
            </a>
            {business.textEnabled && (
              <a href={smsHref} className="group flex items-center justify-between py-5 border-b border-line-dark">
                <span>
                  <span className="eyebrow !text-[10px] text-mist block">Or text photos</span>
                  <span className="block text-[26px] font-semibold tracking-[-0.03em] text-bone mt-1">{business.phoneDisplay}</span>
                </span>
                <span className="h-11 w-11 rounded-full border border-line-dark text-bone flex items-center justify-center transition-colors duration-500 group-hover:bg-bone group-hover:text-ink">
                  <MessageSquare className="h-4 w-4" aria-hidden />
                </span>
              </a>
            )}
            <ul className="flex gap-6 pt-5 text-[13px] text-mist">
              <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" aria-hidden /> {business.hours.label}</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5" aria-hidden /> No obligation</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
          <div className="bg-paper text-ink rounded-[28px] p-6 sm:p-10 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.7)] ring-1 ring-black/5">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h3 className="text-[24px] font-semibold tracking-[-0.03em]">Tell us about the job</h3>
                <p className="text-[14px] text-stone mt-1">Takes about a minute.</p>
              </div>
              <span className="eyebrow !text-[10px] text-stone border border-line rounded-full px-3 py-1.5 shrink-0">Free</span>
            </div>
            <QuoteForm uploads={site.forms.photoUploads && Boolean(process.env.BLOB_READ_WRITE_TOKEN)} />
          </div>
        </div>
      </Container>
    </section>
  )
}
