import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

const items = [
  { title: "Furniture", desc: "Sofas, beds, tables, chairs" },
  { title: "Appliances", desc: "Refrigerators, washers, dryers" },
  { title: "Mattresses", desc: "All sizes, any condition" },
  { title: "Garage Cleanouts", desc: "Complete garage clearing" },
  { title: "Estate Cleanouts", desc: "Sensitive, respectful service" },
  { title: "Construction Debris", desc: "Wood, drywall, materials" },
]

const PHONE_HREF = "tel:4078017886"
const PHONE = "(407) 801-7886"

export function WhatWeRemove() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-black mb-4">Our Services</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground font-[family-name:var(--font-playfair)] text-balance">
            What We Remove
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 stagger-children">
          {items.map((item) => (
            <div
              key={item.title}
              className="group p-6 sm:p-8 bg-secondary rounded-2xl border border-border hover:bg-primary hover:border-primary hover:-translate-y-0.5 transition-all duration-300 card-shadow hover:card-shadow-md cursor-pointer"
            >
              <h3 className="text-lg sm:text-xl font-black text-foreground group-hover:text-primary-foreground transition-colors mb-2 font-[family-name:var(--font-playfair)]">
                {item.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-primary-foreground/80 transition-colors text-sm leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 sm:mt-16 lg:mt-20 text-center">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground font-black text-base h-16 px-10 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/85 hover:-translate-y-0.5 active:scale-[0.98] transition-all uppercase tracking-wide btn-lift group"
          >
            Get Your Free Quote
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
