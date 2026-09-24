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
  {
    slug: "eco-friendly-junk-disposal",
    title: "Eco-Friendly Junk Disposal: What Happens to Your Items",
    excerpt:
      "Learn how responsible junk removal companies recycle, donate, and properly dispose of items to minimize environmental impact.",
    image: "/recycling-center-with-sorted-materials.jpg",
    date: "December 5, 2024",
    readTime: "5 min read",
    category: "Sustainability",
  },
  {
    slug: "estate-cleanout-guide",
    title: "The Complete Guide to Estate Cleanouts",
    excerpt:
      "Handling an estate cleanout can be overwhelming. Here's everything you need to know to make the process easier.",
    image: "/empty-clean-house-interior-after-cleanout.jpg",
    date: "November 28, 2024",
    readTime: "6 min read",
    category: "Guides",
  },
  {
    slug: "decluttering-benefits",
    title: "The Mental Health Benefits of Decluttering Your Home",
    excerpt:
      "Discover how removing junk and organizing your environment can reduce stress and improve your overall well-being.",
    image: "/clean-organized-minimalist-living-room.jpg",
    date: "November 20, 2024",
    readTime: "4 min read",
    category: "Wellness",
  },
  {
    slug: "what-junk-removal-costs",
    title: "Understanding Junk Removal Pricing: What to Expect",
    excerpt:
      "A transparent look at how junk removal pricing works and tips to get the best value for your money.",
    image: "/junk-removal-truck-with-pricing-clipboard.jpg",
    date: "November 15, 2024",
    readTime: "4 min read",
    category: "Tips",
  },
]

export default function BlogPage() {
  const phoneNumber = "860-406-0262"

  return (
    <main className="min-h-screen bg-background">
      <LicensedBadge />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">Our Blog</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-[family-name:var(--font-playfair)] leading-tight">
              Junk Removal Tips for
              <br />
              <span className="text-primary">Homeowners</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Helpful resources for decluttering, junk removal tips, and keeping your home clean and organized.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="grid lg:grid-cols-2 gap-8 items-center bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
          >
            <div className="relative h-64 lg:h-full min-h-[300px]">
              <Image
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded-full">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
                  {blogPosts[0].category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {blogPosts[0].date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blogPosts[0].readTime}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)] group-hover:text-primary transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Read Article
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
              Latest Articles
            </h2>
            <div className="hidden md:flex items-center gap-2">
              {["All", "Tips", "Guides", "Sustainability"].map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    cat === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold uppercase tracking-wider rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-[family-name:var(--font-playfair)] leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-semibold group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">
              Need Junk Removed?
            </h2>
            <p className="text-muted-foreground mb-8">
              Stop reading about it and take action. Call us today for a free, no-obligation quote.
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Call {phoneNumber}
              <ArrowRight className="h-5 w-5" />
            </a>
            <p className="text-sm text-primary font-medium mt-4">Same-day service available</p>
          </div>
        </div>
      </section>

      {/* Blog Disclaimer */}
      <div className="py-6 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            For professional junk removal services, call us today at (407) 801-7886.
          </p>
        </div>
      </div>
    </main>
  )
}
