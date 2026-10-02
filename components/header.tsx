"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, ArrowUpRight, MessageSquare, Phone } from "lucide-react"
import { site, phoneHref, smsHref, navItems, QUOTE_PATH } from "@/config/site"
import { Wordmark } from "@/components/wordmark"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { phoneDisplay, textEnabled, name, hours } = site.business

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    document.body.dataset.menu = open ? "open" : ""
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      document.body.dataset.menu = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
    <header
      data-section="header"
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
        scrolled || open ? "bg-ink/85 backdrop-blur-xl border-line-dark" : "bg-ink border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10 h-[68px] lg:h-[76px] flex items-center justify-between gap-6">
        <Link href="/" aria-label={`${name} home`} className="shrink-0">
          <Wordmark tone="dark" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="link-draw text-[14px] text-bone/65 hover:text-bone aria-[current=page]:text-bone transition-colors py-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a href={phoneHref} data-cta="header" className="font-mono text-[13px] tracking-tight text-bone/80 hover:text-bone transition-colors whitespace-nowrap">
            {phoneDisplay}
          </a>
          <Link href={QUOTE_PATH} data-cta="header" className="btn btn-accent !h-10 !px-5 !text-[14px]">
            Get a quote
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <a href={phoneHref} data-cta="header-mobile" aria-label={`Call ${phoneDisplay}`} className="h-11 w-11 rounded-full bg-accent text-white flex items-center justify-center transition-transform duration-150 active:scale-90">
            <Phone className="h-4 w-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`h-11 w-11 rounded-full border text-bone flex items-center justify-center transition-[transform,background-color,border-color] duration-200 active:scale-90 ${open ? "bg-bone/10 border-bone/25" : "border-line-dark"}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ease-[var(--ease-out)] ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ease-[var(--ease-out)] ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>
    </header>

      <div
        id="mobile-menu"
        data-open={open}
        inert={!open}
        className={`lg:hidden fixed inset-0 z-[45] surface-dark grain overflow-y-auto overscroll-contain pt-[104px] transition-[opacity,visibility] duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="relative z-10 px-5 pt-4" aria-label="Mobile">
          {[{ href: "/", label: "Home" }, ...navItems].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`group flex items-center justify-between py-3.5 border-b border-line-dark text-bone aria-[current=page]:text-accent-soft active:text-accent-soft transition-[opacity,transform,color] duration-500 ease-[var(--ease-out)] ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
            >
              <span className="headline text-[clamp(1.875rem,9vw,2.25rem)]">{item.label}</span>
              <span className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-mist">0{i + 1}</span>
                <ArrowRight className="h-4 w-4 text-mist transition-transform duration-300 group-active:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </nav>
        <div
          className={`relative z-10 px-5 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] flex flex-col gap-3 transition-[opacity,transform] duration-500 ${open ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-3"}`}
          data-section="mobile-menu"
        >
          <Link href={QUOTE_PATH} onClick={() => setOpen(false)} className="btn btn-accent w-full !h-14 !text-[16px]">
            Get a free quote <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          <div className={`grid ${textEnabled ? "grid-cols-2" : "grid-cols-1"} gap-3`}>
            <a href={phoneHref} className="btn btn-ghost-dark">
              <Phone className="h-4 w-4" aria-hidden /> Call
            </a>
            {textEnabled && (
              <a href={smsHref} className="btn btn-ghost-dark">
                <MessageSquare className="h-4 w-4" aria-hidden /> Text
              </a>
            )}
          </div>
          <p className="eyebrow text-mist text-center mt-3">
            <span className="whitespace-nowrap">{phoneDisplay}</span> · <span className="whitespace-nowrap">{hours.label}</span>
          </p>
        </div>
      </div>
    </>
  )
}
