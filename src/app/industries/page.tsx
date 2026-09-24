import { Metadata } from "next"
import { Trash2, TreePine, Sprout, Droplet, Hammer, Home, Wind, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Industries | Custom Websites For Service Businesses",
  description:
    "Website framework adaptable to multiple service industries including junk removal, tree removal, landscaping, pressure washing, roofing, HVAC, and contracting.",
}

export default function IndustriesPage() {
  const industries = [
    {
      icon: Trash2,
      name: "Junk Removal",
      description: "Service pages, pricing structures, before/after galleries, service area coverage",
    },
    {
      icon: TreePine,
      name: "Tree Removal",
      description: "Emergency service callouts, project galleries, equipment showcases, safety credentials",
    },
    {
      icon: Sprout,
      name: "Landscaping",
      description: "Seasonal services, maintenance packages, portfolio showcases, consultation bookings",
    },
    {
      icon: Droplet,
      name: "Pressure Washing",
      description: "Residential and commercial services, surface types, before/after comparisons",
    },
    {
      icon: Hammer,
      name: "Demolition",
      description: "Project scope pages, safety certifications, commercial vs residential services",
    },
    {
      icon: Home,
      name: "Roofing",
      description: "Material options, inspection services",
    },
    // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated this
    // file's source at ~8,164 base64 characters (~6.1KB) short of the full file,
    // mid-way through the "Roofing" entry's description and before the (imported
    // but unused-here) Wind/Wrench icons' entries. At least two more industries
    // (likely HVAC and Contracting, given the Wind/Wrench imports above) and the
    // entire page JSX body were cut off and could not be retrieved.
  ]

  return (
    <main className="min-h-screen">
      <section className="py-24 px-4 lg:px-8 bg-background" />
    </main>
  )
}
