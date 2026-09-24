import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { site } from "@/config/site"

export const alt = site.business.name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

async function googleFont(family: string, params: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:${params}&display=swap`)).text()
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1]
    return url ? await (await fetch(url)).arrayBuffer() : null
  } catch {
    return null
  }
}

export default async function OpengraphImage() {
  const { business, hero, brand, mode } = site
  const photo = await readFile(join(process.cwd(), "public", hero.image))
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`
  const [geist, serif] = await Promise.all([googleFont("Geist", "wght@600"), googleFont("Instrument+Serif", "ital@1")])
  const fonts = [
    ...(geist ? [{ name: "Geist", data: geist, weight: 600 as const, style: "normal" as const }] : []),
    ...(serif ? [{ name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const }] : []),
  ]
  const label = mode === "demo" ? "Demo" : mode === "preview" ? `Preview for ${business.name}` : null

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: brand.ink, color: "#f2efe9", fontFamily: "Geist" }}>
        <div style={{ width: 660, padding: "64px 64px 56px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "#f2efe9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: 999, background: brand.accent }} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>{business.name}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -4, lineHeight: 0.98 }}>{hero.headline[0]}</div>
            <div style={{ fontSize: 50, lineHeight: 1.05, marginTop: 16, color: "#d9b79c", fontFamily: "Instrument Serif", fontStyle: "italic" }}>{hero.headline[1]}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, color: "#a19c93" }}>
            <span style={{ color: "#f2efe9" }}>{business.phoneDisplay}</span>
            <span>·</span>
            <span>
              {business.address.city}, {business.address.region}
            </span>
            {label && (
              <span style={{ marginLeft: "auto", fontSize: 16, letterSpacing: 2, textTransform: "uppercase", border: "1px solid #3a3d3a", borderRadius: 999, padding: "6px 14px" }}>
                {label}
              </span>
            )}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} width={540} height={630} style={{ width: 540, height: 630, objectFit: "cover" }} alt="" />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${brand.ink} 0%, rgba(14,15,14,0) 35%)` }} />
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
