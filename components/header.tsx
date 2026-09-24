"use client"

import type React from "react"
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
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
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
          <a href={phoneHref} data-cta="header" className="font-mono text-[13px] tracking-tight text-bone/80 hover:text-bone transition-colors">
            {phoneDisplay}
          </a>
          <Link href={QUOTE_PATH} data-cta="header" className="btn btn-accent !h-10 !px-5 !text-[14px]">
            Get a quote
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <a href={phoneHref} data-cta="header-mobile" aria-label={`Call ${phoneDisplay}`} className="h-10 w-10 rounded-full bg-accent text-white flex items-center justify-center">
            <Phone className="h-4 w-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="h-10 w-10 rounded-full border border-line-dark text-bone flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>
    </header>

      {open && (
        <div id="mobile-menu" className="lg:hidden fixed inset-0 z-[45] surface-dark grain overflow-y-auto pt-[104px]">
          <nav className="relative z-10 px-5 pt-6" aria-label="Mobile">
            {[{ href: "/", label: "Home" }, ...navItems].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="rise flex items-baseline justify-between py-3.5 border-b border-line-dark text-bone aria-[current=page]:text-accent-soft"
                style={{ "--d": `${i * 45}ms` } as React.CSSProperties}
              >
                <span className="headline text-[34px]">{item.label}</span>
                <span className="font-mono text-[11px] text-mist">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="relative z-10 px-5 py-8 flex flex-col gap-3" data-section="mobile-menu">
            <Link href={QUOTE_PATH} className="btn btn-accent w-full">
              Get a free quote <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="grid grid-cols-2 gap-3">
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
              {phoneDisplay} · {hours.label}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
