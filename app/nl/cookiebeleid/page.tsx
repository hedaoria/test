import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { COOKIE_POLICY_CONTENT, LEGAL_UPDATED } from "@/lib/content/legal";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.cookiePolicy,
  title: "Cookiebeleid",
  description: "Lees welke cookies AquaFix Loodgieter gebruikt en hoe u uw voorkeuren kunt beheren.",
});

export default function Page() {
  const dict = getDictionary("nl");
  const c = COOKIE_POLICY_CONTENT.nl;
  return (
    <LegalPage
      locale="nl"
      dict={dict}
      crumb={{ label: dict.footer.cookiePolicy, href: PATHS.nl.cookiePolicy }}
      title={c.title}
      intro={c.intro}
      updatedLabel={`Laatst bijgewerkt: ${LEGAL_UPDATED}`}
      sections={c.sections}
    />
  );
}
