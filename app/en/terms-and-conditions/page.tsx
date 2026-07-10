import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { TERMS_CONTENT, LEGAL_UPDATED } from "@/lib/content/legal";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.terms,
  title: "Terms & Conditions",
  description: "Read the terms and conditions of AquaFix Loodgieter for all our services.",
});

export default function Page() {
  const dict = getDictionary("en");
  const c = TERMS_CONTENT.en;
  return (
    <LegalPage
      locale="en"
      dict={dict}
      crumb={{ label: dict.footer.terms, href: PATHS.en.terms }}
      title={c.title}
      intro={c.intro}
      updatedLabel={`Last updated: ${LEGAL_UPDATED}`}
      sections={c.sections}
    />
  );
}
