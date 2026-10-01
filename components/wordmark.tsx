"use client"

import Image from "next/image"
import { Truck } from "lucide-react"
import { site } from "@/config/site"
import { usePreview } from "@/lib/preview"

export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  const preview = usePreview()
  const { logo, wordmark } = site.business
  const onDark = tone === "dark"
  const customLogo = preview?.logo
  const [line1, line2] = preview?.name ? [preview.name, ""] : wordmark

  return (
    <span className="flex items-center gap-3 min-w-0">
      {customLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={customLogo} alt="" className="h-10 w-10 rounded-[11px] object-contain bg-bone shrink-0" />
      ) : logo ? (
        <Image src={logo} alt="" width={40} height={40} className="h-10 w-10 rounded-[11px] object-contain shrink-0" />
      ) : (
        <span
          className={`relative h-10 w-10 rounded-[11px] flex items-center justify-center shrink-0 ${
            onDark ? "bg-bone text-ink" : "bg-ink text-bone"
          }`}
          aria-hidden
        >
          <Truck className="h-[18px] w-[18px]" strokeWidth={2} />
          <span className="absolute top-[7px] right-[7px] h-1.5 w-1.5 rounded-full bg-accent-soft" />
        </span>
      )}
      <span className="flex flex-col leading-none min-w-0">
        <span className={`text-[16px] font-semibold tracking-[-0.03em] truncate ${onDark ? "text-bone" : "text-ink"}`}>{line1}</span>
        {line2 && <span className={`eyebrow !text-[9.5px] mt-1.5 ${onDark ? "text-mist" : "text-stone"}`}>{line2}</span>}
      </span>
    </span>
  )
}
