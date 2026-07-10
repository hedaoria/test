import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import ServiceAreasPage from "@/components/pages/ServiceAreasPage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.serviceAreas,
  title: "Werkgebied | Loodgieter Dichtbij in Heel Nederland",
  description:
    "Bekijk in welke steden en regio's AquaFix Loodgieter actief is. Snelle service door heel Nederland, van Utrecht en Amsterdam tot Rotterdam en Eindhoven.",
});

export default function Page() {
  const dict = getDictionary("nl");
  const breadcrumbLd = breadcrumbSchema("nl", [{ label: dict.nav.serviceAreas, href: PATHS.nl.serviceAreas }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ServiceAreasPage locale="nl" dict={dict} />
    </>
  );
}
