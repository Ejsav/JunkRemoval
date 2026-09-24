import { Shield, Phone } from "lucide-react"

const PHONE_HREF = "tel:4078017886"

export function GuaranteeSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="container mx-auto max-w-3xl">
        <div className="relative bg-card rounded-2xl border border-border p-9 sm:p-12 text-center card-shadow-md overflow-hidden">
          {/* Subtle background accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent rounded-t-2xl" />

          <div className="w-12 h-12 bg-accent/12 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent/20">
            <Shield className="h-6 w-6 text-accent" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-4 leading-tight">Backed by our guarantee</h3>
          <p className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-8 font-medium max-w-xl mx-auto">
            If we&apos;re late, we make it right. Not satisfied? We&apos;ll come back and fix it — at no extra cost. Your price is locked before we start.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            {["Same-day available", "No hidden charges", "Licensed & insured"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 px-4 py-2 bg-secondary border border-border rounded-full text-sm font-black text-foreground">
                <span className="text-accent">✓</span> {item}
              </span>
            ))}
          </div>

          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground font-black text-sm h-12 px-8 rounded-xl shadow-md shadow-primary/20 hover:bg-primary/90 btn-lift active:scale-[0.97]"
          >
            <Phone className="h-4 w-4" />
            Book With Confidence
          </a>
        </div>
      </div>
    </section>
  )
}
