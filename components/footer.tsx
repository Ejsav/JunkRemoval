import Link from "next/link"
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react"
import { site, phoneHref, smsHref, navItems, QUOTE_PATH, isLive } from "@/config/site"
import { Wordmark } from "@/components/wordmark"

export function Footer() {
  const { business, services, serviceAreas } = site
  const socials = Object.entries(business.socials).filter(([, url]) => url)

  return (
    <footer className="bg-foreground text-background" data-section="footer">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          <div>
            <Link href="/" aria-label={`${business.name} home`} className="inline-block mb-6">
              <Wordmark inverted />
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-7">{business.tagline}</p>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <a href={phoneHref} className="flex items-center gap-3 font-black hover:text-accent transition-colors">
                  <Phone className="h-4 w-4 text-accent shrink-0" aria-hidden /> {business.phoneDisplay}
                </a>
              </li>
              {business.textEnabled && (
                <li>
                  <a href={smsHref} className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors">
                    <MessageSquare className="h-4 w-4 text-accent shrink-0" aria-hidden /> Text us a photo
                  </a>
                </li>
              )}
              {business.email && (
                <li>
                  <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors">
                    <Mail className="h-4 w-4 text-accent shrink-0" aria-hidden /> {business.email}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3 text-background/70">
                <MapPin className="h-4 w-4 text-accent shrink-0" aria-hidden />
                {business.address.street ? `${business.address.street}, ` : ""}
                {business.address.city}, {business.address.region}
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Clock className="h-4 w-4 text-accent shrink-0" aria-hidden /> {business.hours.label}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-background/40 mb-5">Services</p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="text-sm text-background/65 hover:text-background transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-background/40 mb-5">Service Areas</p>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-2.5">
              {serviceAreas.cities.slice(0, 10).map((c) => (
                <li key={c}>
                  <Link href="/service-areas" className="text-sm text-background/65 hover:text-background transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-background/40 mb-5">Company</p>
            <ul className="flex flex-col gap-2.5 mb-8">
              {[...navItems, { href: QUOTE_PATH, label: "Free Quote" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-background/65 hover:text-background transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-3">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm capitalize text-background/65 hover:text-background">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 py-5">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/45">
          <p>
            © {new Date().getFullYear()} {business.name}.
            {!isLive && (
              <>
                {" "}Demo site by{" "}
                <Link href="/demo" className="underline underline-offset-2 hover:text-background">
                  {site.builder.name}
                </Link>
                .
              </>
            )}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-background transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-background transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
