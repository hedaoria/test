/**
 * Openbare URL's per taal.
 *
 * Intern werkt de app met de Nederlandse paden (app/[lang]/(site)/...).
 * Nederlands staat zonder prefix op de root, Engels onder /en met Engelse
 * paden. proxy.ts vertaalt binnenkomende URL's naar de interne route, en
 * localizePath() vertaalt interne paden naar de openbare URL voor links.
 */
import type { Locale } from "./config";

// Eerste padsegment: Nederlands → Engels
const SEGMENTS: Record<string, string> = {
  vakmensen: "find-a-tradesperson",
  vakman: "tradesperson",
  "klus-plaatsen": "project-request",
  "aanmelden-als-vakman": "join-as-a-tradesperson",
  "hoe-werkt-het": "how-it-works",
  "voor-vakmensen": "for-tradespeople",
  "veelgestelde-vragen": "faq",
  "over-ons": "about-us",
  contact: "contact",
  privacybeleid: "privacy-policy",
  cookiebeleid: "cookie-policy",
  "algemene-voorwaarden": "terms-and-conditions",
  // vakgebieden
  schilder: "painter",
  loodgieter: "plumber",
  elektricien: "electrician",
  timmerman: "carpenter",
  stukadoor: "plasterer",
  dakdekker: "roofer",
  vloerspecialist: "flooring-specialist",
  badkamerspecialist: "bathroom-specialist",
  hovenier: "gardener",
  aannemer: "building-contractor",
  tegelzetter: "tiler",
  schoonmaakbedrijf: "cleaning-company",
};

const REVERSE: Record<string, string> = Object.fromEntries(Object.entries(SEGMENTS).map(([nl, en]) => [en, nl]));

function splitHref(href: string) {
  const m = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/)!;
  return { path: m[1] || "/", query: m[2] ?? "", hash: m[3] ?? "" };
}

/** Intern (Nederlands) pad → openbare URL in de gevraagde taal. */
export function localizePath(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href;
  if (locale === "nl") return href;
  const { path, query, hash } = splitHref(href);
  const segs = path.split("/").filter(Boolean);
  if (segs.length) segs[0] = SEGMENTS[segs[0]!] ?? segs[0]!;
  return `/en${segs.length ? "/" + segs.join("/") : ""}${query}${hash}`;
}

/** Openbaar Engels pad (zonder /en) → intern Nederlands pad. */
export function englishToInternal(pathAfterEn: string): string {
  const segs = pathAfterEn.split("/").filter(Boolean);
  if (segs.length) segs[0] = REVERSE[segs[0]!] ?? (segs[0]! in SEGMENTS ? segs[0]! : `__onbekend__${segs[0]}`);
  return "/" + segs.join("/");
}

/** Beide taalversies van een intern pad, voor hreflang en de taalkeuze. */
export function alternates(internalPath: string) {
  return { nl: localizePath("nl", internalPath), en: localizePath("en", internalPath) };
}

/**
 * Leid uit een pathname (openbaar of intern herschreven) de taal en het interne
 * pad af. Zo geven server en browser hetzelfde resultaat.
 */
export function parsePathname(pathname: string): { locale: Locale; internal: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) return { locale: "en", internal: englishToInternal(pathname.slice(3)) };
  if (pathname === "/nl" || pathname.startsWith("/nl/")) return { locale: "nl", internal: pathname.slice(3) || "/" };
  return { locale: "nl", internal: pathname || "/" };
}
