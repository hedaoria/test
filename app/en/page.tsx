import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { GENERAL_FAQS } from "@/lib/content/faqs";
import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.home,
  title: "AquaFix Loodgieter | 24/7 Emergency Plumber in the Netherlands",
  description:
    "Looking for a reliable plumber near you? AquaFix Loodgieter offers 24/7 emergency service, leak detection, drain unblocking, sewer services and boiler repair across the Netherlands.",
});

export default function Page() {
  const dict = getDictionary("en");
  const faqLd = faqSchema(
    GENERAL_FAQS.slice(0, 5).map((f) => ({ question: f.question.en, answer: f.answer.en }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <HomePage locale="en" dict={dict} />
    </>
  );
}
