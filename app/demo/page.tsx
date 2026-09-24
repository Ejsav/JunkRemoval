import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, Mail, MessageSquare, Phone } from "lucide-react"
import { site, isLive } from "@/config/site"

export const metadata: Metadata = {
  title: "About This Demo",
  description: "A conversion-focused website system for junk removal companies, built and launched for you.",
  alternates: { canonical: "/demo" },
  robots: { index: false, follow: false },
}

const included = [
  ["Built to get calls", "Tap-to-call and tap-to-text on every screen, with a sticky action bar on mobile."],
  ["Photo estimates", "Customers upload photos with their quote request, so you can price jobs without a site visit."],
  ["Every lead tracked", "Calls, texts and form submissions are counted, so you can see what the site brings in."],
  ["Local search groundwork", "Business schema, service areas, sitemap and page titles set up correctly for your city."],
  ["Your real proof", "Your Google reviews, job photos and before-and-afters, never stock filler."],
  ["Fast on any phone", "Optimized images and a lean build, because most junk removal customers search on mobile."],
]

const steps = [
  ["Free preview", "I rebuild this demo with your name, logo, colors, services and reviews, and send you the link."],
  ["You decide", "If it's better than what you have, we move forward. If not, no cost and no hard feelings."],
  ["Launch", "I connect your domain, route leads to your phone and inbox, and test every button before it goes live."],
]

const needs = ["Logo (or I'll set up a clean text logo)", "Your phone number and email for leads", "Services and rough pricing", "Towns you serve", "Link to your Google reviews", "10–20 job photos, before-and-afters if you have them", "Access to your domain"]

export default function DemoPage() {
  if (isLive) notFound()
  const { builder, business } = site
  const half = builder.offerPrice / 2
  const builderTel = `tel:${builder.phoneE164}`
  const builderSms = `sms:${builder.phoneE164}`

  return (
    <>
      <section className="bg-foreground text-background">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-[11px] font-black text-accent uppercase tracking-[0.24em] mb-5">For junk removal business owners</p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.03] text-balance mb-6">
            Your crew is better than your website. Let&apos;s fix that.
          </h1>
          <p className="text-lg text-background/75 max-w-2xl leading-relaxed">
            You&apos;re looking at a working demo. <strong className="text-background">{business.name}</strong> is a fictional company; the reviews,
            photos and numbers are samples. Everything else is real and works: the call and text buttons, the photo-estimate form, the tracking and the
            search setup. I rebuild it with your business in it, then launch it.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href={builderTel} data-cta="demo-hero" className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-black h-14 px-7 rounded-2xl hover:bg-accent/90 btn-lift">
              <Phone className="h-5 w-5" aria-hidden /> Call {builder.name.split(" ")[0]}: {builder.phoneDisplay}
            </a>
            <Link href="/" className="inline-flex items-center justify-center gap-2 border border-background/25 text-background font-black h-14 px-7 rounded-2xl hover:bg-background/10">
              Explore the demo site <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-10">What you get</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {included.map(([title, text]) => (
              <li key={title} className="bg-card border border-border rounded-2xl p-6 card-shadow">
                <p className="font-black text-foreground flex items-center gap-2 mb-1.5">
                  <Check className="h-5 w-5 text-accent" aria-hidden /> {title}
                </p>
                <p className="text-muted-foreground leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.2fr_1fr] gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-8">How it works</h2>
            <ol className="flex flex-col gap-4">
              {steps.map(([title, text], i) => (
                <li key={title} className="flex gap-5 bg-card border border-border rounded-2xl p-6">
                  <span className="text-3xl font-black text-accent/40 leading-none" aria-hidden>0{i + 1}</span>
                  <span>
                    <span className="block font-black text-foreground mb-1">{title}</span>
                    <span className="block text-muted-foreground leading-relaxed">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-foreground text-background rounded-3xl p-8 sm:p-10 self-start">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-background/60 mb-3">One flat price</p>
            <p className="text-6xl font-black tracking-tight text-accent mb-2">${builder.offerPrice}</p>
            <p className="text-background/75 mb-7">
              ${half} to start, ${half} when your site goes live. The preview is free.
            </p>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-background/60 mb-3">What I need from you</p>
            <ul className="flex flex-col gap-2 text-sm text-background/85">
              {needs.map((n) => (
                <li key={n} className="flex gap-2.5">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden /> {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">Want to see your company on this?</h2>
          <p className="text-muted-foreground text-lg mb-8">Send me your business name or current website. I&apos;ll send back a preview.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href={builderTel} className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-black h-14 px-7 rounded-2xl hover:bg-accent/90 btn-lift">
              <Phone className="h-5 w-5" aria-hidden /> {builder.phoneDisplay}
            </a>
            <a href={builderSms} className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground font-black h-14 px-7 rounded-2xl hover:border-accent/40">
              <MessageSquare className="h-5 w-5" aria-hidden /> Text
            </a>
            <a href={`mailto:${builder.email}?subject=${encodeURIComponent("Website preview for my junk removal company")}`} className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground font-black h-14 px-7 rounded-2xl hover:border-accent/40">
              <Mail className="h-5 w-5" aria-hidden /> {builder.email}
            </a>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">Built by {builder.name}.</p>
        </div>
      </section>
    </>
  )
}
