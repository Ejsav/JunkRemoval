import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { LicensedBadge } from "@/components/licensed-badge"

export const metadata: Metadata = {
  title: "Junk Removal Tips & Guides | Expert Advice for Homeowners",
  description:
    "Expert junk removal tips, decluttering guides, and helpful resources for homeowners. Learn about estate cleanouts, garage organization, and eco-friendly disposal.",
  keywords:
    "junk removal tips, decluttering guide, estate cleanout tips, garage cleanout, eco-friendly junk disposal",
}

const blogPosts = [
  {
    slug: "5-signs-you-need-junk-removal",
    title: "5 Signs You Need Professional Junk Removal",
    excerpt:
      "Is clutter taking over your home? Here are the top signs it's time to call in the professionals and reclaim your space.",
    image: "/cluttered-garage-with-boxes-and-old-furniture.jpg",
    date: "December 15, 2024",
    readTime: "4 min read",
    category: "Tips",
  },
  {
    slug: "preparing-for-junk-removal",
    title: "How to Prepare for Your Junk Removal Appointment",
    excerpt:
      "Make the most of your junk removal service with these simple preparation tips that will save you time and money.",
    image: "/organized-items-ready-for-removal-in-driveway.jpg",
    date: "December 10, 2024",
    readTime: "3 min read",
    category: "Guides",
  },
  // RECONSTRUCTION NOTE: the Vercel deployment-file-contents API truncated this
  // file's source at ~12,528 base64 characters (~9.4KB) short of the full file.
  // At least one additional blog post entry (slug "eco-friendly-junk-disposal")
  // and the JSX body that renders this list were cut off and could not be
  // retrieved. Only the array entries above were verbatim in the source; the
  // list-rendering JSX below is a minimal, mechanically-generated placeholder
  // (using only the object fields already defined above) and does not
  // reproduce the original page's actual layout/design.
]

export default function BlogPage() {
  return (
    <main className="min-h-screen py-24 px-4 lg:px-8 bg-background">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-12">
          Junk Removal Tips & Guides
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{post.category}</p>
              <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground mb-3">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
