import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { getPrivacySections } from "@/lib/data/legal";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/privacybeleid">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).legal;
  return pageMetadata({ title: t.privacyTitle, description: t.privacyDescription, path: "/privacybeleid", locale });
}

export default async function PrivacyPage(props: PageProps<"/[lang]/privacybeleid">) {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).legal;
  return <LegalPage locale={locale} title={t.privacyTitle} path="/privacybeleid" sections={getPrivacySections(locale)} />;
}
