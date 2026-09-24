import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react"
import { site, isLive } from "@/config/site"
import { Container, Em, Eyebrow } from "@/components/section-heading"

export const metadata: Metadata = {
  title: "About This Demo",
  description: "A conversion-focused website system for junk removal companies, built and launched for you.",
  alternates: { canonical: "/demo" },
  robots: { index: false, follow: false },
}

const included = [
  ["Built to get calls", "Tap-to-call and tap-to-text on every screen, with a sticky action bar on mobile."],
  ["Photo estimates", "Customers upload photos with their request, so you can price jobs without a site visit."],
  ["Every lead tracked", "Calls, texts and form submissions are counted, so you can see what the site brings in."],
  ["Local search groundwork", "Business schema, service areas, sitemap and page titles set up correctly for your city."],
  ["Your real proof", "Your Google reviews, job photos and before-and-afters, never stock filler."],
  ["Fast on any phone", "Optimized images and a lean build, because most customers search on mobile."],
]

const steps = [
  ["Free preview", "I rebuild this demo with your name, logo, colors, services and reviews, and send you the link."],
  ["You decide", "If it's better than what you have, we move forward. If not, no cost and no hard feelings."],
  ["Launch", "I connect your domain, route leads to your phone and inbox, and test every button before it goes live."],
]

const needs = ["Logo, or I'll set up a clean text mark", "Phone number and email for leads", "Services and rough pricing", "Towns you serve", "Link to your Google reviews", "10–20 job photos, before-and-afters if you have them", "Access to your domain"]

export default function DemoPage() {
  if (isLive) notFound()
  const { builder, business, hero } = site
  const half = builder.offerPrice / 2
  const builderTel = `tel:${builder.phoneE164}`
  const builderSms = `sms:${builder.phoneE164}`

  return (
    <>
      <section className="surface-dark grain relative overflow-hidden">
        <div className="absolute inset-0 hairline-grid pointer-events-none" aria-hidden />
        <Container className="relative z-10 pt-14 sm:pt-20 pb-20 sm:pb-28 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="rise eyebrow text-accent-soft">For junk removal business owners</p>
            <h1 className="rise display text-[clamp(2.75rem,7vw,6rem)] text-bone mt-7" style={{ "--d": "60ms" } as React.CSSProperties}>
              Your crew is better than your website. <Em className="text-accent-soft">Let&apos;s fix that.</Em>
            </h1>
            <p className="rise lede text-mist mt-8 max-w-2xl" style={{ "--d": "140ms" } as React.CSSProperties}>
              You&apos;re looking at a working demo. <span className="text-bone">{business.name}</span> is a fictional company; the reviews, photos and numbers are samples.
              Everything else is real: the call and text buttons, the photo-estimate form, the tracking and the search setup. I rebuild it with your business in it, then launch it.
            </p>
            <div className="rise flex flex-col sm:flex-row gap-3 mt-10" style={{ "--d": "220ms" } as React.CSSProperties}>
              <a href={builderTel} data-cta="demo-hero" className="btn btn-accent !h-14 !px-7">
                <Phone className="h-4 w-4" aria-hidden /> Call {builder.name.split(" ")[0]} · {builder.phoneDisplay}
              </a>
              <Link href="/" className="btn btn-ghost-dark !h-14 !px-7">
                Explore the demo <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="float-in hidden lg:block lg:col-span-4 relative aspect-[4/5] rounded-[24px] overflow-hidden ring-1 ring-line-dark elevated-lg" style={{ "--d": "200ms" } as React.CSSProperties}>
            <Image src={hero.image} alt="" fill className="object-cover" sizes="33vw" />
          </div>
        </Container>
      </section>

      <section className="bg-bone py-20 sm:py-28">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-4" data-reveal>
            <Eyebrow index="01">What you get</Eyebrow>
            <h2 className="headline text-[clamp(2rem,4vw,3.4rem)] mt-6">
              A website that <Em>earns its keep.</Em>
            </h2>
          </div>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 border-t border-line">
            {included.map(([title, text], i) => (
              <li key={title} data-reveal style={{ "--d": `${i * 50}ms` } as React.CSSProperties} className={`py-8 border-b border-line ${i % 2 ? "sm:pl-8 sm:border-l" : "sm:pr-8"}`}>
                <p className="font-mono text-[11px] text-accent">0{i + 1}</p>
                <p className="text-[19px] font-semibold tracking-[-0.02em] mt-3">{title}</p>
                <p className="text-[15px] text-stone leading-relaxed mt-2">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28 border-t border-line">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <div className="lg:col-span-6">
            <Eyebrow index="02">How it works</Eyebrow>
            <ol className="mt-10 border-t border-line">
              {steps.map(([title, text], i) => (
                <li key={title} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 py-7 border-b border-line">
                  <span className="serif-em text-[34px] leading-none text-accent">{i + 1}</span>
                  <span>
                    <span className="block text-[20px] font-semibold tracking-[-0.02em]">{title}</span>
                    <span className="block text-[15.5px] text-stone leading-relaxed mt-1.5">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 surface-dark grain rounded-[28px] p-8 sm:p-10 relative overflow-hidden" data-reveal>
            <div className="relative z-10">
              <p className="eyebrow text-mist">One flat price</p>
              <p className="display text-[5.5rem] text-bone mt-4 leading-none">${builder.offerPrice}</p>
              <p className="text-mist mt-4">
                ${half} to start, ${half} at launch. <span className="text-bone">The preview is free.</span>
              </p>
              <p className="eyebrow text-mist mt-10 mb-4">What I need from you</p>
              <ul className="grid gap-3 text-[14.5px] text-bone/85">
                {needs.map((n) => (
                  <li key={n} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 rounded-full bg-accent-soft shrink-0" aria-hidden /> {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bone py-20 sm:py-28 border-t border-line">
        <Container className="text-center max-w-3xl">
          <h2 className="headline text-[clamp(2.2rem,4.5vw,3.8rem)]">
            Want to see your company <Em>on this?</Em>
          </h2>
          <p className="lede text-stone mt-5">Send your business name or current website. I&apos;ll send back a preview.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10">
            <a href={builderTel} className="btn btn-accent">
              <Phone className="h-4 w-4" aria-hidden /> {builder.phoneDisplay}
            </a>
            <a href={builderSms} className="btn btn-ghost">
              <MessageSquare className="h-4 w-4" aria-hidden /> Text
            </a>
            <a href={`mailto:${builder.email}?subject=${encodeURIComponent("Website preview for my junk removal company")}`} className="btn btn-ghost">
              <Mail className="h-4 w-4" aria-hidden /> {builder.email}
            </a>
          </div>
          <p className="eyebrow text-stone mt-10">Built by {builder.name}</p>
        </Container>
      </section>
    </>
  )
}
