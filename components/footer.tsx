import Link from "next/link"
import { ArrowRight, MessageSquare, Phone } from "lucide-react"
import { site, navItems, QUOTE_PATH, isLive, servicePath, cityPath } from "@/config/site"
import { BizName, BizPhone, CallLink, TextLink } from "@/components/biz"
import { Wordmark } from "@/components/wordmark"
import { Container, Em } from "@/components/section-heading"

export function Footer() {
  const { business, services, serviceAreas, builder } = site
  const socials = Object.entries(business.socials).filter(([, url]) => url)
  const heading = "text-[11px] eyebrow text-mist mb-5"
  const link = "text-[14.5px] text-bone/70 hover:text-bone transition-colors"

  return (
    <footer className="surface-dark grain relative overflow-hidden" data-section="footer">
      <Container className="relative z-10 pt-20 sm:pt-28">
        <div className="grid lg:grid-cols-12 gap-10 items-end pb-16 sm:pb-20 border-b border-line-dark">
          <h2 className="lg:col-span-7 headline text-[clamp(2.5rem,5.5vw,5rem)] text-bone">
            Point at it. <Em className="text-accent-soft block">We&apos;ll handle the rest.</Em>
          </h2>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3">
            <Link href={QUOTE_PATH} className="btn btn-accent">
              Get my price <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
            </Link>
            <CallLink className="btn btn-ghost-dark">
              <Phone className="h-4 w-4" aria-hidden /> <BizPhone />
            </CallLink>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-12 py-16">
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" aria-label={`${business.name} home`} className="inline-block">
              <Wordmark tone="dark" />
            </Link>
            <p className="text-[14.5px] text-mist mt-6 max-w-xs leading-relaxed">{business.tagline}</p>
            <dl className="mt-8 grid gap-4 text-[14px]">
              <div>
                <dt className="eyebrow !text-[10px] text-mist">Call</dt>
                <dd><CallLink className="text-bone font-mono text-[15px] hover:text-accent-soft transition-colors"><BizPhone /></CallLink></dd>
              </div>
              {business.textEnabled && (
                <div>
                  <dt className="eyebrow !text-[10px] text-mist">Text</dt>
                  <dd>
                    <TextLink className="inline-flex items-center gap-2 text-bone/80 hover:text-bone">
                      <MessageSquare className="h-3.5 w-3.5" aria-hidden /> Text photos for a price
                    </TextLink>
                  </dd>
                </div>
              )}
              {business.email && (
                <div>
                  <dt className="eyebrow !text-[10px] text-mist">Email</dt>
                  <dd><a href={`mailto:${business.email}`} className="text-bone/80 hover:text-bone">{business.email}</a></dd>
                </div>
              )}
              <div>
                <dt className="eyebrow !text-[10px] text-mist">Hours</dt>
                <dd className="text-bone/80">{business.hours.label}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-3">
            <p className={heading}>Services</p>
            <ul className="grid gap-3">
              {services.map((s) => (
                <li key={s.slug}><Link href={servicePath(s.slug)} className={link}>{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className={heading}>Areas</p>
            <ul className="grid gap-3">
              {serviceAreas.cities.slice(0, 8).map((c) => (
                <li key={c.slug}><Link href={cityPath(c)} className={link}>{c.name}</Link></li>
              ))}
              {serviceAreas.cities.length > 8 && (
                <li><Link href="/service-areas" className={link}>All areas</Link></li>
              )}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <p className={heading}>Company</p>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {[...navItems, { href: QUOTE_PATH, label: "Get a quote" }].map((l) => (
                <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={`${link} capitalize`}>{name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="relative z-10 border-t border-line-dark">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-mist">
          <p>
            © {new Date().getFullYear()} <BizName />
            {!isLive && (
              <>
                {" "}· Website system by{" "}
                <Link href="/demo" className="text-bone/80 link-draw">{builder.name}</Link>
              </>
            )}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-bone transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-bone transition-colors">Terms</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
