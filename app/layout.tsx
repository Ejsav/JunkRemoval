import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { site, isLive } from "@/config/site"
import { ConversionTracker } from "@/components/conversion-tracker"
import { RevealObserver } from "@/components/reveal-observer"

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
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');${
              isLive
                ? ""
                : // The prospect's colour recolours the customer site only, never the /demo sales page.
                  "try{var p=JSON.parse(localStorage.getItem('demo-preview')||'null');if(p&&p.accent&&location.pathname.indexOf('/demo')!==0)document.documentElement.style.setProperty('--accent',p.accent)}catch(e){}"
            }`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg">
          Skip to content
        </a>
        {children}
        <ConversionTracker />
        <RevealObserver />
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
