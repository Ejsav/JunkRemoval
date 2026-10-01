import Link from "next/link"
import { MessageSquare, Phone } from "lucide-react"
import { site, QUOTE_PATH } from "@/config/site"
import { CallLink, TextLink } from "@/components/biz"

export function MobileActionBar() {
  const text = site.business.textEnabled
  return (
    <div data-section="mobile-bar" className="fixed inset-x-0 bottom-0 z-50 lg:hidden px-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
      <div className={`glass rounded-[20px] p-1.5 grid gap-1.5 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.5)] ${text ? "grid-cols-[1fr_1fr_1.3fr]" : "grid-cols-2"}`}>
        <CallLink className="btn btn-ghost-dark !h-12 !px-2 !rounded-[14px] !text-[14px] !gap-2">
          <Phone className="h-4 w-4" aria-hidden /> Call
        </CallLink>
        {text && (
          <TextLink className="btn btn-ghost-dark !h-12 !px-2 !rounded-[14px] !text-[14px] !gap-2">
            <MessageSquare className="h-4 w-4" aria-hidden /> Text
          </TextLink>
        )}
        <Link href={QUOTE_PATH} className="btn btn-accent !h-12 !px-3 !rounded-[14px] !text-[14px]">
          Get my price
        </Link>
      </div>
    </div>
  )
}
