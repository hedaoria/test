import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import ReviewsPage from "@/components/pages/ReviewsPage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.reviews,
  title: "Klantbeoordelingen | Ervaringen met AquaFix Loodgieter",
  description:
    "Lees echte klantbeoordelingen over AquaFix Loodgieter. Gemiddeld 4.9/5 sterren van meer dan 300 tevreden klanten in heel Nederland.",
});

export default function Page() {
  const dict = getDictionary("nl");
  const breadcrumbLd = breadcrumbSchema("nl", [{ label: dict.nav.reviews, href: PATHS.nl.reviews }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ReviewsPage locale="nl" dict={dict} />
    </>
  );
}
