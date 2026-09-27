import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { termsSections, termsUpdated } from "@/lib/data/legal";
import { COMPANY } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/algemene-voorwaarden">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).legal;
  return pageMetadata({
    title: t.termsTitle,
    description: t.termsDescription,
    path: "/algemene-voorwaarden",
    locale,
    // Pas indexeren zodra de officiële tekst is toegevoegd.
    noindex: termsSections.length === 0,
  });
}

export default async function TermsPage(props: PageProps<"/[lang]/algemene-voorwaarden">) {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).legal;
  return (
    <LegalPage
      locale={locale}
      title={t.termsTitle}
      path="/algemene-voorwaarden"
      updated={termsUpdated}
      intro={
        termsSections.length === 0 ? (
          <p>
            {t.termsEmpty(COMPANY.legalName)}{" "}
            <a href={`mailto:${COMPANY.email}`} className="font-medium text-brand-700 hover:underline">{COMPANY.email}</a>.
          </p>
        ) : undefined
      }
      sections={termsSections}
    />
  );
}
