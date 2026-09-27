export const SITE_NAME = "Vakconnectie";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vakconnectie.nl").replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "Plaats je klus en kom eenvoudig in contact met vakmensen bij jou in de buurt. Vergelijk profielen en beoordelingen en kies zelf.";

/** Zet op "false" zodra echte profielen uit de database komen. */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

// Bedrijfsgegevens: vervangen door de echte gegevens vóór livegang.
export const COMPANY = {
  legalName: "Vakconnectie B.V.",
  email: "hallo@vakconnectie.nl",
  supportEmail: "support@vakconnectie.nl",
  street: "Voorbeeldstraat 1",
  postcode: "3511 AA",
  city: "Utrecht",
  kvk: "00000000",
};

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
