import Link from "next/link"
import { MessageSquare, Phone } from "lucide-react"
import { site, phoneHref, smsHref, QUOTE_PATH } from "@/config/site"

export function MobileActionBar() {
  return (
    <div data-section="mobile-bar" className="fixed inset-x-0 bottom-0 z-50 lg:hidden px-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
      <div className="glass rounded-[22px] p-1.5 grid grid-cols-[1.35fr_1fr_1fr] gap-1.5 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.5)]">
        <a href={phoneHref} className="btn btn-accent !h-12 !px-3 !rounded-[16px]">
          <Phone className="h-4 w-4" aria-hidden /> Call now
        </a>
        {site.business.textEnabled ? (
          <a href={smsHref} className="btn btn-ghost-dark !h-12 !px-3 !rounded-[16px]">
            <MessageSquare className="h-4 w-4" aria-hidden /> Text
          </a>
        ) : (
          <span aria-hidden />
        )}
        <Link href={QUOTE_PATH} className="btn btn-bone !h-12 !px-3 !rounded-[16px]">
          Quote
        </Link>
      </div>
    </div>
  )
}
