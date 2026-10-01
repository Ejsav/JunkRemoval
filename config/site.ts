/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the only file you edit to re-skin this site for a prospect.
 *  Every page, CTA, schema tag, sitemap entry and form reads from here.
 *  See RESKIN.md for the step-by-step workflow.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * demo    → fictional business. Disclosure bar + "Sample" labels. Not indexed.
 * preview → a real prospect's info, shown as a concept. Disclosure bar. Not indexed.
 * live    → a paying client's launched site. No bar, no labels. Indexed.
 */
export type SiteMode = "demo" | "preview" | "live"

export type IconName =
  | "home" | "building" | "garage" | "sofa" | "fridge" | "leaf" | "estate" | "hardhat"
  | "truck" | "recycle" | "shield" | "clock" | "dollar" | "sparkles" | "hand" | "calendar"

export type Service = {
  slug: string
  icon: IconName
  title: string
  summary: string
  description: string
  examples: string[]
  priceFrom?: number
  /** Answers to the worries specific to this job. Shown on the service's own page. */
  faqs?: { q: string; a: string }[]
}

export type Review = {
  name: string
  location?: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  service?: string
  date?: string
}

export type Project = {
  title: string
  location?: string
  description: string
  before: string
  after: string
  /** Service slug, so the project also appears on that service's page. */
  service?: string
}

export type City = {
  name: string
  slug: string
  /** Only cities with real, specific detail get their own page. No thin doorway pages. */
  detail?: string
}

export type PriceTier = {
  name: string
  volume: string
  price: string
  description: string
  popular?: boolean
}

