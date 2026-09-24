"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronsLeftRight } from "lucide-react"
import type { Project } from "@/config/site"
import { QUOTE_PATH } from "@/config/site"

export function BeforeAfterShowcase({ projects, sample }: { projects: Project[]; sample: boolean }) {
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(50)
  const p = projects[active]

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-8 min-w-0">
        <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden ring-1 ring-line-dark elevated-lg select-none bg-slate">
          <Image key={p.after} src={p.after} alt={`${p.title}, after`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image key={p.before} src={p.before} alt={`${p.title}, before`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
          </div>

          <span className="absolute top-4 left-4 eyebrow !text-[10px] text-bone glass rounded-full px-3 py-1.5">Before</span>
          <span className="absolute top-4 right-4 eyebrow !text-[10px] text-bone glass rounded-full px-3 py-1.5">After</span>

          <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${pos}%` }} aria-hidden>
            <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-bone/80" />
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-bone text-ink flex items-center justify-center shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)]">
              <ChevronsLeftRight className="h-5 w-5" />
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={`Compare before and after: ${p.title}`}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />
        </div>
        <p className="eyebrow text-mist mt-4 flex items-center gap-2">
          <ChevronsLeftRight className="h-3.5 w-3.5" aria-hidden />
          Drag to compare{sample ? " · sample project photos" : ""}
        </p>
      </div>

      <div className="lg:col-span-4 min-w-0">
        <ul className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto -mx-5 px-5 lg:mx-0 lg:px-0 lg:border-t lg:border-line-dark snap-x" role="tablist" aria-label="Projects">
          {projects.map((proj, i) => {
            const on = i === active
            return (
              <li key={proj.title} className="snap-start shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setActive(i)
                    setPos(50)
                  }}
                  className={`text-left w-[16.5rem] lg:w-full rounded-2xl lg:rounded-none px-5 py-5 lg:px-0 lg:py-6 border lg:border-0 lg:border-b border-line-dark transition-colors duration-500 ${
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
              </li>
            )
          })}
        </ul>
        <Link href={QUOTE_PATH} data-cta="projects" className="btn btn-bone mt-8 w-full sm:w-auto">
          Get a photo estimate
          <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
