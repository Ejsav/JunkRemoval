import { Phone, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { StickyCallButton } from "@/components/sticky-call-button"

export const metadata = {
  title: "Junk Removal Pricing | Transparent Rates in Orlando, FL",
  description:
    "Clear, transparent junk removal pricing in Orlando. Single item pickup from $89. No hidden fees. Free estimates. Same-day service available.",
  keywords:
    "junk removal cost, junk removal prices, Orlando, affordable junk removal, haul away, debris removal",
}

export default function PricingPage() {
  const phoneNumber = "(407) 801-7886"

  const pricingTiers = [
    {
      size: "Single Item",
      price: "$89–$149",
      capacity: "Express Pickup",
      description: "One item fast",
      features: [
        "Single furniture piece or appliance",
        "Sofa, mattress, refrigerator, etc.",
        "Price confirmed before arrival",
        "Same-day slots available",
      ],
    },
    {
      size: "Small Load",
      price: "$199–$299",
      capacity: "1/4 Truck",
      description: "Small cleanouts",
      features: [
        "Small room or storage unit",
        "A few pieces of furniture",
        "Light garage declutter",
        "Price confirmed before arrival",
      ],
    },
    // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated
    // this file's source at ~7,200 base64 characters (~5.4KB) short of the full
    // file, mid-way through the "Medium Load" tier's `features` array. At least
    // one more pricing tier (likely a "Large Load" / full-truck tier, matching
    // the site's other pricing components) and the entire page JSX body were
    // cut off and could not be retrieved.
  ]

  return (
    <main className="min-h-screen">
      <section className="py-24 px-4 lg:px-8 bg-background" />
      <Footer />
      <StickyCallButton />
    </main>
  )
}
