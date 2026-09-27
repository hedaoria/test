export const SITE_NAME = "Vakconnectie";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vakconnectie.nl").replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "Vakconnectie helpt je bij het vinden van een passende zelfstandige vakman. Een projectaanvraag is gratis en vrijblijvend.";

/** Bedrijfsgegevens zoals vermeld op vakconnectie.nl. */
export const COMPANY = {
  legalName: "Vakconnectie V.O.F.",
  city: "Haarlem",
  country: "Nederland",
  kvk: "42065725",
  email: "info@vakconnectie.nl",
  phoneDisplay: "+31 6 17 34 73 33",
  phoneHref: "+31617347333",
  /** Nummer waarop aanvragen via WhatsApp binnenkomen (internationaal formaat, alleen cijfers). */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "31617347333",
};

/**
 * Accounts, dashboards en de beheeromgeving zijn gebouwd maar staan uit
 * totdat authenticatie en een database gekoppeld zijn. Zet ACCOUNTS_ENABLED=true
 * om ze te activeren.
 */
export const ACCOUNTS_ENABLED = process.env.ACCOUNTS_ENABLED === "true";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
