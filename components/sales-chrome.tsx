import type React from "react"
import Link from "next/link"
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react"
import { site } from "@/config/site"
import { offer } from "@/config/offer"
import { Container } from "@/components/section-heading"

/**
 * The /demo sales layer. Its own header, footer and mobile actions, all pointing at the
 * builder. The fictional company's phone number never appears here.
 */
const { builder } = site
export const builderTel = `tel:${builder.phoneE164}`
export const builderSms = `sms:${builder.phoneE164}?&body=${encodeURIComponent("Hi Eric, I'd like a preview of the junk removal website for my business.")}`
export const builderMail = `mailto:${builder.email}?subject=${encodeURIComponent("Website preview for my junk removal company")}`

const nav = [
  { href: "#studio", label: "Preview" },
  { href: "#leads", label: "How leads arrive" },
  { href: "#included", label: "What's included" },
  { href: "#price", label: "Price" },
  { href: "#faq", label: "FAQ" },
]

function Mark() {
  return (
    <span className="flex flex-col leading-none">
      <span className="text-[16px] font-semibold tracking-[-0.03em] text-bone">{builder.name}</span>
      <span className="eyebrow !text-[9.5px] text-mist mt-1.5">Junk removal websites</span>
    </span>
  )
}

export function SalesHeader() {
  return (
    <header data-section="sales-header" className="sticky top-0 z-50 bg-ink/90 backdrop-blur-xl border-b border-line-dark">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10 h-[64px] lg:h-[72px] flex items-center justify-between gap-6">
        <Link href="/demo" aria-label={`${builder.name}, junk removal websites`}>
          <Mark />
        </Link>
        <nav className="hidden lg:flex items-center gap-7" aria-label="Sales page">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="link-draw text-[14px] text-bone/65 hover:text-bone transition-colors py-1">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden sm:inline text-[14px] text-bone/70 hover:text-bone link-draw">
            Open the demo site
          </Link>
          <a href="#preview-request" data-cta="sales-header" className="btn btn-accent !h-10 !px-5 !text-[14px]">
            Free preview
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </header>
  )
}

export function SalesFooter() {
  return (
    <footer data-section="sales-footer" className="surface-dark grain relative overflow-hidden">
      <Container className="relative z-10 py-16 sm:py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Mark />
          <p className="text-[14.5px] text-mist mt-6 max-w-sm leading-relaxed">
            Finished, tested websites for junk removal companies. ${offer.price} flat, launched in {offer.turnaround}.
          </p>
        </div>
        <dl className="lg:col-span-4 grid gap-4 text-[14px]">
          <div>
            <dt className="eyebrow !text-[10px] text-mist">Call or text</dt>
            <dd><a href={builderTel} className="text-bone font-mono text-[15px] hover:text-accent-soft transition-colors">{builder.phoneDisplay}</a></dd>
          </div>
          <div>
            <dt className="eyebrow !text-[10px] text-mist">Email</dt>
            <dd><a href={builderMail} className="text-bone/85 hover:text-bone">{builder.email}</a></dd>
          </div>
        </dl>
        <div className="lg:col-span-3 flex flex-col gap-3 text-[14px]">
          <Link href="/" className="text-bone/70 hover:text-bone">Open the demo site</Link>
          <a href="#faq" className="text-bone/70 hover:text-bone">Questions</a>
        </div>
      </Container>
      <div className="relative z-10 border-t border-line-dark">
        <Container className="py-6 text-[12.5px] text-mist flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} {builder.name}</p>
          <p>{site.business.name} is a fictional company used to demonstrate the system.</p>
        </Container>
      </div>
    </footer>
  )
}

export function SalesMobileBar() {
  const btn = "btn !h-12 !px-2 !rounded-[14px] !text-[14px] !gap-2"
  return (
    <div data-section="sales-mobile-bar" className="fixed inset-x-0 bottom-0 z-50 lg:hidden px-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
      <div className="glass rounded-[20px] p-1.5 grid grid-cols-[1fr_1fr_1.4fr] gap-1.5 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.5)]">
        <a href={builderTel} className={`${btn} btn-ghost-dark`}><Phone className="h-4 w-4" aria-hidden /> Call</a>
        <a href={builderSms} className={`${btn} btn-ghost-dark`}><MessageSquare className="h-4 w-4" aria-hidden /> Text</a>
        <a href="#preview-request" className={`${btn} btn-accent`}>Free preview</a>
      </div>
    </div>
  )
}

export function ContactRow() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 text-[14.5px]">
      <a href={builderTel} className="inline-flex items-center gap-2 font-medium link-draw"><Phone className="h-4 w-4" aria-hidden /> {builder.phoneDisplay}</a>
      <a href={builderSms} className="inline-flex items-center gap-2 font-medium link-draw"><MessageSquare className="h-4 w-4" aria-hidden /> Text</a>
      <a href={builderMail} className="inline-flex items-center gap-2 font-medium link-draw"><Mail className="h-4 w-4" aria-hidden /> {builder.email}</a>
    </div>
  )
}
