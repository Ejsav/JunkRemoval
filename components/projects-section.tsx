import { site, isSampleContent } from "@/config/site"
import { Container, Em, Eyebrow, SectionTitle } from "@/components/section-heading"
import { BeforeAfterShowcase } from "@/components/before-after-slider"

export function ProjectsSection({ n }: { n?: string } = {}) {
  return (
    <section data-section="projects" className="surface-dark grain relative overflow-hidden py-24 sm:py-32">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12 lg:mb-16" data-reveal>
          <div className="lg:col-span-8">
            <Eyebrow index={n} tone="dark">Before &amp; after</Eyebrow>
            <SectionTitle className="mt-6 text-bone">
              The difference, <Em className="text-accent-soft">in one visit.</Em>
            </SectionTitle>
          </div>
          <p className="lg:col-span-4 text-mist lede">
            {isSampleContent ? "Sample project photos. At launch, these become your own jobs." : "Recent cleanouts from around the area."}
          </p>
        </div>
        <div data-reveal>
          <BeforeAfterShowcase projects={site.projects} sample={isSampleContent} />
        </div>
      </Container>
    </section>
  )
}
