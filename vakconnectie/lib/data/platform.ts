import type { Conversation, Notification, Plan, Report, User } from "@/lib/types";

/** DEMO-DATA — gesprekken, gebruikers, meldingen en abonnementen. */

export const conversations: Conversation[] = [
  {
    id: "c-1",
    jobId: "1001",
    customerId: "u-klant-1",
    professionalSlug: "van-dijk-schilderwerken",
    messages: [
      { id: "m1", from: "vakman", text: "Goedemiddag Lieke, dit soort woningen doen we veel. Ik kom graag een keer kijken om het houtrot te beoordelen. Schikt dinsdag of donderdag na 16:00?", sentAt: "2026-09-18T13:40:00", read: true },
      { id: "m2", from: "klant", text: "Hoi Mark, donderdag om 16:30 komt goed uit. Ik heb nog een foto van het ergste stuk.", sentAt: "2026-09-18T19:02:00", read: true },
      { id: "m3", from: "klant", photo: { name: "houtrot-onder-raam.jpg" }, sentAt: "2026-09-18T19:03:00", read: true },
      { id: "m4", from: "vakman", text: "Dank je. Dat ziet er goed te herstellen uit, ik neem donderdag wat materiaal mee om te laten zien hoe we het aanpakken.", sentAt: "2026-09-19T07:45:00", read: true },
      { id: "m5", from: "vakman", text: "Hierbij de prijsopgave na ons bezoek van vandaag. Laat maar weten als je vragen hebt.", sentAt: "2026-09-25T17:20:00", read: false },
    ],
  },
  {
    id: "c-2",
    jobId: "1001",
    customerId: "u-klant-1",
    professionalSlug: "kleurwerk-haarlem",
    messages: [
      { id: "m6", from: "vakman", text: "Hoi Lieke, ik werk normaal vooral in Haarlem, maar heb in oktober ruimte in de regio Utrecht. Ik kan op basis van foto's een eerste indicatie geven.", sentAt: "2026-09-19T08:05:00", read: false },
    ],
  },
  {
    id: "c-3",
    jobId: "1002",
    customerId: "u-klant-1",
    professionalSlug: "tuinen-van-mulder",
    messages: [
      { id: "m7", from: "vakman", text: "Leuke klus! Ik kan vrijdag langskomen om te meten en een voorstel te maken voor de beplanting.", sentAt: "2026-08-31T08:30:00", read: true },
      { id: "m8", from: "klant", text: "Vrijdag is prima, vanaf 13:00 ben ik thuis.", sentAt: "2026-08-31T09:12:00", read: true },
      { id: "m9", from: "vakman", text: "Top. We beginnen dan op maandag 12 oktober. Ik stuur de week ervoor nog een herinnering.", sentAt: "2026-09-08T16:00:00", read: true },
    ],
  },
  {
    id: "c-4",
    jobId: "1005",
    customerId: "u-klant-4",
    professionalSlug: "van-dijk-schilderwerken",
    messages: [
      { id: "m10", from: "vakman", text: "Hallo, ik zou graag een keer komen kijken. Is er een steiger- of trapgatsteiger nodig, of kan alles met een ladder?", sentAt: "2026-09-22T12:10:00", read: true },
      { id: "m11", from: "klant", text: "Goede vraag, het hoogste punt is ongeveer 7 meter. Ik stuur even een foto.", sentAt: "2026-09-22T18:40:00", read: false },
    ],
  },
];

export const users: User[] = [
  { id: "u-klant-1", role: "klant", firstName: "Lieke", lastName: "Janssen", email: "lieke.janssen@example.nl", emailVerified: true, status: "actief", createdAt: "2026-06-09" },
  { id: "u-klant-2", role: "klant", firstName: "Rogier", lastName: "Kramer", email: "rogier@example.nl", emailVerified: true, status: "actief", createdAt: "2026-09-25" },
  { id: "u-klant-3", role: "klant", firstName: "Ayşe", lastName: "Demir", email: "ayse.demir@example.nl", emailVerified: false, status: "actief", createdAt: "2026-09-26" },
  { id: "u-klant-4", role: "klant", firstName: "Hanneke", lastName: "Vos", email: "h.vos@example.nl", emailVerified: true, status: "actief", createdAt: "2026-09-22" },
  { id: "u-klant-9", role: "klant", firstName: "Onbekend", lastName: "Account", email: "gratis-geld@example.com", emailVerified: false, status: "geblokkeerd", createdAt: "2026-09-02" },
  { id: "u-vak-1", role: "vakman", firstName: "Mark", lastName: "van Dijk", email: "mark@example.nl", emailVerified: true, status: "actief", createdAt: "2025-03-12", professionalSlug: "van-dijk-schilderwerken" },
  { id: "u-vak-2", role: "vakman", firstName: "Niels", lastName: "Peters", email: "niels@example.nl", emailVerified: true, status: "in_beoordeling", createdAt: "2025-08-14", professionalSlug: "bouw-en-klusbedrijf-peters" },
  { id: "u-vak-3", role: "vakman", firstName: "Sanne", lastName: "Verhoeven", email: "sanne@example.nl", emailVerified: true, status: "actief", createdAt: "2025-06-02", professionalSlug: "kleurwerk-haarlem" },
  { id: "u-vak-4", role: "vakman", firstName: "Koen", lastName: "Brouwer", email: "info@brouwer-klus.example.nl", emailVerified: true, status: "in_beoordeling", createdAt: "2026-09-24" },
  { id: "u-vak-5", role: "vakman", firstName: "Iris", lastName: "Hoekstra", email: "iris@example.nl", emailVerified: false, status: "in_beoordeling", createdAt: "2026-09-26" },
  { id: "u-admin-1", role: "beheerder", firstName: "Team", lastName: "Vakconnectie", email: "beheer@vakconnectie.nl", emailVerified: true, status: "actief", createdAt: "2025-01-01" },
];

