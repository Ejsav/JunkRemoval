import type React from "react"
import { notFound } from "next/navigation"
import { isLive } from "@/config/site"
import { SalesFooter, SalesHeader, SalesMobileBar } from "@/components/sales-chrome"

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  // A launched client site has no sales page.
  if (isLive) notFound()
  return (
    <div className="pb-[76px] lg:pb-0">
      <SalesHeader />
      <main id="main">{children}</main>
      <SalesFooter />
      <SalesMobileBar />
    </div>
  )
}
