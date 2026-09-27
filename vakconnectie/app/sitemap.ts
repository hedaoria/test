import type { MetadataRoute } from "next";
import { termsSections } from "@/lib/data/legal";
import { listCategories, listCities, listProfessionals } from "@/lib/repository";
import { absoluteUrl } from "@/lib/site";
import { alternates } from "@/lib/i18n/routes";

const STATIC = [
  "/",
  "/vakmensen",
  "/klus-plaatsen",
  "/hoe-werkt-het",
  "/voor-vakmensen",
  "/veelgestelde-vragen",
  "/over-ons",
  "/contact",
  "/aanmelden-als-vakman",
  "/privacybeleid",
  "/cookiebeleid",
];

/** Elke pagina in beide talen, met onderlinge hreflang-verwijzingen. */
function entries(internal: string, priority: number): MetadataRoute.Sitemap {
  const urls = alternates(internal);
  const languages = { nl: absoluteUrl(urls.nl), en: absoluteUrl(urls.en) };
  return (["nl", "en"] as const).map((l) => ({
    url: absoluteUrl(urls[l]),
    changeFrequency: "weekly" as const,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, cities, pros] = await Promise.all([listCategories(), listCities(), listProfessionals()]);
  return [
    ...STATIC.flatMap((p) => entries(p, p === "/" ? 1 : 0.6)),
    ...categories.flatMap((c) => entries(`/${c.slug}`, 0.8)),
    ...cities.flatMap((c) => entries(`/vakmensen/${c.slug}`, 0.8)),
    ...pros.flatMap((p) => entries(`/vakman/${p.slug}`, 0.5)),
    ...(termsSections.length ? entries("/algemene-voorwaarden", 0.3) : []),
  ];
}
