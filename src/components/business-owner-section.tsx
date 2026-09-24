import { Button } from "@/components/ui/button"
import { ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"

export function BusinessOwnerSection() {
  return (
    <section className="py-24 px-4 lg:px-8 bg-foreground">
      <div className="container mx-auto max-w-5xl">

        {/* Label */}
        <p className="text-xs font-black text-accent uppercase tracking-[0.25em] mb-5 text-center">For Business Owners Seeing This</p>

        {/* Headline */}
        <h2 className="text-4xl md:text-[3.25rem] font-black text-background leading-[1.05] tracking-tight text-balance text-center max-w-3xl mx-auto mb-6">
          This Is the Level of Website That Modern Top-Performing Service Businesses Use.
        </h2>
        <p className="text-background/55 text-lg leading-relaxed text-center max-w-2xl mx-auto mb-12">
          Most competitors in your market don't have this. That gap is a direct advantage for the business that moves first.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Left — pitch */}
          <div className="bg-background/5 border border-background/10 rounded-2xl p-8">
            <h3 className="font-black text-background text-xl mb-4">What this site generates:</h3>
            <ul className="space-y-3 mb-8">
              {[
                "Consistent inbound calls from local search",
                "Immediate trust from first-time visitors",
                "Higher close rates from clear pricing",
                // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API
                // truncated this file's source at ~4,184 base64 characters
                // (~3.1KB) short of the full file, right after this third
                // bullet point. Any further bullet points, the right-hand
                // column of this two-column grid, and the section's closing
                // CTA were cut off and could not be retrieved.
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-background/80">
                  <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
