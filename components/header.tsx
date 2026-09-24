"use client"

import { Menu, X, Phone, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

const PHONE = "(407) 801-7886"
const PHONE_HREF = "tel:4078017886"

const navItems = [
  { href: "/services",      label: "Services" },
  { href: "/pricing",       label: "Pricing" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/reviews",       label: "Reviews" },
  { href: "/about",         label: "About" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/97 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.07),0_4px_20px_rgba(15,23,42,0.08)]"
          : "bg-background/95 backdrop-blur-sm border-b border-border/40"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-[64px] md:h-[72px]">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group"
            aria-label="Orlando Junk Removal — Home"
          >
            <div className="relative bg-card rounded-xl p-1.5 border border-border/60 shadow-xs
                            group-hover:border-primary/30 group-hover:shadow-md transition-all duration-250">
              <Image
                src="/icon.png"
                alt="Orlando Junk Removal Logo"
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none gap-0.5">
              <span className="text-[15px] font-black tracking-tight text-foreground">Orlando Junk</span>
              <span className="text-[10px] font-bold tracking-[0.10em] uppercase text-accent">Removal Service</span>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────── */}
          <nav className="hidden xl:flex items-center gap-7" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[11px] font-black text-muted-foreground hover:text-foreground
                           transition-colors duration-200 tracking-[0.16em] uppercase nav-link-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Right ─────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-200 group"
              aria-label={`Call us at ${PHONE}`}
            >
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center
                              group-hover:bg-accent/18 transition-colors duration-200">
                <Phone className="h-3.5 w-3.5 text-accent" />
              </div>
              <span className="font-black text-[14px] tracking-tight">{PHONE}</span>
            </a>
            <div className="w-px h-5 bg-border" />
            <a
              href="#quote"
              className="flex items-center gap-1.5 bg-primary text-primary-foreground font-black text-[12px]
                         px-4 h-9 rounded-xl hover:bg-primary/90 active:scale-[0.97] transition-all
                         shadow-sm shadow-primary/20 btn-lift tracking-[0.04em] uppercase"
            >
              Free Quote
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* ── Mobile ───────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-1.5 text-accent-foreground px-4 h-9 rounded-xl
                         font-black text-[13px] bg-accent hover:bg-accent/90 active:scale-[0.97]
                         transition-all shadow-sm shadow-accent/20 btn-lift"
              aria-label={`Call ${PHONE}`}
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Call Now</span>
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-9 h-9 flex items-center justify-center text-foreground rounded-xl
                         hover:bg-secondary border border-border/50 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────── */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-[64px] md:top-[72px] bottom-0 bg-background z-[60] overflow-y-auto"
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="border-t border-border">
            <nav className="container mx-auto px-4 pt-2 pb-6" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-4 text-[15px] font-black
                             border-b border-border/60 text-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                </Link>
              ))}
            </nav>
            <div className="container mx-auto px-4 pb-8 flex flex-col gap-3">
              <a
                href="#quote"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground
                           font-black h-14 rounded-2xl text-base shadow-lg shadow-primary/20
                           active:scale-[0.97] transition-all btn-lift hover:bg-primary/90"
              >
                Get Free Quote
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 bg-accent text-accent-foreground
                           font-black h-14 rounded-2xl text-base active:scale-[0.97] transition-all
                           btn-lift hover:bg-accent/90 shadow-md shadow-accent/20"
              >
                <Phone className="h-4 w-4" />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
