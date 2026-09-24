import Link from "next/link"
import { site, phoneHref, QUOTE_PATH } from "@/config/site"

export default function NotFound() {
  return (
    <section className="container mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-[11px] font-black text-accent uppercase tracking-[0.24em] mb-4">Page not found</p>
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">That page got hauled away.</h1>
      <p className="text-muted-foreground mb-8">The page you&apos;re looking for doesn&apos;t exist. Here&apos;s where you probably wanted to go:</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link href={QUOTE_PATH} className="inline-flex items-center justify-center bg-primary text-primary-foreground font-black h-12 px-6 rounded-xl">Get a Free Quote</Link>
        <a href={phoneHref} className="inline-flex items-center justify-center bg-accent text-accent-foreground font-black h-12 px-6 rounded-xl">Call {site.business.phoneDisplay}</a>
        <Link href="/" className="inline-flex items-center justify-center border border-border font-black h-12 px-6 rounded-xl">Home</Link>
      </div>
    </section>
  )
}
