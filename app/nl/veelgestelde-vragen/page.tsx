import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { GENERAL_FAQS } from "@/lib/content/faqs";
import FaqPage from "@/components/pages/FaqPage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.faq,
  title: "Veelgestelde Vragen | Loodgietersdiensten & Tarieven",
  description:
    "Antwoorden op de meest gestelde vragen over onze loodgietersdiensten, spoedservice, tarieven en werkgebied. Staat uw vraag er niet bij? Neem contact op.",
});

export default function Page() {
  const dict = getDictionary("nl");
  const faqLd = faqSchema(GENERAL_FAQS.map((f) => ({ question: f.question.nl, answer: f.answer.nl })));
  const breadcrumbLd = breadcrumbSchema("nl", [{ label: dict.nav.faq, href: PATHS.nl.faq }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <FaqPage locale="nl" dict={dict} />
    </>
  );
}
