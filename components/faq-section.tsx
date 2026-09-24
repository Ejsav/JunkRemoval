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
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes — 100%. We are fully licensed in Florida, bonded, and carry full liability insurance plus workers' compensation. This protects both you and our crew on every single job.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We serve Orlando and all surrounding communities: Winter Park, Lake Nona, Kissimmee, Sanford, Apopka, Altamonte Springs, Maitland, Ocoee, Clermont, and more. Call to confirm your area.",
  },
  {
    question: "Do you donate or recycle items?",
    answer:
      "Absolutely. Up to 60% of what we collect gets a second life instead of going to a landfill. We partner with local donation centers and recycling facilities as a core part of our operation.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Call us at (407) 801-7886 for a quick estimate over the phone, or fill out our online quote form. No obligation, no pressure — a firm price before any work begins.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">

          {/* Left sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">FAQ</p>
            <h2 className="text-5xl md:text-[3.25rem] font-black tracking-tight text-foreground leading-[1.0] mb-5 text-balance">
              Common Questions
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              Everything you need to know before you book. Still have questions? Call us directly.
            </p>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-11 h-11 bg-foreground rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                <Phone className="h-4.5 w-4.5 text-background" />
              </div>
              <span className="font-black text-foreground group-hover:text-primary transition-colors">{PHONE}</span>
            </a>
          </div>

          {/* Right accordion */}
          <div className="flex flex-col gap-0 divide-y divide-border border-t border-b border-border">
            {faqs.map((faq, index) => (
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
                    openIndex === index ? "max-h-64 pb-6" : "max-h-0"
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
