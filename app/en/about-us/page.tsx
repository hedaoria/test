import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.about,
  title: "About Us | Experienced & Certified Plumbers",
  description:
    "Meet AquaFix Loodgieter: the reliable plumber in the Netherlands since 2010. Discover our story, our mission, and why customers trust us.",
});

export default function Page() {
  const dict = getDictionary("en");
  return <AboutPage locale="en" dict={dict} />;
}
