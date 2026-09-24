import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Heart, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Orlando Junk Removal Service",
  description:
    "Learn about Orlando Junk Removal. Family-owned since 2020, serving Orlando and Central Florida. Licensed, insured, and committed to responsible junk removal.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6">
            About Orlando Junk Removal
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Family-owned and operated since 2020. We started right here in Orlando and we've grown by doing one thing well — showing up, doing the work, and treating every customer fairly.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 px-4 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          {/*
            RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated
            this file's source at this point (~6,968 base64 characters / ~5.2KB of
            source were not returned). The remainder of this page (Origin Story
            body copy, and any sections below it such as values/mission/CTA) could
            not be retrieved and is NOT reproduced here to avoid fabricating content.
          */}
        </div>
      </section>
    </main>
  )
}
