import type React from "react"
import Image from "next/image"
import { site } from "@/config/site"
import { Container, Em, Eyebrow, SectionTitle } from "@/components/section-heading"

export function ProcessSection({ n }: { n?: string } = {}) {
  const { process, images } = site
  return (
    <section id="how-it-works" data-section="process" className="bg-paper py-24 sm:py-32 overflow-hidden">
      <Container className="grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
        <div className="lg:col-span-5 relative order-2 lg:order-1" data-reveal>
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden elevated-lg">
            <Image src={images.crew} alt={images.crewAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" aria-hidden />
          </div>
          <div className="absolute -right-2 sm:right-6 -bottom-6 bg-ink text-bone rounded-2xl px-5 py-4 elevated-lg max-w-[15rem]">
            <p className="eyebrow !text-[10px] text-mist">Typical job</p>
            <p className="text-[15px] mt-1.5 leading-snug">Arrival to swept floor in under two hours.</p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
          <div data-reveal>
            <Eyebrow index={n}>How it works</Eyebrow>
            <SectionTitle className="mt-6">
              Three steps. <Em>No surprises.</Em>
            </SectionTitle>
          </div>
          <ol className="mt-12 relative">
            <span className="absolute left-[19px] top-3 bottom-3 w-px bg-line" aria-hidden />
            {process.map((step, i) => (
              <li key={step.title} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="relative grid grid-cols-[40px_1fr] gap-5 pb-10 last:pb-0">
                <span className="relative z-10 h-10 w-10 rounded-full bg-paper border border-line flex items-center justify-center font-mono text-[12px] text-ink">
                  0{i + 1}
                </span>
                <span className="pt-1.5">
                  <span className="block text-[21px] font-semibold tracking-[-0.025em] text-ink">{step.title}</span>
                  <span className="block text-[15.5px] text-stone mt-2 leading-relaxed max-w-md">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
