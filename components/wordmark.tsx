import Image from "next/image"
import { Truck } from "lucide-react"
import { site } from "@/config/site"

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  const { logo, wordmark } = site.business
  return (
    <span className="flex items-center gap-2.5">
      {logo ? (
        <Image src={logo} alt="" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
      ) : (
        <span className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center shadow-sm shrink-0" aria-hidden>
          <Truck className="h-5 w-5 text-accent-foreground" strokeWidth={2.4} />
        </span>
      )}
      <span className="flex flex-col leading-none gap-1">
        <span className={`text-[15px] font-black tracking-tight ${inverted ? "text-background" : "text-foreground"}`}>
          {wordmark[0]}
        </span>
        <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-accent">{wordmark[1]}</span>
      </span>
    </span>
  )
}
