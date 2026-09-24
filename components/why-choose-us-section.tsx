import { Phone, Check } from "lucide-react"
import Image from "next/image"

const PHONE = "(407) 801-7886"
const PHONE_HREF = "tel:4078017886"

const reasons = [
  {
    title: "We Show Up When We Say",
    description: "No 4-hour windows. We give a tight arrival time and stick to it.",
  },
  {
    title: "Firm Price Before We Start",
    description: "One look at the job, one locked-in price. You'll never pay more than quoted.",
  },
  {
    title: "Background-Checked Crew",
    description: "Every team member is vetted, trained, and uniformed — professionals from start to finish.",
  },
  {
    title: "You Don't Lift a Finger",
    description: "Point at what goes. We handle the heavy lifting, stairs, tight spaces, all of it.",
  },
  {
    title: "60% Donated or Recycled",
    description: "We partner with local charities and recycling centers instead of landfills.",
  },
  {
    title: "Licensed, Bonded & Insured",
    description: "Fully licensed in Florida with liability insurance on every single job.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-24 lg:py-28 bg-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent/60 border border-accent/40" />
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.28em]">Why 600+ Families Trust Us</p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] font-black tracking-tight text-background leading-[1.06] mb-3 text-balance">
              600+ Families Trust Us.
            </h2>
            <p className="text-xl sm:text-2xl font-black text-accent mb-5">Real results, done right.</p>
            <p className="text-background/55 leading-relaxed mb-10 text-base sm:text-lg font-medium max-w-lg">
              We&apos;re not just another junk removal company. We show up on time, charge what we quoted, and leave your space spotless — every single job.
            </p>

            <div className="flex flex-col divide-y divide-background/[0.07]">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4 py-4 group">
                  <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/35 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/35 group-hover:border-accent/55 transition-all">
                    <Check className="h-3 w-3 text-accent" />
                  </div>
                  <div>
                    <p className="font-black text-background text-[15px] mb-1">{reason.title}</p>
                    <p className="text-sm text-background/50 leading-relaxed font-medium">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-2xl font-black bg-accent text-accent-foreground hover:bg-accent/90 transition-all btn-lift shadow-[0_4px_20px_oklch(0.628_0.222_34/0.35)] active:scale-[0.97] cta-glow"
            >
              <Phone className="h-4.5 w-4.5" />
              <span>Call Now: {PHONE}</span>
            </a>
          </div>

          {/* Right: image + floating stat cards */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_24px_72px_rgba(0,0,0,0.4)]">
              <Image
                src="/31a2dac1-bf73-4d4f-90cd-be076038f77e.png"
                alt="Junk removal truck loaded with furniture and appliances at a residential home"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle inner frame */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>

            {/* Stat pill — bottom left */}
            <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-card border border-border rounded-2xl shadow-2xl p-5">
              <p className="text-4xl sm:text-5xl font-black text-primary leading-none">600+</p>
              <p className="text-sm font-semibold text-foreground mt-1.5">Jobs in Central Florida</p>
            </div>

            {/* Badge — top right */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-2xl shadow-2xl p-4 text-center">
              <p className="text-3xl font-black leading-none">4.9</p>
              <p className="text-[11px] font-black uppercase tracking-widest mt-1 opacity-80">Stars</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
