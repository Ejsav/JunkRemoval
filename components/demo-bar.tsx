"use client"

import Link from "next/link"
import { site } from "@/config/site"
import { usePreview } from "@/lib/preview"

/** Transparent but quiet: the disclosure sits above the header, one line, low contrast. Gone in live mode. */
export function DemoBar() {
  const preview = usePreview()
  if (site.mode === "live") return null
  const isPreview = site.mode === "preview"
  const label = preview?.name ? "Your preview" : isPreview ? "Preview" : "Demo"

  return (
    <div className="bg-[#070807] text-mist/90 border-b border-line-dark" role="note" aria-label="Demo disclosure" data-section="demo-bar">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10 h-8 flex items-center justify-between gap-4 text-[11.5px]">
        <p className="truncate">
          <span className="eyebrow !text-[9.5px] text-accent-soft mr-2">{label}</span>
          {preview?.name ? (
            <>
              {preview.name} on a finished website system<span className="hidden sm:inline">. Photos and reviews are samples until yours go in.</span>
            </>
          ) : isPreview ? (
            <>Concept for {site.business.name} by {site.builder.name}. Not live yet.</>
          ) : (
            <>
              <span className="hidden sm:inline">Fictional company. Reviews, photos and prices are samples.</span>
              <span className="sm:hidden">Fictional company · sample content</span>
            </>
          )}
        </p>
        <Link href="/demo" className="shrink-0 text-bone/80 hover:text-bone link-draw">
          <span className="hidden sm:inline">Get this site for your business</span>
          <span className="sm:hidden">For owners</span>
        </Link>
      </div>
    </div>
  )
}
