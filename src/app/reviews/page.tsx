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
    // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated
    // this file's source at ~9,132 base64 characters (~6.8KB) short of the full
    // file, right after the third review's `date` field. Additional reviews
    // and the entire page JSX body were cut off and could not be retrieved.
  ]

  return (
    <main className="min-h-screen">
      <section className="py-24 px-4 lg:px-8 bg-background" />
      <Footer />
      <StickyCallButton />
    </main>
  )
}
