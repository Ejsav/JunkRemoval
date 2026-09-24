import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function MonetizationSection() {
  return (
    <section className="py-16 px-4 lg:px-8 bg-accent/10 border-t border-b border-accent/20">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-xs font-black text-accent uppercase tracking-widest">For Business Owners</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-foreground mb-3 leading-[1.1]">
                This Website Generates Calls.
              </h3>
              <p className="text-lg text-muted-foreground mb-2">
                You can get this exact system for your junk removal business. Customized. Live in days.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Limited availability. One business per market.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="uppercase tracking-widest font-black px-8 h-14" asChild>
                <Link href="/get-more-jobs">
                  Learn How It Works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="uppercase tracking-widest font-black px-8 h-14" asChild>
                <a href="tel:(407) 555-0193">
                  Call: (407) 555-0193
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
