"use client"

import type React from "react"
import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronsLeftRight } from "lucide-react"
import type { Project } from "@/config/site"
import { QUOTE_PATH } from "@/config/site"

const clamp = (n: number) => Math.min(100, Math.max(0, n))

/**
 * Pointer-driven compare slider. A native range input only reacts to its (invisible) thumb on iOS,
 * so this tracks the pointer across the whole image instead. `touch-action: pan-y` keeps vertical
 * page scrolling, while horizontal drags move the divider. Arrow keys work when focused.
 */
function Compare({ project, sample }: { project: Project; sample: boolean }) {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const frame = useRef<HTMLDivElement>(null)

  const fromPointer = useCallback((clientX: number) => {
    const r = frame.current?.getBoundingClientRect()
    if (r) setPos(clamp(((clientX - r.left) / r.width) * 100))
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    fromPointer(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => dragging && fromPointer(e.clientX)
  const end = () => setDragging(false)

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown" ? pos - step
      : e.key === "ArrowRight" || e.key === "ArrowUp" ? pos + step
      : e.key === "Home" ? 0
      : e.key === "End" ? 100
      : null
    if (next === null) return
    e.preventDefault()
    setPos(clamp(next))
  }

  const ease = dragging ? "" : "transition-[clip-path,left] duration-300 ease-[var(--ease-out)]"

  return (
    <>
      <div
        ref={frame}
        role="slider"
        tabIndex={0}
        aria-label={`Compare before and after: ${project.title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before photo`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerCancel={end}
        onLostPointerCapture={end}
        onKeyDown={onKeyDown}
        className="group/compare relative aspect-[4/3] rounded-[20px] sm:rounded-[24px] overflow-hidden ring-1 ring-line-dark elevated-lg select-none bg-slate cursor-ew-resize touch-pan-y focus-visible:outline-offset-4"
      >
        <Image src={project.after} alt={`${project.title}, after`} fill draggable={false} className="fade object-cover pointer-events-none" sizes="(max-width: 1024px) 100vw, 60vw" />
        <div className={`absolute inset-0 ${ease}`} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={project.before} alt={`${project.title}, before`} fill draggable={false} className="fade object-cover pointer-events-none" sizes="(max-width: 1024px) 100vw, 60vw" />
        </div>

        <span className={`absolute top-3 left-3 sm:top-4 sm:left-4 eyebrow !text-[10px] text-bone glass rounded-full px-3 py-1.5 transition-opacity duration-300 ${pos < 18 ? "opacity-0" : "opacity-100"}`} aria-hidden>
          Before
        </span>
        <span className={`absolute top-3 right-3 sm:top-4 sm:right-4 eyebrow !text-[10px] text-bone glass rounded-full px-3 py-1.5 transition-opacity duration-300 ${pos > 82 ? "opacity-0" : "opacity-100"}`} aria-hidden>
          After
        </span>

        <div className={`absolute inset-y-0 pointer-events-none ${ease}`} style={{ left: `${pos}%` }} aria-hidden>
          <div className="absolute inset-y-0 -translate-x-1/2 w-[2px] bg-bone/90 shadow-[0_0_12px_rgb(0_0_0/0.35)]" />
          <div
            className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-bone text-ink flex items-center justify-center shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] ring-4 ring-bone/25 transition-transform duration-200 ${
              dragging ? "scale-110" : "group-hover/compare:scale-105"
            }`}
          >
            <ChevronsLeftRight className="h-5 w-5" />
          </div>
        </div>
      </div>
      <p className="eyebrow text-mist mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-2">
          <ChevronsLeftRight className="h-3.5 w-3.5" aria-hidden />
          Drag to compare
        </span>
        {sample && <span className="text-mist/70">Sample photos</span>}
      </p>
    </>
  )
}

export function BeforeAfterShowcase({ projects, sample }: { projects: Project[]; sample: boolean }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const p = projects[active]

  const select = (i: number) => {
    setActive(i)
    tabs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
  }

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + projects.length) % projects.length
    select(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-8 min-w-0" role="tabpanel" id="project-panel" aria-label={p.title}>
        {/* Keyed so each project starts centred and fades in rather than snapping. */}
        <Compare key={p.after} project={p} sample={sample} />
      </div>

      <div className="lg:col-span-4 min-w-0">
        <ul
          className="no-scrollbar flex lg:flex-col gap-3 lg:gap-0 overflow-x-auto -mx-5 px-5 scroll-px-5 lg:mx-0 lg:px-0 lg:overflow-visible lg:border-t lg:border-line-dark snap-x snap-mandatory"
          role="tablist"
          aria-label="Projects"
        >
          {projects.map((proj, i) => {
            const on = i === active
            return (
              <li key={proj.title} className="snap-start shrink-0 lg:shrink">
                <button
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="project-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`group text-left w-[17rem] sm:w-[19rem] lg:w-full h-full rounded-2xl lg:rounded-none px-5 py-5 lg:px-0 lg:py-6 border lg:border-0 lg:border-b border-line-dark transition-[background-color,border-color,opacity] duration-300 active:scale-[0.99] focus-visible:outline-offset-[-2px] lg:focus-visible:outline-offset-4 ${
                    on ? "bg-bone/[0.06] border-bone/20 lg:bg-transparent" : "opacity-55 hover:opacity-90"
                  }`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="text-[18px] sm:text-[19px] font-semibold tracking-[-0.02em] text-bone">{proj.title}</span>
                    <span className={`font-mono text-[11px] transition-colors ${on ? "text-accent-soft" : "text-mist"}`}>0{i + 1}</span>
                  </span>
                  {proj.location && <span className="block eyebrow !text-[10px] text-accent-soft mt-2">{proj.location}</span>}
                  {/* Desktop: description only on the active row, expanding smoothly. */}
                  <span className="block lg:hidden text-[14px] text-mist leading-relaxed mt-2.5 text-pretty">{proj.description}</span>
                  <span className="hidden lg:grid disclose" data-open={on}>
                    <span>
                      <span className="block text-[14px] text-mist leading-relaxed pt-2.5">{proj.description}</span>
                    </span>
                  </span>
                  <span className={`hidden lg:block h-px bg-accent-soft mt-5 origin-left transition-transform duration-500 ease-[var(--ease-out)] ${on ? "scale-x-100" : "scale-x-0"}`} aria-hidden />
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
