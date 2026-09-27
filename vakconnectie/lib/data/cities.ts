import type { City } from "@/lib/types";

export const cities: City[] = [
  { slug: "amsterdam", name: "Amsterdam", province: "Noord-Holland", lat: 52.3676, lng: 4.9041, intro: "Van een grachtenpand in Centrum tot een nieuwbouwwoning in IJburg: in Amsterdam vraagt elk huis om net iets andere kennis." },
  { slug: "rotterdam", name: "Rotterdam", province: "Zuid-Holland", lat: 51.9244, lng: 4.4777, intro: "Of je nu in Kralingen woont of in een appartement op de Kop van Zuid: hier vind je vakmensen die Rotterdam en de regio kennen." },
  { slug: "den-haag", name: "Den Haag", province: "Zuid-Holland", lat: 52.0705, lng: 4.3007, intro: "Van de Statenkwartier-woningen tot de flats in Ypenburg. Vind een vakman die bekend is met woningen in Den Haag en omgeving." },
  { slug: "utrecht", name: "Utrecht", province: "Utrecht", lat: 52.0907, lng: 5.1214, intro: "Werfkelders, jaren-dertigwoningen en Leidsche Rijn: in Utrecht zie je van alles. Vakmensen uit de buurt weten wat ze kunnen verwachten." },
  { slug: "eindhoven", name: "Eindhoven", province: "Noord-Brabant", lat: 51.4416, lng: 5.4697, intro: "Voor klussen in Eindhoven, Veldhoven, Best en de rest van de regio vind je hier vakmensen die dichtbij werken." },
  { slug: "almere", name: "Almere", province: "Flevoland", lat: 52.3508, lng: 5.2647, intro: "Veel Almeerse woningen zijn tussen de jaren tachtig en nu gebouwd. Vakmensen uit de regio kennen de bouwwijze goed." },
  { slug: "haarlem", name: "Haarlem", province: "Noord-Holland", lat: 52.3874, lng: 4.6462, intro: "Van een benedenwoning in de Kleverpark­buurt tot een eengezinswoning in Schalkwijk: vind vakmensen uit Haarlem en omstreken." },
  { slug: "leiden", name: "Leiden", province: "Zuid-Holland", lat: 52.1601, lng: 4.497, intro: "In de binnenstad van Leiden gelden vaak extra regels. Kies een vakman die weet hoe je daar een klus goed aanpakt." },
  { slug: "groningen", name: "Groningen", province: "Groningen", lat: 53.2194, lng: 6.5665, intro: "Voor woningen in de stad en de dorpen eromheen. Vind vakmensen die de Groningse regio kennen." },
  { slug: "tilburg", name: "Tilburg", province: "Noord-Brabant", lat: 51.5555, lng: 5.0913, intro: "Of het nu gaat om een arbeiderswoning in de binnenstad of nieuwbouw in De Reeshof: vind vakmensen uit Tilburg en de regio." },
  { slug: "breda", name: "Breda", province: "Noord-Brabant", lat: 51.5719, lng: 4.7683, intro: "Plaats je klus in Breda of een van de omliggende dorpen en kom in contact met vakmensen die in de buurt werken." },
  { slug: "nijmegen", name: "Nijmegen", province: "Gelderland", lat: 51.8126, lng: 5.8372, intro: "Van de Benedenstad tot de Waalsprong: in Nijmegen vind je hier vakmensen voor klussen in en rond het huis." },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
