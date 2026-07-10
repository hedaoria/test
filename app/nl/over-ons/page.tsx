import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.about,
  title: "Over Ons | Ervaren & Erkende Loodgieters",
  description:
    "Maak kennis met AquaFix Loodgieter: sinds 2010 dé betrouwbare loodgieter in Nederland. Ontdek ons verhaal, onze missie en waarom klanten ons vertrouwen.",
});

export default function Page() {
  const dict = getDictionary("nl");
  return <AboutPage locale="nl" dict={dict} />;
}
