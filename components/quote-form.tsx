"use client"

import type React from "react"
import { useEffect, useId, useRef, useState } from "react"
import { upload } from "@vercel/blob/client"
import { AlertCircle, ArrowRight, Camera, Check, Loader2, MessageSquare, Phone, Plus, X } from "lucide-react"
import { site } from "@/config/site"
import { trackEvent, getLeadSource } from "@/lib/track"
import { formatPhone } from "@/lib/preview"
import { BizName, BizPhone, CallLink, TextLink } from "@/components/biz"

type Fields = {
  service: string
  name: string
  phone: string
  location: string
  details: string
  contactPref: "text" | "call" | "email"
  email: string
}
type Errors = Partial<Record<keyof Fields, string>>
type Status = "idle" | "uploading" | "sending" | "success" | "error"
type Photo = { file: File; url: string }

const MAX_EDGE = 1600
const MAX_BYTES = 10 * 1024 * 1024
const UPLOAD_TIMEOUT_MS = 45_000
const phoneDigits = (v: string) => v.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "")

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = "Add your name so we know who to ask for."
  if (phoneDigits(f.phone).length !== 10) e.phone = "Add a 10-digit number, like 407 555 0123."
  if (f.location.trim().length < 3) e.location = "Add your city or ZIP so we can check we cover it."
  if (f.contactPref === "email" && !f.email) e.email = "Add an email, or choose text or call."
  else if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "That email looks incomplete."
  return e
}

/** Downscales large photos in the browser so uploads are fast on mobile data. */
async function shrink(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || /hei[cf]/i.test(file.type)) return file
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

