"use client"

import type React from "react"
import { useEffect, useId, useRef, useState } from "react"
import { upload } from "@vercel/blob/client"
import { AlertCircle, ArrowRight, Camera, Check, CheckCircle2, ImagePlus, Loader2, Mail, MessageSquare, Phone, RotateCcw, X } from "lucide-react"
import { site, phoneHref, smsHref } from "@/config/site"
import { trackEvent } from "@/lib/track"

type Fields = {
  name: string
  phone: string
  email: string
  location: string
  service: string
  details: string
  contactPref: "call" | "text" | "email"
}
type Errors = Partial<Record<keyof Fields, string>>
type Status = "idle" | "uploading" | "sending" | "success" | "error"
type Photo = { file: File; url: string; state: "ready" | "uploading" | "done" | "failed" }

const empty: Fields = { name: "", phone: "", email: "", location: "", service: "", details: "", contactPref: "text" }
const MAX_EDGE = 1600
const REQUIRED: (keyof Fields)[] = ["name", "phone", "location"]

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = "Please enter your name."
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a 10-digit phone number."
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "That email doesn't look right."
  if (f.contactPref === "email" && !f.email) e.email = "Add an email, or pick call or text."
  if (f.location.trim().length < 3) e.location = "Please enter your city or ZIP."
  return e
}

/** Formats US numbers as the user types: 4078017886 → (407) 801-7886. */
function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "")
  if (d.length > 10 && d.startsWith("1")) d = d.slice(1)
  d = d.slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

async function shrink(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/heic" || file.type === "image/heif") return file
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
    if (scale === 1 && file.size < 1.5 * 1024 * 1024) return file
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82))
    return blob ? new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }) : file
  } catch {
    return file
  }
}

function GroupTitle({ n, children, hint }: { n: string; children: React.ReactNode; hint?: string }) {
  return (
    <legend className="w-full flex items-baseline justify-between gap-3 mb-4">
      <span className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em] text-ink">
        <span className="h-6 w-6 rounded-full bg-ink text-bone font-mono text-[10.5px] flex items-center justify-center" aria-hidden>{n}</span>
        {children}
      </span>
      {hint && <span className="text-[12.5px] text-stone">{hint}</span>}
    </legend>
  )
}

