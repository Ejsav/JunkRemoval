import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Heart, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Orlando Junk Removal Service",
  description:
    "Learn about Orlando Junk Removal. Family-owned since 2020, serving Orlando and Central Florida. Licensed, insured, and committed to responsible junk removal.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6">
            About Orlando Junk Removal
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Family-owned and operated since 2020. We started right here in Orlando and we've grown by doing one thing well — showing up, doing the work, and treating every customer fairly.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 px-4 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-8">
            How We Got Started
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              In 2020, we started by helping friends and neighbors clear out garages and storage units. Word spread fast. People kept calling back, and they kept referring us to friends. That's when we realized there was a real need for a junk removal company that was honest, fast, and actually showed up when they said they would.
            </p>
            <p>
              We built this business on straightforward values: give a fair price on the call, arrive on time, do the heavy lifting, and leave the space clean. No games. No hidden fees. No excuses.
            </p>
            <p>
              Today we've completed over 600 jobs across Central Florida — from single-item pickups to full estate cleanouts. Every job still gets the same care as the first.
            </p>
          </div>
        </div>
      </section>

      {/* Eco Commitment */}
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-8">
            We Haul Responsibly
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-secondary p-7 rounded-xl">
              <Leaf className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-black text-foreground mb-2">60% Diverted from Landfill</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">We donate or recycle up to 60% of everything we collect, keeping usable items out of the landfill.</p>
            </div>
            <div className="bg-secondary p-7 rounded-xl">
              <Heart className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-black text-foreground mb-2">We Donate Usable Items</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Furniture, appliances, and household goods in good condition go to local charities and families in need.</p>
            </div>
            <div className="bg-secondary p-7 rounded-xl">
              <Clock className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-black text-foreground mb-2">Responsible Disposal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">What can't be donated or recycled is disposed of properly through licensed facilities — never fly-dumped.</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Caring for the community means more than just clearing clutter. It means doing right by the environment, too. That's a commitment we take seriously on every single job.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-8">
            Why Choose Us
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              We're local. We know Orlando, Winter Park, Altamonte Springs, Kissimmee, and all of Central Florida. We understand the neighborhoods and we move fast because we know these roads.
            </p>
            <p>
              We're transparent. Your price is confirmed on the call before we ever show up. No hidden fees, no surprise charges. If something changes, we call you first — always.
            </p>
            <p>
              We're fast. Most jobs are completed same-day or within 24 hours. We come in, do the work, and leave your space clean.
            </p>
            <p>
              And we're genuinely grateful for every customer who trusts us. That's why we work harder than we have to and stand behind every job we do.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-32 px-4 lg:px-8 bg-foreground text-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-background font-[family-name:var(--font-playfair)] mb-6 text-balance">
            Ready to clear your clutter?
          </h2>
          <p className="text-lg text-background/70 mb-4 max-w-xl mx-auto">
            If you're ready to reclaim your space and support a local, family-owned business — call us today. We'll give you a free quote and get it handled fast.
          </p>
          <p className="text-sm font-black text-accent uppercase tracking-widest mb-10">Same-day service available · Call before 2 pm</p>
          <Button size="lg" className="text-sm px-10 py-6 h-auto uppercase tracking-[0.2em] bg-background text-foreground hover:bg-background/90" asChild>
            <a href="tel:4078017886">
              Call (407) 801-7886
              <ArrowRight className="ml-3 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </main>
  )
}
