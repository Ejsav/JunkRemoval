"use client"

import type React from "react"
import { useEffect } from "react"
import Image from "next/image"
import { site, phoneHref, smsHref } from "@/config/site"
import { phoneToE164, usePreview } from "@/lib/preview"

/**
 * Business details that a prospect can override from /demo. In live mode these render
 * the config values and nothing else. Server components use these instead of reading
 * name, phone or city directly, so the whole site follows the preview.
 */

function usePhone() {
  const p = usePreview()
  const e164 = p?.phone ? phoneToE164(p.phone) : null
  return {
    display: e164 && p?.phone ? p.phone : site.business.phoneDisplay,
    tel: e164 ? `tel:${e164}` : phoneHref,
    sms: e164 ? `sms:${e164}?&body=${encodeURIComponent(site.business.textMessage)}` : smsHref,
  }
}

export function BizName() {
  return <>{usePreview()?.name || site.business.name}</>
}

export function BizPhone() {
  return <>{usePhone().display}</>
}

/** Region line, e.g. "Orlando & Central Florida". A preview city replaces it. */
export function BizRegion() {
  return <>{usePreview()?.city || site.business.serviceRegion}</>
}

export function BizCity() {
  return <>{usePreview()?.city || site.business.address.city}</>
}

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">

export function CallLink(props: AnchorProps) {
  return <a {...props} href={usePhone().tel} />
}

export function TextLink(props: AnchorProps) {
  return <a {...props} href={usePhone().sms} />
}

export function HeroImage({ className, sizes }: { className?: string; sizes: string }) {
  const custom = usePreview()?.hero
  if (custom) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={custom} alt="" className={`absolute inset-0 h-full w-full ${className ?? ""}`} />
  }
  return <Image src={site.hero.image} alt={site.hero.imageAlt} fill priority className={className} sizes={sizes} />
}

/** Keeps the brand colour in sync when the preview changes (the head script covers first paint). */
export function PreviewAccent() {
  const accent = usePreview()?.accent
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent || site.brand.accent)
  }, [accent])
  return null
}
