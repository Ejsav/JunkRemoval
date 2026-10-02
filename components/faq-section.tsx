import { site, phoneHref, smsHref } from "@/config/site"
import { Container, Em, Eyebrow, SectionTitle } from "@/components/section-heading"
import { FaqList } from "@/components/faq-list"

export function FaqSection({ n }: { n?: string } = {}) {
  const { business } = site
  return (
    <section id="faq" data-section="faq" className="bg-paper py-20 sm:py-28 lg:py-32 border-t border-line">
      <Container className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-10">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start" data-reveal>
          <Eyebrow index={n}>FAQ</Eyebrow>
          <SectionTitle className="mt-6">
            Good <Em>questions.</Em>
          </SectionTitle>
          <p className="text-[15px] text-stone mt-5 sm:mt-6">
            Something else?{" "}
            <a href={phoneHref} className="text-ink font-medium link-draw">Call</a>
            {business.textEnabled && (
              <>
                {" "}or{" "}
                <a href={smsHref} className="text-ink font-medium link-draw">text us</a>
              </>
            )}
            .
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6" data-reveal>
          <FaqList items={site.faqs} />
        </div>
      </Container>
    </section>
  )
}
