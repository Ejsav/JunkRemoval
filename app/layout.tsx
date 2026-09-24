import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { site, isLive } from "@/config/site"
import { DemoBar } from "@/components/demo-bar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileActionBar } from "@/components/mobile-action-bar"
import { ConversionTracker } from "@/components/conversion-tracker"
import { JsonLd, localBusinessSchema } from "@/components/json-ld"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" })

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
  themeColor: site.brand.dark,
}

const brandVars = {
  "--primary": site.brand.primary,
  "--ring": site.brand.primary,
  "--accent": site.brand.accent,
  "--foreground": site.brand.dark,
  "--card-foreground": site.brand.dark,
  "--popover-foreground": site.brand.dark,
  "--secondary-foreground": site.brand.dark,
} as React.CSSProperties

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { ga4Id } = site.analytics
  return (
    <html lang="en" style={brandVars} className="bg-background">
      <body className={`${dmSans.variable} font-sans antialiased pb-[72px] lg:pb-0`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-card focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg">
          Skip to content
        </a>
        <DemoBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <ConversionTracker />
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
