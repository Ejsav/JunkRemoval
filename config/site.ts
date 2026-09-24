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
    offerPrice: 750,
  },

  business: {
    name: "Demo Junk Removal",
    wordmark: ["Demo Junk", "Removal"] as [string, string],
    /** Optional square logo image in /public. Leave empty to use the wordmark + icon. */
    logo: "",
    tagline: "Junk removal done right, priced upfront.",
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
    crew: "/media/crew.jpg",
    crewAlt: "Crew carrying a sofa to a junk removal truck",
    recycling: "/media/recycling.jpg",
    recyclingAlt: "Sorted materials at a recycling facility",
    finished: "/media/finished-room.jpg",
    finishedAlt: "A clean, empty living room after a cleanout",
    commercial: "/media/commercial.jpg",
    commercialAlt: "Office floor being cleared of furniture",
  },

  seo: {
    siteUrl: "https://demojunkremoval.com",
    title: "Junk Removal in Orlando, FL | Upfront Pricing | Demo Junk Removal",
    description:
      "Same-day junk removal in Orlando and Central Florida. Furniture, appliances, garage and estate cleanouts. Upfront pricing and free photo estimates.",
    ogImage: "/og-image.jpg",
  },

  hero: {
    eyebrow: "Same-day pickup available",
    headline: ["Junk gone today.", "Priced before we lift a thing."],
    subhead:
      "Tell us what needs to go, or text a photo. You get a firm price, an arrival window we keep, and a crew that leaves the place swept.",
    image: "/media/hero.jpg",
    imageAlt: "Junk removal truck in a driveway next to a pile of furniture and boxes",
    bullets: [
      "Firm price before any work starts",
      "We do all the lifting, loading and sweeping",
      "Donate and recycle wherever possible",
    ],
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
    },
    {
      slug: "appliance-removal",
      icon: "fridge",
      title: "Appliance Removal",
      summary: "Fridges, washers, dryers, water heaters.",
      description: "Disconnected appliances hauled and routed to proper recycling, refrigerants included.",
      examples: ["Refrigerators & freezers", "Washers & dryers", "Stoves & dishwashers", "Water heaters"],
      priceFrom: 99,
    },
    {
      slug: "garage-cleanouts",
      icon: "garage",
      title: "Garage Cleanouts",
      summary: "Years of clutter, cleared in an afternoon.",
      description: "Point at what goes. We sort, load and sweep so you can park in there again.",
      examples: ["Boxes & storage", "Old tools & equipment", "Exercise machines", "Shelving"],
      priceFrom: 149,
    },
    {
      slug: "estate-cleanouts",
      icon: "estate",
      title: "Estate Cleanouts",
      summary: "Whole-home cleanouts, handled with care.",
      description: "For families, executors and realtors. Items worth keeping get set aside, the rest is donated or disposed of properly.",
      examples: ["Full-house cleanouts", "Hoarding situations", "Pre-sale cleanouts", "Donation coordination"],
      priceFrom: 449,
    },
    {
      slug: "commercial-junk-removal",
      icon: "building",
      title: "Commercial Removal",
      summary: "Offices, retail, property turnovers.",
      description: "After-hours scheduling available, with invoicing for property managers and businesses.",
      examples: ["Office furniture", "Tenant turnovers", "Retail fixtures", "E-waste"],
      priceFrom: 299,
    },
    {
      slug: "yard-debris-removal",
      icon: "leaf",
      title: "Yard & Construction Debris",
      summary: "Branches, sheds, drywall, renovation waste.",
      description: "Storm cleanup, shed teardowns and leftover renovation debris, loaded and gone.",
      examples: ["Branches & brush", "Shed demolition", "Drywall & lumber", "Fencing"],
      priceFrom: 99,
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
      before: "/media/garage-before.jpg",
      after: "/media/garage-after.jpg",
    },
    {
      title: "Estate Cleanout",
      location: "Lake Nona",
      description: "A four-bedroom home emptied, with keepsakes set aside for the family.",
      before: "/media/estate-before.jpg",
      after: "/media/estate-after.jpg",
    },
    {
      title: "Office Cleanout",
      location: "Downtown Orlando",
      description: "Desks, chairs and e-waste removed before a new tenant moved in.",
      before: "/media/office-before.jpg",
      after: "/media/office-after.jpg",
    },
  ] as Project[],

  pricing: {
    intro: "Priced by how much space your items take in the truck. Your quote is locked before we start.",
    note: "Heavy materials, mattresses and some appliances can carry small disposal fees. We tell you upfront.",
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
      "Orlando", "Winter Park", "Lake Nona", "Kissimmee", "Sanford", "Apopka",
      "Maitland", "Ocoee", "Altamonte Springs", "Clermont", "Winter Garden", "Oviedo",
    ],
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
      a: "Yes. Upload a few photos with the quote form or text them to us. For most jobs, photos are enough for a firm price.",
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
  },

  forms: {
    /** Formspree form ID (the part after /f/). Leads go to the Formspree account's inbox. */
    formspreeId: "xojkykdk",
    /** Photo uploads use Vercel Blob. Needs BLOB_READ_WRITE_TOKEN in the Vercel project. */
    photoUploads: true,
    maxPhotos: 6,
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
export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About" },
]
