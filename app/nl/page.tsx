import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { GENERAL_FAQS } from "@/lib/content/faqs";
import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.home,
  title: "AquaFix Loodgieter | Spoed Loodgieter 24/7 in Heel Nederland",
  description:
    "Op zoek naar een betrouwbare loodgieter dichtbij? AquaFix Loodgieter biedt 24/7 spoedservice, lekkage opsporen, ontstopping, riolering en CV-ketel reparatie in heel Nederland.",
});

export default function Page() {
  const dict = getDictionary("nl");
  const faqLd = faqSchema(
    GENERAL_FAQS.slice(0, 5).map((f) => ({ question: f.question.nl, answer: f.answer.nl }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <HomePage locale="nl" dict={dict} />
    </>
  );
}
