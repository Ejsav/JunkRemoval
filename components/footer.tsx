import { Phone, Mail, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const PHONE = "(407) 801-7886"
const PHONE_HREF = "tel:4078017886"

const services = [
  "Residential Junk Removal",
  "Commercial Junk Removal",
  "Garage Cleanouts",
  "Furniture Removal",
  "Appliance Removal",
  "Estate Cleanouts",
  "Construction Debris",
  "Yard Debris Removal",
]

const serviceAreas = [
  "Orlando", "Winter Park", "Lake Nona", "Kissimmee",
  "Sanford", "Apopka", "Maitland", "Ocoee",
  "Altamonte Springs", "Clermont",
]

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "#quote", label: "Free Quote" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DemoJunk%20%281%29-0eQV4MZwbvZrlwRon9Bb0OzTfKBEIQ.jpg"
                alt="Orlando Junk Removal Logo"
                width={48}
                height={48}
                className="h-11 w-auto object-contain"
              />
            </div>
            <p className="text-background/50 text-sm leading-relaxed mb-8 font-medium">
              Fast, professional junk removal. Licensed. Insured. Same-day service available across Central Florida. No hidden fees. Real results.
            </p>
            <div className="flex flex-col gap-3.5">
              <a href={PHONE_HREF} className="flex items-center gap-3 text-background hover:text-accent transition-colors group">
                <Phone className="h-4 w-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-black text-sm tracking-tight">{PHONE}</span>
              </a>
              <span className="flex items-center gap-3 text-background/45 text-sm">
                <Mail className="h-4 w-4 text-accent/50 shrink-0" />
                hello@orlandojunk.com
              </span>
              <span className="flex items-center gap-3 text-background/45 text-sm">
                <MapPin className="h-4 w-4 text-accent/50 shrink-0" />
                Central Florida
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-background/30 mb-5">Services</p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-background/55 hover:text-background hover:translate-x-1 transition-all inline-block">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-background/30 mb-5">Service Areas</p>
            <ul className="flex flex-col gap-2.5">
              {serviceAreas.map((a) => (
                <li key={a}>
                  <a href="#service-area" className="text-sm text-background/55 hover:text-background hover:translate-x-1 transition-all inline-block">
                    {a}, FL
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links + hours */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-background/30 mb-5">Navigation</p>
            <ul className="flex flex-col gap-2.5 mb-8">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-background/55 hover:text-background transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-background/30 mb-2.5">Hours</p>
            <p className="text-sm text-background/50">Monday – Sunday</p>
            <p className="text-sm font-black text-background mt-0.5">7:00 AM – 8:00 PM</p>
          </div>
        </div>

        {/* CTA bar */}
        <div className="mt-14 pt-10 border-t border-background/[0.09] flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <p className="font-black text-background text-lg mb-1">Ready for same-day junk removal?</p>
            <p className="text-background/40 text-sm">Call now or request your free estimate online.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-black px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors text-sm btn-lift shadow-md shadow-accent/15"
            >
              <Phone className="h-4 w-4" />
              {PHONE}
            </a>
            <a
              href="#quote"
              className="flex items-center justify-center gap-2 border border-background/20 text-background font-bold px-6 py-3 rounded-xl hover:bg-background/10 transition-colors text-sm"
            >
              Free Estimate
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/[0.09] py-5">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-background/30">
          <p>{"© 2026 Orlando Junk Removal. All rights reserved."}</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-background/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-background/60 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-background/60 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
