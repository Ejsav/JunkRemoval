import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import { LicensedBadge } from "@/components/licensed-badge"
import { notFound } from "next/navigation"

const blogPosts: Record<string, {
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  content: string
  slug?: string
}> = {
  "5-signs-you-need-junk-removal": {
    title: "5 Signs You Need Professional Junk Removal",
    excerpt:
      "Is clutter taking over your home? Here are the top signs it's time to call in the professionals and reclaim your space.",
    image: "/cluttered-garage-with-boxes-and-old-furniture.jpg",
    date: "December 15, 2024",
    readTime: "4 min read",
    category: "Tips",
    content: `
      <p>We all accumulate things over time. What starts as a few boxes in the garage or a spare room can quickly spiral into overwhelming clutter that affects your daily life. Here are five clear signs that professional junk removal might be exactly what you need.</p>

      <h2>1. You Can't Park in Your Garage Anymore</h2>
      <p>The garage is often the first casualty of clutter creep. If your car hasn't seen the inside of your garage in months—or even years—because it's packed with old furniture, broken appliances, and boxes of "stuff you'll get to someday," it's a major red flag. Professional junk removal services can clear out years of accumulated items in just a few hours, giving you back valuable space.</p>

      <h2>2. You're Tripping Over Things</h2>
      <p>When clutter starts affecting your ability to move safely through your home, it's gone too far. Stacked boxes in hallways, piles of items blocking doorways, or overcrowded rooms where you can barely walk are not just inconvenient—they're safety hazards. This is especially concerning for elderly family members. A clean sweep by junk removal professionals can eliminate these risks and restore your home's flow.</p>

      <h2>3. You Feel Overwhelmed Just Thinking About It</h2>
      <p>There's a reason decluttering shows are so popular—most homeowners feel paralyzed when facing a major cleanout. If the mere thought of tackling your clutter makes you anxious or stressed, that's actually a normal response. The good news is that you don't have to do it alone. Professional junk removal teams handle the heavy lifting, sorting, and hauling so you can simply point to what needs to go.</p>

      <h2>4. You're Planning a Major Life Change</h2>
      <p>Moving to a new home, downsizing after the kids leave, preparing for a renovation, or handling an estate cleanout—these major life events often require clearing out significant amounts of stuff. Scheduling a junk removal service as part of your transition plan makes the whole process smoother.</p>

      <h2>5. Items Are Damaged, Broken, or Beyond Repair</h2>
      <p>That old treadmill that's been a clothes rack for three years? The broken TV you kept meaning to fix? If you're holding onto items that are genuinely beyond use or repair, they're just taking up space. Professional junk removal ensures these items are disposed of properly—recycled when possible, donated if still usable, and responsibly handled when not.</p>

      <h2>The Bottom Line</h2>
      <p>Recognizing these signs is the first step toward reclaiming your space. Professional junk removal isn't just about hauling things away—it's about giving you back your home, your peace of mind, and your time. Most jobs can be completed in a single visit.</p>

      <p>Ready to take the first step? Contact us for a free, no-obligation quote.</p>
    `,
  },
  "preparing-for-junk-removal": {
    title: "How to Prepare for Your Junk Removal Appointment",
    excerpt:
      "Make the most of your junk removal service with these simple preparation tips that will save you time and money.",
    image: "/organized-items-ready-for-removal-in-driveway.jpg",
    date: "December 10, 2024",
    readTime: "3 min read",
    category: "Guides",
    content: `
      <p>You've made the call and scheduled your junk removal appointment—congratulations on taking that step! A little preparation can go a long way toward making the process faster, easier, and more cost-effective.</p>

      <h2>Walk Through Your Home First</h2>
      <p>Before the crew arrives, take a thorough walk through every room, closet, garage, basement, and attic. Make a mental note—or better yet, a written list—of everything you want removed. This helps you avoid the "Oh, I forgot about that!" moment after the truck has already left. Check behind doors, under beds, in storage areas, and anywhere else items might be hiding.</p>

      <h2>Sort Items Into Keep, Donate, and Remove Piles</h2>
      <p>While you don't need to organize everything perfectly, having a general idea of what's going and what's staying saves time during the appointment. Many junk removal companies will donate usable items on your behalf to local charities, so separating these out can feel good knowing they'll find a new home.</p>

      <h2>Clear a Path to the Junk</h2>
      <p>The easier it is for the removal team to access your items, the faster the job goes. If possible, move smaller items toward the door or garage. Clear walkways and remove any obstacles between the junk and where the truck will be parked. Homes with basements or upper floors should ensure stairways are clear and safe to navigate with heavy loads.</p>

      <h2>Identify Any Special Items</h2>
      <p>Some items require special handling or disposal methods. Electronics, appliances containing refrigerants, paint, chemicals, and certain hazardous materials may have specific requirements. Let the junk removal company know about these items when you book so they can come prepared.</p>

      <h2>Secure Valuables and Personal Documents</h2>
      <p>Before the removal team arrives, double-check that no important documents, jewelry, cash, or sentimental items are mixed in with the junk. It's easy for small valuable items to get lost in boxes or drawers of furniture being removed.</p>

      <h2>Be Present or Designate Someone</h2>
      <p>While you don't need to do any of the heavy lifting, having someone present during the removal is important. You can answer questions, make last-minute decisions about items, and ensure nothing is accidentally taken that you wanted to keep.</p>

      <h2>Know Your Budget</h2>
      <p>Most junk removal is priced by volume—how much space your items take up in the truck. Having a rough idea of how much you're removing helps you understand the potential cost. Reputable companies will always provide transparent pricing upfront.</p>

      <h2>Relax and Let the Pros Handle It</h2>
      <p>Once you've done these simple preparation steps, your job is essentially done. The removal team handles all the heavy lifting, loading, and hauling. Most residential jobs are completed in under two hours, and you'll be amazed at how much lighter your home feels afterward.</p>
    `,
  },
  "eco-friendly-junk-disposal": {
    title: "Eco-Friendly Junk Disposal: What Happens to Your Items",
    excerpt:
      "Learn how responsible junk removal companies recycle, donate, and properly dispose of items to minimize environmental impact.",
    image: "/recycling-center-with-sorted-materials.jpg",
    date: "December 5, 2024",
    readTime: "5 min read",
    category: "Sustainability",
    content: `
      <p>When you call a junk removal service, you might assume everything ends up in a landfill. But responsible junk removal companies work hard to ensure that's not the case. Here's a behind-the-scenes look at what happens to your stuff after it leaves your home.</p>

      <h2>The Sorting Process</h2>
      <p>After picking up your items, professional junk removal companies don't just head straight to the dump. Instead, items are sorted into categories based on their condition and material composition. This sorting process is the foundation of eco-friendly disposal.</p>

      <h2>Donation: Giving Items a Second Life</h2>
      <p>You'd be surprised how many "junk" items are actually treasures to someone else. Furniture that's outdated to you might be perfect for a family just getting started. Many junk removal companies have partnerships with nonprofits to ensure usable items reach people who need them.</p>

      <h2>Recycling: Breaking It Down</h2>
      <p>Items that can't be donated but are made of recyclable materials get a different fate. Metals from old appliances, electronics, and furniture frames are processed. Even mattresses can be recycled—the foam, fabric, and metal springs are separated and processed individually at recycling centers.</p>

      <h2>Electronics and E-Waste</h2>
      <p>Old computers, TVs, phones, and other electronics contain valuable materials that can be recovered, as well as hazardous components that need special handling. Responsible junk removal companies work with certified recyclers who safely extract precious metals and properly dispose of harmful substances.</p>

      <h2>Appliance Disposal</h2>
      <p>Large appliances like refrigerators, air conditioners, and freezers contain refrigerants that can damage the ozone layer if released improperly. Professional disposal involves safely capturing these chemicals according to environmental regulations and recycling the metal components.</p>

      <h2>What Actually Goes to Landfills?</h2>
      <p>Despite best efforts, some items do end up in landfills. However, with proper sorting and partnerships, a good junk removal company can divert 60-80% of collected items away from landfills. That's a significant environmental win for communities.</p>

      <h2>Choosing an Eco-Conscious Company</h2>
      <p>When selecting a junk removal service, ask about their disposal practices. Companies committed to sustainability will be happy to answer these questions. By choosing a responsible provider, you're making an environmentally conscious decision that benefits communities and the planet.</p>
    `,
  },
  "estate-cleanout-guide": {
    title: "The Complete Guide to Estate Cleanouts",
    excerpt:
      "Handling an estate cleanout can be overwhelming. Here's everything you need to know to make the process easier.",
    image: "/empty-clean-house-interior-after-cleanout.jpg",
    date: "November 28, 2024",
    readTime: "6 min read",
    category: "Guides",
    content: `
      <p>Dealing with an estate cleanout is one of life's most challenging tasks. Whether you're handling the belongings of a loved one who has passed, helping elderly parents downsize, or managing a property you've inherited, this guide will help you navigate the process with clarity and compassion.</p>

      <h2>Take Your Time with Sentimental Items</h2>
      <p>Before diving into the logistics of your estate cleanout, give yourself permission to process emotions. Estate cleanouts often unearth memories, photos, and personal items that deserve more than a quick glance. Set aside important documents, family photos, and clearly sentimental pieces first.</p>

      <h2>Gather Important Documents</h2>
      <p>Early in the process, locate and secure essential paperwork: wills, trust documents, property deeds, financial statements, insurance policies, tax returns, and identification documents. Probate requirements may need specific documentation, so keep these organized and safe.</p>

      <h2>Involve Family Members Early</h2>
      <p>If multiple family members are involved in the estate, communicate early and often. Create a fair system for distributing items people want to keep. Having these conversations before the cleanout prevents conflicts and ensures everyone feels heard.</p>

      <h2>Assess the Scope of the Project</h2>
      <p>Walk through the entire property and realistically assess how much needs to be removed. A lifetime of belongings can fill a house from basement to attic. This assessment helps you decide whether to tackle it yourself or hire a full-service estate cleanout company.</p>

      <h2>Consider Professional Estate Sale Services</h2>
      <p>If the estate contains valuable items, an estate sale company can handle pricing, staging, advertising, and running the sale. They typically take a percentage of proceeds but bring expertise in valuation for local markets.</p>

      <h2>Handle Specialty Items According to Law</h2>
      <p>Some items require special consideration under regulations. Firearms must be transferred according to state and federal laws. Medications should be disposed of at pharmacy take-back programs. Vehicles may need title transfers through your local DMV.</p>

      <h2>Hire Professional Junk Removal</h2>
      <p>Once family keepsakes are secured, valuables are sold or distributed, and donations are arranged, what remains often requires significant physical labor to remove. Professional junk removal services specialize in estate cleanouts and can clear a full house in a day or two.</p>

      <h2>Be Kind to Yourself</h2>
      <p>Estate cleanouts are marathons, not sprints. It's normal to feel exhausted, sad, overwhelmed, or even relieved. Take breaks when needed, accept help when offered, and remember that letting go of belongings doesn't mean letting go of memories.</p>
    `,
  },
  "decluttering-benefits": {
    title: "The Mental Health Benefits of Decluttering Your Home",
    excerpt:
      "Discover how removing junk and organizing your environment can reduce stress and improve your overall well-being.",
    image: "/clean-organized-minimalist-living-room.jpg",
    date: "November 20, 2024",
    readTime: "4 min read",
    category: "Wellness",
    content: `
      <p>Your environment affects your mental state more than you might realize. Research consistently shows that cluttered spaces contribute to stress, anxiety, and even depression. Here's why decluttering your home is good for your mind.</p>

      <h2>The Science Behind Clutter and Stress</h2>
      <p>Studies show that people who described their homes as cluttered were more likely to be depressed and fatigued. For busy families juggling work, commutes, and family life, a cluttered home adds unnecessary stress to already demanding schedules.</p>

      <h2>Visual Clutter Overloads Your Brain</h2>
      <p>Your brain is constantly processing your environment, even when you're not consciously aware of it. Every item in your field of vision competes for your attention. When you're surrounded by clutter, your brain works overtime trying to filter out irrelevant stimuli.</p>

      <h2>Clutter Triggers Guilt and Shame</h2>
      <p>Piles of unfinished projects, unused exercise equipment, and boxes of "someday" items serve as constant reminders of tasks undone and goals unmet. Clearing this visual noise can provide immediate psychological relief.</p>

      <h2>The Freedom of Open Space</h2>
      <p>There's something profoundly calming about clean, open spaces. When you remove excess items, you often describe feeling lighter, freer, and more at peace in your own home. This isn't just imagination—it's your nervous system responding to a less chaotic environment.</p>

      <h2>Taking the First Step</h2>
      <p>If your home has become overwhelmingly cluttered, professional junk removal services can help you take that crucial first step. Sometimes the best investment in your mental health is simply calling for backup and letting professionals handle the heavy lifting.</p>
    `,
  },
  "what-junk-removal-costs": {
    title: "Understanding Junk Removal Pricing: What to Expect",
    excerpt:
      "A transparent look at how junk removal pricing works and tips to get the best value for your money.",
    image: "/junk-removal-truck-with-pricing-clipboard.jpg",
    date: "November 15, 2024",
    readTime: "4 min read",
    category: "Tips",
    content: `
      <p>If you've never hired a junk removal service before, you might be wondering what it costs. The good news is that pricing is usually straightforward once you understand how it works. Here's a transparent guide for homeowners.</p>

      <h2>How Junk Removal Pricing Works</h2>
      <p>Most reputable junk removal companies charge based on volume—how much space your items take up in their truck. This is fairer than charging by weight or item count because it accounts for bulky items like furniture that take up lots of space but may not weigh much.</p>

      <h2>Typical Price Ranges</h2>
      <p>You can generally expect: Small loads (single items or 1/4 truck): $150-$250, perfect for a few items or small cleanouts. Medium loads (1/2 truck): $300-$450, good for room cleanouts or garage clearing. Full truck loads: $500-$700, ideal for whole house or estate cleanouts.</p>

      <h2>What's Included in the Price</h2>
      <p>A good junk removal company includes labor, truck space, and disposal fees in their quoted price. You shouldn't have to pay extra for them to carry items down stairs or across your property. Responsible disposal—including recycling and donation where appropriate—should also be part of the service.</p>

      <h2>Factors That May Affect Pricing</h2>
      <p>Certain items may have additional fees due to disposal requirements. Appliances containing refrigerants, electronics, and mattresses often cost extra because of disposal regulations. Always ask about these fees upfront when getting your quote.</p>

      <h2>Getting the Best Value</h2>
      <p>To get the most value from your junk removal service: Gather everything in one accessible location before the crew arrives. Have a clear idea of what's going versus staying. Ask about donation—many companies will donate usable items, which may reduce disposal fees. Get quotes from multiple companies, but remember that the cheapest option isn't always the best value.</p>

      <h2>Free Estimates</h2>
      <p>Most reputable junk removal companies offer free, no-obligation estimates. They'll come to your property, assess what needs to be removed, and give you a firm price before any work begins. Take advantage of this—it's the best way to know exactly what you'll pay.</p>
    `,
  },
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    return {
      title: "Post Not Found | Junk Removal Website Example",
    }
  }

  return {
    title: `${post.title} | Junk Removal Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  const relatedPosts = Object.entries(blogPosts)
    .filter(([key]) => key !== slug)
    .slice(0, 3)
    .map(([key, value]) => ({ ...value, slug: key }))

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-[family-name:var(--font-playfair)] leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto px-4 -mt-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose prose-lg max-w-none prose-headings:font-[family-name:var(--font-playfair)] prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/10">
            <h3 className="text-xl font-bold text-foreground mb-3 font-[family-name:var(--font-playfair)]">
              Ready to Clear Your Space?
            </h3>
            <p className="text-muted-foreground mb-6">
              Get a free, no-obligation quote for your junk removal project. Same-day service available.
            </p>
            <a
              href="tel:860-406-0262"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Call 860-406-0262
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-[family-name:var(--font-playfair)]">
            Continue Reading
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold uppercase tracking-wider rounded-full">
                      {relatedPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {relatedPost.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-[family-name:var(--font-playfair)] leading-snug">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LicensedBadge />

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