export const notifications: Notification[] = [
  { id: "n1", userId: "u-klant-1", kind: "bericht", text: "Van Dijk Schilderwerken heeft je een prijsopgave gestuurd.", href: "/account/berichten?gesprek=c-1", createdAt: "2026-09-25T17:20:00", read: false },
  { id: "n2", userId: "u-klant-1", kind: "reactie", text: "Kleurwerk Haarlem heeft gereageerd op je klus “Kozijnen en voordeur buiten schilderen”.", href: "/account/klussen/1001", createdAt: "2026-09-19T08:05:00", read: false },
  { id: "n3", userId: "u-klant-1", kind: "review", text: "Hoe ging het met Stroomlijn Elektra? Laat een beoordeling achter.", href: "/account/reviews", createdAt: "2026-07-01T10:00:00", read: true },
  { id: "n4", userId: "u-klant-1", kind: "systeem", text: "Je e-mailadres is bevestigd. Welkom bij Vakconnectie!", href: "/account", createdAt: "2026-06-09T12:00:00", read: true },
  { id: "n5", userId: "u-vak-1", kind: "opdracht", text: "Nieuwe opdracht in Nieuwegein: Woonkamer en hal sausen.", href: "/mijn-bedrijf/opdrachten/1004", createdAt: "2026-09-26T11:03:00", read: false },
  { id: "n6", userId: "u-vak-1", kind: "bericht", text: "Hanneke V. heeft gereageerd op je bericht.", href: "/mijn-bedrijf/berichten?gesprek=c-4", createdAt: "2026-09-22T18:40:00", read: false },
];

export const reports: Report[] = [
  { id: "rep-1", kind: "review", subject: "Review bij Vloer & Co Brabant (Henk A.)", reason: "Vakman geeft aan dat de klus niet via hen is uitgevoerd.", reportedBy: "Vloer & Co Brabant", createdAt: "2026-09-21", status: "open" },
  { id: "rep-2", kind: "bericht", subject: "Bericht van account gratis-geld@example.com", reason: "Verdacht bericht met externe betaallink.", reportedBy: "Tegelwerk Yilmaz", createdAt: "2026-09-03", status: "afgehandeld" },
  { id: "rep-3", kind: "opdracht", subject: "Opdracht #1006 Gevel reinigen", reason: "Mogelijk dubbel geplaatst.", reportedBy: "Systeemcontrole", createdAt: "2026-09-20", status: "in_behandeling" },
  { id: "rep-4", kind: "profiel", subject: "Profiel Bouw- en Klusbedrijf Peters", reason: "KvK-nummer nog niet gecontroleerd.", reportedBy: "Systeemcontrole", createdAt: "2026-08-15", status: "open" },
];

/** Voorstel voor abonnementen. Prijzen zijn indicatief en nog niet definitief. */
export const plans: Plan[] = [
  {
    id: "start",
    name: "Start",
    priceMonthly: 0,
    description: "Voor wie het platform eerst wil leren kennen.",
    features: ["Openbaar bedrijfsprofiel", "Reviews verzamelen", "Tot 3 reacties per maand", "Berichten met opdrachtgevers"],
  },
  {
    id: "vak",
    name: "Vak",
    priceMonthly: 39,
    description: "Voor zelfstandigen en kleine bedrijven.",
    features: ["Alles uit Start", "Onbeperkt reageren op opdrachten", "Projectfoto's op je profiel", "E-mailmelding bij nieuwe opdrachten"],
    highlighted: true,
  },
  {
    id: "bedrijf",
    name: "Bedrijf",
    priceMonthly: 79,
    description: "Voor bedrijven met meerdere medewerkers.",
    features: ["Alles uit Vak", "Meerdere gebruikers", "Groter werkgebied", "Maandelijks overzicht van je resultaten"],
  },
];
