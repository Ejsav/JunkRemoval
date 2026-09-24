import Link from "next/link"
import { site } from "@/config/site"

export function DemoBar() {
  if (site.mode === "live") return null
  const isPreview = site.mode === "preview"

  return (
    <div className="bg-[#070807] text-mist border-b border-line-dark" role="note" aria-label="Demo disclosure" data-section="demo-bar">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10 h-9 flex items-center justify-between gap-4 text-[12px]">
        <p className="truncate">
          <span className="eyebrow !text-[10px] text-accent-soft mr-2.5">{isPreview ? "Preview" : "Demo"}</span>
          {isPreview ? (
            <>Concept for {site.business.name} by {site.builder.name}. Not live yet.</>
          ) : (
            <>
              <span className="hidden sm:inline">{site.business.name} is a fictional company. Reviews, photos and figures are samples.</span>
              <span className="sm:hidden">Fictional business · sample content</span>
            </>
          )}
        </p>
        <Link href="/demo" className="shrink-0 text-bone/90 hover:text-bone link-draw">
          <span className="hidden sm:inline">Get this for your business</span>
          <span className="sm:hidden">About this demo</span>
        </Link>
      </div>
    </div>
  )
}
