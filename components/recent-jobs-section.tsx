import Image from "next/image"
import { MapPin, CheckCircle } from "lucide-react"

const jobs = [
  {
    title: "Estate Cleanout",
    location: "Lake Nona, FL",
    detail: "4-bedroom home cleared in one day",
    tag: "Completed Yesterday",
    image: "/jobs/estate-cleanout.jpg",
    items: ["Full furniture removal", "Appliances hauled", "Garage cleared", "Donation drop-off included"],
  },
  {
    title: "Office Cleanout",
    location: "Downtown Orlando",
    detail: "3,000 sq ft commercial space cleared",
    tag: "Completed This Week",
    image: "/jobs/office-cleanout.jpg",
    items: ["Desks & chairs removed", "Filing cabinets hauled", "Electronics recycled", "Same-week turnaround"],
  },
  {
    title: "Garage Cleanout",
    location: "Winter Park, FL",
    detail: "Same-day service, 2 full truckloads",
    tag: "Completed This Week",
    image: "/jobs/garage-cleanout.jpg",
    items: ["Tools & equipment removed", "Old boxes hauled", "Floor swept clean", "Crew on-site in 2 hours"],
  },
  {
    title: "Yard Debris Removal",
    location: "Kissimmee, FL",
    detail: "Storm debris and old patio set cleared",
    tag: "Completed This Month",
    image: "/jobs/yard-cleanout.jpg",
    items: ["Storm debris hauled", "Patio furniture removed", "Landscaping waste cleared", "Property left spotless"],
  },
]

export function RecentJobsSection() {
  return (
    <section className="py-24 px-4 lg:px-8 bg-foreground">
      <div className="container mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-4">Active &amp; Operating</p>
            <h2 className="text-5xl md:text-[3.5rem] font-black tracking-tight text-background leading-[1.0] text-balance">
              Jobs Recently Completed
            </h2>
          </div>
          <p className="text-background/45 text-sm max-w-xs leading-relaxed">
            Orlando&apos;s top-rated hauling team. Built for fast response and high volume across Central Florida.
          </p>
        </div>

        {/* Job cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {jobs.map((job) => (
            <div key={job.title} className="bg-background/5 border border-background/10 rounded-2xl overflow-hidden group">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={job.image}
                  alt={`${job.title} in ${job.location}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 bg-background/10 backdrop-blur-sm border border-background/20 text-background text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                    {job.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-black text-background text-[15px] leading-tight">{job.title}</h3>
                </div>
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span className="text-xs font-semibold text-accent">{job.location}</span>
                </div>
                <p className="text-xs text-background/55 mb-4 leading-relaxed">{job.detail}</p>
                <ul className="space-y-1.5">
                  {job.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-[color:var(--success)] shrink-0 mt-0.5" />
                      <span className="text-[12px] text-background/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <div className="mt-12 text-center">
          <p className="text-background/35 text-sm">
            600+ jobs completed across Central Florida &mdash; licensed, insured, and background-checked crews on every job.
          </p>
        </div>

      </div>
    </section>
  )
}
