"use client"

import { useState } from "react"
import { Plus, Minus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const businessOwnerFaqs = [
  {
    question: "Why does this website feel better than most local competitors?",
    answer:
      "Because it's built to convert, not just exist. Clear messaging, strong layout, and a structure designed to turn visitors into calls and booked jobs — not just look nice.",
  },
  {
    question: "Is this website already working for someone else?",
    answer:
      "Most junk removal businesses don't have a site like this yet. That's exactly why it stands out — and why the first ones to use it own the advantage in their market.",
  },
  {
    question: "What would this look like for my business?",
    answer:
      "The same structure, customized with your branding, services, service area, and contact info — so it feels like your company, not a template.",
  },
  {
    question: "How fast could I have this live?",
    answer:
      "Most sites go live in 3–5 business days. The sooner you're live, the sooner your phone starts ringing.",
  },
  {
    question: "What's stopping my competitors from getting this first?",
    answer:
      "Nothing — and most business owners act fast for exactly that reason. Only one junk removal company per area gets this structure. First mover wins.",
  },
  {
    question: "Do I need to figure anything out myself?",
    answer:
      "No. You provide the basics — business name, services, service area, contact info. Everything else is handled: design, structure, and setup.",
  },
  {
    question: "What happens after it's live?",
    answer:
      "You have a clean, professional website built to attract local customers and convert them into real booked jobs. This is how serious junk removal businesses get found, get called, and get booked.",
  },
]

export function BusinessOwnerFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">For Business Owners</p>
            <h2 className="text-5xl md:text-[3.25rem] font-black tracking-tight text-foreground leading-[1.0] mb-5 text-balance">
              Ready to Scale Your Junk Removal Business?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              This website structure is available for your business. The questions below are what owners ask before they get started.
            </p>
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href="#contact" className="inline-flex items-center gap-2">
                Get This Website
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Right accordion */}
          <div className="flex flex-col gap-0 divide-y divide-border border-t border-b border-border">
            {businessOwnerFaqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-6 flex items-start justify-between text-left gap-4 hover:text-primary transition-colors group"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-black text-foreground group-hover:text-primary text-[16px] leading-snug transition-colors pr-2">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-full border-2 border-foreground/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                    {openIndex === index
                      ? <Minus className="h-3 w-3 text-primary" />
                      : <Plus className="h-3 w-3 text-foreground/60 group-hover:text-primary transition-colors" />
                    }
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-muted-foreground leading-relaxed pr-10">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
