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
    // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated
    // this file's source at ~4,288 base64 characters (~3.2KB) short of the
    // full file, mid-sentence in the 4th review (Linda K., Basement
    // Cleanout). That review and the entire card-rendering JSX body were cut
    // off and could not be retrieved.
  ]

  return (
    <section className="py-24 px-4 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="border border-border rounded-xl p-6 bg-card">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-star text-star" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{review.text}</p>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground text-sm">{review.name}</p>
                {review.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
              </div>
              <p className="text-xs text-muted-foreground">
                {review.location} · {review.service}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
