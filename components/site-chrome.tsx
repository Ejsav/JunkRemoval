import type React from "react"
import { isLive } from "@/config/site"
import { DemoBar } from "@/components/demo-bar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileActionBar } from "@/components/mobile-action-bar"
import { JsonLd, localBusinessSchema } from "@/components/json-ld"
import { PreviewAccent } from "@/components/biz"

/** Everything around a customer-facing page: the business's header, footer, mobile actions and schema. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-[76px] lg:pb-0">
      <DemoBar />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileActionBar />
      <JsonLd data={localBusinessSchema()} />
      {!isLive && <PreviewAccent />}
    </div>
  )
}
