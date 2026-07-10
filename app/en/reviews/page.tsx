import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import ReviewsPage from "@/components/pages/ReviewsPage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.reviews,
  title: "Customer Reviews | Experiences with AquaFix Loodgieter",
  description:
    "Read real customer reviews about AquaFix Loodgieter. An average of 4.9/5 stars from over 300 satisfied customers across the Netherlands.",
});

export default function Page() {
  const dict = getDictionary("en");
  const breadcrumbLd = breadcrumbSchema("en", [{ label: dict.nav.reviews, href: PATHS.en.reviews }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ReviewsPage locale="en" dict={dict} />
    </>
  );
}
