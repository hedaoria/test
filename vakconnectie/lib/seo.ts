import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { OG_LOCALE } from "@/lib/i18n/config";
import { alternates, localizePath } from "@/lib/i18n/routes";
import { COMPANY, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import type { Review } from "@/lib/types";
import type { ProfessionalWithRating } from "@/lib/repository";
import type { Faq } from "@/lib/data/content";

export function pageMetadata({
  title,
  description,
  path,
  locale,
  noindex,
  absoluteTitle,
}: {
  title: string;
  description: string;
  /** Intern (Nederlands) pad; wordt per taal vertaald. */
  path: string;
  locale: Locale;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const urls = alternates(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: urls[locale],
      languages: { nl: urls.nl, en: urls.en, "x-default": urls.nl },
    },
    openGraph: {
      title,
      description,
      url: urls[locale],
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: locale === "nl" ? OG_LOCALE.en : OG_LOCALE.nl,
      type: "website",
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

/* ---------- JSON-LD ---------- */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
    email: COMPANY.email,
    telephone: COMPANY.phoneDisplay,
    description: SITE_DESCRIPTION,
    address: { "@type": "PostalAddress", addressLocality: COMPANY.city, addressCountry: "NL" },
    identifier: { "@type": "PropertyValue", propertyID: "KvK", value: COMPANY.kvk },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: COMPANY.email,
      telephone: COMPANY.phoneDisplay,
      availableLanguage: ["nl", "en"],
    },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["nl-NL", "en"],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[], locale: Locale = "nl") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(localizePath(locale, item.path)),
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

export function serviceLd(
  category: { slug: string; name: string; description: string },
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: category.name,
    name: category.name,
    description: category.description,
    inLanguage: locale,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: { "@type": "Country", name: locale === "en" ? "Netherlands" : "Nederland" },
    url: absoluteUrl(localizePath(locale, `/${category.slug}`)),
  };
}

export function professionalLd(pro: ProfessionalWithRating, reviews: Review[], categoryNames: string[], locale: Locale = "nl") {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": absoluteUrl(`/vakman/${pro.slug}#bedrijf`),
    inLanguage: locale,
    name: pro.companyName,
    description: pro.tagline,
    url: absoluteUrl(localizePath(locale, `/vakman/${pro.slug}`)),
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

export function itemListLd(pros: ProfessionalWithRating[], locale: Locale = "nl") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: pros.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(localizePath(locale, `/vakman/${p.slug}`)),
      name: p.companyName,
    })),
  };
}
