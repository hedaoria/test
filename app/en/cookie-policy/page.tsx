import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { COOKIE_POLICY_CONTENT, LEGAL_UPDATED } from "@/lib/content/legal";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.cookiePolicy,
  title: "Cookie Policy",
  description: "Read which cookies AquaFix Loodgieter uses and how you can manage your preferences.",
});

export default function Page() {
  const dict = getDictionary("en");
  const c = COOKIE_POLICY_CONTENT.en;
  return (
    <LegalPage
      locale="en"
      dict={dict}
      crumb={{ label: dict.footer.cookiePolicy, href: PATHS.en.cookiePolicy }}
      title={c.title}
      intro={c.intro}
      updatedLabel={`Last updated: ${LEGAL_UPDATED}`}
      sections={c.sections}
    />
  );
}
