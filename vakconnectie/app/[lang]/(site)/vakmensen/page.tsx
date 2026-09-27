import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProCard } from "@/components/pros/ProCard";
import { ProSearchForm, DISTANCES } from "@/components/pros/ProSearchForm";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { categoryText } from "@/lib/data/categories";
import { findCategory, listProfessionals, searchProfessionals } from "@/lib/repository";
import { itemListLd, pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/vakmensen">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).findPage;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/vakmensen", locale });
}

function param(v: string | string[] | undefined) {
  return (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
}

export default async function VakmensenPage(props: PageProps<"/[lang]/vakmensen">) {
  const locale = await getLocale(props.params);
  const d = getDictionary(locale);
  const t = d.findPage;
  const lp = (href: string) => localizePath(locale, href);
  const sp = await props.searchParams;

  // Zolang er geen openbare profielen zijn, zoeken wij voor de klant.
  if ((await listProfessionals()).length === 0) return <NoPublicProfiles locale={locale} />;

  const values = {
    vakgebied: param(sp.vakgebied),
    postcode: param(sp.postcode),
    plaats: param(sp.plaats),
    afstand: DISTANCES.includes(param(sp.afstand) ?? "") ? param(sp.afstand) : "25",
  };
  const sort = param(sp.sortering) === "beoordeling" ? "beoordeling" : undefined;
  const category = values.vakgebied ? await findCategory(values.vakgebied) : undefined;

  const { results, location, locationNotFound } = await searchProfessionals({
    category: category?.slug,
    postcode: values.postcode,
    place: values.plaats,
    maxDistanceKm: Number(values.afstand),
    sort: sort ?? (values.postcode || values.plaats ? "afstand" : "beoordeling"),
  });

  const heading = category ? categoryText(category, locale).namePlural : t.professionals;
  const activeSort = sort ?? (location ? "afstand" : "beoordeling");
  const sortHref = (s: "afstand" | "beoordeling") => {
    const q = new URLSearchParams(Object.entries(values).filter(([, v]) => v) as [string, string][]);
    if (s === "beoordeling") q.set("sortering", "beoordeling");
    return lp(`/vakmensen?${q.toString()}`);
  };
  const requestHref = lp(`/klus-plaatsen${category ? `?vakgebied=${category.slug}` : ""}`);

  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs locale={locale} items={[{ name: t.h1, path: "/vakmensen" }]} />
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{t.h1}</h1>
      <p className="mt-2 max-w-2xl text-lg text-stone-600">{t.searchIntro}</p>

      <ProSearchForm compact values={values} locale={locale} className="mt-8" />

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div aria-live="polite">
          <h2 className="text-xl font-semibold">
            {heading}
            {location ? t.near(location.label) : ""}
          </h2>
          <p className="mt-1 text-sm text-stone-600">{t.results(results.length)}</p>
          {locationNotFound && <p className="mt-2 text-sm text-amber-800">{t.notFoundLocation}</p>}
        </div>
        {location && results.length > 1 && (
          <div className="flex items-center gap-1 text-sm" role="group" aria-label={t.sortBy}>
            <span className="mr-1 text-stone-500">{t.sortBy}</span>
            {(["afstand", "beoordeling"] as const).map((s) => (
              <Link
                key={s}
                href={sortHref(s)}
                aria-current={activeSort === s ? "true" : undefined}
                className={clsx("rounded-full px-3 py-1 font-medium", activeSort === s ? "bg-stone-900 text-white" : "text-stone-700 hover:bg-stone-100")}
              >
                {s === "afstand" ? t.distance : t.rating}
              </Link>
            ))}
          </div>
        )}
      </div>

      {results.length > 0 ? (
        <>
          <JsonLd data={itemListLd(results, locale)} />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProCard key={p.slug} pro={p} locale={locale} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center sm:p-12">
          <h3 className="text-lg font-semibold">{t.noResults}</h3>
          <p className="mx-auto mt-2 max-w-md text-stone-600">{t.noResultsText}</p>
          <ButtonLink href={requestHref} className="mt-6" size="lg">{d.common.request}</ButtonLink>
        </div>
      )}

      <aside className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-50 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="text-lg font-semibold">{t.asideTitle}</h2>
          <p className="mt-1 text-stone-700">{t.asideText}</p>
        </div>
        <ButtonLink href={requestHref} size="lg">{d.common.request}</ButtonLink>
      </aside>
    </div>
  );
}

function NoPublicProfiles({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.findPage;
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs locale={locale} items={[{ name: t.h1, path: "/vakmensen" }]} />
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{t.h1}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-stone-600">{t.intro}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={localizePath(locale, "/klus-plaatsen")} size="lg">{d.common.requestFree}</ButtonLink>
        <ButtonLink href={localizePath(locale, "/contact")} variant="secondary" size="lg">{d.common.contactUs}</ButtonLink>
      </div>
      <section className="mt-14 border-t border-stone-200 pt-12">
        <h2 className="text-2xl font-semibold">{t.howTitle}</h2>
        <HowItWorksSteps steps={d.steps.customer} className="mt-8" />
      </section>
    </div>
  );
}
