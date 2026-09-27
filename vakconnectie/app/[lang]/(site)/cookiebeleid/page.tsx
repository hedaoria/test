import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/cookiebeleid">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).legal;
  return pageMetadata({ title: t.cookieTitle, description: t.cookieDescription, path: "/cookiebeleid", locale });
}

export default async function CookiePage(props: PageProps<"/[lang]/cookiebeleid">) {
  const locale = await getLocale(props.params);
  const d = getDictionary(locale);
  const t = d.legal;
  return (
    <LegalPage
      locale={locale}
      title={t.cookieTitle}
      path="/cookiebeleid"
      intro={
        <p>
          {t.cookieIntroBefore}{" "}
          <Link href={localizePath(locale, "/privacybeleid")} className="font-medium text-brand-700 hover:underline">{d.footer.privacy.toLowerCase()}</Link>.
        </p>
      }
      sections={[{ heading: t.cookieHeading, paragraphs: [t.cookieText] }]}
    />
  );
}
