import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { StickyCallButton } from "@/components/sticky-call-button"
import { BeforeAfterSection } from "@/components/before-after-section"
import { ServiceArea } from "@/components/service-area"
import Link from "next/link"

export const metadata = {
  title: "Junk Removal Services | Orlando, FL",
  description:
    "Professional junk removal services in Orlando. Residential & commercial hauling, garage cleanouts, estate cleanouts, furniture removal, yard debris. Free quote.",
  keywords:
    "junk removal services, residential junk removal, commercial junk removal, garage cleanout, estate cleanout, appliance removal, furniture removal, yard debris removal",
}

export default function ServicesPage() {
  const phoneNumber = "(407) 801-7886"

  const services = [
    {
      title: "Residential Junk Removal",
      description:
        "We remove unwanted items from homes quickly and responsibly, making cleanouts stress-free for homeowners throughout Orlando.",
      pricingNote: "From $199 · 1/4 truck load",
    },
    {
      title: "Furniture Removal",
      description:
        "We remove sofas, mattresses, and heavy furniture with care so you don't have to lift a thing. We donate usable pieces when possible.",
      pricingNote: "Single item from $89",
    },
    // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated
    // this file's source at ~6,344 base64 characters (~4.75KB) short of the
    // full file, mid-way through the "Yard Debris Removal" entry. That entry,
    // any further services, and the entire page JSX body were cut off and
    // could not be retrieved.
  ]

  return (
    <main className="min-h-screen">
      <section className="py-24 px-4 lg:px-8 bg-background" />
      <BeforeAfterSection />
      <ServiceArea />
      <Footer />
      <StickyCallButton />
    </main>
  )
}
