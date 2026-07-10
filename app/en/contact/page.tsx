import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.contact,
  title: "Contact | Call, WhatsApp or Request a Quote",
  description:
    "Get in touch with AquaFix Loodgieter. Call +31 6 17 34 73 33 directly, chat on WhatsApp, or request a free quote through our contact form.",
});

export default function Page() {
  const dict = getDictionary("en");
  const breadcrumbLd = breadcrumbSchema("en", [{ label: dict.nav.contact, href: PATHS.en.contact }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ContactPage locale="en" dict={dict} />
    </>
  );
}
