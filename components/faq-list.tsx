"use client"

import { useId, useState } from "react"
import { Plus } from "lucide-react"

/**
 * Accordion with animated height (grid-rows 0fr → 1fr). Items open independently,
 * so closing one never shifts the item you just tapped. Answers stay in the DOM for search.
 */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set())
  const id = useId()
  const toggle = (i: number) =>
    setOpen((s) => {
      const next = new Set(s)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  return (
    <div className="border-t border-ink/80">
      {items.map((f, i) => {
        const on = open.has(i)
        return (
          <div key={f.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={on}
                aria-controls={`${id}-a${i}`}
                onClick={() => toggle(i)}
                className="group w-full flex items-center justify-between gap-5 sm:gap-6 py-5 sm:py-6 text-left focus-visible:outline-offset-[-2px] rounded-sm"
              >
                <span className={`text-[17px] sm:text-[20px] leading-snug font-medium tracking-[-0.02em] text-pretty transition-colors duration-200 ${on ? "text-ink" : "text-ink/90 group-hover:text-ink"}`}>{f.q}</span>
                <span
                  className={`h-9 w-9 shrink-0 rounded-full border flex items-center justify-center transition-[transform,background-color,color,border-color] duration-300 ease-[var(--ease-out)] group-active:scale-90 ${
                    on ? "rotate-45 bg-ink text-bone border-ink" : "border-line text-ink group-hover:border-ink"
                  }`}
                  aria-hidden
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`} className="grid disclose" data-open={on} inert={!on}>
              <div>
                <p className="pb-6 sm:pb-7 pr-12 sm:pr-16 text-[15.5px] sm:text-[16px] text-stone leading-relaxed max-w-2xl text-pretty">{f.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
