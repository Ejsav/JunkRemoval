"use client"

import { useSyncExternalStore } from "react"
import { site } from "@/config/site"

/**
 * Prospect preview: a business owner on /demo types their name, city, phone, colour,
 * logo and hero photo, and the demo site renders as their company. Stored in this
 * browser only. Disabled entirely in live mode.
 */
export type Preview = {
  name?: string
  city?: string
  phone?: string
  accent?: string
  logo?: string
  hero?: string
}

const KEY = "demo-preview"
const EVENT = "demo-preview-change"
const enabled = site.mode !== "live"

let cacheRaw: string | null = null
let cache: Preview | null = null

function read(): Preview | null {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(KEY)
  } catch {}
  if (raw === cacheRaw) return cache
  cacheRaw = raw
  try {
    cache = raw ? (JSON.parse(raw) as Preview) : null
  } catch {
    cache = null
  }
  return cache
}

function subscribe(cb: () => void) {
  if (!enabled) return () => {}
  const onStorage = (e: StorageEvent) => e.key === KEY && cb()
  window.addEventListener("storage", onStorage)
  window.addEventListener(EVENT, cb)
  return () => {
    window.removeEventListener("storage", onStorage)
    window.removeEventListener(EVENT, cb)
  }
}

export function usePreview(): Preview | null {
  return useSyncExternalStore(subscribe, () => (enabled ? read() : null), () => null)
}

/** Returns false if the browser refused to store it (private mode, or images too large). */
export function savePreview(patch: Partial<Preview>): boolean {
  const next = { ...(read() ?? {}), ...patch }
  for (const k of Object.keys(next) as (keyof Preview)[]) if (!next[k]) delete next[k]
  try {
    if (Object.keys(next).length) localStorage.setItem(KEY, JSON.stringify(next))
    else localStorage.removeItem(KEY)
  } catch {
    return false
  }
  window.dispatchEvent(new Event(EVENT))
  return true
}

export function clearPreview() {
  try {
    localStorage.removeItem(KEY)
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

export function formatPhone(input: string) {
  const d = input.replace(/\D/g, "").replace(/^1(?=\d{10})/, "").slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

export function phoneToE164(display: string) {
  const d = display.replace(/\D/g, "").replace(/^1(?=\d{10})/, "")
  return d.length === 10 ? `+1${d}` : null
}

