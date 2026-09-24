import { Star, BadgeCheck } from "lucide-react"

export function CustomerReviews() {
  // CUSTOMIZE: Replace sample reviews with real Google reviews from client
  const reviews = [
    {
      name: "John D.",
      location: "Your City, Your State", // CUSTOMIZE
      service: "Garage Cleanout",
      rating: 5,
      text: "Quick, professional, and fairly priced. They showed up exactly when they said they would and had my entire two-car garage cleared out in under an hour. Would definitely use again.",
      verified: true,
    },
    {
      name: "Sarah M.",
      location: "Your City, Your State", // CUSTOMIZE
      service: "Estate Cleanout",
      rating: 5,
      text: "We needed help clearing out my late mother's home before selling. The crew was respectful, efficient, and handled everything with care. Made a difficult time much easier.",
      verified: true,
    },
    {
      name: "Mike R.",
      location: "Your City, Your State", // CUSTOMIZE
      service: "Appliance Removal",
      rating: 5,
      text: "Excellent service from start to finish. They took my old fridge and washer/dryer without any issues. Scheduling was easy and once they arrived everything went smoothly. Highly recommend!",
      verified: true,
    },
    {
      name: "Linda K.",
      location: "Your City, Your State", // CUSTOMIZE
      service: "Basement Cleanout",
      rating: 5,
      text: "I'd been putting off cleaning my basement for years. These guys made it painless. Fair price, no hidden fees, and they even swept up after themselves. Impressed!",
      verified: true,
    },
    {
      name: "Tom B.",
      location: "Your City, Your State", // CUSTOMIZE
      service: "Construction Debris",
      rating: 5,
      text: "Hired them after a renovation project. They handled all the drywall, old cabinets, and flooring with no problem. Showed up right on time and the crew worked fast. Exactly what I needed!",
      verified: true,
    },
    {
      name: "Patricia H.",
      location: "Your City, Your State", // CUSTOMIZE
      service: "Furniture Removal",
      rating: 5,
      text: "Needed to get rid of a sectional sofa and old bedroom set. They quoted me over the phone and the price was exactly what they charged. No games, no surprises. Refreshing!",
      verified: true,
    },
  ]

  return (
    <section className="py-24 px-4 lg:px-8 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">Testimonials</p>
          {/* CUSTOMIZE: Replace [City] with client's location */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Real feedback from homeowners and businesses across the state
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-card p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-[color:var(--star)] text-[color:var(--star)]" : "fill-muted text-muted"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                {review.verified && (
                  <span className="flex items-center gap-1 text-xs text-primary font-medium">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                )}
              </div>

              <p className="text-foreground leading-relaxed mb-4 text-sm">"{review.text}"</p>

              <div className="pt-4 border-t border-border">
                <p className="font-bold text-foreground text-sm">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.location}</p>
                <p className="text-xs text-primary font-medium mt-1">{review.service}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-12 uppercase tracking-wider">
          Sample testimonial layout. Real customer reviews are added after customization.
        </p>
      </div>
    </section>
  )
}
