import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { getService } from "@/lib/content/services";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";

const service = getService("heating")!;

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.heating,
  title: service.en.metaTitle,
  description: service.en.metaDescription,
});

export default function Page() {
  const dict = getDictionary("en");
  const faqLd = faqSchema(service.en.faqs);
  const breadcrumbLd = breadcrumbSchema("en", [
    { label: dict.nav.services, href: PATHS.en.services },
    { label: service.en.shortTitle, href: PATHS.en.heating },
  ]);
  const serviceLd = serviceSchema("en", {
    name: service.en.title,
    description: service.en.metaDescription,
    path: PATHS.en.heating,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <ServiceDetailPage locale="en" dict={dict} service={service} serviceKey="heating" />
    </>
  );
}
