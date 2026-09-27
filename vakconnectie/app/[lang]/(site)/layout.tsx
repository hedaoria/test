import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ACCOUNTS_ENABLED } from "@/lib/site";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/server";

export default async function SiteLayout(props: LayoutProps<"/[lang]">) {
  const locale = await getLocale(props.params);
  return (
    <>
      <a href="#inhoud" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow">
        {getDictionary(locale).common.skipToContent}
      </a>
      <Header locale={locale} accountsEnabled={ACCOUNTS_ENABLED && locale === "nl"} />
      <main id="inhoud">{props.children}</main>
      <Footer locale={locale} />
    </>
  );
}
