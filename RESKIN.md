# Re-skinning for a prospect

Everything business-specific lives in `config/site.ts`. You never edit components to personalize a preview.

## Modes

| `mode`    | Use for                          | Disclosure bar | "Sample" labels | Indexed | `/demo` page |
|-----------|----------------------------------|----------------|-----------------|---------|--------------|
| `demo`    | demojunkremoval.com              | Yes            | Yes             | No      | Yes          |
| `preview` | A prospect's personalized concept | Yes ("Preview") | No             | No      | Yes          |
| `live`    | A paying client's launched site  | No             | No              | Yes     | No (404)     |

## Build a prospect preview (~30–45 min)

1. **Collect (15–20 min)** from their current site, Google Business Profile and socials:
   - Exact business name, phone, email, city, hours, towns served
   - Logo file and the 1–2 brand colors in it
   - 3–6 real Google reviews (copy text exactly; first name + last initial)
   - Their Google rating and review count, plus the reviews URL
   - Services they list and any prices they publish
   - 3+ job photos, ideally before-and-afters
2. **Branch:** `git checkout -b preview/<slug>` from `main`.
3. **Edit `config/site.ts` (10–15 min):**
   - `mode: "preview"`
   - `business.*`: name, `wordmark`, phone (`phoneDisplay` and `phoneE164`), email, address, geo, hours, socials
   - `business.reviewSummary`: their real rating, count and URL
   - `business.credentials`: only what they publicly claim (e.g. "Licensed & insured")
   - `brand.primary` / `brand.accent`: hex values from their logo
   - `services`, `pricing`, `serviceAreas.cities`, `reviews`, `projects`
   - `seo.siteUrl`: `https://<slug>.demojunkremoval.com`
   - Leave `forms.formspreeId` as yours, so test leads come to you, not them.
4. **Assets:** put the logo and photos in `public/clients/<slug>/`, then point `business.logo`, `hero.image` and `projects[*]` at them.
5. **Check:** `pnpm build`, then `pnpm start` and click through on your phone.
6. **Publish:** push the branch. In Vercel → Project → Settings → Domains, add `<slug>.demojunkremoval.com` and set its Git branch to `preview/<slug>`. Vercel DNS is already set up, so it's live in a minute. Preview URLs on `*.vercel.app` sit behind Vercel login; the custom subdomain doesn't.
7. **Send the link** with one specific weakness of their current site that the preview fixes.

## Launch for a paying client

1. Create a new Vercel project for the client from the same repo, on a `client/<slug>` branch.
2. In `config/site.ts`: `mode: "live"`, `seo.siteUrl` = their domain, their own `forms.formspreeId` (a Formspree form under their email), `analytics.ga4Id`.
3. In the client's Vercel project: Storage → create a Blob store and connect it (adds `BLOB_READ_WRITE_TOKEN` for photo uploads).
4. Replace every sample image with their real photos. Confirm no sample content remains (`mode: "live"` removes the labels, not the content).
5. Connect their domain, then submit a test quote, tap Call and Text on a real phone, and check the lead arrives.
6. Submit `https://<domain>/sitemap.xml` in Google Search Console and link the site from their Google Business Profile.

## Conversion tracking

Every call, text, email, quote CTA click, form start, submit, photo estimate and error is tracked by `components/conversion-tracker.tsx` and `lib/track.ts`:

- **GA4** (free): set `analytics.ga4Id`. Mark `quote_form_submit`, `call_click` and `text_click` as key events in GA4.
- **Vercel Analytics**: page views work on every plan; custom events need Vercel Pro.
