import Link from "next/link"
import { FileText, MessageSquare, Phone } from "lucide-react"
import { site, phoneHref, smsHref, QUOTE_PATH } from "@/config/site"

export function MobileActionBar() {
  return (
    <div
      data-section="mobile-bar"
      className="fixed bottom-0 inset-x-0 lg:hidden z-50 bg-card border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.12)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 p-2">
        <a href={phoneHref} className="h-14 rounded-xl bg-accent text-accent-foreground font-black text-[15px] inline-flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
          <Phone className="h-4 w-4" aria-hidden />
          Call Now
        </a>
        {site.business.textEnabled ? (
          <a href={smsHref} className="h-14 rounded-xl border border-border bg-background text-foreground font-black text-[15px] inline-flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
            <MessageSquare className="h-4 w-4" aria-hidden />
            Text
          </a>
        ) : (
          <span aria-hidden />
        )}
        <Link href={QUOTE_PATH} className="h-14 rounded-xl bg-primary text-primary-foreground font-black text-[15px] inline-flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
          <FileText className="h-4 w-4" aria-hidden />
          Quote
        </Link>
      </div>
    </div>
  )
}
