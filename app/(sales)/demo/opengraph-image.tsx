import { ImageResponse } from "next/og"
import { site } from "@/config/site"
import { offer } from "@/config/offer"

export const alt = `Junk removal website system by ${site.builder.name}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0e0f0e", color: "#f2efe9", padding: 72 }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#d9b79c" }}>For junk removal business owners</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>A finished website that wins jobs.</div>
          <div style={{ fontSize: 44, marginTop: 20, color: "#a19c93" }}>{`Launched as yours for $${offer.price} flat.`}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a19c93" }}>
          <span style={{ color: "#f2efe9" }}>{site.builder.name}</span>
          <span>Photo quotes · Tap to call · Service & city pages</span>
        </div>
      </div>
    ),
    size,
  )
}
