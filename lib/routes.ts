import { Locale } from "./site";
import { BLOG_POSTS } from "./content/blog";

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "emergency"
  | "leakDetection"
  | "drainUnblocking"
  | "sewer"
  | "heating"
  | "bathroom"
  | "serviceAreas"
  | "reviews"
  | "faq"
  | "blog"
  | "contact"
  | "privacy"
  | "terms"
  | "cookiePolicy";

export const SERVICE_PAGE_KEYS: PageKey[] = [
  "emergency",
  "leakDetection",
  "drainUnblocking",
  "sewer",
  "heating",
  "bathroom",
];

type PathMap = Record<PageKey, string>;

export const PATHS: Record<Locale, PathMap> = {
  nl: {
    home: "/nl",
    about: "/nl/over-ons",
    services: "/nl/diensten",
    emergency: "/nl/diensten/spoed-loodgieter",
    leakDetection: "/nl/diensten/lekkage-opsporen",
    drainUnblocking: "/nl/diensten/afvoer-ontstoppen",
    sewer: "/nl/diensten/riolering",
    heating: "/nl/diensten/cv-ketel-reparatie",
    bathroom: "/nl/diensten/badkamer-renovatie",
    serviceAreas: "/nl/werkgebied",
    reviews: "/nl/reviews",
    faq: "/nl/veelgestelde-vragen",
    blog: "/nl/blog",
    contact: "/nl/contact",
    privacy: "/nl/privacybeleid",
    terms: "/nl/algemene-voorwaarden",
    cookiePolicy: "/nl/cookiebeleid",
  },
  en: {
    home: "/en",
    about: "/en/about-us",
    services: "/en/services",
    emergency: "/en/services/emergency-plumber",
    leakDetection: "/en/services/leak-detection",
    drainUnblocking: "/en/services/drain-unblocking",
    sewer: "/en/services/sewer-services",
    heating: "/en/services/heating-repair",
    bathroom: "/en/services/bathroom-renovation",
    serviceAreas: "/en/service-areas",
    reviews: "/en/reviews",
    faq: "/en/faq",
    blog: "/en/blog",
    contact: "/en/contact",
    privacy: "/en/privacy-policy",
    terms: "/en/terms-and-conditions",
    cookiePolicy: "/en/cookie-policy",
  },
};

export const BLOG_BASE: Record<Locale, string> = {
  nl: "/nl/blog",
  en: "/en/blog",
};

export function path(locale: Locale, key: PageKey): string {
  return PATHS[locale][key];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "nl" ? "en" : "nl";
}

export function fullUrl(pathname: string): string {
  const base = "https://www.aquafix-loodgieter.nl";
  return `${base}${pathname}`;
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "nl";
}

export function getAlternatePath(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  const target = otherLocale(locale);

  const blogBase = BLOG_BASE[locale];
  if (pathname === blogBase || pathname === `${blogBase}/`) {
    return BLOG_BASE[target];
  }
  if (pathname.startsWith(`${blogBase}/`)) {
    const slug = pathname.slice(blogBase.length + 1);
    const post = BLOG_POSTS.find((p) => p.slug[locale] === slug);
    if (post) {
      return `${BLOG_BASE[target]}/${post.slug[target]}`;
    }
    return BLOG_BASE[target];
  }

  const entries = Object.entries(PATHS[locale]) as [PageKey, string][];
  const found = entries.find(([, value]) => value === pathname);
  if (found) {
    return PATHS[target][found[0]];
  }

  return PATHS[target].home;
}
