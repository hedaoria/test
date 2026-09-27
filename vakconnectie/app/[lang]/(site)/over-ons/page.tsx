import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { COMPANY } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/over-ons">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).aboutPage;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/over-ons", locale });
}

export default async function AboutPage(props: PageProps<"/[lang]/over-ons">) {
  const locale = await getLocale(props.params);
  const d = getDictionary(locale);
  const t = d.aboutPage;
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs locale={locale} items={[{ name: t.metaTitle, path: "/over-ons" }]} />
      <div className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t.h1}</h1>
        <div className="prose-vc mt-5 text-lg">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
        </div>
        <dl className="mt-10 grid gap-4 rounded-2xl border border-stone-200 p-6 text-[0.9375rem] sm:grid-cols-2">
          <div><dt className="text-stone-500">{t.companyName}</dt><dd className="font-medium">{COMPANY.legalName}</dd></div>
          <div><dt className="text-stone-500">{t.city}</dt><dd className="font-medium">{COMPANY.city}</dd></div>
          <div><dt className="text-stone-500">{t.kvk}</dt><dd className="font-medium">{COMPANY.kvk}</dd></div>
          <div><dt className="text-stone-500">{t.email}</dt><dd className="font-medium"><a href={`mailto:${COMPANY.email}`} className="hover:text-brand-700">{COMPANY.email}</a></dd></div>
        </dl>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={localizePath(locale, "/klus-plaatsen")} size="lg">{d.common.request}</ButtonLink>
          <ButtonLink href={localizePath(locale, "/contact")} variant="secondary" size="lg">{d.common.contactUs}</ButtonLink>
        </div>
      </div>
    </div>
  );
}
