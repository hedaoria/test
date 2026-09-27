import type { Metadata } from "next";
import { COMPANY, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import type { Category, City, Review } from "@/lib/types";
import type { ProfessionalWithRating } from "@/lib/repository";
import type { Faq } from "@/lib/data/content";

export function pageMetadata({
  title,
  description,
  path,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, locale: "nl_NL", type: "website" },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

/* ---------- JSON-LD ---------- */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
    email: COMPANY.email,
    description: SITE_DESCRIPTION,
    areaServed: { "@type": "Country", name: "Nederland" },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "nl-NL",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/vakmensen?plaats={plaats}` },
      "query-input": "required name=plaats",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceLd(category: Category, city?: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: category.name,
    name: city ? `${category.name} in ${city.name}` : `${category.name} vinden`,
    description: category.metaDescription,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: city ? { "@type": "City", name: city.name } : { "@type": "Country", name: "Nederland" },
    url: absoluteUrl(`/${category.slug}`),
  };
}

export function professionalLd(pro: ProfessionalWithRating, reviews: Review[], categoryNames: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": absoluteUrl(`/vakman/${pro.slug}#bedrijf`),
    name: pro.companyName,
    description: pro.tagline,
    url: absoluteUrl(`/vakman/${pro.slug}`),
    address: { "@type": "PostalAddress", addressLocality: pro.place, addressCountry: "NL" },
    geo: { "@type": "GeoCoordinates", latitude: pro.lat, longitude: pro.lng },
    areaServed: pro.workArea.map((name) => ({ "@type": "City", name })),
    foundingDate: String(pro.foundedYear),
    knowsAbout: [...categoryNames, ...pro.specialisations],
    ...(pro.rating.count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: pro.rating.average,
        reviewCount: pro.rating.count,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviews.slice(0, 10).map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.authorName },
        datePublished: r.date,
        reviewBody: r.text,
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      })),
    }),
  };
}

export function itemListLd(pros: ProfessionalWithRating[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: pros.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/vakman/${p.slug}`),
      name: p.companyName,
    })),
  };
}
