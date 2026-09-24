import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { DemoBanner } from "@/components/demo-banner"
import { Header } from "@/components/header"
import { StickyCallButton } from "@/components/sticky-call-button"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Orlando Junk Removal | Same-Day Service | Free Estimates",
  description:
    "Fast, reliable junk removal service in Orlando, Florida. Same-day pickup, transparent pricing, licensed & insured. Residential & commercial. Call for a free estimate.",
  keywords:
    "junk removal Orlando, junk hauling, trash removal, furniture removal, garage cleanout, estate cleanout, appliance removal, Orlando FL",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Orlando Junk Removal | Professional Hauling Service",
    description:
      "Fast, reliable junk removal in Orlando. Same-day service available. Licensed & insured. Free estimates—call now.",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <DemoBanner />
        <Header />
        {children}
        <StickyCallButton />
        <Analytics />
      </body>
    </html>
  )
}
