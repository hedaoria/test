import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProCard } from "@/components/pros/ProCard";
import { CategoryGrid } from "@/components/pros/CategoryGrid";
import { cityText } from "@/lib/data/cities";
import { findCity, listCategories, listCities, professionalsNear } from "@/lib/repository";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { getLocale } from "@/lib/i18n/server";

// Onbekende waarden gaan via notFound() naar de eigen 404-pagina.
export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = await listCities();
  return LOCALES.flatMap((lang) => cities.map((c) => ({ lang, stad: c.slug })));
}

export async function generateMetadata(props: PageProps<"/[lang]/vakmensen/[stad]">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const { stad } = await props.params;
  const city = await findCity(stad);
  if (!city) return {};
  const t = getDictionary(locale).cityPage;
  const name = cityText(city, locale).name;
  return pageMetadata({ title: t.metaTitle(name), description: t.metaDescription(name), path: `/vakmensen/${city.slug}`, locale });
}

export default async function CityPage(props: PageProps<"/[lang]/vakmensen/[stad]">) {
  const locale = await getLocale(props.params);
  const { stad } = await props.params;
  const city = await findCity(stad);
  if (!city) notFound();

  const d = getDictionary(locale);
  const t = d.cityPage;
  const lp = (href: string) => localizePath(locale, href);
  const { name, intro } = cityText(city, locale);
  const [categories, pros, cities] = await Promise.all([listCategories(), professionalsNear(city, 35), listCities()]);

  return (
    <>
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page py-8 sm:py-12">
          <Breadcrumbs
            locale={locale}
            items={[
              { name: t.crumb, path: "/vakmensen" },
              { name, path: `/vakmensen/${city.slug}` },
            ]}
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h1 className="text-3xl font-semibold sm:text-4xl">{t.h1(name)}</h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-stone-600">
                {intro} {t.introSuffix}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href={lp("/klus-plaatsen")} size="lg">{d.common.request}</ButtonLink>
              {pros.length > 0 && (
                <ButtonLink href={lp(`/vakmensen?plaats=${encodeURIComponent(city.name)}`)} variant="secondary" size="lg">
                  {t.searchIn(name)}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <h2 className="text-2xl font-semibold">{t.categoriesTitle(name)}</h2>
        <p className="mt-2 text-stone-600">{t.categoriesIntro}</p>
        <div className="mt-6">
          <CategoryGrid items={categories} locale={locale} hrefFor={(c) => `/klus-plaatsen?vakgebied=${c.slug}`} />
        </div>
      </section>

      {pros.length > 0 && (
        <section className="container-page pb-16">
          <h2 className="text-2xl font-semibold">{t.prosTitle(name)}</h2>
          <JsonLd data={itemListLd(pros, locale)} />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pros.map((p) => (
              <ProCard key={p.slug} pro={p} locale={locale} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-stone-200 bg-stone-50 py-12">
        <div className="container-page">
          <h2 className="text-lg font-semibold">{t.otherRegions}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {cities
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <li key={c.slug}>
                  <Link href={lp(`/vakmensen/${c.slug}`)} className="inline-block rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-sm text-stone-700 hover:border-brand-600 hover:text-brand-700">
                    {cityText(c, locale).name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
