import type React from "react"

export function SectionHeading({
  eyebrow,
  title,
  aside,
  as: Tag = "h2",
}: {
  eyebrow: string
  title: React.ReactNode
  aside?: React.ReactNode
  as?: "h1" | "h2"
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-border">
      <div>
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
          <p className="text-[11px] font-black text-accent uppercase tracking-[0.24em]">{eyebrow}</p>
        </div>
        <Tag className="text-[2.1rem] sm:text-5xl font-black tracking-tight text-foreground leading-[1.06] text-balance">{title}</Tag>
      </div>
      {aside && <div className="text-muted-foreground text-base font-medium max-w-sm leading-snug">{aside}</div>}
    </div>
  )
}

export function SampleBadge({ label = "Sample" }: { label?: string }) {
  return (
    <span className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.14em] text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded-full">
      {label}
    </span>
  )
}
