import type { Metadata } from "next"
import { site, phoneHref } from "@/config/site"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
}

export default function PrivacyPage() {
  const { business } = site
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <article className="container mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20 space-y-5 text-stone text-[16.5px] leading-relaxed">
        <p>This policy explains what {business.name} collects when you use this website and how it is used.</p>
        <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-ink pt-6">What we collect</h2>
        <p>When you request a quote we collect your name, phone number, optional email, location, job details and any photos you upload. We also collect anonymous usage data, such as pages visited and buttons clicked, to understand how the site is used.</p>
        <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-ink pt-6">How we use it</h2>
        <p>Your details are used only to contact you about your quote and to schedule and complete your job. We do not sell or rent your information.</p>
        <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-ink pt-6">Service providers</h2>
        <p>Quote requests are delivered through a form service, photos are stored with our hosting provider, and site analytics are processed by analytics providers. These providers process data on our behalf only.</p>
        <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-ink pt-6">Your choices</h2>
        <p>
          To see, correct or delete information you have sent us, contact us at{" "}
          <a href={phoneHref} className="font-medium text-ink link-draw">{business.phoneDisplay}</a>
          {business.email && (
            <>
              {" "}or <a href={`mailto:${business.email}`} className="font-medium text-ink link-draw">{business.email}</a>
            </>
          )}
          .
        </p>
      </article>
    </>
  )
}
