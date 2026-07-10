import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { TERMS_CONTENT, LEGAL_UPDATED } from "@/lib/content/legal";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.terms,
  title: "Algemene Voorwaarden",
  description: "Bekijk de algemene voorwaarden van AquaFix Loodgieter voor al onze diensten.",
});

export default function Page() {
  const dict = getDictionary("nl");
  const c = TERMS_CONTENT.nl;
  return (
    <LegalPage
      locale="nl"
      dict={dict}
      crumb={{ label: dict.footer.terms, href: PATHS.nl.terms }}
      title={c.title}
      intro={c.intro}
      updatedLabel={`Laatst bijgewerkt: ${LEGAL_UPDATED}`}
      sections={c.sections}
    />
  );
}