export const site = {
  mode: "demo" as SiteMode,

  /** Who built this. Shown in the disclosure bar and on /demo. */
  builder: {
    name: "Eric Jokl",
    email: "hello@ericjokl.com",
    phoneDisplay: "(860) 406-0262",
    phoneE164: "+18604060262",
    /** Formspree form that receives prospect preview requests from /demo. */
    formspreeId: "xojkykdk",
  },

  business: {
    name: "Demo Junk Removal",
    wordmark: ["Demo Junk", "Removal"] as [string, string],
    /** Optional square logo image in /public. Leave empty to use the wordmark + icon. */
    logo: "",
    tagline: "Junk removal done right, priced upfront.",
    /** Shown above the hero headline so visitors know instantly they found a local company. */
    serviceRegion: "Orlando & Central Florida",
    description:
      "Residential and commercial junk removal with upfront pricing, careful crews and same-day availability. We lift, load, sweep up and donate or recycle what we can.",
    phoneDisplay: "(407) 801-7886",
    phoneE164: "+14078017886",
    /** Set false if the business number can't receive texts. */
    textEnabled: true,
    textMessage: "Hi! I'd like a junk removal quote.",
    email: "",
    address: {
      street: "",
      city: "Orlando",
      region: "FL",
      postalCode: "",
      country: "US",
    },
    /** Rough centre of the service area, used for schema. */
    geo: { lat: 28.5384, lng: -81.3789 },
    hours: {
      label: "Mon–Sun, 7am–8pm",
      schema: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "07:00", closes: "20:00" }],
    },
    priceRange: "$$",
    /** Only list what the business can prove. Empty in demo mode on purpose. */
    credentials: [] as string[],
    /** A guarantee the business actually honours, in one sentence. Empty hides it. */
    guarantee: "",
    /** e.g. ["Card", "Cash", "Zelle"]. Empty hides it. */
    paymentMethods: [] as string[],
    /** Real public review summary. Leave null until you have the real numbers. */
    reviewSummary: null as null | { rating: number; count: number; platform: string; url: string },
    socials: {
      google: "",
      facebook: "",
      instagram: "",
      yelp: "",
    },
  },

  /**
   * Brand colours. Keep the accent muted and deep (white text must stay readable on it).
   * Everything else is a fixed neutral system, so any client's colour looks refined.
   */
  brand: {
    accent: "#a95e2f",
    ink: "#0e0f0e",
  },

  /** Art-directed imagery in /public/media. Swap these for the client's own photos. */
  images: {
    crew: "/media/crew-loading-sofa-truck.jpg",
    crewAlt: "Two crew members loading a sofa into a box truck",
    recycling: "/media/donation-dropoff.jpg",
    recyclingAlt: "Crew dropping off furniture and boxes at a donation center",
    finished: "/media/finished-empty-room.jpg",
    finishedAlt: "An empty, swept room with hardwood floors after a cleanout",
    commercial: "/media/office-cluttered.jpg",
    commercialAlt: "A cluttered office before a commercial cleanout",
  },

  seo: {
    siteUrl: "https://demojunkremoval.com",
    title: "Junk Removal in Orlando, FL | Upfront Pricing | Demo Junk Removal",
    description:
      "Same-day junk removal in Orlando and Central Florida. Furniture, appliances, garage and estate cleanouts. Upfront pricing and free photo estimates.",
    ogImage: "/og-image.jpg",
  },

  hero: {
    headline: ["Junk gone today.", "Priced before we lift a thing."],
    subhead:
      "Tell us what needs to go, or text a photo. You get a firm price, an arrival window we keep, and a crew that leaves the place swept.",
    image: "/media/crew-carrying-sofa-garage.jpg",
    imageAlt: "Two crew members carrying an old sofa from a garage to a loaded junk removal truck",
  },

  /** Short trust points under the hero. Keep to things the business actually does. */
  promises: [
    { icon: "dollar", title: "Upfront pricing", text: "Firm quote before work starts" },
    { icon: "clock", title: "Same-day slots", text: "Call early for today's pickup" },
    { icon: "hand", title: "Full-service", text: "We lift from anywhere" },
    { icon: "recycle", title: "Responsible disposal", text: "Donate & recycle first" },
  ] as { icon: IconName; title: string; text: string }[],

  services: [
    {
      slug: "furniture-removal",
      icon: "sofa",
      title: "Furniture Removal",
      summary: "Couches, mattresses, dressers, sectionals.",
      description: "Single items or a whole room. We carry it out from any floor, so you never touch it.",
      examples: ["Sofas & sectionals", "Mattresses & box springs", "Dressers & desks", "Recliners"],
      priceFrom: 89,
    faqs: [
        { q: "Do I need to bring it downstairs?", a: "No. The crew carries items out from any room or floor, including apartments without elevators. Mention stairs in your request so the price already accounts for them." },
        { q: "Can you take a mattress?", a: "Yes. Some disposal sites charge a small mattress fee, and it's included in your quote before we start." },
      ],
    },
    {
      slug: "appliance-removal",
      icon: "fridge",
      title: "Appliance Removal",
      summary: "Fridges, washers, dryers, water heaters.",
      description: "Disconnected appliances hauled and routed to proper recycling, refrigerants included.",
      examples: ["Refrigerators & freezers", "Washers & dryers", "Stoves & dishwashers", "Water heaters"],
      priceFrom: 99,
    faqs: [
        { q: "Does the appliance need to be disconnected?", a: "Please have it disconnected from water and gas before we arrive. We can unplug and move it, but we don't do plumbing or gas work." },
        { q: "What happens to the refrigerant?", a: "Fridges, freezers and AC units go to recyclers that recover refrigerant properly, not straight to landfill." },
      ],
    },
    {
      slug: "garage-cleanouts",
      icon: "garage",
      title: "Garage Cleanouts",
      summary: "Years of clutter, cleared in an afternoon.",
      description: "Point at what goes. We sort, load and sweep so you can park in there again.",
      examples: ["Boxes & storage", "Old tools & equipment", "Exercise machines", "Shelving"],
      priceFrom: 149,
    faqs: [
        { q: "Do I have to sort everything first?", a: "No. Point at what goes and what stays. Setting aside anything you want to keep before we arrive makes it faster." },
        { q: "How is a garage priced?", a: "By how much of the truck it fills. Photos of the whole garage, taken from the door, are usually enough for a firm price." },
      ],
    },
    {
      slug: "estate-cleanouts",
      icon: "estate",
      title: "Estate Cleanouts",
      summary: "Whole-home cleanouts, handled with care.",
      description: "For families, executors and realtors. Items worth keeping get set aside, the rest is donated or disposed of properly.",
      examples: ["Full-house cleanouts", "Hoarding situations", "Pre-sale cleanouts", "Donation coordination"],
      priceFrom: 449,
    faqs: [
        { q: "Can family members keep certain items?", a: "Yes. Tell us or mark what stays, and the crew works around it. Anything that turns up that looks personal or valuable is set aside for you." },
        { q: "Can you work with a realtor or executor who isn't local?", a: "Yes. We can quote from photos, arrange access and send photos when the job is done." },
      ],
    },
    {
      slug: "commercial-junk-removal",
      icon: "building",
      title: "Commercial Removal",
      summary: "Offices, retail, property turnovers.",
      description: "After-hours scheduling available, with invoicing for property managers and businesses.",
      examples: ["Office furniture", "Tenant turnovers", "Retail fixtures", "E-waste"],
      priceFrom: 299,
    faqs: [
        { q: "Can you work after hours?", a: "After-hours and weekend slots are available for offices and retail spaces, so work isn't interrupted." },
        { q: "Do you invoice businesses?", a: "Yes. Property managers and businesses can be invoiced instead of paying on the day." },
      ],
    },
    {
      slug: "yard-debris-removal",
      icon: "leaf",
      title: "Yard & Construction Debris",
      summary: "Branches, sheds, drywall, renovation waste.",
      description: "Storm cleanup, shed teardowns and leftover renovation debris, loaded and gone.",
      examples: ["Branches & brush", "Shed demolition", "Drywall & lumber", "Fencing"],
      priceFrom: 99,
    faqs: [
        { q: "Do you take construction debris?", a: "Yes: drywall, lumber, flooring, fencing and other renovation waste. Heavy materials like concrete and dirt are priced by weight, so mention them in your request." },
        { q: "Can you tear down a shed?", a: "Yes, for standard wooden and metal sheds. We take it down, load it and clear the site." },
      ],
    },
  ] as Service[],

  process: [
    { title: "Call, text or send photos", text: "Tell us what's going. A photo is usually enough for a firm quote." },
    { title: "Get a locked price", text: "You approve the price and arrival window before we schedule anything." },
    { title: "We haul it all", text: "The crew lifts, loads and sweeps up. You don't lift a finger." },
  ],

  /** Photos in /public. In demo mode these are labelled as sample projects. */
  projects: [
    {
      title: "Garage Cleanout",
      location: "Winter Park",
      description: "A full two-car garage of stored boxes and old furniture, cleared in one visit.",
      before: "/media/garage-cleanout-before.jpg",
      after: "/media/garage-cleanout-after.jpg",
      service: "garage-cleanouts",
    },
    {
      title: "Estate Cleanout",
      location: "Lake Nona",
      description: "A bedroom cleared of boxes, bags and clutter. The furniture the family kept stayed in place.",
      before: "/media/bedroom-cleanout-before.jpg",
      after: "/media/bedroom-cleanout-after.jpg",
      service: "estate-cleanouts",
    },
    {
      title: "Office Cleanout",
      location: "Downtown Orlando",
      description: "Boxes, old equipment and bagged clutter cleared from an open-plan office. Desks left ready to work.",
      before: "/media/office-cleanout-before.jpg",
      after: "/media/office-cleanout-after.jpg",
      service: "commercial-junk-removal",
    },
  ] as Project[],

  pricing: {
    intro: "Priced by how much space your items take in the truck. Your quote is locked before we start.",
    note: "Heavy materials, mattresses and some appliances can carry small disposal fees. We tell you upfront.",
    /** What moves the price. Answers "why can't you just tell me a number?" */
    factors: [
      { title: "Volume", text: "How much of the truck your items fill. This sets most of the price." },
      { title: "Weight", text: "Dense loads like concrete, dirt or roofing are priced by weight." },
      { title: "Access", text: "Long carries, stairs or tight spaces take more time." },
      { title: "Disposal fees", text: "Mattresses, tyres and some appliances carry site fees, quoted upfront." },
    ],
    tiers: [
      { name: "Single item", volume: "1–2 items", price: "from $89", description: "A couch, a fridge, a mattress." },
      { name: "Quarter load", volume: "~¼ truck", price: "from $189", description: "A room of furniture or a small cleanout." },
      { name: "Half load", volume: "~½ truck", price: "from $329", description: "A garage section or several rooms.", popular: true },
      { name: "Full load", volume: "Full truck", price: "from $549", description: "Whole garages, estates and big cleanouts." },
    ] as PriceTier[],
  },

  serviceAreas: {
    intro: "Based in Orlando and serving homes and businesses across Central Florida.",
    cities: [
      { name: "Orlando", slug: "orlando", detail: "Our home base. Trucks run across the city every day, from downtown condos and College Park bungalows to MetroWest apartments, so same-day slots are most likely here." },
      { name: "Winter Park", slug: "winter-park", detail: "Regular runs through Winter Park, Baldwin Park and Aloma. We work carefully around older homes, narrow driveways and HOA rules." },
      { name: "Lake Nona", slug: "lake-nona", detail: "Newer homes, move-outs and garage cleanouts across Lake Nona and the Medical City area, a short drive from our Orlando base." },
      { name: "Kissimmee", slug: "kissimmee", detail: "Furniture, appliance and rental-turnover removal across Kissimmee and the vacation-rental communities off US-192." },
      { name: "Sanford", slug: "sanford" },
      { name: "Apopka", slug: "apopka" },
      { name: "Maitland", slug: "maitland" },
      { name: "Ocoee", slug: "ocoee" },
      { name: "Altamonte Springs", slug: "altamonte-springs" },
      { name: "Clermont", slug: "clermont" },
      { name: "Winter Garden", slug: "winter-garden" },
      { name: "Oviedo", slug: "oviedo" },
    ] as City[],
  },

  /** In demo mode these render with a "Sample review" label. Replace with real reviews for a preview. */
  reviews: [
    {
      name: "Sarah M.",
      location: "Winter Park",
      rating: 5,
      text: "Texted a photo of my garage and had a price within the hour. They showed up in the window they gave me and swept up after. Exactly what I paid for, no surprises.",
      service: "Garage cleanout",
    },
    {
      name: "Marcus T.",
      location: "Orlando",
      rating: 5,
      text: "Needed an old sectional and a broken washer out of a second-floor apartment. Two guys, twenty minutes, done. Price matched the quote.",
      service: "Furniture & appliance removal",
    },
    {
      name: "Jennifer L.",
      location: "Lake Nona",
      rating: 5,
      text: "We were cleaning out my dad's house and dreading it. They were patient, set aside the things we wanted to keep, and donated a lot of the rest.",
      service: "Estate cleanout",
    },
    {
      name: "David K.",
      location: "Kissimmee",
      rating: 5,
      text: "Use them for every unit turnover now. They bring the invoice, the photos and the unit is empty the same day.",
      service: "Commercial",
    },
    {
      name: "Amanda P.",
      location: "Oviedo",
      rating: 5,
      text: "Storm dropped half a tree in the yard. They cleared the branches and the old shed while they were at it.",
      service: "Yard debris",
    },
    {
      name: "Robert H.",
      location: "Sanford",
      rating: 5,
      text: "Straightforward from the first call. They told me the price, did the job and left. Would book again.",
      service: "Junk removal",
    },
  ] as Review[],

  faqs: [
    {
      q: "How much does junk removal cost?",
      a: "Pricing is based on how much space your items take in the truck. Single items start around $89 and a full truck starts around $549. Send photos or call and we'll give you a firm price before any work starts.",
    },
    {
      q: "Can I get a quote from photos?",
      a: "Yes. Add a few photos to the quote form or text them to us. For most jobs, photos are enough for a firm price.",
      /** Used instead of `a` when photo uploads aren't configured, so the site never promises an uploader it doesn't show. */
      aWithoutUploads: "Yes. Text a few photos to us. For most jobs, photos are enough for a firm price.",
    },
    {
      q: "Do you offer same-day pickup?",
      a: "Often, yes. Same-day slots depend on the day's schedule, so call or text early for the best chance.",
    },
    {
      q: "Do I need to move items outside first?",
      a: "No. We remove items from anywhere on the property, including attics, basements and upper floors.",
    },
    {
      q: "What happens to my stuff?",
      a: "Usable items are donated where possible, recyclables are recycled, and the rest goes to licensed disposal facilities.",
    },
    {
      q: "What can't you take?",
      a: "Hazardous materials such as paint, chemicals, fuel and asbestos. If you're unsure about an item, ask and we'll tell you.",
    },
  ],

  about: {
    heading: "A local crew that shows up and does the job right.",
    paragraphs: [
      "We started this company because hiring someone to haul junk shouldn't feel like a gamble. Too many people get a vague phone quote, a late crew and a surprise bill.",
      "So we do it differently: a firm price before we start, an arrival window we keep, and a crew that treats your home like theirs. When we leave, the space is empty and swept.",
    ],
    /** How the business really handles disposal. Shown over the recycling photo. */
    disposal: "Usable items are donated, recyclables recycled. The landfill is the last stop, not the first.",
    /** Owner or team intro. Replace with a real person at launch; null hides it. */
    owner: null as null | { name: string; role: string; photo?: string; quote: string },
  },

  forms: {
    /** Formspree form ID (the part after /f/). Leads go to the Formspree account's inbox. */
    formspreeId: "xojkykdk",
    /** Photo uploads use Vercel Blob. Needs BLOB_READ_WRITE_TOKEN in the Vercel project. */
    photoUploads: true,
    maxPhotos: 6,
    /** Shown beside the submit button. Only promise what the business really does. */
    replyNote: "We reply with your price during business hours. Sending this doesn't commit you to booking.",
  },

  analytics: {
    /** Google Analytics 4 measurement ID, e.g. "G-XXXXXXX". Empty disables GA4. */
    ga4Id: "",
  },
}

export type Site = typeof site

export const isLive = site.mode === "live"
export const isSampleContent = site.mode === "demo"
export const phoneHref = `tel:${site.business.phoneE164}`
export const smsHref = `sms:${site.business.phoneE164}?&body=${encodeURIComponent(site.business.textMessage)}`
export const QUOTE_PATH = "/quote"
export const quoteHref = (params: { service?: string; location?: string } = {}) => {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]).toString()
  return q ? `${QUOTE_PATH}?${q}` : QUOTE_PATH
}
export const cityPages = site.serviceAreas.cities.filter((c) => c.detail)
export const servicePath = (slug: string) => `/services/${slug}`
export const cityPath = (city: City) => (city.detail ? `/service-areas/${city.slug}` : "/service-areas")
export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About" },
]
