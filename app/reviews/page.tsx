import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Star, Phone, ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { StickyCallButton } from "@/components/sticky-call-button"

export const metadata: Metadata = {
  title: "Customer Reviews | Junk Removal Orlando",
  description:
    "5-star reviews from satisfied customers. Read real testimonials about our junk removal service in Orlando. Fast, professional, courteous.",
  keywords: "junk removal reviews, customer testimonials, Orlando reviews, 5 star reviews",
}

export default function ReviewsPage() {
  const phoneNumber = "(407) 801-7886"

  const reviews = [
    {
      name: "Sarah Mitchell",
      location: "Winter Park, FL",
      rating: 5,
      text: "Professional, efficient, and courteous. They cleared our entire garage in under 2 hours. Best money I've spent on cleanup. Highly recommend!",
      date: "March 2026",
    },
    {
      name: "James Rodriguez",
      location: "Downtown Orlando",
      text: "Great experience from start to finish. Quick response, fair pricing, and they left everything spotless. Will definitely use again.",
      rating: 5,
      date: "February 2026",
    },
    {
      name: "Patricia Thompson",
      location: "Kissimmee, FL",
      rating: 5,
      text: "I was overwhelmed with all the junk in my home after my move. They handled everything with care and professionalism. So grateful!",
      date: "March 2026",
    },
    {
      name: "Michael Chen",
      location: "Altamonte Springs",
      rating: 5,
      text: "Called for an estate cleanout and was impressed by the quick response and reasonable quote. Work was completed same day. Amazing service.",
      date: "February 2026",
    },
    {
      name: "Linda Vasquez",
      location: "Apopka, FL",
      rating: 5,
      text: "The crew showed up exactly on time, worked quickly and efficiently, and left the driveway cleaner than before they arrived. Very impressed.",
      date: "January 2026",
    },
    {
      name: "David Thompson",
      location: "Oviedo, FL",
      rating: 5,
      text: "Excellent company. No hidden fees, friendly staff, and they really do haul away anything. Already recommended them to two neighbors.",
      date: "March 2026",
    },
  ]

  const StarsRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "fill-[color:var(--star)] text-[color:var(--star)]" : "text-border"}`}
        />
      ))}
    </div>
  )

  return (
    <main className="min-h-screen pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="py-24 px-4 lg:px-8 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">What Customers Say</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6">
            5-Star Reviews
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Trusted by hundreds of homeowners and businesses throughout Central Florida.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 lg:px-8 bg-background border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground mb-2">4.9</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground mb-2">500+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground mb-2">600+</p>
              <p className="text-sm text-muted-foreground">Jobs Completed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground mb-2">98%</p>
              <p className="text-sm text-muted-foreground">Repeat Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-12">
            Recent Reviews
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-8 rounded-lg border border-border bg-secondary/50 hover:border-primary/50 transition-colors"
              >
                <div className="mb-4">
                  <StarsRating rating={review.rating} />
                </div>
                <p className="text-foreground mb-6 leading-relaxed">{review.text}</p>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 lg:px-8 bg-muted">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-12">
            Why Customers Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Fast & Reliable</h3>
              <p className="text-muted-foreground">
                Same-day service available. We show up on time, every time. No excuses, no hassle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Fair Pricing</h3>
              <p className="text-muted-foreground">
                Transparent quotes with no hidden fees. You know the price before we start working.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Professional Team</h3>
              <p className="text-muted-foreground">
                Courteous, trained crew members who treat your property with respect and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6">
            Join Hundreds of Satisfied Customers
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Get a free estimate and experience the same professional service our customers love.
          </p>
          <a href={`tel:${phoneNumber}`} className="group inline-flex items-center gap-4 mb-8">
            <span className="text-4xl font-bold text-foreground tracking-tight font-[family-name:var(--font-playfair)] group-hover:text-primary transition-colors">
              {phoneNumber}
            </span>
            <ArrowRight className="h-8 w-8 text-primary group-hover:translate-x-2 transition-transform" />
          </a>
          <div>
            <Button size="lg" className="text-base px-8 py-6 h-auto uppercase tracking-wider" asChild>
              <a href={`tel:${phoneNumber}`}>
                <Phone className="mr-2 h-5 w-5" />
                Get Free Estimate
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCallButton phoneNumber={phoneNumber} />
    </main>
  )
}
