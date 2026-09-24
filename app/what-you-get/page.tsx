import { Check, Globe, Smartphone, Search, Phone, Award, ArrowRight, Clock, Shield, Zap, FileCheck } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "What You Get | Buy This Junk Removal Website",
  description:
    "Everything included when you purchase this premium junk removal website template. Domain, custom branding, mobile-optimized design, SEO setup, full ownership.",
  keywords:
    "buy junk removal website, junk removal website template, business website, junk removal website for sale",
}

const features = [
  {
    icon: FileCheck,
    title: "This Exact Website, Customized",
    description:
      "This exact premium junk removal design, customized with your business name, domain, phone number, and service area.",
  },
  {
    icon: Globe,
    title: "Brand-New Domain",
    description:
      "Choose your own domain name or we'll suggest options that fit your business. Includes first year of registration.",
  },
  {
    icon: Award,
    title: "Custom Branding",
    description: "Your business name, logo text, phone number, and service area customized throughout the entire site.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Optimized",
    description:
      "Looks perfect on phones, tablets, and desktops. Fast loading speeds for better user experience and SEO.",
  },
  {
    icon: Phone,
    title: "Contact Form + Click-to-Call",
    description: "Ready to capture leads immediately. Phone buttons dial your number directly on mobile devices.",
  },
  {
    icon: Search,
    title: "Basic SEO Setup",
    description: "Page titles, meta descriptions, and on-page optimization to help customers find you on Google.",
  },
]

const bonuses = [
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Your customized website delivered within 48-72 hours of purchase.",
  },
  {
    icon: Shield,
    title: "Full Ownership",
    description: "100% yours. No monthly fees, no subscriptions, no strings attached.",
  },
  {
    icon: Zap,
    title: "Launch-Ready",
    description: "Everything configured and ready to start generating leads from day one.",
  },
]

export default function WhatYouGetPage() {
  const phoneNumber = "860-406-0262"

  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium tracking-widest text-primary uppercase mb-4">Website For Sale</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              What's Included With Purchase
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              A complete, professional junk removal website ready to launch your business online. Everything you need,
              nothing you don't.
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call to Purchase: {phoneNumber}
            </a>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A turnkey solution to get your junk removal business online fast
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Plus These Bonuses</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {bonuses.map((bonus, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <bonus.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{bonus.title}</h3>
                <p className="text-muted-foreground text-sm">{bonus.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Ownership Highlight */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-full bg-[color:var(--success)] flex items-center justify-center flex-shrink-0">
                <Check className="w-10 h-10 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Full Ownership & Transfer
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  You receive complete ownership of the website and all assets. The domain, design, code, and content
                  are 100% yours. No recurring fees, no monthly subscriptions, no strings attached. Transfer to any
                  hosting provider you choose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-background/70 text-lg mb-8 max-w-2xl mx-auto">
            Call now to purchase this website and launch your junk removal business online
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {phoneNumber}
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 rounded-full font-semibold hover:bg-background/90 transition-colors"
            >
              View Example Features
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
