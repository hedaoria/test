import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { getFaqs } from "@/lib/data/content";
import { faqLd, pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/veelgestelde-vragen">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).faqPage;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/veelgestelde-vragen", locale });
}

export default async function FaqPage(props: PageProps<"/[lang]/veelgestelde-vragen">) {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).faqPage;
  const faqs = getFaqs(locale);
  return (
    <div className="container-page py-8 sm:py-12">
      <JsonLd data={faqLd([...faqs.customer, ...faqs.pro])} />
      <Breadcrumbs locale={locale} items={[{ name: t.h1, path: "/veelgestelde-vragen" }]} />
      <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">{t.h1}</h1>
      <div className="mt-10 grid gap-14 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-xl font-semibold">{t.customers}</h2>
          <FaqList faqs={faqs.customer} />
        </section>
        <section>
          <h2 className="mb-4 text-xl font-semibold">{t.pros}</h2>
          <FaqList faqs={faqs.pro} />
        </section>
      </div>
      <p className="mt-12 text-stone-600">
        {t.notFound}{" "}
        <Link href={localizePath(locale, "/contact")} className="font-semibold text-brand-700 hover:underline">{t.contactLink}</Link>.
      </p>
    </div>
  );
}
