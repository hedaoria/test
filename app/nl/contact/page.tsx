import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.contact,
  title: "Contact | Bel, WhatsApp of Vraag een Offerte Aan",
  description:
    "Neem contact op met AquaFix Loodgieter. Bel direct +31 6 17 34 73 33, chat via WhatsApp of vraag een gratis offerte aan via ons contactformulier.",
});

export default function Page() {
  const dict = getDictionary("nl");
  const breadcrumbLd = breadcrumbSchema("nl", [{ label: dict.nav.contact, href: PATHS.nl.contact }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ContactPage locale="nl" dict={dict} />
    </>
  );
}
