import type { Category } from "@/lib/types";

type CategoryInput = Omit<Category, "metaTitle" | "metaDescription" | "active"> &
  Partial<Pick<Category, "metaTitle" | "metaDescription">>;

const input: CategoryInput[] = [
  {
    slug: "schilder",
    plural: "schilders",
    name: "Schilder",
    namePlural: "Schilders",
    short: "Binnen- en buitenschilderwerk, kozijnen en houtrot.",
    intro:
      "Een goede schilder begint met het voorwerk: schuren, kitten en eventueel houtrot herstellen. Beschrijf je klus, dan zoeken wij een passende zelfstandige schilder.",
    commonJobs: ["Kozijnen buiten schilderen", "Woonkamer sausen", "Houtrot herstellen", "Trapgat schilderen", "Deuren lakken"],
  },
  {
    slug: "loodgieter",
    plural: "loodgieters",
    name: "Loodgieter",
    namePlural: "Loodgieters",
    short: "Lekkages, leidingwerk, afvoer en sanitair.",
    intro:
      "Van een druppelende kraan tot nieuw leidingwerk voor een verbouwing. Vertel wat er aan de hand is, dan zoeken wij een passende zelfstandige loodgieter.",
    commonJobs: ["Lekkage repareren", "Toilet vervangen", "Afvoer ontstoppen", "Leidingen verleggen", "Kraan vervangen"],
  },
  {
    slug: "elektricien",
    plural: "elektriciens",
    name: "Elektricien",
    namePlural: "Elektriciens",
    short: "Groepenkast, stopcontacten, verlichting en laadpalen.",
    intro:
      "Voor een nieuwe groepenkast, extra stopcontacten of het aansluiten van een laadpaal. Laat elektrisch werk altijd door een vakman doen.",
    commonJobs: ["Groepenkast vervangen", "Extra stopcontacten", "Laadpaal installeren", "Verlichting aanleggen", "Storing verhelpen"],
  },
  {
    slug: "timmerman",
    plural: "timmermannen",
    name: "Timmerman",
    namePlural: "Timmermannen",
    short: "Kozijnen, deuren, trappen en maatwerk van hout.",
    intro:
      "Een inbouwkast op maat, nieuwe binnendeuren of een dakkapel afwerken. Vertel wat je voor ogen hebt, dan zoeken wij een passende zelfstandige timmerman.",
    commonJobs: ["Inbouwkast maken", "Binnendeuren plaatsen", "Kozijn vervangen", "Trap renoveren", "Schutting plaatsen"],
  },
  {
    slug: "stukadoor",
    plural: "stukadoors",
    name: "Stukadoor",
    namePlural: "Stukadoors",
    short: "Wanden en plafonds glad of met structuur afwerken.",
    intro:
      "Strakke wanden, een nieuw plafond of scheuren herstellen. Geef aan om hoeveel vierkante meter het ongeveer gaat; dat helpt bij het vinden van de juiste stukadoor.",
    commonJobs: ["Wanden glad stucen", "Plafond spuiten", "Scheuren herstellen", "Sierpleister aanbrengen", "Betonstuc"],
  },
  {
    slug: "dakdekker",
    plural: "dakdekkers",
    name: "Dakdekker",
    namePlural: "Dakdekkers",
    short: "Daklekkage, dakpannen, bitumen en dakgoten.",
    intro:
      "Een lekkend dak wil je snel laten nakijken. Of het nu gaat om een reparatie of een complete dakrenovatie: wij zoeken een passende zelfstandige dakdekker.",
    commonJobs: ["Daklekkage repareren", "Plat dak vernieuwen", "Dakgoot vervangen", "Dakpannen herstellen", "Dak isoleren"],
  },
  {
    slug: "vloerspecialist",
    plural: "vloerspecialisten",
    name: "Vloerspecialist",
    namePlural: "Vloerspecialisten",
    short: "Parket, pvc, laminaat en gietvloeren.",
    intro:
      "Een nieuwe pvc-vloer, parket laten schuren of een gietvloer in de woonkamer. Vertel wat je wilt, dan zoeken wij een passende vloerspecialist.",
    commonJobs: ["Pvc-vloer leggen", "Parket schuren en lakken", "Laminaat leggen", "Gietvloer aanbrengen", "Ondervloer egaliseren"],
  },
  {
    slug: "badkamerspecialist",
    plural: "badkamerspecialisten",
    name: "Badkamerspecialist",
    namePlural: "Badkamerspecialisten",
    short: "Complete badkamerrenovaties van sloop tot oplevering.",
    intro:
      "Een badkamer renoveren is een klus waar meerdere vakgebieden bij komen kijken. Een badkamerspecialist regelt het geheel, van sloopwerk tot kitwerk.",
    commonJobs: ["Badkamer renoveren", "Inloopdouche plaatsen", "Toilet verbouwen", "Badkamer tegelen", "Vloerverwarming badkamer"],
  },
  {
    slug: "hovenier",
    plural: "hoveniers",
    name: "Hovenier",
    namePlural: "Hoveniers",
    short: "Tuinaanleg, bestrating, onderhoud en beplanting.",
    intro:
      "Een nieuwe tuin laten aanleggen, de bestrating vervangen of vast onderhoud. Vertel wat je wilt, dan zoeken wij een passende zelfstandige hovenier.",
    commonJobs: ["Tuin aanleggen", "Bestrating leggen", "Tuinonderhoud", "Schutting plaatsen", "Bomen snoeien"],
  },
  {
    slug: "aannemer",
    plural: "aannemers",
    name: "Aannemer",
    namePlural: "Aannemers",
    short: "Verbouwingen, uitbouwen en grotere projecten.",
    intro:
      "Voor een uitbouw, dakopbouw of een complete verbouwing heb je iemand nodig die het overzicht houdt. Een aannemer coördineert het werk en de verschillende vakmensen.",
    commonJobs: ["Uitbouw plaatsen", "Woning verbouwen", "Dakkapel plaatsen", "Muur doorbreken", "Garage ombouwen"],
  },
  {
    slug: "tegelzetter",
    plural: "tegelzetters",
    name: "Tegelzetter",
    namePlural: "Tegelzetters",
    short: "Wand- en vloertegels, binnen en buiten.",
    intro:
      "Grote vloertegels, een tegelwand in de keuken of een badkamer die opnieuw betegeld moet worden. Vermeld het formaat van de tegels als je dat al weet.",
    commonJobs: ["Vloertegels leggen", "Badkamer betegelen", "Keukenwand tegelen", "Voegwerk vernieuwen", "Terras tegelen"],
  },
  {
    slug: "schoonmaakbedrijf",
    plural: "schoonmaakbedrijven",
    name: "Schoonmaakbedrijf",
    namePlural: "Schoonmaakbedrijven",
    short: "Opleverschoonmaak, glasbewassing en na een verbouwing.",
    intro:
      "Na een verbouwing of verhuizing is een grondige schoonmaak geen overbodige luxe. Vertel wat er schoongemaakt moet worden, dan zoeken wij een passende partij.",
    commonJobs: ["Opleverschoonmaak", "Schoonmaak na verbouwing", "Glasbewassing", "Verhuisschoonmaak", "Gevelreiniging"],
  },
];

export const categories: Category[] = input.map((c) => ({
  ...c,
  metaTitle: c.metaTitle ?? `${c.name} nodig? Doe gratis een projectaanvraag`,
  metaDescription:
    c.metaDescription ??
    `Op zoek naar een ${c.name.toLowerCase()}? Doe gratis en vrijblijvend een projectaanvraag. Vakconnectie helpt je bij het vinden van een passende zelfstandige vakman.`,
  active: true,
}));

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function categoryName(slug: string) {
  return getCategory(slug)?.name ?? slug;
}
