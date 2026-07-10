import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { GENERAL_FAQS } from "@/lib/content/faqs";
import FaqPage from "@/components/pages/FaqPage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.faq,
  title: "Frequently Asked Questions | Plumbing Services & Pricing",
  description:
    "Answers to the most common questions about our plumbing services, emergency service, pricing, and service areas. Didn't find your question? Get in touch.",
});

export default function Page() {
  const dict = getDictionary("en");
  const faqLd = faqSchema(GENERAL_FAQS.map((f) => ({ question: f.question.en, answer: f.answer.en })));
  const breadcrumbLd = breadcrumbSchema("en", [{ label: dict.nav.faq, href: PATHS.en.faq }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <FaqPage locale="en" dict={dict} />
    </>
  );
}