export function QuoteForm({ uploads, defaultService = "", defaultLocation = "" }: { uploads: boolean; defaultService?: string; defaultLocation?: string }) {
  const id = useId()
  const { forms, business, services, mode } = site
  const [fields, setFields] = useState<Fields>({
    service: defaultService,
    name: "",
    phone: "",
    location: defaultLocation,
    details: "",
    contactPref: "text",
    email: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [photos, setPhotos] = useState<Photo[]>([])
  const [photoNote, setPhotoNote] = useState("")
  const [showDetails, setShowDetails] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [progress, setProgress] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [uploadFailed, setUploadFailed] = useState(false)
  const [sentPhotos, setSentPhotos] = useState(0)
  const started = useRef(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const successHeading = useRef<HTMLHeadingElement>(null)
  const busy = status === "uploading" || status === "sending"

  useEffect(() => {
    if (status === "success") successHeading.current?.focus()
  }, [status])

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
    if (!list?.length) return
    const all = Array.from(list)
    const images = all.filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name))
    const sized = images.filter((f) => f.size <= MAX_BYTES)
    const room = forms.maxPhotos - photos.length
    const added = sized.slice(0, room).map((file) => ({ file, url: URL.createObjectURL(file) }))
    const notes = []
    if (images.length < all.length) notes.push("Only photos can be attached.")
    if (sized.length < images.length) notes.push("Photos over 10 MB were skipped.")
    if (sized.length > room) notes.push(`That's the ${forms.maxPhotos}-photo limit. Wide shots work best.`)
    setPhotoNote(notes.join(" ") || `${photos.length + added.length} photo${photos.length + added.length === 1 ? "" : "s"} added.`)
    setPhotos((p) => [...p, ...added])
    setUploadFailed(false)
    if (fileInput.current) fileInput.current.value = ""
  }

  const removePhoto = (i: number) =>
    setPhotos((ps) => {
      URL.revokeObjectURL(ps[i].url)
      setPhotoNote(`Photo ${i + 1} removed.`)
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
    const photoUrls: string[] = []

    if (toUpload.length) {
      setStatus("uploading")
      try {
        for (let i = 0; i < toUpload.length; i++) {
          setProgress(`Uploading photo ${i + 1} of ${toUpload.length}…`)
          const file = await shrink(toUpload[i])
          const safeName = file.name.replace(/[^\w.-]/g, "_").slice(-60)
          // The Blob client retries network errors with long backoff. Cap the wait so a bad
          // connection fails into the recoverable error below instead of spinning for minutes.
          const abort = new AbortController()
          let timer: ReturnType<typeof setTimeout> | undefined
          const blob = await Promise.race([
            upload(`quote-photos/${safeName}`, file, { access: "public", handleUploadUrl: "/api/upload", abortSignal: abort.signal }),
            new Promise<never>((_, reject) => {
              timer = setTimeout(() => {
                abort.abort()
                reject(new Error("Upload timed out"))
              }, UPLOAD_TIMEOUT_MS)
            }),
          ]).finally(() => clearTimeout(timer))
          photoUrls.push(blob.url)
        }
      } catch {
        trackEvent("photo_upload_error")
        setUploadFailed(true)
        setStatus("error")
        setErrorMsg("Your photos didn't upload. They're still attached: try again, or send the request without them and text the photos instead.")
        return
      }
    }

    setStatus("sending")
    setProgress("Sending your request…")
    try {
      const serviceTitle = services.find((s) => s.slug === fields.service)?.title ?? "Not sure / a mix"
      const lead = {
        name: fields.name,
        phone: formatPhone(fields.phone),
        email: fields.email || undefined,
        location: fields.location,
        service: serviceTitle,
        details: fields.details || "None",
        preferred_contact: fields.contactPref,
        ...getLeadSource(),
      }
      // Email (Formspree) and the lead sheet are sent in parallel; the request counts as
      // delivered if either one lands, so a single outage never loses a lead.
      const [email, sheet] = await Promise.allSettled([
        fetch(`https://formspree.io/f/${forms.formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...lead,
            _subject: `New quote request: ${fields.name} (${fields.location})${photoUrls.length ? ` · ${photoUrls.length} photos` : ""}`,
            _gotcha: honeypot.current?.value,
            _replyto: fields.email || undefined,
            photos: photoUrls.length ? photoUrls.join("\n") : "None",
            site: `${business.name} (${mode})`,
          }),
        }),
        fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, photos: photoUrls, _gotcha: honeypot.current?.value }),
        }),
      ])
      const delivered = (r: PromiseSettledResult<Response>, ok: (res: Response) => boolean) => r.status === "fulfilled" && ok(r.value)
      if (!delivered(email, (r) => r.ok) && !delivered(sheet, (r) => r.status === 200)) throw new Error("not delivered")
      trackEvent("quote_form_submit", { service: serviceTitle, photos: photoUrls.length })
      if (photoUrls.length) trackEvent("photo_estimate_submit", { photos: photoUrls.length })
      setSentPhotos(photoUrls.length)
      setStatus("success")
    } catch {
      trackEvent("quote_form_error", { reason: "network" })
      setStatus("error")
      setErrorMsg("Your request didn't send. Nothing is lost: try again, or call or text us and we'll price it right away.")
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void send(false)
  }

  const replyVerb = fields.contactPref === "call" ? "call" : fields.contactPref === "email" ? "email" : "text"

  if (!forms.formspreeId) {
    // No lead destination configured: offer the channels that do work instead of a form that can't deliver.
    return (
      <div className="py-6 text-center">
        <h3 className="text-[24px] font-semibold tracking-[-0.03em]">Get your price by phone or text</h3>
        <p className="text-stone mt-2">Send a photo or call, and we&apos;ll give you a firm price.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <CallLink className="btn btn-accent"><Phone className="h-4 w-4" aria-hidden /> <BizPhone /></CallLink>
          {business.textEnabled && <TextLink className="btn btn-ghost"><MessageSquare className="h-4 w-4" aria-hidden /> Text photos</TextLink>}
        </div>
      </div>
    )
  }

  if (status === "success") {
    const serviceTitle = services.find((s) => s.slug === fields.service)?.title ?? "Not sure / a mix"
    const summary: [string, string][] = [
      ["Job", serviceTitle],
      ["Where", fields.location],
      ["Photos", sentPhotos ? `${sentPhotos} attached` : "None"],
      ["We'll reach you by", `${replyVerb === "email" ? "email" : replyVerb} · ${fields.contactPref === "email" ? fields.email : formatPhone(fields.phone)}`],
    ]
    return (
      <div role="status" aria-live="polite">
        <span className="h-12 w-12 rounded-full bg-success/10 ring-1 ring-success/25 flex items-center justify-center">
          <Check className="h-6 w-6 text-success" aria-hidden />
        </span>
        <h3 ref={successHeading} tabIndex={-1} className="text-[28px] font-semibold tracking-[-0.03em] mt-5 outline-none">
          Got it, {fields.name.split(" ")[0]}. Your request is in.
        </h3>
        {mode === "live" ? (
          <p className="text-stone mt-2 leading-relaxed">
            Next, we&apos;ll {replyVerb} you with a firm price and the arrival windows we have. You approve it before anything is scheduled.
          </p>
        ) : (
          <p className="text-stone mt-2 leading-relaxed">
            This is a demo, so the request went to {site.builder.name}, not a crew. On a live site, it lands in the owner&apos;s inbox with every photo attached.
          </p>
        )}
        <dl className="mt-7 border-t border-line text-[14.5px]">
          {summary.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-3 border-b border-line">
              <dt className="text-stone">{k}</dt>
              <dd className="text-ink font-medium text-right min-w-0 break-words">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-7 text-[14.5px] text-stone">Need it gone today? Don&apos;t wait for a reply:</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <CallLink data-cta="quote-success" className="btn btn-accent">
            <Phone className="h-4 w-4" aria-hidden /> Call <BizName />
          </CallLink>
          {business.textEnabled && (
            <TextLink data-cta="quote-success" className="btn btn-ghost">
              <MessageSquare className="h-4 w-4" aria-hidden /> Text more photos
            </TextLink>
          )}
        </div>
      </div>
    )
  }

  const input =
    "w-full h-[52px] rounded-xl border border-line bg-bone/50 px-4 text-[16px] text-ink placeholder:text-stone/60 transition-[border-color,box-shadow,background-color] duration-300 hover:border-stone/40 focus:outline-none focus:bg-paper focus:border-ink focus:ring-4 focus:ring-accent/10 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/10 scroll-mb-32"
  const label = "block text-[13px] font-medium text-ink mb-2"
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
    <form onSubmit={onSubmit} onFocus={onFirstInput} noValidate className="flex flex-col gap-5" aria-busy={busy} aria-label="Quote request">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h3 className="text-[23px] font-semibold tracking-[-0.03em]">Tell us what&apos;s going</h3>
          <p className="text-[14px] text-stone mt-1">About a minute. Only three things are required.</p>
        </div>
        <span className="eyebrow !text-[10px] text-stone border border-line rounded-full px-3 py-1.5 shrink-0">Free</span>
      </div>

      <input ref={honeypot} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div>
        <label htmlFor={`${id}-service`} className={label}>What needs to go?</label>
        <select {...a11y("service")} className={`${input} appearance-none select-chevron`} value={fields.service} onChange={(e) => set("service", e.target.value)}>
          <option value="">Not sure / a mix</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.title}</option>
          ))}
        </select>
      </div>

      {uploads ? (
        <div>
          <p className={label} id={`${id}-photos-label`}>
            Photos <span className="font-normal text-stone">· optional, the fastest way to a firm price</span>
          </p>
          <div className="flex flex-wrap gap-2.5" role="group" aria-labelledby={`${id}-photos-label`}>
            {photos.map((p, i) => (
              <div key={p.url} className="relative h-[76px] w-[76px] rounded-xl overflow-hidden ring-1 ring-line bg-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={`Attached photo ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 h-7 w-7 rounded-full bg-ink/80 text-bone backdrop-blur flex items-center justify-center"
                  aria-label={`Remove photo ${i + 1}`}
                  disabled={busy}
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            ))}
            {photos.length < forms.maxPhotos && (
              <label
                className={`rounded-xl border border-dashed border-stone/40 bg-bone/50 hover:border-ink hover:bg-paper flex items-center justify-center gap-2 cursor-pointer text-stone hover:text-ink transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40 ${
                  photos.length ? "h-[76px] w-[76px] flex-col" : "h-[76px] w-full"
                }`}
              >
                {photos.length ? <Plus className="h-5 w-5" aria-hidden /> : <Camera className="h-5 w-5" aria-hidden />}
                <span className="text-[14px] font-medium">{photos.length ? <span className="sr-only">Add more photos</span> : "Take or choose photos"}</span>
                <input ref={fileInput} type="file" accept="image/*,.heic,.heif" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} disabled={busy} />
              </label>
            )}
          </div>
          <p className="mt-2 text-[12.5px] text-stone" aria-live="polite">
            {photoNote || `Up to ${forms.maxPhotos}, straight from your camera or library. Wide shots of the whole pile work best.`}
          </p>
        </div>
      ) : (
        business.textEnabled && (
          <p className="text-[14px] text-stone -mt-1 rounded-xl bg-bone/70 border border-line px-4 py-3">
            Have photos?{" "}
            <TextLink className="text-ink font-medium link-draw">Text them to <BizPhone /></TextLink> for the fastest price.
          </p>
        )
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${id}-name`} className={label}>Your name</label>
          <input {...a11y("name")} className={input} autoComplete="name" autoCapitalize="words" enterKeyHint="next" value={fields.name} onChange={(e) => set("name", e.target.value)} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>Mobile number</label>
          <input
            {...a11y("phone")}
            className={input}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={(e) => phoneDigits(e.target.value).length === 10 && set("phone", formatPhone(e.target.value))}
          />
          {err("phone")}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-location`} className={label}>City or ZIP</label>
        <input {...a11y("location")} className={input} autoComplete="postal-code" enterKeyHint="done" value={fields.location} onChange={(e) => set("location", e.target.value)} />
        {err("location")}
      </div>

      {showDetails || fields.details ? (
        <div>
          <label htmlFor={`${id}-details`} className={label}>Anything we should know? <span className="font-normal text-stone">· optional</span></label>
          <textarea
            {...a11y("details")}
            rows={3}
            autoFocus={showDetails && !fields.details}
            className={`${input} h-auto py-3 resize-none`}
            placeholder="Items, rough amount, stairs, preferred day…"
            value={fields.details}
            onChange={(e) => set("details", e.target.value)}
          />
        </div>
      ) : (
        <button type="button" onClick={() => setShowDetails(true)} className="self-start text-[14px] text-stone hover:text-ink link-draw -mt-1">
          + Add notes: stairs, access, preferred day
        </button>
      )}

      <fieldset>
        <legend className={label}>Send my price by</legend>
        <div className="grid grid-cols-3 gap-1 p-1 rounded-full bg-bone/70 border border-line">
          {(["text", "call", "email"] as const).map((pref) => (
            <label
              key={pref}
              className="h-11 rounded-full flex items-center justify-center text-[14px] font-medium capitalize cursor-pointer text-stone transition-colors duration-300 hover:text-ink has-[:checked]:bg-ink has-[:checked]:text-bone has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40"
            >
              <input type="radio" name="contactPref" value={pref} checked={fields.contactPref === pref} onChange={() => set("contactPref", pref)} className="sr-only" />
              {pref}
            </label>
          ))}
        </div>
      </fieldset>

      {fields.contactPref === "email" && (
        <div>
          <label htmlFor={`${id}-email`} className={label}>Email</label>
          <input {...a11y("email")} className={input} type="email" inputMode="email" autoComplete="email" value={fields.email} onChange={(e) => set("email", e.target.value)} />
          {err("email")}
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="rounded-2xl border border-destructive/25 bg-destructive/[0.04] p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" aria-hidden />
          <div className="text-sm">
            <p className="font-medium text-ink mb-2.5">{errorMsg}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {uploadFailed && (
                <button type="button" onClick={() => void send(true)} className="font-medium text-ink underline underline-offset-4">
                  Send without photos
                </button>
              )}
              <CallLink className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-4">
                <Phone className="h-3.5 w-3.5" aria-hidden /> Call
              </CallLink>
              {business.textEnabled && (
                <TextLink className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-4">
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden /> Text photos
                </TextLink>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-1">
        <button type="submit" disabled={busy} className="btn btn-accent w-full !h-14 !text-[16px] disabled:opacity-80 disabled:cursor-wait">
          {busy ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              <span aria-live="polite">{progress}</span>
            </>
          ) : (
            <>
              {status === "error" ? "Try again" : photos.length ? "Get my photo estimate" : "Get my price"}
              <ArrowRight className="btn-arrow h-5 w-5" aria-hidden />
            </>
          )}
        </button>
        <p className="text-[13px] text-center text-stone leading-snug mt-3 text-pretty">{forms.replyNote}</p>
      </div>
    </form>
  )
}
