import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES } from "@/lib/site";
import { PATHS, PageKey, BLOG_BASE } from "@/lib/routes";
import { BLOG_POSTS } from "@/lib/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  const keys = Object.keys(PATHS.nl) as PageKey[];
  for (const key of keys) {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale === "nl" ? "nl-NL" : "en-GB"] = `${SITE_URL}${PATHS[locale][key]}`;
    }
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}${PATHS[locale][key]}`,
        lastModified: now,
        changeFrequency: key === "home" || key === "blog" ? "weekly" : "monthly",
        priority: key === "home" ? 1 : key === "services" ? 0.9 : 0.7,
        alternates: { languages },
      });
    }
  }

  for (const post of BLOG_POSTS) {
    const languages: Record<string, string> = {
      "nl-NL": `${SITE_URL}${BLOG_BASE.nl}/${post.slug.nl}`,
      "en-GB": `${SITE_URL}${BLOG_BASE.en}/${post.slug.en}`,
    };
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}${BLOG_BASE[locale]}/${post.slug[locale]}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
