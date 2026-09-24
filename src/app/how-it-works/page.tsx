import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "How It Works | Custom Service Business Websites",
  description:
    "Learn about the custom website build process for local service businesses. Timeline, customization, ownership transfer, and what you receive.",
}

export default function HowItWorksPage() {
  const included = [
    "Mobile-optimized responsive design",
    "Conversion-focused layout structure",
    "Service pages customized to your business",
    "Contact forms with email notification",
    "Local SEO-ready page structure",
    "Fast-loading optimized performance",
    "Full ownership after launch",
  ]

  const timeline = [
    { phase: "Discovery Call", duration: "30 minutes", description: "Discuss your business, services, and goals" },
    { phase: "Custom Build", duration: "7-10 days", description: "Your website is built using the proven framework" },
    { phase: "Review & Revisions", duration: "2-3 days", description: "Make adjustments and approve final version" },
    { phase: "Launch", duration: "1 day", description: "Site goes live and ownership transfers to you" },
  ]

  return (
    <main className="min-h-screen">
      {/*
        RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated
        this file's source at ~8,008 base64 characters (~6KB) short of the full
        file, right after the hero heading began. The `included` and `timeline`
        data arrays above are verbatim from the source, but the JSX that renders
        them (hero copy, timeline, included-features list, and any CTA) could
        not be retrieved and is not reproduced here to avoid fabricating content.
      */}
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6">The Process</p>
        </div>
      </section>
    </main>
  )
}
