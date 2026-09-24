import { ArrowRight, Home, Building2, Package, Armchair, Refrigerator, Leaf, FileText, HardHat } from "lucide-react"

const services = [
  { icon: Home,          title: "Residential",       description: "$89–$549 per job. Home and apartment cleanouts.",  tag: "High Volume" },
  { icon: Building2,     title: "Commercial",         description: "$299–$899 per job. Offices, retail, warehouses.",  tag: null },
  { icon: Package,       title: "Garage Jobs",        description: "$149–$449 per job. Clutter to clear.",             tag: "Quick Wins" },
  { icon: Armchair,      title: "Furniture Removal",  description: "$75–$299 per job. Sofas to storage.",              tag: null },
  { icon: Refrigerator,  title: "Appliance Removal",  description: "$99–$349 per job. Fridges to AC units.",           tag: null },
  { icon: Leaf,          title: "Yard Debris",        description: "$59–$199 per job. Trees to landscaping waste.",    tag: null },
  { icon: FileText,      title: "Estate Cleanouts",   description: "$449–$1,299 per job. Comprehensive.",              tag: null },
  { icon: HardHat,       title: "Construction",       description: "$199–$599 per job. Drywall to concrete.",          tag: "Recurring" },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-10 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.28em]">What We Remove</p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.08] text-balance">
              Every job, handled.
            </h2>
          </div>
          <p className="text-muted-foreground text-base font-medium max-w-xs leading-snug">
            Residential to commercial — if it needs to go, we take it.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.07)]">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group relative bg-card p-7 sm:p-8 hover:bg-primary hover:text-primary-foreground transition-all duration-250 cursor-default flex flex-col"
              >
                {service.tag && (
                  <span className="absolute top-5 right-5 text-[9px] font-black uppercase tracking-widest bg-accent/10 text-accent group-hover:bg-primary-foreground/15 group-hover:text-primary-foreground px-2.5 py-1 rounded-full transition-colors border border-accent/25 group-hover:border-primary-foreground/20">
                    {service.tag}
                  </span>
                )}
                <span className="text-[10px] font-black text-muted-foreground/50 group-hover:text-primary-foreground/40 uppercase tracking-[0.22em] mb-5 block transition-colors font-mono">
                  0{idx + 1}
                </span>
                <div className="w-10 h-10 rounded-xl bg-accent/10 group-hover:bg-primary-foreground/15 flex items-center justify-center mb-5 transition-all duration-250 group-hover:scale-110 border border-accent/20 group-hover:border-primary-foreground/20">
                  <Icon className="h-5 w-5 text-accent group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-black text-[15px] text-foreground group-hover:text-primary-foreground leading-tight mb-2.5 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/75 leading-snug transition-colors font-medium flex-1">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm sm:text-base font-medium">Not sure if we take it? 95% chance we do.</p>
          <a href="#quote" className="inline-flex items-center gap-2 text-foreground font-black text-sm sm:text-base hover:text-accent transition-colors group">
            Get a free estimate
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
