import { Shield, CheckCircle2 } from "lucide-react"

export function LicensedBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
      <Shield className="h-4 w-4" aria-hidden="true" />
      <span>Licensed & Insured</span>
      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
    </div>
  )
}
