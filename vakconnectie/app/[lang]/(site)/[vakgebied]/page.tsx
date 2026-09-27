import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { ProCard } from "@/components/pros/ProCard";
import { ProSearchForm } from "@/components/pros/ProSearchForm";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { categoryText } from "@/lib/data/categories";
import { cityText } from "@/lib/data/cities";
import { findCategory, listCategories, listCities, searchProfessionals } from "@/lib/repository";
import { faqLd, pageMetadata, serviceLd } from "@/lib/seo";
import { LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { getLocale } from "@/lib/i18n/server";

// Onbekende waarden gaan via notFound() naar de eigen 404-pagina.
export const dynamicParams = true;

export async function generateStaticParams() {
  const categories = await listCategories();
  return LOCALES.flatMap((lang) => categories.map((c) => ({ lang, vakgebied: c.slug })));
}

export async function generateMetadata(props: PageProps<"/[lang]/[vakgebied]">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const { vakgebied } = await props.params;
  const category = await findCategory(vakgebied);
  if (!category) return {};
  const t = getDictionary(locale).categoryPage;
  const { name } = categoryText(category, locale);
  return pageMetadata({ title: t.metaTitle(name), description: t.metaDescription(name.toLowerCase()), path: `/${category.slug}`, locale });
}

export default async function CategoryPage(props: PageProps<"/[lang]/[vakgebied]">) {
  const locale = await getLocale(props.params);
  const { vakgebied } = await props.params;
  const category = await findCategory(vakgebied);
  if (!category) notFound();

  const d = getDictionary(locale);
  const t = d.categoryPage;
  const lp = (href: string) => localizePath(locale, href);
  const text = categoryText(category, locale);
  const lower = text.name.toLowerCase();
  const pluralLower = text.namePlural.toLowerCase();
  const faqs = t.faqs(lower);

  const [{ results }, cities, categories] = await Promise.all([
    searchProfessionals({ category: category.slug, sort: "beoordeling" }),
    listCities(),
    listCategories(),
  ]);

  return (
    <>
      <JsonLd data={[serviceLd({ slug: category.slug, name: text.name, description: text.intro }, locale), faqLd(faqs)]} />
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page py-8 sm:py-12">
          <Breadcrumbs locale={locale} items={[{ name: text.namePlural, path: `/${category.slug}` }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-3xl font-semibold sm:text-4xl">{t.h1(text.name)}</h1>
            <p className="mt-3 text-lg leading-relaxed text-stone-600">{text.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={lp(`/klus-plaatsen?vakgebied=${category.slug}`)} size="lg">
                {d.common.requestFree}
              </ButtonLink>
              {results.length > 0 && (
                <ButtonLink href="#vakmensen" variant="secondary" size="lg">
                  {t.viewPros(pluralLower)}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-xl font-semibold">{t.commonJobs}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {text.commonJobs.map((job) => (
            <li key={job}>
              <Link
                href={lp(`/klus-plaatsen?vakgebied=${category.slug}&wat=${encodeURIComponent(job)}`)}
                className="inline-block rounded-full border border-stone-300 bg-white px-4 py-2 text-[0.9375rem] text-stone-800 transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                {job}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {results.length > 0 && (
        <section id="vakmensen" className="container-page scroll-mt-24 pb-16">
          <h2 className="text-2xl font-semibold">{t.prosTitle(text.namePlural)}</h2>
          <ProSearchForm compact values={{ vakgebied: category.slug }} locale={locale} className="mt-6" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProCard key={p.slug} pro={p} locale={locale} />
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-stone-200 bg-stone-50 py-14">
        <div className="container-page">
          <h2 className="text-2xl font-semibold">{t.howTitle(lower)}</h2>
          <HowItWorksSteps steps={d.steps.customer} className="mt-8" />
        </div>
      </section>

      <section className="container-page grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold">{t.faqTitle}</h2>
          <div className="mt-6">
            <FaqList faqs={faqs} />
          </div>
        </div>
        <div className="space-y-10">
          <div>
            <h2 className="text-lg font-semibold">{t.perRegion(text.name)}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={lp(`/vakmensen/${c.slug}`)} className="text-[0.9375rem] text-stone-700 hover:text-brand-700 hover:underline">
                    {text.name} {cityText(c, locale).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">{t.otherCategories}</h2>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {categories
                .filter((c) => c.slug !== category.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={lp(`/${c.slug}`)} className="text-[0.9375rem] text-stone-700 hover:text-brand-700 hover:underline">
                      {categoryText(c, locale).name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
