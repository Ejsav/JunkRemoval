import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { site, isLive } from "@/config/site"
import { DemoBar } from "@/components/demo-bar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileActionBar } from "@/components/mobile-action-bar"
import { ConversionTracker } from "@/components/conversion-tracker"
import { RevealObserver } from "@/components/reveal-observer"
import { JsonLd, localBusinessSchema } from "@/components/json-ld"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.siteUrl),
  title: { default: site.seo.title, template: `%s | ${site.business.name}` },
  description: site.seo.description,
  alternates: { canonical: "/" },
  robots: isLive ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.business.name,
    title: site.seo.title,
    description: site.seo.description,
    url: "/",
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.business.name }],
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description, images: [site.seo.ogImage] },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: site.brand.ink,
}

const brandVars = { "--accent": site.brand.accent, "--ink": site.brand.ink } as React.CSSProperties

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { ga4Id } = site.analytics
  return (
    <html lang="en" suppressHydrationWarning style={brandVars} className={`${geist.variable} ${geistMono.variable} ${instrument.variable} bg-background`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans antialiased pb-[76px] lg:pb-0">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg">
          Skip to content
        </a>
        <DemoBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <ConversionTracker />
        <RevealObserver />
        <JsonLd data={localBusinessSchema()} />
        <Analytics />
        {ga4Id && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
