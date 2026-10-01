"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronsLeftRight } from "lucide-react"
import type { Project } from "@/config/site"
import { site, quoteHref, servicePath } from "@/config/site"

/** One before/after pair. Drag anywhere on the photo (mouse or touch) or use the arrow keys. */
export function BeforeAfter({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const moveTo = (clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={box}
      className="group relative aspect-[4/3] rounded-[20px] overflow-hidden ring-1 ring-line-dark elevated-lg select-none bg-slate cursor-ew-resize touch-pan-y"
      onPointerDown={(e) => {
        dragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        moveTo(e.clientX)
      }}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={project.after} alt={`${project.title}, after`} fill priority={priority} className="object-cover pointer-events-none" sizes={sizes} draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={project.before} alt={`${project.title}, before`} fill priority={priority} className="object-cover pointer-events-none" sizes={sizes} draggable={false} />
      </div>

      <span className={`absolute top-3 left-3 eyebrow !text-[9.5px] text-bone glass rounded-full px-2.5 py-1 transition-opacity ${pos < 12 ? "opacity-0" : ""}`}>Before</span>
      <span className={`absolute top-3 right-3 eyebrow !text-[9.5px] text-bone glass rounded-full px-2.5 py-1 transition-opacity ${pos > 88 ? "opacity-0" : ""}`}>After</span>

      <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${pos}%` }} aria-hidden>
        <div className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-bone/90" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-bone text-ink flex items-center justify-center shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-transform duration-200 group-active:scale-95 group-has-[:focus-visible]:ring-4 group-has-[:focus-visible]:ring-accent/60">
          <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={2}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Before and after: ${project.title}. Slide to compare.`}
        aria-valuetext={`${Math.round(pos)}% before`}
        className="sr-only"
      />
    </div>
  )
}

export function BeforeAfterShowcase({ projects, sample }: { projects: Project[]; sample: boolean }) {
  const [active, setActive] = useState(0)
  const p = projects[active]
  const service = site.services.find((s) => s.slug === p.service)

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-8 min-w-0">
        <BeforeAfter key={p.after} project={p} sizes="(max-width: 1024px) 100vw, 60vw" />
        <p className="eyebrow text-mist mt-4 flex items-center gap-2">
          <ChevronsLeftRight className="h-3.5 w-3.5" aria-hidden />
          Drag to compare{sample ? " · sample project photos" : ""}
        </p>
      </div>

      <div className="lg:col-span-4 min-w-0">
        <div className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto -mx-5 px-5 lg:mx-0 lg:px-0 lg:border-t lg:border-line-dark snap-x" role="tablist" aria-label="Projects">
          {projects.map((proj, i) => {
            const on = i === active
            return (
              <button
                key={proj.title}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`snap-start shrink-0 text-left w-[16.5rem] lg:w-full rounded-2xl lg:rounded-none px-5 py-5 lg:px-0 lg:py-6 border lg:border-0 lg:border-b border-line-dark transition-colors duration-500 ${
                  on ? "bg-bone/[0.04] lg:bg-transparent" : "opacity-60 hover:opacity-100"
                }`}
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-[19px] font-semibold tracking-[-0.02em] text-bone">{proj.title}</span>
                  <span className="font-mono text-[11px] text-mist">0{i + 1}</span>
                </span>
                {proj.location && <span className="block eyebrow !text-[10px] text-accent-soft mt-2">{proj.location}</span>}
                <span className={`block text-[14px] text-mist leading-relaxed mt-2 ${on ? "" : "lg:hidden"}`}>{proj.description}</span>
                <span className={`hidden lg:block h-px bg-accent-soft mt-5 origin-left transition-transform duration-700 ${on ? "scale-x-100" : "scale-x-0"}`} aria-hidden />
              </button>
            )
          })}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link href={quoteHref({ service: p.service })} data-cta="projects" className="btn btn-bone">
            Get a price for a job like this
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
          {service && (
            <Link href={servicePath(service.slug)} className="text-[14px] text-bone/80 hover:text-bone link-draw self-start sm:self-center lg:self-start">
              More on {service.title.toLowerCase()}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
