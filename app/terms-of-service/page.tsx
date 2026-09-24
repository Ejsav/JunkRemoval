import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | Orlando Junk Removal",
  description:
    "Terms and conditions for using our junk removal services.",
}

export default function TermsOfServicePage() {
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
            Terms of Service
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
                By using this website or requesting a quote, you agree that all pricing is subject to confirmation based on the scope of work.
              </p>
            </div>

            <div>
              <p className="leading-relaxed">
                Final pricing is agreed upon before work begins.
              </p>
            </div>

            <div>
              <p className="leading-relaxed">
                We are not responsible for delays caused by weather, access issues, or unforeseen circumstances.
              </p>
            </div>

            <div>
              <p className="leading-relaxed">
                All services are provided as described at the time of booking.
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <p className="leading-relaxed">
                If you have questions, contact us directly at <a href="tel:4078017886" className="font-black text-primary hover:underline">(407) 801-7886</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/privacy-policy"
              className="text-center text-sm text-primary hover:underline font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-foreground/30 hidden sm:block">•</span>
            <Link
              href="/disclaimer"
              className="text-center text-sm text-primary hover:underline font-medium"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
