import { site } from "@/config/site"

const { business, seo, services, serviceAreas } = site

export function localBusinessSchema() {
  const address = Object.fromEntries(
    Object.entries({
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    }).filter(([, v]) => v),
  )
  const sameAs = Object.values(business.socials).filter(Boolean)

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${seo.siteUrl}/#business`,
    name: business.name,
    description: business.description,
    url: seo.siteUrl,
    telephone: business.phoneE164,
    ...(business.email && { email: business.email }),
    image: `${seo.siteUrl}${seo.ogImage}`,
    priceRange: business.priceRange,
    address,
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    areaServed: serviceAreas.cities.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: business.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Junk removal services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
    },
    ...(sameAs.length && { sameAs }),
    ...(business.reviewSummary && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: business.reviewSummary.rating,
        reviewCount: business.reviewSummary.count,
      },
    }),
  }
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
