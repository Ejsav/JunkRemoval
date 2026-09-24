import { ArrowRight, Phone } from "lucide-react"

const PHONE = "(407) 801-7886"
const PHONE_HREF = "tel:4078017886"

const steps = [
  {
    number: "01",
    title: "Call or Request Your Free Quote",
    description: "Give us a call or fill out the form. We'll give you a firm price — no obligation, no surprises.",
    detail: "Fast response",
  },
  {
    number: "02",
    title: "We Confirm Your Price & Arrival Time",
    description: "Your price is locked on the call. We schedule your pickup and confirm the exact arrival window.",
    detail: "Price locked",
  },
  {
    number: "03",
    title: "Our Crew Hauls Everything Away",
    description: "We do all the heavy lifting, load everything up, and leave your space clean. Same-day available.",
    detail: "Job done",
  },
]

export function ProcessSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section header */}
        <div className="mb-12 sm:mb-14 pb-8 sm:pb-10 border-b border-border">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <p className="text-[10px] font-black text-accent uppercase tracking-[0.28em]">The Process</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-8">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.06] text-balance">
              Clear and simple.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-xs leading-snug">
              Call before 2pm for same-day. Average job takes 2 hours.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {steps.map((step) => (
            <div key={step.number} className="bg-card border border-border rounded-2xl p-7 sm:p-8 card-shadow hover:shadow-lg hover:border-accent/25 hover:-translate-y-1.5 transition-all duration-250 group flex flex-col">
              <div className="flex items-start justify-between mb-7 sm:mb-8">
                <span className="text-[2.75rem] sm:text-[3.25rem] font-black text-foreground/[0.065] leading-none tracking-tight">{step.number}</span>
                <span className="text-[10px] font-black text-accent bg-accent/10 px-3 py-1.5 rounded-full uppercase tracking-[0.18em] shrink-0 mt-1 border border-accent/20 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all">
                  {step.detail}
                </span>
              </div>
              <h3 className="text-[15px] sm:text-base font-black text-foreground mb-3 leading-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium flex-1">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 bg-foreground rounded-3xl px-7 sm:px-10 py-8 sm:py-10 shadow-[0_8px_48px_rgba(15,23,42,0.22)] dark-panel-glow overflow-hidden">
          {/* Accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent/50" />
          <div className="flex-1">
            <p className="font-black text-background text-lg sm:text-xl mb-1.5">Ready to get started right now?</p>
            <p className="text-background/45 text-sm font-medium">Same-day slots fill up fast. Don&apos;t wait.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-black h-13 px-7 rounded-2xl shadow-md shadow-primary/20 hover:bg-primary/90 btn-lift active:scale-[0.97] transition-all text-sm order-2 sm:order-1"
            >
              Get Your Free Quote
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-black h-13 px-7 rounded-2xl hover:bg-accent/90 btn-lift active:scale-[0.97] transition-all text-sm shadow-[0_4px_16px_oklch(0.628_0.222_34/0.3)] order-1 sm:order-2"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
