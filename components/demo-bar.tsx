import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { site } from "@/config/site"

export function DemoBar() {
  if (site.mode === "live") return null
  const isPreview = site.mode === "preview"

  return (
    <div className="bg-foreground text-background/80 text-[12px] sm:text-[13px]" role="note" aria-label="Demo disclosure" data-section="demo-bar">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8 py-2 flex items-center justify-between gap-3">
        <p className="leading-snug">
          <span className="font-black text-background uppercase tracking-[0.14em] text-[10px] sm:text-[11px] mr-2 bg-background/12 px-1.5 py-0.5 rounded">
            {isPreview ? "Preview" : "Demo"}
          </span>
          {isPreview ? (
            <>Concept site for {site.business.name}, prepared by {site.builder.name}. Not live yet.</>
          ) : (
            <>
              <span className="hidden sm:inline">{site.business.name} is a fictional company. Reviews, photos and figures are samples.</span>
              <span className="sm:hidden">Fictional business · sample content</span>
            </>
          )}
        </p>
        <Link
          href="/demo"
          className="shrink-0 inline-flex items-center gap-1 font-bold text-background hover:text-accent transition-colors"
        >
          <span className="hidden sm:inline">Get this for your business</span>
          <span className="sm:hidden">About</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
