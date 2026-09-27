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
      "Een goede schilder begint met het voorwerk: schuren, kitten en eventueel houtrot herstellen. Beschrijf je klus en ontvang reacties van schilders uit de buurt.",
    commonJobs: ["Kozijnen buiten schilderen", "Woonkamer sausen", "Houtrot herstellen", "Trapgat schilderen", "Deuren lakken"],
  },
  {
    slug: "loodgieter",
    plural: "loodgieters",
    name: "Loodgieter",
    namePlural: "Loodgieters",
    short: "Lekkages, leidingwerk, afvoer en sanitair.",
    intro:
      "Van een druppelende kraan tot nieuw leidingwerk voor een verbouwing. Vertel wat er aan de hand is, dan kunnen loodgieters uit jouw regio reageren.",
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
      "Een inbouwkast op maat, nieuwe binnendeuren of een dakkapel afwerken. Timmerlieden uit de buurt denken graag met je mee.",
    commonJobs: ["Inbouwkast maken", "Binnendeuren plaatsen", "Kozijn vervangen", "Trap renoveren", "Schutting plaatsen"],
  },
  {
    slug: "stukadoor",
    plural: "stukadoors",
    name: "Stukadoor",
    namePlural: "Stukadoors",
    short: "Wanden en plafonds glad of met structuur afwerken.",
    intro:
      "Strakke wanden, een nieuw plafond of scheuren herstellen. Geef aan om hoeveel vierkante meter het ongeveer gaat, dan kunnen stukadoors beter inschatten wat er nodig is.",
    commonJobs: ["Wanden glad stucen", "Plafond spuiten", "Scheuren herstellen", "Sierpleister aanbrengen", "Betonstuc"],
  },
  {
    slug: "dakdekker",
    plural: "dakdekkers",
    name: "Dakdekker",
    namePlural: "Dakdekkers",
    short: "Daklekkage, dakpannen, bitumen en dakgoten.",
    intro:
      "Een lekkend dak wil je snel laten nakijken. Dakdekkers uit de regio kunnen reageren op reparaties, onderhoud en complete dakrenovaties.",
    commonJobs: ["Daklekkage repareren", "Plat dak vernieuwen", "Dakgoot vervangen", "Dakpannen herstellen", "Dak isoleren"],
  },
  {
    slug: "vloerspecialist",
    plural: "vloerspecialisten",
    name: "Vloerspecialist",
    namePlural: "Vloerspecialisten",
    short: "Parket, pvc, laminaat en gietvloeren.",
    intro:
      "Een nieuwe pvc-vloer, parket laten schuren of een gietvloer in de woonkamer. Vergelijk vloerspecialisten en bekijk hun eerdere projecten.",
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
      "Een nieuwe tuin laten aanleggen, de bestrating vervangen of vast onderhoud. Hoveniers uit de buurt kunnen reageren en een voorstel doen.",
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
      "Na een verbouwing of verhuizing is een grondige schoonmaak geen overbodige luxe. Schoonmaakbedrijven uit de regio helpen je graag.",
    commonJobs: ["Opleverschoonmaak", "Schoonmaak na verbouwing", "Glasbewassing", "Verhuisschoonmaak", "Gevelreiniging"],
  },
];

export const categories: Category[] = input.map((c) => ({
  ...c,
  metaTitle: c.metaTitle ?? `${c.name} nodig? Vind ${c.namePlural.toLowerCase()} bij jou in de buurt`,
  metaDescription:
    c.metaDescription ??
    `Plaats gratis je klus en kom in contact met ${c.namePlural.toLowerCase()} uit jouw regio. Bekijk profielen, eerdere projecten en beoordelingen van klanten.`,
  active: true,
}));

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function categoryName(slug: string) {
  return getCategory(slug)?.name ?? slug;
}
