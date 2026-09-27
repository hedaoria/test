import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { getFaqs } from "@/lib/data/content";
import { faqLd, pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/voor-vakmensen">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).prosPage;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/voor-vakmensen", locale });
}

export default async function ForProsPage(props: PageProps<"/[lang]/voor-vakmensen">) {
  const locale = await getLocale(props.params);
  const d = getDictionary(locale);
  const t = d.prosPage;
  const faqs = getFaqs(locale).pro;
  const signup = localizePath(locale, "/aanmelden-als-vakman");

  return (
    <>
      <JsonLd data={faqLd(faqs)} />
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page py-8 sm:py-14">
          <Breadcrumbs locale={locale} items={[{ name: t.crumb, path: "/voor-vakmensen" }]} />
          <div className="mt-6 max-w-2xl">
            <h1 className="text-3xl font-semibold sm:text-[2.75rem] sm:leading-tight">{t.h1}</h1>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">{t.intro}</p>
            <div className="mt-8">
              <ButtonLink href={signup} size="lg">{d.common.joinAsPro}</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="werkwijze" className="container-page scroll-mt-20 py-14 sm:py-20">
        <h2 className="text-2xl font-semibold sm:text-3xl">{t.howTitle}</h2>
        <HowItWorksSteps steps={d.steps.pro} className="mt-10" />
      </section>

      <section className="border-t border-stone-200 bg-stone-50 py-14 sm:py-20">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">{t.selfTitle}</h2>
            <p className="mt-3 leading-relaxed text-stone-700">{t.selfText}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{t.kvkTitle}</h2>
            <p className="mt-3 leading-relaxed text-stone-700">{t.kvkText}</p>
          </div>
        </div>
      </section>

      <section id="veelgestelde-vragen" className="container-page grid scroll-mt-20 gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl font-semibold">{t.faqTitle}</h2>
        <FaqList faqs={faqs} />
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-800 p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">{t.ctaTitle}</h2>
            <p className="mt-2 text-brand-50/90">{t.ctaText}</p>
          </div>
          <ButtonLink href={signup} variant="light" size="lg">{t.ctaButton}</ButtonLink>
        </div>
      </section>
    </>
  );
}
