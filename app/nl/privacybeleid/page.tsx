import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { PRIVACY_CONTENT, LEGAL_UPDATED } from "@/lib/content/legal";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.privacy,
  title: "Privacybeleid",
  description: "Lees hoe AquaFix Loodgieter omgaat met uw persoonsgegevens, conform de AVG (GDPR).",
});

export default function Page() {
  const dict = getDictionary("nl");
  const c = PRIVACY_CONTENT.nl;
  return (
    <LegalPage
      locale="nl"
      dict={dict}
      crumb={{ label: dict.footer.privacyPolicy, href: PATHS.nl.privacy }}
      title={c.title}
      intro={c.intro}
      updatedLabel={`Laatst bijgewerkt: ${LEGAL_UPDATED}`}
      sections={c.sections}
    />
  );
}
