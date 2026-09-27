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
import { findCategory, listCategories, listCities, searchProfessionals } from "@/lib/repository";
import { faqLd, pageMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listCategories()).map((c) => ({ vakgebied: c.slug }));
}

export async function generateMetadata(props: PageProps<"/[vakgebied]">): Promise<Metadata> {
  const { vakgebied } = await props.params;
  const category = await findCategory(vakgebied);
  if (!category) return {};
  return pageMetadata({ title: category.metaTitle, description: category.metaDescription, path: `/${category.slug}` });
}

export default async function CategoryPage(props: PageProps<"/[vakgebied]">) {
  const { vakgebied } = await props.params;
  const category = await findCategory(vakgebied);
  if (!category) notFound();

  const [{ results }, cities, categories] = await Promise.all([
    searchProfessionals({ category: category.slug, sort: "beoordeling" }),
    listCities(),
    listCategories(),
  ]);
  const lower = category.name.toLowerCase();
  const plural = category.namePlural.toLowerCase();
  const faqs = [
    {
      q: `Hoe vind ik via Vakconnectie een ${lower}?`,
      a: `Doe een projectaanvraag met een duidelijke omschrijving. Vakconnectie helpt je vervolgens bij het vinden van een passende zelfstandige ${lower}. Voordat we iemand aan je voorstellen, controleren we de KvK-inschrijving.`,
    },
    {
      q: `Wat kost een ${lower}?`,
      a: "Dat hangt af van je project. Prijs, planning, werkzaamheden en garantie spreek je zelf met de vakman af en leg je samen schriftelijk vast.",
    },
    {
      q: "Kost een projectaanvraag iets?",
      a: "Nee, een projectaanvraag is gratis en vrijblijvend.",
    },
  ];

  return (
    <>
      <JsonLd data={[serviceLd(category), faqLd(faqs)]} />
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page py-8 sm:py-12">
          <Breadcrumbs items={[{ name: category.namePlural, path: `/${category.slug}` }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-3xl font-semibold sm:text-4xl">{category.name} nodig?</h1>
            <p className="mt-3 text-lg leading-relaxed text-stone-600">{category.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/klus-plaatsen?vakgebied=${category.slug}`} size="lg">
                Doe gratis een projectaanvraag
              </ButtonLink>
              {results.length > 0 && (
                <ButtonLink href="#vakmensen" variant="secondary" size="lg">
                  Bekijk {plural}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-xl font-semibold">Veelgevraagde klussen</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {category.commonJobs.map((job) => (
            <li key={job}>
              <Link
                href={`/klus-plaatsen?vakgebied=${category.slug}&wat=${encodeURIComponent(job)}`}
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
          <h2 className="text-2xl font-semibold">{category.namePlural} bij Vakconnectie</h2>
          <ProSearchForm compact values={{ vakgebied: category.slug }} className="mt-6" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProCard key={p.slug} pro={p} />
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-stone-200 bg-stone-50 py-14">
        <div className="container-page">
          <h2 className="text-2xl font-semibold">Zo vind je een {lower} via Vakconnectie</h2>
          <HowItWorksSteps className="mt-8" />
        </div>
      </section>

      <section className="container-page grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold">Veelgestelde vragen</h2>
          <div className="mt-6">
            <FaqList faqs={faqs} />
          </div>
        </div>
        <div className="space-y-10">
          <div>
            <h2 className="text-lg font-semibold">{category.name} per regio</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/vakmensen/${c.slug}`}
                    className="text-[0.9375rem] text-stone-700 hover:text-brand-700 hover:underline"
                  >
                    {category.name} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Andere vakgebieden</h2>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {categories
                .filter((c) => c.slug !== category.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}`} className="text-[0.9375rem] text-stone-700 hover:text-brand-700 hover:underline">
                      {c.name}
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
