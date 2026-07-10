import type { Metadata } from "next";
import { BUSINESS, SITE_URL, Locale, LOCALES } from "./site";
import { PATHS, PageKey, getAlternatePath } from "./routes";

interface BuildMetadataArgs {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  alternatePath?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  alternatePath,
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const altPath = alternatePath ?? getAlternatePath(path);
  const otherLoc: Locale = locale === "nl" ? "en" : "nl";

  const languages: Record<string, string> = {
    [locale === "nl" ? "nl-NL" : "en-GB"]: canonical,
    [otherLoc === "nl" ? "nl-NL" : "en-GB"]: `${SITE_URL}${altPath}`,
    "x-default": PATHS.nl.home === path ? canonical : `${SITE_URL}${PATHS.nl.home}`,
  };

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BUSINESS.name,
      locale: locale === "nl" ? "nl_NL" : "en_GB",
      alternateLocale: otherLoc === "nl" ? "nl_NL" : "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function localBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    image: `${SITE_URL}/images/logo.svg`,
    url: `${SITE_URL}${PATHS[locale].home}`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      postalCode: BUSINESS.address.postalCode,
      addressLocality: BUSINESS.address.city,
      addressCountry: BUSINESS.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
        description: "24/7 emergency plumbing service",
      },
    ],
    sameAs: [BUSINESS.social.facebook, BUSINESS.social.instagram, BUSINESS.social.linkedin],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.ratingValue,
      reviewCount: BUSINESS.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    foundingDate: BUSINESS.founded,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(locale: Locale, items: { label: string; href: string }[]) {
  const dict = { home: locale === "nl" ? "Home" : "Home" };
  const all = [{ label: dict.home, href: PATHS[locale].home }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function serviceSchema(locale: Locale, args: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: args.name,
    name: args.name,
    description: args.description,
    url: `${SITE_URL}${args.path}`,
    provider: {
      "@type": "Plumber",
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      "@id": `${SITE_URL}/#business`,
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    sameAs: [BUSINESS.social.facebook, BUSINESS.social.instagram, BUSINESS.social.linkedin],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS.phone,
        contactType: "customer service",
        areaServed: "NL",
        availableLanguage: ["nl", "en"],
      },
    ],
  };
}

export function allPagePaths(): { locale: Locale; key: PageKey; path: string }[] {
  const result: { locale: Locale; key: PageKey; path: string }[] = [];
  for (const locale of LOCALES) {
    for (const key of Object.keys(PATHS[locale]) as PageKey[]) {
      result.push({ locale, key, path: PATHS[locale][key] });
    }
  }
  return result;
}
