import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Container, Em } from "@/components/section-heading"

export function PageHeader({
  eyebrow,
  title,
  emphasis,
  intro,
  image,
  imageAlt = "",
}: {
  eyebrow: string
  title: string
  emphasis?: string
  intro?: string
  image?: string
  imageAlt?: string
}) {
  return (
    <section className="surface-dark grain relative overflow-hidden">
      <div className="absolute inset-0 hairline-grid pointer-events-none" aria-hidden />
      <Container className="relative z-10 pt-12 sm:pt-16 pb-16 sm:pb-24 grid lg:grid-cols-12 gap-10 items-end">
        <div className={image ? "lg:col-span-7" : "lg:col-span-10"}>
          <nav aria-label="Breadcrumb" className="rise eyebrow text-mist flex items-center gap-2.5 mb-8">
            <Link href="/" className="hover:text-bone transition-colors">Home</Link>
            <span className="text-line-dark" aria-hidden>/</span>
            <span className="text-accent-soft">{eyebrow}</span>
          </nav>
          <h1 className="rise display text-[clamp(2.75rem,7vw,6rem)] text-bone" style={{ "--d": "60ms" } as React.CSSProperties}>
            {title}
            {emphasis && <Em className="block text-accent-soft mt-1">{emphasis}</Em>}
          </h1>
          {intro && (
            <p className="rise lede text-mist mt-7 max-w-2xl" style={{ "--d": "140ms" } as React.CSSProperties}>
              {intro}
            </p>
          )}
        </div>
        {image && (
          <div className="float-in lg:col-span-5 relative aspect-[16/10] lg:aspect-[4/3] rounded-[24px] overflow-hidden ring-1 ring-line-dark elevated-lg" style={{ "--d": "160ms" } as React.CSSProperties}>
            <Image src={image} alt={imageAlt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
        )}
      </Container>
    </section>
  )
}
