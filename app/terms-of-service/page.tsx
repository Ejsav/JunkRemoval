import type { Metadata } from "next"
import { site, phoneHref } from "@/config/site"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms-of-service" },
}

export default function TermsPage() {
  const { business } = site
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <article className="container mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20 space-y-6 text-muted-foreground leading-relaxed">
        <p>By using this website or booking with {business.name}, you agree to these terms.</p>
        <h2 className="text-xl font-black text-foreground pt-4">Quotes and pricing</h2>
        <p>Prices shown on this site are guides. Your firm price is confirmed before work begins, based on the items and volume removed. If the job differs materially from what was described, we will agree a revised price with you before continuing.</p>
        <h2 className="text-xl font-black text-foreground pt-4">Items we can&apos;t take</h2>
        <p>We do not remove hazardous materials, including paint, chemicals, fuel, asbestos or medical waste.</p>
        <h2 className="text-xl font-black text-foreground pt-4">Scheduling</h2>
        <p>Arrival windows are estimates. We will contact you if we are running late. Same-day service depends on availability.</p>
        <h2 className="text-xl font-black text-foreground pt-4">Questions</h2>
        <p>
          Call <a href={phoneHref} className="font-bold text-foreground underline underline-offset-4">{business.phoneDisplay}</a> with any questions about these terms.
        </p>
      </article>
    </>
  )
}
