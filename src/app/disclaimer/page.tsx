import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Disclaimer | Orlando Junk Removal",
  description:
    "Important disclaimer regarding our junk removal services and website information.",
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-card py-16 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-4">
            Disclaimer
          </h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8 text-muted-foreground">
            <div>
              <p className="leading-relaxed">
                This website is a demonstration of a high-converting local service website structure.
              </p>
            </div>

            {/*
              RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated
              this file's source here (~1,772 base64 characters / ~1.3KB not returned).
              Additional disclaimer paragraphs that followed could not be retrieved and
              are not reproduced here to avoid fabricating content.
            */}
          </div>
        </div>
      </section>
    </main>
  )
}
