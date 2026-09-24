import { Clock, MessageSquare, Phone, ShieldCheck } from "lucide-react"
import { site, phoneHref, smsHref } from "@/config/site"
import { QuoteForm } from "@/components/quote-form"

export function QuoteSection({ as = "h2" }: { as?: "h1" | "h2" }) {
  const { business } = site
  const Heading = as
  return (
    <section id="quote" data-section="quote" className="bg-background scroll-mt-20">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="px-6 sm:px-10 pt-12 pb-10 lg:px-16 lg:py-24 flex flex-col justify-center bg-foreground">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] mb-4 text-accent">Free quote</p>
          <Heading className="text-4xl sm:text-5xl font-black tracking-tight text-background leading-[1.05] mb-5 text-balance">
            Get a firm price in minutes.
          </Heading>
          <p className="text-background/75 leading-relaxed lg:mb-9 max-w-md font-medium">
            Send the details and a few photos. You get a locked price and an arrival window, with no obligation to book.
          </p>

          <div className="hidden lg:flex flex-col gap-3 max-w-md">
            <a href={phoneHref} className="flex items-center gap-4 rounded-2xl p-5 border border-background/15 bg-background/5 hover:bg-background/10 transition-colors">
              <span className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0" aria-hidden>
                <Phone className="h-5 w-5 text-accent-foreground" />
              </span>
              <span>
                <span className="block text-xs font-bold text-background/60 uppercase tracking-wide">Fastest: call</span>
                <span className="block text-xl font-black text-background">{business.phoneDisplay}</span>
              </span>
            </a>
            {business.textEnabled && (
              <a href={smsHref} className="flex items-center gap-4 rounded-2xl p-5 border border-background/15 bg-background/5 hover:bg-background/10 transition-colors">
                <span className="w-11 h-11 rounded-xl bg-background/15 flex items-center justify-center shrink-0" aria-hidden>
                  <MessageSquare className="h-5 w-5 text-background" />
                </span>
                <span>
                  <span className="block text-xs font-bold text-background/60 uppercase tracking-wide">Or text photos to</span>
                  <span className="block text-xl font-black text-background">{business.phoneDisplay}</span>
                </span>
              </a>
            )}
          </div>

          <ul className="hidden lg:flex mt-9 flex-col gap-3 text-sm text-background/70 font-medium">
            <li className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-accent" aria-hidden /> {business.hours.label}</li>
            <li className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4 text-accent" aria-hidden /> No obligation, no pressure</li>
          </ul>
        </div>

        <div className="bg-card px-6 sm:px-10 py-10 lg:px-16 lg:py-24 border-t lg:border-t-0 lg:border-l border-border">
          <div className="w-full max-w-xl mx-auto lg:mx-0">
            <h3 className="text-2xl font-black text-foreground mb-1.5">Tell us about the job</h3>
            <p className="text-sm text-muted-foreground mb-7 font-medium">Takes about a minute.</p>
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  )
}
