"use client"

import { useState } from "react"
import { Plus, Minus, Phone } from "lucide-react"

const PHONE = "(407) 801-7886"
const PHONE_HREF = "tel:4078017886"

const faqs = [
  {
    question: "How much does junk removal cost?",
    answer:
      "Pricing is based on volume — how much space your items take in our truck. A single item starts around $89–$149. A quarter-truck load runs $199–$299. A half-truck load is $349–$449, and a full truck load is $549–$699. You get a firm, locked-in price before we start — no surprises.",
  },
  {
    question: "Do you offer same-day junk removal?",
    answer:
      "Yes. Same-day service is available most days. Call before noon and we can usually get to you that day, depending on schedule. We're open 7am–8pm, 7 days a week including weekends.",
  },
  {
    question: "What items do you accept?",
    answer:
      "We take almost everything — furniture, appliances, mattresses, electronics, yard waste, construction debris, and general clutter. We cannot accept hazardous materials, tires, or medical waste. Not sure about something? Just call us.",
  },
  {
    question: "Do I need to be home during pickup?",
    answer:
      "Not necessarily. Many customers leave items in the driveway, garage, or backyard for us to collect. As long as we have clear access and the location is confirmed, you don't need to be present. We'll send a confirmation when done.",
  },
  // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated
  // this file's source at ~5,280 base64 characters (~4KB) short of the full
  // file, mid-sentence in the "Are you licensed and insured?" answer. That
  // entry, any further FAQs, and the accordion-rendering JSX body were cut
  // off and could not be retrieved.
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 px-4 lg:px-8 bg-secondary">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-foreground font-[family-name:var(--font-playfair)]">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="border border-border rounded-xl overflow-hidden bg-background">
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
        <div className="text-center mt-10">
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-foreground font-semibold">
            <Phone className="h-4 w-4" /> Still have questions? Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}
