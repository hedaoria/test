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

/* ---------- Engelse teksten per vakgebied ---------- */

type CategoryText = Pick<Category, "name" | "namePlural" | "short" | "intro" | "commonJobs">;

const EN: Record<string, CategoryText> = {
  schilder: {
    name: "Painter",
    namePlural: "Painters",
    short: "Interior and exterior painting, window frames and wood rot.",
    intro: "Good painting starts with the preparation: sanding, filling and repairing any wood rot. Describe your job and we will find a suitable self-employed painter.",
    commonJobs: ["Paint exterior window frames", "Paint the living room", "Repair wood rot", "Paint the stairwell", "Lacquer doors"],
  },
  loodgieter: {
    name: "Plumber",
    namePlural: "Plumbers",
    short: "Leaks, pipework, drains and sanitary fittings.",
    intro: "From a dripping tap to new pipework for a renovation. Tell us what is going on and we will find a suitable self-employed plumber.",
    commonJobs: ["Fix a leak", "Replace a toilet", "Unblock a drain", "Reroute pipes", "Replace a tap"],
  },
  elektricien: {
    name: "Electrician",
    namePlural: "Electricians",
    short: "Fuse boxes, sockets, lighting and charging points.",
    intro: "For a new fuse box, extra sockets or connecting a charging point. Always have electrical work done by a professional.",
    commonJobs: ["Replace fuse box", "Add extra sockets", "Install a charging point", "Install lighting", "Fix a fault"],
  },
  timmerman: {
    name: "Carpenter",
    namePlural: "Carpenters",
    short: "Window frames, doors, stairs and bespoke woodwork.",
    intro: "A built-in cupboard, new interior doors or finishing a dormer. Tell us what you have in mind and we will find a suitable self-employed carpenter.",
    commonJobs: ["Build a fitted cupboard", "Fit interior doors", "Replace a window frame", "Renovate stairs", "Put up a fence"],
  },
  stukadoor: {
    name: "Plasterer",
    namePlural: "Plasterers",
    short: "Smooth or textured walls and ceilings.",
    intro: "Smooth walls, a new ceiling or repairing cracks. Let us know roughly how many square metres it involves; that helps us find the right plasterer.",
    commonJobs: ["Skim walls smooth", "Spray a ceiling", "Repair cracks", "Apply decorative plaster", "Microcement"],
  },
  dakdekker: {
    name: "Roofer",
    namePlural: "Roofers",
    short: "Roof leaks, tiles, bitumen and gutters.",
    intro: "A leaking roof needs checking quickly. Whether it is a repair or a complete roof renovation, we will find a suitable self-employed roofer.",
    commonJobs: ["Repair a roof leak", "Renew a flat roof", "Replace a gutter", "Repair roof tiles", "Insulate the roof"],
  },
  vloerspecialist: {
    name: "Flooring specialist",
    namePlural: "Flooring specialists",
    short: "Parquet, vinyl, laminate and poured floors.",
    intro: "A new vinyl floor, sanding parquet or a poured floor in the living room. Tell us what you want and we will find a suitable flooring specialist.",
    commonJobs: ["Lay a vinyl floor", "Sand and lacquer parquet", "Lay laminate", "Install a poured floor", "Level the subfloor"],
  },
  badkamerspecialist: {
    name: "Bathroom specialist",
    namePlural: "Bathroom specialists",
    short: "Complete bathroom renovations from demolition to handover.",
    intro: "Renovating a bathroom involves several trades. A bathroom specialist takes care of the whole job, from demolition to sealing.",
    commonJobs: ["Renovate bathroom", "Fit a walk-in shower", "Renovate the toilet", "Tile the bathroom", "Bathroom underfloor heating"],
  },
  hovenier: {
    name: "Gardener",
    namePlural: "Gardeners",
    short: "Garden design, paving, maintenance and planting.",
    intro: "Having a new garden laid out, replacing the paving or regular maintenance. Tell us what you want and we will find a suitable self-employed gardener.",
    commonJobs: ["Lay out a garden", "Lay paving", "Garden maintenance", "Put up a fence", "Prune trees"],
  },
  aannemer: {
    name: "Building contractor",
    namePlural: "Building contractors",
    short: "Renovations, extensions and larger projects.",
    intro: "For an extension, an extra storey or a complete renovation you need someone to keep the overview. A building contractor coordinates the work and the different trades.",
    commonJobs: ["Build an extension", "Renovate a home", "Fit a dormer", "Knock through a wall", "Convert a garage"],
  },
  tegelzetter: {
    name: "Tiler",
    namePlural: "Tilers",
    short: "Wall and floor tiles, indoors and outdoors.",
    intro: "Large floor tiles, a tiled kitchen wall or a bathroom that needs retiling. Mention the tile size if you already know it.",
    commonJobs: ["Lay floor tiles", "Tile the bathroom", "Tile the kitchen wall", "Renew grouting", "Tile a patio"],
  },
  schoonmaakbedrijf: {
    name: "Cleaning company",
    namePlural: "Cleaning companies",
    short: "End-of-tenancy cleaning, windows and post-renovation cleaning.",
    intro: "After a renovation or a move, a thorough clean is no luxury. Tell us what needs cleaning and we will find a suitable company.",
    commonJobs: ["End-of-tenancy clean", "Post-renovation clean", "Window cleaning", "Moving clean", "Facade cleaning"],
  },
};

/** Teksten van een vakgebied in de gevraagde taal. */
export function categoryText(c: Category, locale: "nl" | "en"): CategoryText {
  return locale === "en" ? (EN[c.slug] ?? c) : c;
}

export function localizedCategoryName(slug: string, locale: "nl" | "en") {
  const c = getCategory(slug);
  return c ? categoryText(c, locale).name : slug;
}
