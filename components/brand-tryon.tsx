"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, RotateCcw } from "lucide-react"
import { site } from "@/config/site"

const SWATCHES = [
  { name: "Copper", value: site.brand.accent },
  { name: "Forest", value: "#2f5d46" },
  { name: "Navy", value: "#1f3f66" },
  { name: "Oxblood", value: "#7a2e2e" },
  { name: "Slate", value: "#3d4f63" },
  { name: "Ochre", value: "#8f6219" },
  { name: "Plum", value: "#5a3a5e" },
  { name: "Teal", value: "#1d5a5a" },
]
const KEY = "demo-accent"

function apply(value: string | null) {
  const root = document.documentElement
  if (value) root.style.setProperty("--accent", value)
  else root.style.setProperty("--accent", site.brand.accent)
  try {
    if (value && value !== site.brand.accent) localStorage.setItem(KEY, value)
    else localStorage.removeItem(KEY)
  } catch {}
}

export function BrandTryOn() {
  const [current, setCurrent] = useState<string>(site.brand.accent)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) setCurrent(saved)
    } catch {}
  }, [])

  const pick = (value: string) => {
    setCurrent(value)
    apply(value)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Brand colour">
        {SWATCHES.map((s) => {
          const on = current.toLowerCase() === s.value.toLowerCase()
          return (
            <button
              key={s.name}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => pick(s.value)}
              className={`group flex items-center gap-2.5 rounded-full border pl-1.5 pr-4 h-11 transition-colors duration-300 ${
                on ? "border-ink bg-paper" : "border-line hover:border-stone/50"
              }`}
            >
              <span className="h-8 w-8 rounded-full ring-1 ring-black/10" style={{ background: s.value }} aria-hidden />
              <span className="text-[14px] font-medium">{s.name}</span>
            </button>
          )
        })}
        <label className="flex items-center gap-2.5 rounded-full border border-line hover:border-stone/50 pl-1.5 pr-4 h-11 cursor-pointer">
          <input
            type="color"
            value={current}
            onChange={(e) => pick(e.target.value)}
            className="h-8 w-8 rounded-full overflow-hidden cursor-pointer border-0 p-0 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0"
            aria-label="Custom brand colour"
          />
          <span className="text-[14px] font-medium">Your colour</span>
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-8">
        <Link href="/" className="btn btn-accent">
          See the whole site in this colour
          <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
        </Link>
        <button type="button" onClick={() => pick(site.brand.accent)} className="btn btn-ghost">
          <RotateCcw className="h-4 w-4" aria-hidden /> Reset
        </button>
      </div>
    </div>
  )
}
