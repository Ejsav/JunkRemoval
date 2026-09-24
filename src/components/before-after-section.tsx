import Image from "next/image"
import { ArrowRight } from "lucide-react"

const jobs = [
  {
    label: "Garage Cleanout",
    location: "Winter Park, FL",
    description: "8 years of accumulated clutter cleared in 90 minutes.",
    beforeImage: "/garage-before.jpg",
    afterImage: "/garage-after.jpg",
  },
  {
    label: "Estate Cleanout",
    location: "Lake Nona, FL",
    description: "Complete 4-bedroom home emptied in a single day.",
    beforeImage: "/estate-before.jpg",
    afterImage: "/estate-after.jpg",
  },
  {
    label: "Office Cleanout",
    location: "Downtown Orlando, FL",
    description: "3,000 sq ft commercial space cleared before new tenant.",
    beforeImage: "/office-before.jpg",
    afterImage: "/office-after.jpg",
  },
]

export function BeforeAfterSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-12 border-b border-border">
          <div>
            <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Real Results</p>
            <h2 className="text-5xl md:text-[3.5rem] font-black tracking-tight text-foreground leading-[1.0] text-balance">
              Before & After.<br />The Proof Is Clear.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs leading-relaxed">
            {/*
              RECONSTRUCTION NOTE: the Vercel deployment-file-contents API
              truncated this file's source at ~4,100 base64 characters
              (~3KB) short, mid-sentence right here ("Recent cleanouts
              from ..."). The rest of this header paragraph and the entire
              before/after job grid (which would use the `jobs` array
              above) were cut off and could not be retrieved.
            */}
          </p>
        </div>
      </div>
    </section>
  )
}
