import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import ServiceAreasPage from "@/components/pages/ServiceAreasPage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.serviceAreas,
  title: "Service Areas | Plumber Near You Across the Netherlands",
  description:
    "See which cities and regions AquaFix Loodgieter serves. Fast plumbing service across the Netherlands, from Utrecht and Amsterdam to Rotterdam and Eindhoven.",
});

export default function Page() {
  const dict = getDictionary("en");
  const breadcrumbLd = breadcrumbSchema("en", [{ label: dict.nav.serviceAreas, href: PATHS.en.serviceAreas }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ServiceAreasPage locale="en" dict={dict} />
    </>
  );
}
