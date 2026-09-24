import { Phone, Shield, Zap } from "lucide-react"

const PHONE = "(407) 801-7886"
const PHONE_HREF = "tel:4078017886"

export function GuaranteeSection() {
  return (
    <section className="py-16 px-4 lg:px-8 bg-secondary">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-green-50 rounded-lg border border-green-200 p-8 text-center">
          <h3 className="text-xl font-black text-foreground mb-4">Backed by our guarantee</h3>
          <p className="text-sm text-foreground leading-relaxed mb-4 font-semibold max-w-2xl mx-auto">
            If we're late, we make it right. Not satisfied? We'll come back and fix it — at no extra cost. Your price is locked before we start.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-xs font-bold text-foreground">
            <span>✓ Same-day available</span>
            <span>✓ No hidden charges</span>
            <span>✓ Licensed & insured</span>
          </div>
        </div>
      </div>
    </section>
  )
}
