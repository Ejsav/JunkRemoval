import type React from "react"

export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 lg:px-10 ${className}`}>{children}</div>
}

/** Section eyebrow: mono index + label, e.g. "02 — Services". */
export function Eyebrow({ index, children, tone = "light" }: { index?: string; children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "dark" ? "text-mist" : "text-stone"}`}>
      {index && <span className={tone === "dark" ? "text-accent-soft" : "text-accent"}>{index}</span>}
      {index && <span className={`h-px w-6 ${tone === "dark" ? "bg-line-dark" : "bg-line"}`} aria-hidden />}
      {children}
    </p>
  )
}

export function SectionTitle({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: "h1" | "h2"
  className?: string
  children: React.ReactNode
}) {
  return <Tag className={`headline text-[clamp(2.25rem,4.6vw,4rem)] ${className}`}>{children}</Tag>
}

/** Serif italic emphasis inside headlines. */
export function Em({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`serif-em ${className}`}>{children}</span>
}

export function SampleBadge({ label = "Sample", tone = "light" }: { label?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={`eyebrow !text-[9.5px] inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 border ${
        tone === "dark" ? "border-line-dark text-mist" : "border-line text-stone bg-paper"
      }`}
    >
      <span className="h-1 w-1 rounded-full bg-current opacity-60" aria-hidden />
      {label}
    </span>
  )
}
