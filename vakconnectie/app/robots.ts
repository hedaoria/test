import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/mijn-bedrijf", "/beheer", "/api/", "/inloggen", "/wachtwoord-", "/nl/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
