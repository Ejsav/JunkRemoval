"use client"

import type React from "react"
import { useId, useRef, useState } from "react"
import { upload } from "@vercel/blob/client"
import { AlertCircle, ArrowRight, Camera, CheckCircle2, Loader2, MessageSquare, Phone, X } from "lucide-react"
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

const empty: Fields = { name: "", phone: "", email: "", location: "", service: "", details: "", contactPref: "text" }
const MAX_EDGE = 1600

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = "Please enter your name."
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a 10-digit phone number."
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "That email doesn't look right."
  if (f.contactPref === "email" && !f.email) e.email = "Add an email, or pick call or text."
  if (f.location.trim().length < 3) e.location = "Please enter your city or ZIP."
  return e
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

export function QuoteForm() {
  const id = useId()
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([])
  const [showEmail, setShowEmail] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [progress, setProgress] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [uploadFailed, setUploadFailed] = useState(false)
  const started = useRef(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const { forms, business, builder, services, mode } = site
  const busy = status === "uploading" || status === "sending"

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onFirstInput = () => {
    if (started.current) return
    started.current = true
    trackEvent("quote_form_start")
  }

  const addPhotos = (list: FileList | null) => {
    if (!list) return
    const images = Array.from(list)
      .filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name))
      .map((file) => ({ file, url: URL.createObjectURL(file) }))
    setPhotos((p) => [...p, ...images].slice(0, forms.maxPhotos))
    setUploadFailed(false)
    if (fileInput.current) fileInput.current.value = ""
  }

  const removePhoto = (i: number) =>
    setPhotos((ps) => {
      URL.revokeObjectURL(ps[i].url)
      return ps.filter((_, j) => j !== i)
    })

  const send = async (skipPhotos: boolean) => {
    const v = validate(fields)
    setErrors(v)
    if (Object.keys(v).length) {
      trackEvent("quote_form_error", { reason: "validation" })
      document.getElementById(`${id}-${Object.keys(v)[0]}`)?.focus()
      return
    }

    setErrorMsg("")
    const toUpload = skipPhotos ? [] : photos.map((p) => p.file)
    let photoUrls: string[] = []

    if (toUpload.length) {
      setStatus("uploading")
      try {
        for (let i = 0; i < toUpload.length; i++) {
          setProgress(`Uploading photo ${i + 1} of ${toUpload.length}…`)
          const file = await shrink(toUpload[i])
          const safeName = file.name.replace(/[^\w.-]/g, "_").slice(-60)
          const blob = await upload(`quote-photos/${safeName}`, file, { access: "public", handleUploadUrl: "/api/upload" })
          photoUrls.push(blob.url)
        }
      } catch {
        trackEvent("photo_upload_error")
        setUploadFailed(true)
        setStatus("error")
        setErrorMsg("Your photos couldn't upload. You can send the request without them and text the photos instead.")
        return
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
      setStatus("success")
    } catch {
      trackEvent("quote_form_error", { reason: "network" })
      setStatus("error")
      setErrorMsg(`Something went wrong sending your request. Please call or text ${business.phoneDisplay} and we'll get you a price right away.`)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void send(false)
  }

  if (status === "success") {
    return (
      <div className="text-center py-10" role="status" aria-live="polite">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-2 ring-success/20">
          <CheckCircle2 className="w-8 h-8 text-success" aria-hidden />
        </div>
        <h3 className="text-2xl font-black text-foreground mb-2">Request received.</h3>
        <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
          {mode === "live"
            ? `We'll ${fields.contactPref === "call" ? "call" : fields.contactPref === "email" ? "email" : "text"} you shortly with your price.`
            : `This is a demo, so your request went to ${builder.name}, not a real crew. Everything else works exactly like it will on a live site.`}
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Need it faster?{" "}
          <a href={phoneHref} className="font-black text-foreground underline underline-offset-4">
            Call {business.phoneDisplay}
          </a>
        </p>
      </div>
    )
  }

  const input =
    "w-full h-12 rounded-xl border bg-background px-4 text-[16px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition-shadow aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20"
  const label = "block text-xs font-black text-foreground uppercase tracking-[0.08em] mb-2"
  const err = (k: keyof Fields) =>
    errors[k] && (
      <p id={`${id}-${k}-err`} className="mt-1.5 text-sm text-destructive font-medium">
        {errors[k]}
      </p>
    )
  const a11y = (k: keyof Fields) => ({
    id: `${id}-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined,
  })

  return (
    <form onSubmit={onSubmit} onFocus={onFirstInput} noValidate className="flex flex-col gap-5" aria-busy={busy}>
      <input ref={honeypot} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${id}-name`} className={label}>Name *</label>
          <input {...a11y("name")} className={input} autoComplete="name" value={fields.name} onChange={(e) => set("name", e.target.value)} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>Phone *</label>
          <input {...a11y("phone")} className={input} type="tel" inputMode="tel" autoComplete="tel" value={fields.phone} onChange={(e) => set("phone", e.target.value)} />
          {err("phone")}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${id}-location`} className={label}>City or ZIP *</label>
          <input {...a11y("location")} className={input} autoComplete="postal-code" value={fields.location} onChange={(e) => set("location", e.target.value)} />
          {err("location")}
        </div>
        <div>
          <label htmlFor={`${id}-service`} className={label}>What needs to go?</label>
          <select {...a11y("service")} className={`${input} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat`} value={fields.service} onChange={(e) => set("service", e.target.value)}>
            <option value="">Not sure / a mix</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-details`} className={label}>Details</label>
        <textarea
          {...a11y("details")}
          rows={3}
          className={`${input} h-auto py-3 resize-none`}
          placeholder="Items, rough amount, stairs or access notes, preferred day…"
          value={fields.details}
          onChange={(e) => set("details", e.target.value)}
        />
      </div>

      {forms.photoUploads && (
        <div>
          <p className={label}>Photos <span className="normal-case tracking-normal font-semibold text-muted-foreground">(optional, fastest way to a firm price)</span></p>
          <div className="flex flex-wrap gap-3">
            {photos.map((p, i) => (
              <div key={p.url} className="relative h-20 w-20 rounded-xl overflow-hidden border border-border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-foreground/80 text-background flex items-center justify-center"
                  aria-label={`Remove photo ${i + 1}`}
                  disabled={busy}
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            ))}
            {photos.length < forms.maxPhotos && (
              <label className="h-20 w-20 rounded-xl border-2 border-dashed border-border hover:border-accent/60 hover:bg-accent/5 flex flex-col items-center justify-center gap-1 cursor-pointer text-muted-foreground transition-colors focus-within:ring-2 focus-within:ring-ring/40">
                <Camera className="h-5 w-5" aria-hidden />
                <span className="text-[11px] font-bold">Add</span>
                <input ref={fileInput} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} disabled={busy} />
              </label>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Up to {forms.maxPhotos} photos. Wide shots of the whole pile work best.</p>
        </div>
      )}

      <fieldset>
        <legend className={label}>Best way to reach you</legend>
        <div className="grid grid-cols-3 gap-2">
          {(["text", "call", "email"] as const).map((pref) => (
            <label
              key={pref}
              className="h-11 rounded-xl border border-border flex items-center justify-center font-bold text-sm capitalize cursor-pointer has-[:checked]:bg-foreground has-[:checked]:text-background has-[:checked]:border-foreground has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40 transition-colors"
            >
              <input type="radio" name="contactPref" value={pref} checked={fields.contactPref === pref} onChange={() => set("contactPref", pref)} className="sr-only" />
              {pref}
            </label>
          ))}
        </div>
      </fieldset>

      {showEmail || fields.contactPref === "email" ? (
        <div>
          <label htmlFor={`${id}-email`} className={label}>Email{fields.contactPref === "email" ? " *" : ""}</label>
          <input {...a11y("email")} className={input} type="email" autoComplete="email" value={fields.email} onChange={(e) => set("email", e.target.value)} />
          {err("email")}
        </div>
      ) : (
        <button type="button" onClick={() => setShowEmail(true)} className="self-start text-sm font-bold text-muted-foreground hover:text-foreground underline underline-offset-4 -mt-2">
          + Add an email (optional)
        </button>
      )}

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" aria-hidden />
          <div className="text-sm">
            <p className="font-bold text-foreground mb-2">{errorMsg}</p>
            <div className="flex flex-wrap gap-3">
              {uploadFailed && (
                <button
                  type="button"
                  onClick={() => void send(true)}
                  className="font-black text-foreground underline underline-offset-4"
                >
                  Send without photos
                </button>
              )}
              <a href={phoneHref} className="inline-flex items-center gap-1 font-black text-foreground underline underline-offset-4">
                <Phone className="h-3.5 w-3.5" aria-hidden /> Call
              </a>
              {business.textEnabled && (
                <a href={smsHref} className="inline-flex items-center gap-1 font-black text-foreground underline underline-offset-4">
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden /> Text photos
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-black text-base h-14 rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-wait"
      >
        {busy ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            <span aria-live="polite">{progress}</span>
          </>
        ) : (
          <>
            {photos.length ? "Get My Photo Estimate" : "Get My Free Quote"}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </>
        )}
      </button>
      <p className="text-xs text-center text-muted-foreground leading-snug -mt-1">
        No obligation. Your details are only used to quote and schedule your job.
      </p>
    </form>
  )
}
