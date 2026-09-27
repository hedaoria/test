import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/content";
import { listCategories, listCities, listProfessionals } from "@/lib/repository";
import { absoluteUrl } from "@/lib/site";

const STATIC = [
  "/",
  "/vakmensen",
  "/klus-plaatsen",
  "/hoe-werkt-het",
  "/voor-vakmensen",
  "/reviews",
  "/veelgestelde-vragen",
  "/over-ons",
  "/contact",
  "/blog",
  "/vacatures",
  "/registreren",
  "/algemene-voorwaarden",
  "/privacybeleid",
  "/cookiebeleid",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, cities, pros] = await Promise.all([listCategories(), listCities(), listProfessionals()]);
  return [
    ...STATIC.map((p) => ({ url: absoluteUrl(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.6 })),
    ...categories.map((c) => ({ url: absoluteUrl(`/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...cities.map((c) => ({ url: absoluteUrl(`/vakmensen/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...pros.map((p) => ({ url: absoluteUrl(`/vakman/${p.slug}`), changeFrequency: "weekly" as const, priority: 0.5 })),
    ...blogPosts.map((b) => ({ url: absoluteUrl(`/blog/${b.slug}`), lastModified: b.date, priority: 0.4 })),
  ];
}
