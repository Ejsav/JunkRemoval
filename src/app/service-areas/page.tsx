import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { StickyCallButton } from "@/components/sticky-call-button"
import { ServiceArea } from "@/components/service-area"

export const metadata: Metadata = {
  title: "Service Areas | Junk Removal Orlando & Surrounding Counties",
  description:
    "We serve Orlando, Orange County, Osceola County, Seminole County, and surrounding areas. Same-day junk removal available throughout Central Florida.",
  keywords: "junk removal Orlando, Orange County, Osceola County, Seminole County, Central Florida, service areas",
}

export default function ServiceAreasPage() {
  const phoneNumber = "(407) 801-7886"

  const primaryAreas = [
    "Orlando",
    "Winter Park",
    "Maitland",
    "Altamonte Springs",
    "Kissimmee",
    "St. Cloud",
    "Sanford",
    "Lake Mary",
    "Longwood",
    "Oviedo",
    "Winter Springs",
    "Apopka",
  ]

  const counties = [
    {
      name: "Orange County",
      coverage: "100% Coverage",
      description: "Full junk removal service throughout Orange County including Orlando and surrounding cities.",
    },
    {
      name: "Osceola County",
      coverage: "100% Coverage",
      description: "Complete service area coverage including Kissimmee, St. Cloud, and surrounding areas.",
    },
    // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated
    // this file's source at ~7,264 base64 characters (~5.4KB) short of the full
    // file, mid-way through the "Seminole County" entry's description. That
    // entry and the entire page JSX body were cut off and could not be
    // retrieved.
  ]

  return (
    <main className="min-h-screen">
      <section className="py-24 px-4 lg:px-8 bg-background" />
      <ServiceArea />
      <Footer />
      <StickyCallButton />
    </main>
  )
}
