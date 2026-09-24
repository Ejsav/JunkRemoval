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
  // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated this
  // file's source at ~4,376 base64 characters (~3.3KB) short of the full file,
  // mid-sentence in the answer to "Do I need to figure anything out myself?".
  // That final FAQ entry and the entire accordion-rendering JSX body were cut
  // off and could not be retrieved.
]

export function BusinessOwnerFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 px-4 lg:px-8 bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="space-y-3">
          {businessOwnerFaqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="border border-border rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-foreground"
                >
                  {faq.question}
                  {isOpen ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
                </button>
                {isOpen && <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
