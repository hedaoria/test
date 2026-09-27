import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { TrustPoints } from "@/components/home/TrustPoints";
import { getFaqs } from "@/lib/data/content";
import { faqLd, pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/hoe-werkt-het">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).howPage;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/hoe-werkt-het", locale });
}

export default async function HowItWorksPage(props: PageProps<"/[lang]/hoe-werkt-het">) {
  const locale = await getLocale(props.params);
  const d = getDictionary(locale);
  const t = d.howPage;
  const faqs = getFaqs(locale).customer;
  const lp = (href: string) => localizePath(locale, href);

  return (
    <>
      <JsonLd data={faqLd(faqs)} />
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page py-8 sm:py-14">
          <Breadcrumbs locale={locale} items={[{ name: t.crumb, path: "/hoe-werkt-het" }]} />
          <h1 className="mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl">{t.h1}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-stone-600">{t.intro}</p>
          <HowItWorksSteps steps={d.steps.customer} className="mt-12" />
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <h2 className="text-2xl font-semibold">{t.stepByStep}</h2>
        <ol className="mt-8 max-w-3xl space-y-8">
          {t.details.map((item, i) => (
            <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <span className="pt-0.5 text-sm font-semibold text-brand-700">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-stone-700">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={lp("/klus-plaatsen")} size="lg">{d.common.requestFree}</ButtonLink>
          <ButtonLink href={lp("/contact")} variant="secondary" size="lg">{d.common.contactUs}</ButtonLink>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-50 py-14 sm:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-semibold">{t.trustTitle}</h2>
          <TrustPoints locale={locale} className="mt-10" />
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-2xl font-semibold">{t.faqTitle}</h2>
          <p className="mt-3 text-stone-600">
            {t.faqMissing} <Link href={lp("/contact")} className="font-semibold text-brand-700 hover:underline">{d.common.contactUs}</Link>.
          </p>
        </div>
        <FaqList faqs={faqs} />
      </section>
    </>
  );
}