export function QuoteForm({ uploads }: { uploads: boolean }) {
  const id = useId()
  const [fields, setFields] = useState<Fields>(empty)
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [progress, setProgress] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [uploadFailed, setUploadFailed] = useState(false)
  const [shake, setShake] = useState(false)
  const [sentPhotos, setSentPhotos] = useState(0)
  const started = useRef(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const successHeading = useRef<HTMLHeadingElement>(null)
  const { forms, business, builder, services, mode } = site
  const busy = status === "uploading" || status === "sending"

  const allErrors = validate(fields)
  // Errors appear once a field has been left (or after a submit attempt), never while typing the first character.
  const shown = (k: keyof Fields) => (touched[k] || submitted ? allErrors[k] : undefined)
  const errorCount = submitted ? Object.keys(allErrors).length : 0

  useEffect(() => {
    if (status !== "success") return
    root.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    successHeading.current?.focus({ preventScroll: true })
  }, [status])

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), []) // eslint-disable-line react-hooks/exhaustive-deps

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => setFields((f) => ({ ...f, [key]: value }))
  const blur = (k: keyof Fields) => () => fields[k] && setTouched((t) => ({ ...t, [k]: true }))

  const onFirstInput = () => {
    if (started.current) return
    started.current = true
    trackEvent("quote_form_start")
  }

  const addPhotos = (list: FileList | null) => {
    if (!list) return
    const images = Array.from(list)
      .filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name))
      .map((file) => ({ file, url: URL.createObjectURL(file), state: "ready" as const }))
    setPhotos((p) => {
      const next = [...p, ...images]
      next.slice(forms.maxPhotos).forEach((x) => URL.revokeObjectURL(x.url))
      return next.slice(0, forms.maxPhotos)
    })
    setUploadFailed(false)
    if (fileInput.current) fileInput.current.value = ""
  }

  const removePhoto = (i: number) =>
    setPhotos((ps) => {
      URL.revokeObjectURL(ps[i].url)
      return ps.filter((_, j) => j !== i)
    })

  const setPhotoState = (i: number, state: Photo["state"]) => setPhotos((ps) => ps.map((p, j) => (j === i ? { ...p, state } : p)))

  const send = async (skipPhotos: boolean) => {
    setSubmitted(true)
    const v = validate(fields)
    if (Object.keys(v).length) {
      trackEvent("quote_form_error", { reason: "validation" })
      setShake(true)
      setTimeout(() => setShake(false), 320)
      const first = (Object.keys(empty) as (keyof Fields)[]).find((k) => v[k])
      document.getElementById(`${id}-${first}`)?.focus()
      return
    }

    setErrorMsg("")
    const toUpload = skipPhotos ? [] : photos
    const photoUrls: string[] = []

    if (toUpload.length) {
      setStatus("uploading")
      for (let i = 0; i < toUpload.length; i++) {
        setProgress(`Uploading photo ${i + 1} of ${toUpload.length}…`)
        setPhotoState(i, "uploading")
        try {
          const file = await shrink(toUpload[i].file)
          const safeName = file.name.replace(/[^\w.-]/g, "_").slice(-60)
          const blob = await upload(`quote-photos/${safeName}`, file, { access: "public", handleUploadUrl: "/api/upload" })
          photoUrls.push(blob.url)
          setPhotoState(i, "done")
        } catch {
          setPhotoState(i, "failed")
          trackEvent("photo_upload_error")
          setUploadFailed(true)
          setStatus("error")
          setErrorMsg("Your photos couldn't upload. You can send the request without them and text the photos instead.")
          return
        }
      }
    }

    setStatus("sending")
    setProgress("Sending your request…")
    try {
      const serviceTitle = services.find((s) => s.slug === fields.service)?.title ?? "Not sure"
      const res = await fetch(`https://formspree.io/f/${forms.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New quote request: ${fields.name} (${fields.location})`,
          _gotcha: honeypot.current?.value,
          name: fields.name,
          phone: fields.phone,
          email: fields.email || undefined,
          _replyto: fields.email || undefined,
          location: fields.location,
          service: serviceTitle,
          details: fields.details,
          preferred_contact: fields.contactPref,
          photos: photoUrls.length ? photoUrls.join("\n") : "None",
          site: `${business.name} (${mode})`,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      trackEvent("quote_form_submit", { service: serviceTitle, photos: photoUrls.length })
      if (photoUrls.length) trackEvent("photo_estimate_submit", { photos: photoUrls.length })
      setSentPhotos(photoUrls.length)
      setStatus("success")
    } catch {
      trackEvent("quote_form_error", { reason: "network" })
      setStatus("error")
      setErrorMsg(`Something went wrong sending your request. Please call or text ${business.phoneDisplay} and we'll get you a price right away.`)
    }
  }

  const reset = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url))
    setFields(empty)
    setTouched({})
    setSubmitted(false)
    setPhotos([])
    setShowEmail(false)
    setStatus("idle")
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!busy) void send(false)
  }

  const replyBy = fields.contactPref === "call" ? "call" : fields.contactPref === "email" ? "email" : "text"

  if (status === "success") {
    const next = [
      ["We review your request", sentPhotos ? `Including your ${sentPhotos === 1 ? "photo" : `${sentPhotos} photos`}.` : "We look over the details you sent."],
      ["You get a firm price", `By ${replyBy}, with an arrival window.`],
      ["You decide", "Book it, or don't. No obligation."],
    ]
    return (
      <div ref={root} className="fade scroll-mt-28 py-4 sm:py-6" role="status" aria-live="polite">
        <div className="pop h-16 w-16 rounded-full bg-success/10 ring-8 ring-success/[0.06] flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-success" aria-hidden />
        </div>
        <h3 ref={successHeading} tabIndex={-1} className="text-[26px] sm:text-[28px] font-semibold tracking-[-0.03em] text-ink leading-tight outline-none">
          Request received{fields.name ? `, ${fields.name.trim().split(" ")[0]}` : ""}.
        </h3>
        <p className="text-[15.5px] text-stone leading-relaxed mt-2 max-w-md text-pretty">
          {mode === "live"
            ? `We'll ${replyBy} you at ${fields.contactPref === "email" ? fields.email : fields.phone} shortly with your price.`
            : `This is a demo, so your request went to ${builder.name}, not a real crew. Everything else works exactly like it will on a live site.`}
        </p>

        <ol className="mt-8 border-t border-line">
          {next.map(([title, text], i) => (
            <li key={title} className="flex gap-4 py-4 border-b border-line">
              <span className="h-6 w-6 shrink-0 rounded-full border border-line font-mono text-[10.5px] text-ink flex items-center justify-center mt-0.5">{i + 1}</span>
              <span>
                <span className="block text-[15px] font-medium text-ink">{title}</span>
                <span className="block text-[14px] text-stone mt-0.5">{text}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href={phoneHref} className="btn btn-ink">
            <Phone className="h-4 w-4" aria-hidden /> Need it faster? Call
          </a>
          <button type="button" onClick={reset} className="btn btn-ghost">
            <RotateCcw className="h-4 w-4" aria-hidden /> Send another request
          </button>
        </div>
      </div>
    )
  }

  const input =
    "peer w-full h-[52px] rounded-xl border border-line bg-bone/50 px-4 text-[16px] text-ink placeholder:text-stone/55 transition-[border-color,box-shadow,background-color] duration-200 hover:border-stone/40 focus:outline-none focus:bg-paper focus:border-ink focus:ring-4 focus:ring-accent/10 aria-[invalid=true]:border-destructive aria-[invalid=true]:bg-destructive/[0.03] aria-[invalid=true]:focus:ring-destructive/10 disabled:opacity-60"
  const label = "flex items-baseline justify-between text-[13.5px] font-medium text-ink mb-2"

  const err = (k: keyof Fields) =>
    shown(k) && (
      <p id={`${id}-${k}-err`} className="fade mt-2 flex items-center gap-1.5 text-[13.5px] text-destructive font-medium">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {shown(k)}
      </p>
    )
  const a11y = (k: keyof Fields) => ({
    id: `${id}-${k}`,
    name: k,
    "aria-invalid": shown(k) ? true : undefined,
    "aria-describedby": shown(k) ? `${id}-${k}-err` : undefined,
    "aria-required": REQUIRED.includes(k) || undefined,
    onBlur: blur(k),
    disabled: busy,
  })
  const okMark = (k: keyof Fields) =>
    touched[k] && !allErrors[k] && fields[k] ? (
      <Check className="fade pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-success" aria-hidden />
    ) : null
  const req = <span className="text-[12px] font-normal text-stone">Required</span>

  const serviceOptions = [...services.map((s) => ({ value: s.slug, label: s.title })), { value: "", label: "Not sure / a mix" }]

  return (
    <div ref={root} className="scroll-mt-28">
      <form onSubmit={onSubmit} onFocus={onFirstInput} noValidate className="flex flex-col gap-8" aria-busy={busy}>
        <input ref={honeypot} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        {/* ── 1. The job ─────────────────────────── */}
        <fieldset className="min-w-0" disabled={busy}>
          <GroupTitle n="1">The job</GroupTitle>

          <p className={label} id={`${id}-svc`}>What needs to go?</p>
          <div role="radiogroup" aria-labelledby={`${id}-svc`} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {serviceOptions.map((o) => {
              const on = fields.service === o.value
              return (
                <label
                  key={o.label}
                  className={`group flex items-center gap-2.5 min-h-[52px] px-3.5 py-2.5 rounded-xl border text-[13.5px] sm:text-[14px] leading-tight font-medium cursor-pointer select-none transition-[background-color,border-color,color,transform,box-shadow] duration-200 active:scale-[0.98] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/20 ${
                    o.value === "" ? "col-span-2 sm:col-span-3" : ""
                  } ${on ? "bg-ink border-ink text-bone shadow-[0_6px_16px_-8px_rgb(14_15_14/0.5)]" : "bg-bone/50 border-line text-ink hover:border-stone/50 hover:bg-paper"}`}
                >
                  <input type="radio" name="service" value={o.value} checked={on} onChange={() => set("service", o.value)} className="sr-only" />
                  <span
                    className={`h-4 w-4 shrink-0 rounded-full flex items-center justify-center transition-colors duration-200 ${on ? "bg-accent-soft text-ink" : "border border-stone/40"}`}
                    aria-hidden
                  >
                    {on && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
                  </span>
                  {o.label}
                </label>
              )
            })}
          </div>

          <div className="mt-5">
            <label htmlFor={`${id}-details`} className={label}>
              <span>Details</span>
              <span className="text-[12px] font-normal text-stone">Optional</span>
            </label>
            <textarea
              {...a11y("details")}
              rows={3}
              enterKeyHint="next"
              className={`${input} h-auto min-h-[104px] py-3.5 leading-relaxed resize-none [field-sizing:content]`}
              placeholder="Rough amount, stairs or access notes, preferred day…"
              value={fields.details}
              onChange={(e) => set("details", e.target.value)}
            />
          </div>

          {!uploads && business.textEnabled && (
            <a
              href={smsHref}
              className="group mt-4 flex items-center gap-3.5 rounded-2xl border border-dashed border-stone/35 bg-bone/40 p-4 transition-colors duration-200 hover:border-ink hover:bg-paper"
            >
              <span className="h-10 w-10 shrink-0 rounded-full bg-paper border border-line flex items-center justify-center text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-bone group-hover:border-ink">
                <Camera className="h-4 w-4" aria-hidden />
              </span>
              <span className="min-w-0 text-[14px] leading-snug">
                <span className="block font-medium text-ink">Have photos? Text them for the fastest price.</span>
                <span className="block text-stone whitespace-nowrap">{business.phoneDisplay}</span>
              </span>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-stone transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden />
            </a>
          )}

          {uploads && (
            <div className="mt-5">
              <p className={label}>
                <span>Photos</span>
                <span className="text-[12px] font-normal text-stone tabular-nums">
                  {photos.length ? `${photos.length} of ${forms.maxPhotos}` : "Optional · fastest way to a firm price"}
                </span>
              </p>

              {photos.length === 0 ? (
                <label
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragOver(false)
                    addPhotos(e.dataTransfer.files)
                  }}
                  className={`flex items-center gap-4 rounded-2xl border border-dashed p-4 sm:p-5 cursor-pointer transition-[background-color,border-color,transform] duration-200 active:scale-[0.99] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/20 ${
                    dragOver ? "border-accent bg-accent-wash" : "border-stone/35 bg-bone/40 hover:border-ink hover:bg-paper"
                  }`}
                >
                  <span className="h-12 w-12 shrink-0 rounded-full bg-paper border border-line flex items-center justify-center text-ink">
                    <ImagePlus className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-[14px] leading-snug">
                    <span className="block font-medium text-ink">Add photos of the items</span>
                    <span className="block text-stone">Camera or library · wide shots work best</span>
                  </span>
                  <input ref={fileInput} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} disabled={busy} />
                </label>
              ) : (
                <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {photos.map((p, i) => (
                    <li key={p.url} className="fade relative aspect-square rounded-xl overflow-hidden ring-1 ring-line bg-sand">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt={`Photo ${i + 1}`} className={`h-full w-full object-cover transition-opacity duration-300 ${p.state === "uploading" ? "opacity-60" : ""}`} />
                      {p.state === "uploading" && (
                        <span className="absolute inset-0 flex items-center justify-center bg-ink/30">
                          <Loader2 className="h-5 w-5 text-bone animate-spin" aria-hidden />
                        </span>
                      )}
                      {p.state === "done" && (
                        <span className="pop absolute bottom-1.5 left-1.5 h-6 w-6 rounded-full bg-success text-white flex items-center justify-center">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                        </span>
                      )}
                      {p.state === "failed" && (
                        <span className="absolute inset-0 flex items-center justify-center bg-destructive/40">
                          <AlertCircle className="h-5 w-5 text-white" aria-hidden />
                        </span>
                      )}
                      {!busy && (
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-ink/75 text-bone backdrop-blur flex items-center justify-center transition-[background-color,transform] duration-150 hover:bg-ink active:scale-90"
                          aria-label={`Remove photo ${i + 1}`}
                        >
                          <X className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      )}
                    </li>
                  ))}
                  {photos.length < forms.maxPhotos && !busy && (
                    <li>
                      <label className="h-full aspect-square rounded-xl border border-dashed border-stone/40 bg-bone/50 hover:border-ink hover:bg-paper flex flex-col items-center justify-center gap-1 cursor-pointer text-stone hover:text-ink transition-colors duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/20">
                        <Camera className="h-5 w-5" aria-hidden />
                        <span className="text-[12px] font-medium">Add more</span>
                        <input ref={fileInput} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} />
                      </label>
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}
        </fieldset>

        {/* ── 2. You ─────────────────────────────── */}
        <fieldset className="min-w-0" disabled={busy}>
          <GroupTitle n="2">Where &amp; how to reach you</GroupTitle>

          <div className="grid gap-5">
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-4">
              <div>
                <label htmlFor={`${id}-name`} className={label}>
                  <span>Name</span>
                  {req}
                </label>
                <div className="relative">
                  <input {...a11y("name")} className={input} autoComplete="name" autoCapitalize="words" enterKeyHint="next" value={fields.name} onChange={(e) => set("name", e.target.value)} />
                  {okMark("name")}
                </div>
                {err("name")}
              </div>
              <div>
                <label htmlFor={`${id}-phone`} className={label}>
                  <span>Phone</span>
                  {req}
                </label>
                <div className="relative">
                  <input
                    {...a11y("phone")}
                    className={`${input} tabular-nums`}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    enterKeyHint="next"
                    placeholder="(555) 555-5555"
                    value={fields.phone}
                    onChange={(e) => set("phone", formatPhone(e.target.value))}
                  />
                  {okMark("phone")}
                </div>
                {err("phone")}
              </div>
            </div>

            <div>
              <label htmlFor={`${id}-location`} className={label}>
                <span>City or ZIP</span>
                {req}
              </label>
              <div className="relative">
                <input
                  {...a11y("location")}
                  className={input}
                  autoComplete="address-level2"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  placeholder={`e.g. ${business.address.city}`}
                  value={fields.location}
                  onChange={(e) => set("location", e.target.value)}
                />
                {okMark("location")}
              </div>
              {err("location")}
            </div>

            <div>
              <p className={label} id={`${id}-pref`}>Best way to reach you</p>
              <div role="radiogroup" aria-labelledby={`${id}-pref`} className="grid grid-cols-3 gap-1 p-1 rounded-full bg-bone/70 border border-line">
                {([
                  ["text", "Text", MessageSquare],
                  ["call", "Call", Phone],
                  ["email", "Email", Mail],
                ] as const).map(([pref, text, Icon]) => (
                  <label
                    key={pref}
                    className="h-11 rounded-full flex items-center justify-center gap-2 text-[14px] font-medium cursor-pointer text-stone select-none transition-[background-color,color,box-shadow,transform] duration-200 hover:text-ink active:scale-[0.97] has-[:checked]:bg-ink has-[:checked]:text-bone has-[:checked]:shadow-[0_4px_12px_-4px_rgb(14_15_14/0.35)] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/25"
                  >
                    <input type="radio" name="contactPref" value={pref} checked={fields.contactPref === pref} onChange={() => set("contactPref", pref)} className="sr-only" />
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {text}
                  </label>
                ))}
              </div>
            </div>

            {showEmail || fields.contactPref === "email" ? (
              <div className="fade">
                <label htmlFor={`${id}-email`} className={label}>
                  <span>Email</span>
                  {fields.contactPref === "email" ? req : <span className="text-[12px] font-normal text-stone">Optional</span>}
                </label>
                <div className="relative">
                  <input
                    {...a11y("email")}
                    className={input}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="off"
                    enterKeyHint="send"
                    value={fields.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  {okMark("email")}
                </div>
                {err("email")}
              </div>
            ) : (
              <button type="button" onClick={() => setShowEmail(true)} className="justify-self-start -mt-1 py-1 text-[13.5px] text-stone hover:text-ink link-draw">
                + Add an email for a written quote
              </button>
            )}
          </div>
        </fieldset>

        <div className="flex flex-col gap-3">
          {errorCount > 0 && status !== "error" && (
            <p role="alert" className="fade flex items-center gap-2 text-[14px] font-medium text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
              {errorCount === 1 ? "One field needs a fix above." : `${errorCount} fields need a fix above.`}
            </p>
          )}

          {status === "error" && (
            <div role="alert" className="fade rounded-2xl border border-destructive/25 bg-destructive/[0.04] p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" aria-hidden />
              <div className="text-[14px] min-w-0">
                <p className="font-medium text-ink leading-snug">{errorMsg}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {uploadFailed && (
                    <button type="button" onClick={() => void send(true)} className="btn btn-ink !h-10 !px-4 !text-[13.5px]">
                      Send without photos
                    </button>
                  )}
                  <a href={phoneHref} className="btn btn-ghost !h-10 !px-4 !text-[13.5px]">
                    <Phone className="h-3.5 w-3.5" aria-hidden /> Call
                  </a>
                  {business.textEnabled && (
                    <a href={smsHref} className="btn btn-ghost !h-10 !px-4 !text-[13.5px]">
                      <MessageSquare className="h-3.5 w-3.5" aria-hidden /> Text photos
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          <button type="submit" disabled={busy} className={`btn btn-accent w-full !h-14 !text-[16px] disabled:!opacity-80 disabled:!cursor-wait ${shake ? "shake" : ""}`}>
            {busy ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                {progress}
              </>
            ) : (
              <>
                {photos.length ? "Get my photo estimate" : "Get my free quote"}
                <ArrowRight className="btn-arrow h-5 w-5" aria-hidden />
              </>
            )}
          </button>
          <span className="sr-only" aria-live="polite">{busy ? progress : ""}</span>
          <p className="text-[12.5px] text-center text-stone leading-snug text-balance">
            No obligation. Your details are only used to quote and schedule your job.
          </p>
        </div>
      </form>
    </div>
  )
}
