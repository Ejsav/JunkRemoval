/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  OFFER — what /demo sells to junk removal owners. Edit terms here, not in the page.
 *  Only state what you will actually deliver.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const offer = {
  price: 750,
  deposit: 375,
  /** Realistic time from receiving content to launch. */
  turnaround: "about a week",

  /** Already built and tested. The prospect gets all of this, not a design project. */
  included: [
    { title: "Mobile-first design", text: "Tap-to-call and tap-to-text on every screen, with a sticky action bar on phones." },
    { title: "Photo quote requests", text: "Customers attach photos from their camera roll or camera. You price jobs without a site visit." },
    { title: "Service & city pages", text: "A page for each service and each town you really cover, built from your details." },
    { title: "Reviews & before-and-afters", text: "Your Google reviews and your own job photos, with a touch-friendly comparison slider." },
    { title: "Local SEO foundations", text: "Business schema, titles, sitemap, canonical URLs and Search Console setup. No ranking promises." },
    { title: "Lead tracking", text: "Google Analytics events for every call tap, text tap and quote request, so you can see what the site brings in." },
  ],

  /** Swapped in for each client. Everything else is already finished. */
  customised: ["Business name & logo", "Brand colour", "Phone & text number", "Services & prices", "Towns you serve", "Google reviews", "Job photos", "Your domain"],

  /** What the owner provides. */
  needs: [
    "Logo, or I'll set up a clean text mark",
    "Phone number and email where leads should go",
    "Your services and rough prices",
    "The towns you serve",
    "A link to your Google reviews",
    "10–20 job photos, before-and-afters if you have them",
    "Access to your domain, or I'll help you buy one",
  ],

  steps: [
    { title: "Free preview", text: "I rebuild the demo with your name, logo, colours, services and reviews, and send you a private link." },
    { title: "You decide", text: `If it's better than what you have, pay the deposit. If not, there's no cost.` },
    { title: "Launch", text: "I connect your domain, send leads to your phone and inbox, and test every button on a real phone with you." },
  ],

  /** The questions that stop a sale. Answer them plainly. */
  faqs: [
    { q: "Who owns the website?", a: "You do. The domain, the content and the photos are yours, and the site runs on accounts in your name. If we ever part ways, you keep everything." },
    { q: "Is there a monthly fee?", a: "Not from me. Hosting and form delivery run on your own accounts: at typical small-business volume that's free to about $20 a month, and I'll tell you the exact cost before launch. Your domain renews yearly with your registrar." },
    { q: "What happens to my current website and domain?", a: "Your domain moves over to the new site on launch day, so your address, Google listing and business cards keep working. Your old site simply stops showing." },
    { q: "Do quote requests come straight to me?", a: "Yes. Each request arrives in your inbox with the customer's details and a link to every photo they attached. Calls and texts go straight to your phone." },
    { q: "How many rounds of changes do I get?", a: "Two rounds of changes on the preview before launch, covering text, photos, services and prices. After that, small updates are quick; bigger additions get quoted upfront." },
    { q: "Is Google Analytics and Search Console set up?", a: "Yes. Analytics tracks calls, texts and quote requests, and I submit your sitemap to Search Console. I won't promise rankings: nobody honest can." },
    { q: "Can I change things later?", a: "Yes. Send me what to change. Prices, services, reviews and photos all live in one place, so updates are fast." },
    { q: "What happens after launch?", a: "We test every button together on your phone, I confirm leads are arriving, and you have my number for anything that comes up." },
  ],
}
