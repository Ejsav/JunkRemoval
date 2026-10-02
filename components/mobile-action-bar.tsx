"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, MessageSquare, Phone } from "lucide-react"
import { site, phoneHref, smsHref, QUOTE_PATH } from "@/config/site"

/**
 * Sticky call / text / quote bar for phones.
 * It steps aside whenever it would duplicate or cover something:
 * any element marked [data-bar-hide] in view (hero CTAs, the quote form, footer CTAs),
 * or a focused form field (the on-screen keyboard is up).
 */
export function MobileActionBar() {
  const pathname = usePathname()
  // Start hidden so the bar never flashes over the hero before the observer reports.
  const [covered, setCovered] = useState(true)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-bar-hide]")
    if (!targets.length || !("IntersectionObserver" in window)) {
      setCovered(false)
      return
    }
    const visible = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)
        setCovered(visible.size > 0)
      },
      { rootMargin: "0px 0px -72px 0px" },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [pathname])

  useEffect(() => {
    const isField = (el: EventTarget | null) => el instanceof HTMLElement && el.matches("input:not([type=radio]):not([type=checkbox]):not([type=file]), textarea, select")
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true)
    const onOut = (e: FocusEvent) => isField(e.target) && !isField(e.relatedTarget) && setTyping(false)
    document.addEventListener("focusin", onIn)
    document.addEventListener("focusout", onOut)
    return () => {
      document.removeEventListener("focusin", onIn)
      document.removeEventListener("focusout", onOut)
    }
  }, [])

  // The sales page is for business owners; the demo company's buttons don't belong there.
  if (pathname === "/demo") return null

  const onQuotePage = pathname === QUOTE_PATH

  return (
    <div
      data-section="mobile-bar"
      data-hidden={covered || typing}
      aria-hidden={covered || typing || undefined}
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden px-3 pb-[max(10px,env(safe-area-inset-bottom))]"
    >
      <nav aria-label="Quick contact" className={`glass rounded-[22px] p-1.5 grid ${site.business.textEnabled ? "grid-cols-[1.3fr_1fr_1fr]" : "grid-cols-2"} gap-1.5 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.55)]`}>
        <a href={phoneHref} data-cta="mobile-bar" tabIndex={covered || typing ? -1 : undefined} className="btn btn-accent !h-12 !px-3 !rounded-[16px] !text-[15px]">
          <Phone className="h-4 w-4" aria-hidden /> Call now
        </a>
        {site.business.textEnabled && (
          <a href={smsHref} data-cta="mobile-bar" tabIndex={covered || typing ? -1 : undefined} className="btn btn-ghost-dark !h-12 !px-3 !rounded-[16px] !text-[15px]">
            <MessageSquare className="h-4 w-4" aria-hidden /> Text
          </a>
        )}
        <Link
          href={onQuotePage ? "#quote" : QUOTE_PATH}
          data-cta="mobile-bar"
          tabIndex={covered || typing ? -1 : undefined}
          className="btn btn-bone !h-12 !px-3 !rounded-[16px] !text-[15px] !gap-1.5"
        >
          Quote <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
        </Link>
      </nav>
    </div>
  )
}
