"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ImagePlus, RotateCcw } from "lucide-react"
import { site } from "@/config/site"
import { offer } from "@/config/offer"
import { clearPreview, formatPhone, phoneToE164, savePreview, usePreview, type Preview } from "@/lib/preview"
import { trackEvent } from "@/lib/track"

const SWATCHES = [
  { name: "Copper", value: site.brand.accent },
  { name: "Forest", value: "#2f5d46" },
  { name: "Navy", value: "#1f3f66" },
  { name: "Oxblood", value: "#7a2e2e" },
  { name: "Slate", value: "#3d4f63" },
  { name: "Ochre", value: "#8f6219" },
  { name: "Teal", value: "#1d5a5a" },
]

/** Reads an image and returns a downscaled data URL, small enough for browser storage. */
async function toDataUrl(file: File, maxEdge: number, type: "image/png" | "image/jpeg") {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL(type, 0.8)
}

export function PreviewStudio() {
  const preview = usePreview()
  const [draft, setDraft] = useState<Preview>({})
  const [note, setNote] = useState("")
  const tracked = useRef(new Set<string>())
  const frameBox = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.78)

  // Hydrate inputs from a saved preview once.
  const loaded = useRef(false)
  useEffect(() => {
    if (loaded.current || !preview) return
    loaded.current = true
    setDraft({ name: preview.name, city: preview.city, phone: preview.phone })
  }, [preview])

  // Fit the 390px phone viewport into whatever width the column has.
  useEffect(() => {
    const el = frameBox.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(Math.min(0.82, e.contentRect.width / 390)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const track = (field: string) => {
    if (tracked.current.has(field)) return
    tracked.current.add(field)
    trackEvent("preview_customise", { field })
  }

  const setText = (key: "name" | "city" | "phone", value: string) => {
    const v = key === "phone" ? formatPhone(value) : value.slice(0, 40)
    setDraft((d) => ({ ...d, [key]: v }))
    // A phone only applies once it's a full number, so the site never shows a broken tel: link.
    savePreview({ [key]: key === "phone" ? (phoneToE164(v) ? v : "") : v.trim() })
    track(key)
  }

  const setImage = async (key: "logo" | "hero", file?: File) => {
    if (!file) return
    try {
      const url = key === "logo" ? await toDataUrl(file, 192, "image/png") : await toDataUrl(file, 1400, "image/jpeg")
      setNote(savePreview({ [key]: url }) ? "" : "That image is too large for this browser's preview. Try a smaller one.")
      track(key)
    } catch {
      setNote("That file couldn't be read. Try a JPG or PNG.")
    }
  }

  const accent = preview?.accent || site.brand.accent
  const field = "w-full h-12 rounded-xl border border-line bg-paper px-4 text-[16px] text-ink placeholder:text-stone/60 focus:outline-none focus:border-ink focus:ring-4 focus:ring-accent/10 transition-[border-color,box-shadow]"
  const lbl = "block text-[13px] font-medium mb-2"
  const fileBtn = "flex-1 flex items-center gap-2.5 h-12 rounded-xl border border-dashed border-stone/40 bg-paper px-4 text-[14px] text-stone hover:border-ink hover:text-ink cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40"

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      <div className="lg:col-span-6 xl:col-span-5 grid gap-5">
        <div>
          <label htmlFor="pv-name" className={lbl}>Business name</label>
          <input id="pv-name" className={field} placeholder={site.business.name} value={draft.name ?? ""} onChange={(e) => setText("name", e.target.value)} autoComplete="organization" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pv-city" className={lbl}>Main city</label>
            <input id="pv-city" className={field} placeholder={site.business.address.city} value={draft.city ?? ""} onChange={(e) => setText("city", e.target.value)} autoComplete="address-level2" />
          </div>
          <div>
            <label htmlFor="pv-phone" className={lbl}>Business phone</label>
            <input id="pv-phone" className={field} type="tel" inputMode="tel" placeholder={site.business.phoneDisplay} value={draft.phone ?? ""} onChange={(e) => setText("phone", e.target.value)} />
          </div>
        </div>

        <fieldset>
          <legend className={lbl}>Brand colour</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Brand colour">
            {SWATCHES.map((s) => {
              const on = accent.toLowerCase() === s.value.toLowerCase()
              return (
                <button
                  key={s.name}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  aria-label={s.name}
                  title={s.name}
                  onClick={() => {
                    savePreview({ accent: s.value === site.brand.accent ? "" : s.value })
                    track("accent")
                  }}
                  className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-colors ${on ? "border-ink" : "border-transparent hover:border-line"}`}
                >
                  <span className="h-8 w-8 rounded-full ring-1 ring-black/10" style={{ background: s.value }} aria-hidden />
                </button>
              )
            })}
            <label className="h-11 flex items-center gap-2 rounded-full border border-line hover:border-stone/50 pl-1.5 pr-3.5 cursor-pointer has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40">
              <input
                type="color"
                value={accent}
                onChange={(e) => {
                  savePreview({ accent: e.target.value })
                  track("accent")
                }}
                className="h-8 w-8 rounded-full overflow-hidden cursor-pointer border-0 p-0 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0"
                aria-label="Custom brand colour"
              />
              <span className="text-[14px] font-medium">Exact</span>
            </label>
          </div>
        </fieldset>

        <div className="flex flex-col sm:flex-row gap-3">
          <label className={fileBtn}>
            {preview?.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview.logo} alt="" className="h-7 w-7 rounded-md object-contain bg-bone" />
            ) : (
              <ImagePlus className="h-4 w-4" aria-hidden />
            )}
            <span>{preview?.logo ? "Change logo" : "Add your logo"}</span>
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => setImage("logo", e.target.files?.[0])} />
          </label>
          <label className={fileBtn}>
            {preview?.hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview.hero} alt="" className="h-7 w-7 rounded-md object-cover" />
            ) : (
              <ImagePlus className="h-4 w-4" aria-hidden />
            )}
            <span>{preview?.hero ? "Change photo" : "Add a truck or crew photo"}</span>
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => setImage("hero", e.target.files?.[0])} />
          </label>
        </div>
        <p className="text-[13px] text-stone -mt-1" aria-live="polite">
          {note || "Everything stays in this browser. Nothing is uploaded or sent."}
        </p>

        {preview?.name ? (
          <div className="rounded-2xl bg-ink text-bone p-6 mt-2" role="status">
            <p className="eyebrow !text-[10px] text-accent-soft">Your preview</p>
            <p className="text-[20px] font-semibold tracking-[-0.02em] mt-2 leading-snug">
              {preview.name} could be live on this system in {offer.turnaround}.
            </p>
            <p className="text-[14.5px] text-mist mt-2">The build is done. What&apos;s left is your real photos, reviews, prices and domain.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Link href="/" className="btn btn-accent !h-12">
                Browse the full site as {preview.name.length > 18 ? "yours" : preview.name}
                <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
              </Link>
              <a href="#preview-request" className="btn btn-ghost-dark !h-12">Send me this preview</a>
            </div>
          </div>
        ) : (
          <Link href="/" className="btn btn-ghost self-start mt-1">
            Browse the full demo site
            <ArrowRight className="btn-arrow h-4 w-4" aria-hidden />
          </Link>
        )}

        {preview && (
          <button
            type="button"
            onClick={() => {
              clearPreview()
              setDraft({})
              setNote("")
            }}
            className="self-start inline-flex items-center gap-2 text-[13.5px] text-stone hover:text-ink link-draw"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset to the demo company
          </button>
        )}
      </div>

      <div className="lg:col-span-6 xl:col-span-6 xl:col-start-7 flex justify-center lg:sticky lg:top-24" ref={frameBox}>
        <PhoneFrame scale={scale} />
      </div>
    </div>
  )
}

function PhoneFrame({ scale }: { scale: number }) {
  const w = 390
  const h = 780
  return (
    <div
      className="relative rounded-[46px] bg-ink p-[10px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.45)] ring-1 ring-black/10"
      style={{ width: w * scale + 20, height: h * scale + 20 } as React.CSSProperties}
    >
      <div className="relative overflow-hidden rounded-[36px] bg-bone" style={{ width: w * scale, height: h * scale }}>
        <iframe
          src="/"
          title="Live preview of the customer website"
          loading="lazy"
          className="origin-top-left border-0"
          style={{ width: w, height: h, transform: `scale(${scale})` }}
        />
      </div>
      <span className="absolute -bottom-9 inset-x-0 text-center eyebrow !text-[10px] text-stone">Live · scroll and tap inside</span>
    </div>
  )
}
