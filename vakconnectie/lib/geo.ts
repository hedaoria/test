import { cities } from "@/lib/data/cities";

/**
 * Eenvoudige postcode- en plaatsbepaling.
 *
 * Voor nu gebruiken we per postcodegebied (eerste twee cijfers) een
 * benaderde coördinaat. Dat is nauwkeurig genoeg om vakmensen op afstand te
 * sorteren. Vervang `resolveLocation` later door een echte postcode-API
 * (bijvoorbeeld de PDOK Locatieserver) voor adresniveau.
 */

export interface GeoPoint {
  lat: number;
  lng: number;
  label: string;
}

// Postcodegebied (eerste twee cijfers) → [lat, lng, plaats]
const POSTCODE_REGIONS: Record<string, [number, number, string]> = {
  "10": [52.372, 4.894, "Amsterdam"],
  "11": [52.335, 4.93, "Amsterdam"],
  "12": [52.223, 5.176, "Hilversum"],
  "13": [52.371, 5.222, "Almere"],
  "14": [52.503, 4.959, "Purmerend"],
  "15": [52.438, 4.826, "Zaandam"],
  "16": [52.643, 5.06, "Hoorn"],
  "17": [52.8, 4.84, "Schagen"],
  "18": [52.632, 4.748, "Alkmaar"],
  "19": [52.487, 4.657, "Beverwijk"],
  "20": [52.381, 4.637, "Haarlem"],
  "21": [52.303, 4.69, "Hoofddorp"],
  "22": [52.203, 4.43, "Katwijk"],
  "23": [52.16, 4.49, "Leiden"],
  "24": [52.128, 4.656, "Alphen aan den Rijn"],
  "25": [52.075, 4.3, "Den Haag"],
  "26": [52.012, 4.357, "Delft"],
  "27": [52.06, 4.494, "Zoetermeer"],
  "28": [52.017, 4.708, "Gouda"],
  "29": [51.917, 4.588, "Krimpen aan den IJssel"],
  "30": [51.922, 4.472, "Rotterdam"],
  "31": [51.91, 4.4, "Schiedam"],
  "32": [51.845, 4.33, "Spijkenisse"],
  "33": [51.813, 4.69, "Dordrecht"],
  "34": [52.03, 5.09, "Nieuwegein"],
  "35": [52.09, 5.12, "Utrecht"],
  "36": [52.135, 5.035, "Maarssen"],
  "37": [52.09, 5.235, "Zeist"],
  "38": [52.157, 5.387, "Amersfoort"],
  "39": [52.025, 5.555, "Veenendaal"],
  "40": [51.886, 5.43, "Tiel"],
  "41": [51.957, 5.227, "Culemborg"],
  "42": [51.834, 4.974, "Gorinchem"],
  "43": [51.65, 3.918, "Zierikzee"],
  "44": [51.505, 3.89, "Goes"],
  "45": [51.3, 3.5, "Oostburg"],
  "46": [51.495, 4.29, "Bergen op Zoom"],
  "47": [51.53, 4.465, "Roosendaal"],
  "48": [51.588, 4.776, "Breda"],
  "49": [51.645, 4.86, "Oosterhout"],
  "50": [51.56, 5.083, "Tilburg"],
  "51": [51.64, 4.95, "Dongen"],
  "52": [51.69, 5.304, "'s-Hertogenbosch"],
  "53": [51.81, 5.25, "Zaltbommel"],
  "54": [51.66, 5.62, "Uden"],
  "55": [51.42, 5.4, "Veldhoven"],
  "56": [51.44, 5.478, "Eindhoven"],
  "57": [51.48, 5.66, "Helmond"],
  "58": [51.527, 5.975, "Venray"],
  "59": [51.37, 6.172, "Venlo"],
  "60": [51.25, 5.707, "Weert"],
  "61": [51.0, 5.87, "Sittard"],
  "62": [50.85, 5.69, "Maastricht"],
  "63": [50.89, 5.9, "Valkenburg"],
  "64": [50.888, 5.98, "Heerlen"],
  "65": [51.842, 5.852, "Nijmegen"],
  "66": [51.8, 5.72, "Wijchen"],
  "67": [52.04, 5.665, "Ede"],
  "68": [51.985, 5.899, "Arnhem"],
  "69": [51.93, 6.07, "Zevenaar"],
  "70": [51.965, 6.29, "Doetinchem"],
  "71": [51.97, 6.72, "Winterswijk"],
  "72": [52.14, 6.2, "Zutphen"],
  "73": [52.21, 5.97, "Apeldoorn"],
  "74": [52.255, 6.16, "Deventer"],
  "75": [52.22, 6.89, "Enschede"],
  "76": [52.356, 6.66, "Almelo"],
  "77": [52.575, 6.62, "Hardenberg"],
  "78": [52.785, 6.9, "Emmen"],
  "79": [52.72, 6.48, "Hoogeveen"],
  "80": [52.516, 6.083, "Zwolle"],
  "81": [52.39, 6.27, "Raalte"],
  "82": [52.518, 5.471, "Lelystad"],
  "83": [52.71, 5.75, "Emmeloord"],
  "84": [52.96, 5.92, "Heerenveen"],
  "85": [53.03, 5.66, "Sneek"],
  "86": [53.06, 5.53, "Bolsward"],
  "87": [53.0, 5.4, "Workum"],
  "88": [53.175, 5.42, "Harlingen"],
  "89": [53.2, 5.8, "Leeuwarden"],
  "90": [53.25, 5.95, "Leeuwarden"],
  "91": [53.33, 5.99, "Dokkum"],
  "92": [53.11, 6.1, "Drachten"],
  "93": [53.13, 6.43, "Roden"],
  "94": [52.99, 6.56, "Assen"],
  "95": [52.99, 6.96, "Stadskanaal"],
  "96": [53.17, 6.75, "Hoogezand"],
  "97": [53.22, 6.57, "Groningen"],
  "98": [53.3, 6.5, "Winsum"],
  "99": [53.32, 6.86, "Appingedam"],
};

export const POSTCODE_PATTERN = /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/;

export function normalizePostcode(input: string) {
  const clean = input.replace(/\s+/g, "").toUpperCase();
  return clean.length === 6 ? `${clean.slice(0, 4)} ${clean.slice(4)}` : clean;
}

export function isValidPostcode(input: string) {
  return POSTCODE_PATTERN.test(input.trim());
}

/** Bepaal een benaderde locatie op basis van postcode (4 cijfers volstaan) of plaatsnaam. */
export function resolveLocation({ postcode, place }: { postcode?: string; place?: string }): GeoPoint | null {
  const digits = postcode?.replace(/\D/g, "") ?? "";
  if (digits.length >= 2) {
    const region = POSTCODE_REGIONS[digits.slice(0, 2)];
    if (region) return { lat: region[0], lng: region[1], label: postcode!.trim().toUpperCase() };
  }
  if (place && place.trim()) {
    const q = place.trim().toLowerCase();
    const city = cities.find((c) => c.name.toLowerCase() === q || c.slug === q);
    if (city) return { lat: city.lat, lng: city.lng, label: city.name };
    const region = Object.values(POSTCODE_REGIONS).find(([, , name]) => name.toLowerCase() === q);
    if (region) return { lat: region[0], lng: region[1], label: region[2] };
  }
  return null;
}

export function placeFromPostcode(postcode: string) {
  const digits = postcode.replace(/\D/g, "");
  return POSTCODE_REGIONS[digits.slice(0, 2)]?.[2];
}

/** Hemelsbrede afstand in kilometers (haversine). */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
