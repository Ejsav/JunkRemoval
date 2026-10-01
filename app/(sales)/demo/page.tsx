import type React from "react"
import type { Metadata } from "next"
import { ArrowDown, Check, Mail, MessageSquare, Paperclip, Phone, Search } from "lucide-react"
import { site } from "@/config/site"
import { offer } from "@/config/offer"
import { PreviewStudio } from "@/components/preview-studio"
import { PreviewRequestForm } from "@/components/preview-request-form"
import { ContactRow } from "@/components/sales-chrome"
import { Container, Em, Eyebrow } from "@/components/section-heading"

const title = `A finished junk removal website, launched as yours for $${offer.price}`
const description =
  "A tested, mobile-first website system for junk removal companies: photo quote requests, tap-to-call and text, service and city pages, reviews and lead tracking. Customised and launched in about a week."

export const metadata: Metadata = {
  title: { absolute: `Junk Removal Website System · $${offer.price} Flat · ${site.builder.name}` },
  description,
  alternates: { canonical: "/demo" },
  // The fictional company stays out of search; this page is the real product.
  robots: site.mode === "demo" ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", title, description, url: "/demo", siteName: site.builder.name },
  twitter: { card: "summary_large_image", title, description },
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

export default function DemoPage() {
  const { builder, business } = site
  const rest = offer.price - offer.deposit

  const journey = [
    {
      icon: Search,
      title: "A customer finds you",
      text: "They search on their phone, land on your site and see your price range, your photos and your reviews in seconds.",
    },
    {
      icon: Paperclip,
      title: "They send the job",
      text: "One tap to call or text, or a short form with photos from their camera roll. No account, no back-and-forth.",
    },
    {
      icon: Mail,
      title: "It lands with you",
      text: "Calls and texts ring your phone. Form requests hit your inbox with name, number, town, job type and every photo.",
    },
  ]

  return (
    <>
      {/* 1 · What this is, who it's for, what it costs, what to do next */}
      <section className="surface-dark grain relative overflow-hidden">
        <div className="absolute inset-0 hairline-grid pointer-events-none" aria-hidden />
        <Container className="relative z-10 pt-12 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="rise eyebrow text-accent-soft">For junk removal business owners</p>
            <h1 className="rise display text-[clamp(2.6rem,6.4vw,5.6rem)] text-bone mt-6" style={d(60)}>
              A finished website that wins jobs. <Em className="text-accent-soft">With your name on it.</Em>
            </h1>
            <p className="rise lede text-mist mt-7 max-w-2xl" style={d(140)}>
              Not a template and not a design project. It&apos;s a built, tested system that turns local searches into calls, texts and photo
              quote requests. I put your business in it and launch it in {offer.turnaround}.
            </p>
            <div className="rise flex flex-col sm:flex-row gap-3 mt-9" style={d(220)}>
              <a href="#studio" data-cta="demo-hero" className="btn btn-accent !h-14 !px-7 !text-[16px]">
                See it as your company
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
              <a href="#preview-request" data-cta="demo-hero" className="btn btn-ghost-dark !h-14 !px-7">
                Get a free preview
              </a>
            </div>
          </div>

          <div className="rise lg:col-span-5 lg:col-start-8 rounded-[24px] border border-line-dark bg-bone/[0.03] p-7 sm:p-8" style={d(260)}>
            <div className="flex items-end justify-between gap-4">
              <p className="display text-[4.5rem] text-bone leading-none">${offer.price}</p>
              <p className="text-[13.5px] text-mist text-right leading-snug pb-1.5">
                ${offer.deposit} to start
                <br />${rest} at launch
              </p>
            </div>
            <ul className="mt-7 grid gap-3 text-[14.5px] text-bone/85 border-t border-line-dark pt-6">
              {["You own the site, domain and content", "No monthly fee from me", "Free preview before you pay anything", `Live in ${offer.turnaround}`].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="h-4 w-4 text-accent-soft shrink-0 mt-0.5" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 2 · Mentally own it */}
      <section id="studio" className="bg-sand py-20 sm:py-28 scroll-mt-16" data-section="demo-studio">
        <Container>
          <div className="max-w-2xl mb-12" data-reveal>
            <Eyebrow index="01">Live preview</Eyebrow>
            <h2 className="headline text-[clamp(2.1rem,4.2vw,3.6rem)] mt-6">
              Type your name. <Em>Watch it become yours.</Em>
            </h2>
            <p className="lede text-stone mt-5">
              The phone shows the real customer site, not a mock-up. Change the name, city, phone, colour, logo and photo, then open the full site
              to click through it as your company.
            </p>
          </div>
          <PreviewStudio />
        </Container>
      </section>

      {/* 3 · How a lead arrives */}
      <section id="leads" className="bg-paper py-20 sm:py-28 border-t border-line scroll-mt-16" data-section="demo-leads">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <div className="lg:col-span-6">
            <Eyebrow index="02">How a lead reaches you</Eyebrow>
            <h2 className="headline text-[clamp(2.1rem,4.2vw,3.6rem)] mt-6">
              From a search to <Em>your phone.</Em>
            </h2>
            <ol className="mt-10 border-t border-line">
              {journey.map((j, i) => (
                <li key={j.title} data-reveal style={d(i * 80)} className="grid grid-cols-[3rem_1fr] gap-4 py-6 border-b border-line">
                  <span className="h-10 w-10 rounded-full border border-line flex items-center justify-center text-accent">
                    <j.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[19px] font-semibold tracking-[-0.02em]">{j.title}</span>
                    <span className="block text-[15px] text-stone leading-relaxed mt-1.5">{j.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-[14.5px] text-stone mt-6 max-w-lg">
              Every call tap, text tap and quote request is counted in Google Analytics, so you can see what the site brings in each month.
            </p>
          </div>

          <figure className="lg:col-span-5 lg:col-start-8 lg:sticky lg:top-24" data-reveal>
            <div className="rounded-[22px] bg-paper border border-line elevated-lg overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-bone/60">
                <span className="flex items-center gap-2 text-[13px] font-medium">
                  <Mail className="h-4 w-4 text-accent" aria-hidden /> Your inbox
                </span>
                <span className="eyebrow !text-[9.5px] text-stone">Example</span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[15px] font-semibold">New quote request: Dana R. (Winter Park) · 3 photos</p>
                <dl className="mt-4 grid grid-cols-[7rem_1fr] gap-y-2 text-[14px]">
                  {[
                    ["Phone", "(407) 555-0142"],
                    ["Job", "Garage cleanout"],
                    ["Reply by", "Text"],
                    ["Details", "Old fridge, boxes, a treadmill. Available Saturday."],
                    ["Came from", "Google · /services/garage-cleanouts"],
                  ].map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-stone">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="grid grid-cols-3 gap-2 mt-5">
                  {[site.projects[0]?.before, site.projects[1]?.before, site.projects[2]?.before].filter(Boolean).map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={src} src={src} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover ring-1 ring-line" />
                  ))}
                </div>
              </div>
            </div>
            <figcaption className="text-[13px] text-stone mt-4 flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" aria-hidden /> Calls ring your phone</span>
              <span className="inline-flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" aria-hidden /> Texts come to you</span>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* 4 · What exists vs what changes */}
      <section id="included" className="bg-bone py-20 sm:py-28 border-t border-line scroll-mt-16" data-section="demo-included">
        <Container>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12" data-reveal>
            <div className="lg:col-span-7">
              <Eyebrow index="03">What you get</Eyebrow>
              <h2 className="headline text-[clamp(2.1rem,4.2vw,3.6rem)] mt-6">
                Already built. <Em>Only your details change.</Em>
              </h2>
            </div>
            <p className="lg:col-span-5 lede text-stone">
              You&apos;re not paying someone to start designing. You&apos;re paying to turn a finished, tested system into your production website.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-5">
            <ul className="lg:col-span-8 grid sm:grid-cols-2 border-t border-line">
              {offer.included.map((item, i) => (
                <li key={item.title} data-reveal style={d(i * 50)} className={`py-7 border-b border-line ${i % 2 ? "sm:pl-8 sm:border-l" : "sm:pr-8"}`}>
                  <p className="text-[18px] font-semibold tracking-[-0.02em] flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-accent" aria-hidden /> {item.title}
                  </p>
                  <p className="text-[15px] text-stone leading-relaxed mt-2">{item.text}</p>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-4 rounded-[22px] bg-ink text-bone p-7 sm:p-8 self-start" data-reveal>
              <p className="eyebrow !text-[10px] text-mist">Customised for you</p>
              <ul className="flex flex-wrap gap-2 mt-5">
                {offer.customised.map((c) => (
                  <li key={c} className="text-[13.5px] rounded-full border border-line-dark px-3 py-1.5 text-bone/85">{c}</li>
                ))}
              </ul>
              <p className="text-[14px] text-mist mt-6 leading-relaxed">
                {business.name}&apos;s reviews, photos and prices are samples. On your site they&apos;re replaced with yours, and a launch check blocks anything left over.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5 · Price, process, what I need */}
      <section id="price" className="bg-paper py-20 sm:py-28 border-t border-line scroll-mt-16" data-section="demo-price">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <div className="lg:col-span-6">
            <Eyebrow index="04">How it works</Eyebrow>
            <h2 className="headline text-[clamp(2.1rem,4.2vw,3.6rem)] mt-6">
              Preview first. <Em>Pay when you&apos;re sure.</Em>
            </h2>
            <ol className="mt-10 border-t border-line">
              {offer.steps.map((s, i) => (
                <li key={s.title} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 py-6 border-b border-line">
                  <span className="serif-em text-[34px] leading-none text-accent">{i + 1}</span>
                  <span>
                    <span className="block text-[19px] font-semibold tracking-[-0.02em]">{s.title}</span>
                    <span className="block text-[15px] text-stone leading-relaxed mt-1.5">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 surface-dark grain rounded-[24px] p-8 sm:p-10 relative overflow-hidden" data-reveal>
            <div className="relative z-10">
              <p className="eyebrow text-mist">One flat price</p>
              <p className="display text-[5rem] text-bone mt-3 leading-none">${offer.price}</p>
              <p className="text-mist mt-4">
                ${offer.deposit} to start, ${rest} at launch. <span className="text-bone">The preview is free.</span>
              </p>
              <p className="eyebrow text-mist mt-9 mb-4">What I need from you</p>
              <ul className="grid gap-3 text-[14.5px] text-bone/85">
                {offer.needs.map((n) => (
                  <li key={n} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 rounded-full bg-accent-soft shrink-0" aria-hidden /> {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 6 · The objections that stop a sale */}
      <section id="faq" className="bg-bone py-20 sm:py-28 border-t border-line scroll-mt-16" data-section="demo-faq">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <Eyebrow index="05">Straight answers</Eyebrow>
            <h2 className="headline text-[clamp(2.1rem,4.2vw,3.4rem)] mt-6">
              Before you <Em>say yes.</Em>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 border-t border-ink/80">
            {offer.faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-[18px] font-medium tracking-[-0.015em]">{f.q}</span>
                  <span className="h-8 w-8 shrink-0 rounded-full border border-line flex items-center justify-center text-[18px] leading-none transition-transform duration-300 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-[15.5px] text-stone leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 7 · Next step */}
      <section id="preview-request" className="surface-dark grain relative overflow-hidden py-20 sm:py-28 scroll-mt-16" data-section="demo-request">
        <Container className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <div className="lg:col-span-5">
            <Eyebrow index="06" tone="dark">Next step</Eyebrow>
            <h2 className="headline text-[clamp(2.2rem,4.5vw,3.8rem)] text-bone mt-6">
              See your company <Em className="text-accent-soft">on this, free.</Em>
            </h2>
            <p className="lede text-mist mt-6 max-w-md">
              Send your business name and I&apos;ll build a private preview with your details, then text you the link. Rather talk first?
            </p>
            <div className="mt-8 text-bone">
              <ContactRow />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="bg-paper text-ink rounded-[24px] p-6 sm:p-10 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.7)]">
              <PreviewRequestForm />
            </div>
            <p className="eyebrow text-mist mt-6 text-center">Built by {builder.name}</p>
          </div>
        </Container>
      </section>
    </>
  )
}
