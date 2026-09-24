'use client'

export function OfferStackSection() {
  return (
    <section className="py-16 px-4 lg:px-8 bg-accent/2">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-accent/6 rounded-2xl p-8 lg:p-10 border border-accent/20 card-shadow">
          <h3 className="text-2xl font-black text-foreground mb-8 text-center">Your Offer</h3>

          <div className="space-y-3">
            {[
              { icon: "🔒", text: "Price quoted and locked on the call" },
              { icon: "💰", text: "No hidden fees, ever" },
              { icon: "⏰", text: "If we're late, we make it right" },
              { icon: "✓", text: "Not satisfied? We'll come back and fix it" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 p-3.5 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <span className="text-sm font-bold text-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          <a
            href="tel:4078017886"
            className="w-full inline-flex items-center justify-center gap-2 bg-accent font-black text-base h-14 rounded-lg hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 active:scale-[0.97] transition-all mt-8 text-popover btn-lift"
          >
            Lock in Your Price Now
          </a>
        </div>
      </div>
    </section>
  
  )
}
