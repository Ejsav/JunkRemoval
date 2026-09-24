export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-foreground text-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
          <p className="text-[11px] font-black text-accent uppercase tracking-[0.24em]">{eyebrow}</p>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.04] max-w-3xl text-balance">{title}</h1>
        {intro && <p className="mt-5 text-lg text-background/75 max-w-2xl leading-relaxed font-medium">{intro}</p>}
      </div>
    </section>
  )
}
