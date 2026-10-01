"use client"

import type React from "react"
import { useId, useState } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { site } from "@/config/site"
import { formatPhone, usePreview } from "@/lib/preview"
import { getLeadSource, trackEvent } from "@/lib/track"

type Status = "idle" | "sending" | "success" | "error"

/** Prospect → builder. Short on purpose: enough to build a preview, nothing more. */
export function PreviewRequestForm() {
  const id = useId()
  const preview = usePreview()
  const { builder } = site
  const [form, setF] = useState({ business: "", name: "", phone: "", link: "" })
  const [touchedBusiness, setTouchedBusiness] = useState(false)
  // Carry over the name they typed in the preview studio until they edit it here.
  const f = touchedBusiness ? form : { ...form, business: form.business || preview?.name || "" }
  const [error, setError] = useState<Partial<Record<keyof typeof f, string>>>({})
  const [status, setStatus] = useState<Status>("idle")

  const set = (k: keyof typeof f, v: string) => {
    if (k === "business") setTouchedBusiness(true)
    setF((x) => ({ ...x, [k]: v }))
    if (error[k]) setError((e) => ({ ...e, [k]: undefined }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: typeof error = {}
    if (f.business.trim().length < 2) errs.business = "Add your business name."
    if (f.name.trim().length < 2) errs.name = "Add your name."
    if (f.phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "").length !== 10) errs.phone = "Add a 10-digit number."
    setError(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`${id}-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setStatus("sending")
    try {
      const res = await fetch(`https://formspree.io/f/${builder.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Preview request: ${f.business}`,
          business: f.business,
          name: f.name,
          phone: formatPhone(f.phone),
          website_or_listing: f.link || "Not given",
          preview_city: preview?.city || "Not set",
          preview_colour: preview?.accent || "Not set",
          ...getLeadSource(),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      trackEvent("preview_request_submit")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="py-4">
        <span className="h-12 w-12 rounded-full bg-success/10 ring-1 ring-success/25 flex items-center justify-center">
          <Check className="h-6 w-6 text-success" aria-hidden />
        </span>
        <p className="text-[24px] font-semibold tracking-[-0.03em] mt-5">Got it. I&apos;ll build your preview.</p>
        <p className="text-stone mt-2">
          I&apos;ll text {formatPhone(f.phone)} when it&apos;s ready, with a private link you can open on your phone. No cost, no commitment.
        </p>
      </div>
    )
  }

  const input =
    "w-full h-[52px] rounded-xl border border-line bg-bone/50 px-4 text-[16px] text-ink placeholder:text-stone/60 focus:outline-none focus:bg-paper focus:border-ink focus:ring-4 focus:ring-accent/10 aria-[invalid=true]:border-destructive transition-[border-color,box-shadow]"
  const row = (k: keyof typeof f, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`${id}-${k}`} className="block text-[13px] font-medium mb-2">{label}</label>
      <input
        id={`${id}-${k}`}
        className={input}
        value={f[k]}
        onChange={(e) => set(k, e.target.value)}
        aria-invalid={error[k] ? true : undefined}
        aria-describedby={error[k] ? `${id}-${k}-err` : undefined}
        {...props}
      />
      {error[k] && <p id={`${id}-${k}-err`} className="mt-1.5 text-sm text-destructive font-medium">{error[k]}</p>}
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className="grid gap-4" aria-label="Request a free preview">
      {row("business", "Business name", { autoComplete: "organization" })}
      <div className="grid sm:grid-cols-2 gap-4">
        {row("name", "Your name", { autoComplete: "name" })}
        {row("phone", "Mobile number", { type: "tel", inputMode: "tel", autoComplete: "tel" })}
      </div>
      {row("link", "Current website or Google listing (optional)", { inputMode: "url", placeholder: "yourcompany.com" })}
      {status === "error" && (
        <p role="alert" className="text-sm text-destructive font-medium">
          That didn&apos;t send. Text or call me at {builder.phoneDisplay} instead.
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-accent w-full !h-14 !text-[16px] mt-1 disabled:opacity-80">
        {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
        {status === "sending" ? "Sending…" : "Build my free preview"}
        {status !== "sending" && <ArrowRight className="btn-arrow h-5 w-5" aria-hidden />}
      </button>
      <p className="text-[13px] text-center text-stone">Free, private and no obligation. You only pay if you decide to launch.</p>
    </form>
  )
}
