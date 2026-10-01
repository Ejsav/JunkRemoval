import { Plus } from "lucide-react"
import { site } from "@/config/site"
import { photoUploadsEnabled } from "@/lib/capabilities"
import { CallLink, TextLink } from "@/components/biz"
import { Container, Em, Eyebrow, SectionTitle } from "@/components/section-heading"

export function FaqSection({ n, items }: { n?: string; items?: { q: string; a: string }[] } = {}) {
  const faqs = items ?? site.faqs.map((f) => ({ q: f.q, a: !photoUploadsEnabled && "aWithoutUploads" in f && f.aWithoutUploads ? f.aWithoutUploads : f.a }))
  const { business } = site
  return (
    <section id="faq" data-section="faq" className="bg-paper py-24 sm:py-32 border-t border-line">
      <Container className="grid lg:grid-cols-12 gap-12 lg:gap-10">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start" data-reveal>
          <Eyebrow index={n}>FAQ</Eyebrow>
          <SectionTitle className="mt-6">
            Answers <Em>before you book.</Em>
          </SectionTitle>
          <p className="text-[15px] text-stone mt-6">
            Something else?{" "}
            <CallLink className="text-ink font-medium link-draw">Call</CallLink>
            {business.textEnabled && (
              <>
                {" "}or{" "}
                <TextLink className="text-ink font-medium link-draw">text us</TextLink>
              </>
            )}
            .
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 border-t border-ink/80" data-reveal>
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="text-[18px] sm:text-[20px] font-medium tracking-[-0.02em] text-ink">{f.q}</span>
                <span className="h-9 w-9 shrink-0 rounded-full border border-line flex items-center justify-center text-ink transition-all duration-500 group-open:rotate-45 group-open:bg-ink group-open:text-bone group-open:border-ink" aria-hidden>
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="pb-7 pr-12 text-[16px] text-stone leading-relaxed max-w-2xl">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
