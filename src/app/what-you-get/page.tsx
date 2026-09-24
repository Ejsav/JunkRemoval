import { Check, Globe, Smartphone, Search, Phone, Award, ArrowRight, Clock, Shield, Zap, FileCheck } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "What You Get | Buy This Junk Removal Website",
  description:
    "Everything included when you purchase this premium junk removal website template. Domain, custom branding, mobile-optimized design, SEO setup, full ownership.",
  keywords:
    "buy junk removal website, junk removal website template, business website, junk removal website for sale",
}

const features = [
  {
    icon: FileCheck,
    title: "This Exact Website, Customized",
    description:
      "This exact premium junk removal design, customized with your business name, domain, phone number, and service area.",
  },
  {
    icon: Globe,
    title: "Brand-New Domain",
    description:
      "Choose your own domain name or we'll suggest options that fit your business. Includes first year of registration.",
  },
  {
    icon: Award,
    title: "Custom Branding",
    description: "Your business name, logo text, phone number, and service area customized throughout the entire site.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Optimized",
    description:
      "Looks perfect on phones, tablets, and desktops. Fast loading speeds for better user experience and SEO.",
  },
  {
    icon: Phone,
    title: "Contact Form + Click-to-Call",
    description: "Ready to capture leads immediately. Phone buttons dial your number directly.",
  },
  // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated this
  // file's source at ~8,768 base64 characters (~6.6KB) short of the full file,
  // mid-sentence in the "Contact Form + Click-to-Call" entry. Further feature
  // entries (the file imports Search, Clock, Shield, and Zap icons that are not
  // yet used above, implying more entries followed) and the entire page JSX
  // body were cut off and could not be retrieved.
]

export default function WhatYouGetPage() {
  return (
    <main className="min-h-screen">
      <section className="py-24 px-4 lg:px-8 bg-background" />
    </main>
  )
}
