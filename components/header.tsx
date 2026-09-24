"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Menu, MessageSquare, Phone, X } from "lucide-react"
import { site, phoneHref, smsHref, navItems, QUOTE_PATH } from "@/config/site"
import { Wordmark } from "@/components/wordmark"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { phoneDisplay, textEnabled, name } = site.business

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      data-section="header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.07),0_4px_20px_rgba(15,23,42,0.08)]" : "bg-background/95 backdrop-blur-sm border-b border-border/40"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <Link href="/" aria-label={`${name} home`} className="shrink-0">
            <Wordmark />
          </Link>

          <nav className="hidden xl:flex items-center gap-7" aria-label="Main">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="relative text-[11px] font-black text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground transition-colors tracking-[0.16em] uppercase nav-link-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={phoneHref} data-cta="header" className="flex items-center gap-2 text-foreground hover:text-accent transition-colors group">
              <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Phone className="h-3.5 w-3.5 text-accent" aria-hidden />
              </span>
              <span className="font-black text-[14px] tracking-tight">{phoneDisplay}</span>
            </a>
            {textEnabled && (
              <a
                href={smsHref}
                data-cta="header"
                aria-label={`Text ${phoneDisplay}`}
                className="h-9 w-9 flex items-center justify-center rounded-xl border border-border hover:border-accent/40 hover:text-accent transition-colors"
              >
                <MessageSquare className="h-4 w-4" aria-hidden />
              </a>
            )}
            <Link
              href={QUOTE_PATH}
              data-cta="header"
              className="flex items-center gap-1.5 bg-primary text-primary-foreground font-black text-[12px] px-4 h-9 rounded-xl hover:bg-primary/90 active:scale-[0.97] transition-all shadow-sm btn-lift tracking-[0.04em] uppercase"
            >
              Free Quote
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <a
              href={phoneHref}
              data-cta="header-mobile"
              className="flex items-center gap-1.5 text-accent-foreground px-4 h-10 rounded-xl font-black text-[13px] bg-accent active:scale-[0.97] transition-all shadow-sm"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              Call
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center text-foreground rounded-xl hover:bg-secondary border border-border/60 transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden fixed inset-x-0 top-16 md:top-[72px] bottom-0 bg-background z-[60] overflow-y-auto border-t border-border">
          <nav className="container mx-auto px-4 pt-2 pb-6" aria-label="Mobile">
            {[{ href: "/", label: "Home" }, ...navItems].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between py-4 text-base font-black border-b border-border/60 text-foreground hover:text-accent transition-colors"
              >
                {item.label}
                <ChevronRight className="h-4 w-4 text-muted-foreground/50" aria-hidden />
              </Link>
            ))}
          </nav>
          <div className="container mx-auto px-4 pb-8 flex flex-col gap-3" data-section="mobile-menu">
            <Link href={QUOTE_PATH} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-black h-14 rounded-2xl text-base">
              Get a Free Quote
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={phoneHref} className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-black h-14 rounded-2xl">
                <Phone className="h-4 w-4" aria-hidden /> Call
              </a>
              {textEnabled && (
                <a href={smsHref} className="flex items-center justify-center gap-2 border border-border bg-card text-foreground font-black h-14 rounded-2xl">
                  <MessageSquare className="h-4 w-4" aria-hidden /> Text
                </a>
              )}
            </div>
            <p className="text-center text-sm text-muted-foreground font-medium">{phoneDisplay} · {site.business.hours.label}</p>
          </div>
        </div>
      )}
    </header>
  )
}
