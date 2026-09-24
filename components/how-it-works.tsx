export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Call or request a quote",
      description: "Reach out by phone or fill out our simple form. We respond within minutes.",
    },
    {
      number: "2",
      title: "We provide pricing upfront",
      description: "Our team arrives on schedule with transparent, no-surprise pricing.",
    },
    {
      number: "3",
      title: "Junk disappears",
      description: "We haul everything away, sweep up, and you only pay when satisfied.",
    },
  ]

  return (
    <section className="py-24 px-4 lg:px-8 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">The Process</p>
          <h2 className="text-4xl md:text-5xl font-normal text-foreground font-[family-name:var(--font-playfair)]">
            Simple as <span className="italic">one, two, three</span>
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="grid md:grid-cols-12 gap-6 py-10 border-t border-border items-start"
            >
              <div className="md:col-span-1">
                <span className="text-5xl font-[family-name:var(--font-playfair)] text-muted-foreground/30">
                  {step.number}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-normal text-foreground font-[family-name:var(--font-playfair)]">
                  {step.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
