import type { City } from "@/lib/types";

export const cities: City[] = [
  { slug: "amsterdam", name: "Amsterdam", province: "Noord-Holland", lat: 52.3676, lng: 4.9041, intro: "Van een grachtenpand in het centrum tot een nieuwbouwwoning in IJburg: in Amsterdam vraagt elk huis om net iets andere kennis." },
  { slug: "rotterdam", name: "Rotterdam", province: "Zuid-Holland", lat: 51.9244, lng: 4.4777, intro: "Van een vooroorlogse woning in Kralingen tot een appartement op de Kop van Zuid: in Rotterdam is de woningvoorraad heel divers." },
  { slug: "den-haag", name: "Den Haag", province: "Zuid-Holland", lat: 52.0705, lng: 4.3007, intro: "Van de herenhuizen in het Statenkwartier tot de nieuwbouw in Ypenburg: in Den Haag staan woningen uit heel verschillende periodes." },
  { slug: "utrecht", name: "Utrecht", province: "Utrecht", lat: 52.0907, lng: 5.1214, intro: "Werfkelders, jaren-dertigwoningen en nieuwbouw in Leidsche Rijn: in Utrecht zie je van alles." },
  { slug: "eindhoven", name: "Eindhoven", province: "Noord-Brabant", lat: 51.4416, lng: 5.4697, intro: "Van oudere woningen in Strijp tot nieuwbouw aan de rand van de stad: Eindhoven kent veel verschillende woningtypes." },
  { slug: "almere", name: "Almere", province: "Flevoland", lat: 52.3508, lng: 5.2647, intro: "Veel Almeerse woningen zijn gebouwd vanaf de jaren tachtig, met elk hun eigen bouwwijze." },
  { slug: "haarlem", name: "Haarlem", province: "Noord-Holland", lat: 52.3874, lng: 4.6462, intro: "Van een benedenwoning in de Kleverparkbuurt tot een eengezinswoning in Schalkwijk: Haarlem heeft woningen uit alle tijden." },
  { slug: "leiden", name: "Leiden", province: "Zuid-Holland", lat: 52.1601, lng: 4.497, intro: "In de historische binnenstad van Leiden gelden vaak extra regels, zeker bij monumenten." },
  { slug: "groningen", name: "Groningen", province: "Groningen", lat: 53.2194, lng: 6.5665, intro: "Van jarendertigwoningen in de stad tot boerderijen in de dorpen eromheen: de regio Groningen is gevarieerd." },
  { slug: "tilburg", name: "Tilburg", province: "Noord-Brabant", lat: 51.5555, lng: 5.0913, intro: "Van arbeiderswoningen in de binnenstad tot nieuwbouw in De Reeshof: Tilburg kent veel verschillende woningen." },
  { slug: "breda", name: "Breda", province: "Noord-Brabant", lat: 51.5719, lng: 4.7683, intro: "Van de binnenstad tot de omliggende dorpen: in en rond Breda staan woningen uit heel verschillende periodes." },
  { slug: "nijmegen", name: "Nijmegen", province: "Gelderland", lat: 51.8126, lng: 5.8372, intro: "Van de Benedenstad tot de Waalsprong: Nijmegen combineert eeuwenoude straten met nieuwe wijken." },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
