#!/usr/bin/env node
/**
 * Launch check. Runs before every build (see package.json).
 *
 *   live    → any demo leftover or missing production value FAILS the build.
 *   preview → the same problems print as warnings.
 *   demo    → skipped.
 *
 * Run by hand with `pnpm check:launch`.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const root = new URL("..", import.meta.url).pathname
const { site } = await import("../config/site.ts")

/** Fingerprints of the fictional demo company. Anything matching these is not a real client's. */
const DEMO = {
  names: ["Demo Junk Removal", "Demo Junk"],
  phones: ["+14078017886", "(407) 801-7886", "4078017886"],
  domain: "demojunkremoval.com",
  geo: { lat: 28.5384, lng: -81.3789 },
  reviewers: ["Sarah M.", "Marcus T.", "Jennifer L.", "David K.", "Amanda P.", "Robert H."],
  imagePrefix: "/media/",
}

const { mode, business, builder, seo, forms, analytics, reviews, projects, images, hero } = site
if (mode === "demo") {
  console.log("✓ launch check: demo mode, skipped (set mode to \"preview\" or \"live\" to run it)")
  process.exit(0)
}

const errors = []
const warnings = []
const fail = (msg) => errors.push(msg)
const warn = (msg) => warnings.push(msg)
const live = mode === "live"

// ── Identity ─────────────────────────────────────────────
if (DEMO.names.some((n) => business.name.includes(n) || business.wordmark.join(" ").includes(n))) fail("business.name / wordmark is still the demo company")
if (DEMO.phones.includes(business.phoneE164) || DEMO.phones.includes(business.phoneDisplay)) fail("business phone is still the demo number")
if (!/^\+1\d{10}$/.test(business.phoneE164)) fail(`business.phoneE164 "${business.phoneE164}" is not a +1XXXXXXXXXX number`)
if (business.phoneE164.replace(/\D/g, "").slice(-10) !== business.phoneDisplay.replace(/\D/g, "").slice(-10)) fail("phoneDisplay and phoneE164 are different numbers")
if (business.phoneE164 === builder.phoneE164) (live ? fail : warn)("business phone is the builder's number")
if (!business.email) warn("business.email is empty (shown in footer, privacy page and schema)")
if (business.address.city === "Orlando" && business.geo.lat === DEMO.geo.lat && business.geo.lng === DEMO.geo.lng) fail("address.city and geo are still the demo's Orlando values")
if (!business.logo) warn("business.logo is empty: the text wordmark will be used")

// ── Proof ────────────────────────────────────────────────
const demoReviews = reviews.filter((r) => DEMO.reviewers.includes(r.name))
if (demoReviews.length) fail(`${demoReviews.length} sample review(s) remain: ${demoReviews.map((r) => r.name).join(", ")}`)
if (!reviews.length) warn("no reviews: the reviews section will be empty")
if (!business.reviewSummary) warn("business.reviewSummary is empty: no link to the full Google review profile")
const imagePaths = [hero.image, ...Object.entries(images).filter(([k]) => !k.endsWith("Alt")).map(([, v]) => v), ...projects.flatMap((p) => [p.before, p.after])]
const stock = imagePaths.filter((p) => p.startsWith(DEMO.imagePrefix))
if (stock.length) fail(`${stock.length} demo image(s) still referenced (${DEMO.imagePrefix}…): replace with the client's photos`)
for (const p of imagePaths) if (!existsSync(join(root, "public", p))) fail(`image not found in /public: ${p}`)
const alts = [hero.imageAlt, ...Object.entries(images).filter(([k]) => k.endsWith("Alt")).map(([, v]) => v)]
if (alts.some((a) => !a || a.trim().length < 5)) fail("an image alt text is empty")

// ── Leads & tracking ─────────────────────────────────────
if (!forms.formspreeId) fail("forms.formspreeId is empty: quote requests have nowhere to go")
else if (live && forms.formspreeId === builder.formspreeId) fail("forms.formspreeId is the builder's form: leads would go to you, not the client")
if (live && !/^G-[A-Z0-9]{6,}$/.test(analytics.ga4Id)) fail(`analytics.ga4Id "${analytics.ga4Id}" is missing or not a GA4 ID`)
if (forms.photoUploads && !process.env.BLOB_READ_WRITE_TOKEN) (live ? fail : warn)("BLOB_READ_WRITE_TOKEN is not set: the photo uploader will be hidden. Connect a Vercel Blob store or set forms.photoUploads to false")

if (!process.env.LEADS_SHEET_URL) warn("LEADS_SHEET_URL is not set: leads arrive by email only (see integrations/google-sheet-leads.gs)")

// ── Domain & SEO ─────────────────────────────────────────
if (live && seo.siteUrl.includes(DEMO.domain)) fail("seo.siteUrl is still on the demo domain")
if (!/^https:\/\//.test(seo.siteUrl) || /localhost|vercel\.app/.test(seo.siteUrl)) fail(`seo.siteUrl "${seo.siteUrl}" must be the client's https production domain`)
if (DEMO.names.some((n) => seo.title.includes(n)) || /Orlando/.test(seo.title + seo.description) && business.address.city !== "Orlando") fail("seo.title / seo.description still mention the demo company or city")
if (seo.description.length > 165) warn(`seo.description is ${seo.description.length} characters (search results cut off around 155)`)

// ── Hard-coded leftovers anywhere in the source ──────────
const scan = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? scan(p) : /\.(tsx?|mdx?)$/.test(f) ? [p] : []
  })
const patterns = [...DEMO.names, ...DEMO.phones.slice(1), "demojunkremoval", "lorem ipsum", "TODO", "example.com"]
for (const file of [...scan(join(root, "app")), ...scan(join(root, "components"))]) {
  if (file.includes(`${"components"}/ui/`) || file.includes("(sales)")) continue
  const text = readFileSync(file, "utf8")
  for (const pat of patterns) if (text.includes(pat)) fail(`"${pat}" is hard-coded in ${relative(root, file)}`)
}
const configText = readFileSync(join(root, "config/site.ts"), "utf8")
if (live && /Orlando|Winter Park|Kissimmee|Lake Nona/.test(configText) && business.address.city !== "Orlando") fail("config/site.ts still contains the demo's Orlando-area towns")

// ── Report ───────────────────────────────────────────────
const label = `launch check (${mode})`
for (const w of warnings) console.warn(`  ⚠ ${w}`)
if (errors.length) {
  const log = live ? console.error : console.warn
  for (const e of errors) log(`  ✗ ${e}`)
  if (live) {
    console.error(`\n✗ ${label}: ${errors.length} problem(s). The build is blocked until they're fixed.\n`)
    process.exit(1)
  }
  console.warn(`\n⚠ ${label}: ${errors.length} problem(s) would block a live launch.\n`)
} else {
  console.log(`✓ ${label}: passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}`)
}
