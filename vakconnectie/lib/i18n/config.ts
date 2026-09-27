export const LOCALES = ["nl", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "nl";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const HTML_LANG: Record<Locale, string> = { nl: "nl", en: "en" };
export const OG_LOCALE: Record<Locale, string> = { nl: "nl_NL", en: "en_GB" };
export const INTL_LOCALE: Record<Locale, string> = { nl: "nl-NL", en: "en-GB" };
