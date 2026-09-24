"use client"

import { Phone, FileText } from "lucide-react"

const PHONE_HREF = "tel:4078017886"

export function StickyCallButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.18)]">
      <div className="flex items-stretch">
        <a
          href={PHONE_HREF}
          className="flex-[2] inline-flex items-center justify-center gap-2.5 bg-accent text-accent-foreground font-black text-sm h-14 uppercase tracking-[0.12em]"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <div className="w-px bg-accent-foreground/15" />
        <a
          href="#quote"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-foreground text-background font-black text-sm h-14 uppercase tracking-[0.12em]"
        >
          <FileText className="h-4 w-4" />
          Quote
        </a>
      </div>
    </div>
  )
}
