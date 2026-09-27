import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { CategoryGrid } from "@/components/pros/CategoryGrid";
import { ProCard } from "@/components/pros/ProCard";
import { WhatsAppIcon } from "@/components/forms/SendButtons";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { TrustPoints } from "@/components/home/TrustPoints";
import { listCategories, listCities, listProfessionals } from "@/lib/repository";
import { organizationLd, pageMetadata, websiteLd } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { getLocale } from "@/lib/i18n/server";
import { cityText } from "@/lib/data/cities";
import { COMPANY } from "@/lib/site";
import { whatsappUrl } from "@/lib/contact";

export async function generateMetadata(props: PageProps<"/[lang]">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).home;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/", locale, absoluteTitle: true });
}

export default async function HomePage(props: PageProps<"/[lang]">) {
  const locale = await getLocale(props.params);
  const d = getDictionary(locale);
  const t = d.home;
  const lp = (href: string) => localizePath(locale, href);
  const [categories, cities, pros] = await Promise.all([listCategories(), listCities(), listProfessionals()]);

  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd()]} />

      {/* Hero */}
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
          <div>
            <h1 className="text-[2.1rem] font-semibold leading-[1.1] sm:text-5xl lg:text-[3.35rem]">{t.h1}</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-600 sm:text-xl">
              {t.intro}
            </p>

            <form action={lp("/klus-plaatsen")} method="get" className="mt-8 max-w-xl">
              <label htmlFor="hero-wat" className="mb-2 block font-semibold text-stone-900">{t.inputLabel}</label>
              <div className="flex flex-col gap-3 sm:flex-row sm:rounded-xl sm:border sm:border-stone-300 sm:bg-white sm:p-1.5 sm:shadow-sm sm:focus-within:border-brand-600 sm:focus-within:ring-4 sm:focus-within:ring-brand-100">
                <input
                  id="hero-wat"
                  name="wat"
                  placeholder={t.placeholder}
                  className="input h-14 text-[1.0625rem] sm:h-12 sm:border-0 sm:shadow-none sm:focus:shadow-none"
                  autoComplete="off"
                />
                <button type="submit" className="h-14 shrink-0 rounded-lg bg-brand-400 px-6 text-[1.0625rem] font-semibold text-stone-950 transition-colors hover:bg-brand-500 sm:h-12">
                  {d.common.placeJob}
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-stone-600">{d.common.freeNonBinding}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-stone-500">{t.examplesLabel}</span>
              {t.examples.map((e) => (
                <Link
                  key={e.label}
                  href={lp(`/klus-plaatsen?vakgebied=${e.category}&wat=${encodeURIComponent(e.label)}`)}
                  className="rounded-full border border-stone-300 bg-white px-3 py-1 text-stone-700 transition-colors hover:border-brand-600 hover:text-brand-700"
                >
                  {e.label}
                </Link>
              ))}
            </div>
          </div>

          <aside aria-labelledby="direct-contact" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_12px_32px_-20px_rgb(28_25_23/0.35)] sm:p-8">
            <h2 id="direct-contact" className="text-lg font-semibold">{t.directTitle}</h2>
            <p className="mt-1.5 text-stone-600">{t.directText}</p>
            <div className="mt-6 space-y-3">
              <a
                href={whatsappUrl(t.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg bg-brand-400 px-4 py-3.5 font-semibold text-stone-950 transition-colors hover:bg-brand-500"
              >
                <WhatsAppIcon className="h-5 w-5" /> {t.whatsappCta}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 rounded-lg border border-stone-300 px-4 py-3.5 font-semibold text-stone-900 transition-colors hover:border-stone-400 hover:bg-stone-50">
                <Mail className="h-5 w-5 text-stone-500" aria-hidden="true" /> {COMPANY.email}
              </a>
              <a href={`tel:${COMPANY.phoneHref}`} className="flex items-center gap-3 rounded-lg border border-stone-300 px-4 py-3.5 font-semibold text-stone-900 transition-colors hover:border-stone-400 hover:bg-stone-50">
                <Phone className="h-5 w-5 text-stone-500" aria-hidden="true" /> {COMPANY.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Hoe werkt het */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title={t.howTitle} />
          <HowItWorksSteps steps={d.steps.customer} className="mt-10" />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={lp("/klus-plaatsen")} size="lg">{d.common.requestFree}</ButtonLink>
            <ButtonLink href={lp("/hoe-werkt-het")} variant="secondary" size="lg">{t.moreProcess}</ButtonLink>
          </div>
        </div>
      </section>

      {/* Vakgebieden */}
      <section className="border-t border-stone-200 bg-stone-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title={t.categoriesTitle} intro={t.categoriesIntro} />
          <div className="mt-8">
            <CategoryGrid items={categories} locale={locale} />
          </div>
        </div>
      </section>

      {/* Vakmensen: alleen tonen zodra er openbare profielen zijn */}
      {pros.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading title={t.prosTitle} />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pros.slice(0, 3).map((p) => (
                <ProCard key={p.slug} pro={p} locale={locale} />
              ))}
            </div>
            <Link href={lp("/vakmensen")} className="mt-6 inline-block font-semibold text-brand-700 hover:underline">{t.allPros}</Link>
          </div>
        </section>
      )}

      {/* Vertrouwen */}
      <section className="border-y border-stone-200 bg-[#faf8f5] py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title={t.trustTitle} />
          <TrustPoints locale={locale} className="mt-10" />
        </div>
      </section>

      {/* Voor vakmensen */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="rounded-2xl bg-brand-400 p-8 text-stone-950 sm:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-stone-800">{t.prosEyebrow}</p>
              <h2 className="mt-2 text-2xl font-semibold text-stone-950 sm:text-3xl">{t.prosHeading}</h2>
              <p className="mt-4 leading-relaxed text-stone-800">
                {t.prosText}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={lp("/aanmelden-als-vakman")} variant="light" size="lg">{d.common.joinAsPro}</ButtonLink>
                <ButtonLink href={lp("/voor-vakmensen")} size="lg" className="border border-stone-950/25 bg-transparent hover:bg-brand-300">
                  {d.common.moreInfo}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regio's */}
      <section className="border-t border-stone-200 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title={t.regionsTitle} />
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-6">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={lp(`/vakmensen/${c.slug}`)} className="text-stone-700 hover:text-brand-700 hover:underline">
                  {t.cityLink(cityText(c, locale).name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
