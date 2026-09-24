import { site } from "@/config/site"
import { icons } from "@/lib/icons"

export function PromisesBar() {
  return (
    <section aria-label="Why customers book with us" className="bg-card border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border -mx-4 lg:mx-0">
          {site.promises.map((p) => {
            const Icon = icons[p.icon]
            return (
              <li key={p.title} className="flex items-start sm:items-center gap-3 px-4 sm:px-6 py-5 sm:py-7">
                <span className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0" aria-hidden>
                  <Icon className="h-5 w-5 text-accent" />
                </span>
                <span>
                  <span className="block font-black text-[14px] sm:text-[15px] text-foreground leading-tight">{p.title}</span>
                  <span className="block text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">{p.text}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
