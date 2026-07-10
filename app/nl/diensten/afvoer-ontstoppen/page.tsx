import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { getService } from "@/lib/content/services";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";

const service = getService("drainUnblocking")!;

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.drainUnblocking,
  title: service.nl.metaTitle,
  description: service.nl.metaDescription,
});

export default function Page() {
  const dict = getDictionary("nl");
  const faqLd = faqSchema(service.nl.faqs);
  const breadcrumbLd = breadcrumbSchema("nl", [
    { label: dict.nav.services, href: PATHS.nl.services },
    { label: service.nl.shortTitle, href: PATHS.nl.drainUnblocking },
  ]);
  const serviceLd = serviceSchema("nl", {
    name: service.nl.title,
    description: service.nl.metaDescription,
    path: PATHS.nl.drainUnblocking,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <ServiceDetailPage locale="nl" dict={dict} service={service} serviceKey="drainUnblocking" />
    </>
  );
}
