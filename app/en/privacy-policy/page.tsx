import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { PRIVACY_CONTENT, LEGAL_UPDATED } from "@/lib/content/legal";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.privacy,
  title: "Privacy Policy",
  description: "Read how AquaFix Loodgieter handles your personal data, in accordance with GDPR.",
});

export default function Page() {
  const dict = getDictionary("en");
  const c = PRIVACY_CONTENT.en;
  return (
    <LegalPage
      locale="en"
      dict={dict}
      crumb={{ label: dict.footer.privacyPolicy, href: PATHS.en.privacy }}
      title={c.title}
      intro={c.intro}
      updatedLabel={`Last updated: ${LEGAL_UPDATED}`}
      sections={c.sections}
    />
  );
}
