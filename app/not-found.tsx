import Link from "next/link"
import { site, phoneHref, QUOTE_PATH } from "@/config/site"
import { Em } from "@/components/section-heading"

export default function NotFound() {
  return (
    <section className="surface-dark grain relative overflow-hidden">
      <div className="absolute inset-0 hairline-grid pointer-events-none" aria-hidden />
      <div className="relative z-10 mx-auto max-w-3xl px-5 py-28 sm:py-36 text-center">
        <p className="eyebrow text-accent-soft">404</p>
        <h1 className="display text-[clamp(2.75rem,7vw,5.5rem)] text-bone mt-6">
          This page got <Em className="text-accent-soft">hauled away.</Em>
        </h1>
        <p className="lede text-mist mt-6">It doesn&apos;t exist anymore. Here&apos;s where you probably wanted to go.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10">
          <Link href={QUOTE_PATH} className="btn btn-accent">Get a free quote</Link>
          <a href={phoneHref} className="btn btn-ghost-dark">Call {site.business.phoneDisplay}</a>
          <Link href="/" className="btn btn-ghost-dark">Home</Link>
        </div>
      </div>
    </section>
  )
}
