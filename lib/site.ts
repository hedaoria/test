export const SITE_URL = "https://www.aquafix-loodgieter.nl";

export const BUSINESS = {
  name: "AquaFix Loodgieter",
  legalName: "AquaFix Loodgietersbedrijf B.V.",
  phone: "+31 6 17 34 73 33",
  phoneDisplay: "+31 6 17 34 73 33",
  phoneHref: "tel:+31617347333",
  whatsappHref: "https://wa.me/31617347333",
  whatsappDisplay: "+31 6 17 34 73 33",
  email: "info@aquafix-loodgieter.nl",
  address: {
    street: "Industrieweg 42",
    postalCode: "3542 AD",
    city: "Utrecht",
    country: "Nederland",
    countryCode: "NL",
  },
  geo: {
    latitude: 52.0907,
    longitude: 5.1214,
  },
  founded: "2010",
  kvk: "12345678",
  btw: "NL123456789B01",
  social: {
    facebook: "https://www.facebook.com/aquafixloodgieter",
    instagram: "https://www.instagram.com/aquafixloodgieter",
    linkedin: "https://www.linkedin.com/company/aquafix-loodgieter",
  },
  openingHours: {
    weekdayOpen: "07:00",
    weekdayClose: "22:00",
    emergency: "24/7",
  },
  ratingValue: "4.9",
  reviewCount: "312",
} as const;

export const LOCALES = ["nl", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "nl";
