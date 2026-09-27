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
      q: `Hoe vind ik een goede ${lower}?`,
      a: `Plaats je klus op Vakconnectie met een duidelijke omschrijving en eventueel foto's. ${category.namePlural} uit jouw regio kunnen reageren. Vergelijk daarna hun profielen, eerdere projecten en beoordelingen van andere klanten.`,
    },
    {
      q: `Wat kost een ${lower}?`,
      a: `Dat verschilt per klus. De prijs hangt af van de omvang, de materialen en de planning. Vraag altijd om een schriftelijke prijsopgave waarin staat wat wel en niet is inbegrepen.`,
    },
    {
      q: "Kost het plaatsen van een klus iets?",
      a: "Nee, een klus plaatsen is gratis en je zit nergens aan vast.",
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
                Plaats je klus
              </ButtonLink>
              <ButtonLink href="#vakmensen" variant="secondary" size="lg">
                Bekijk {plural}
              </ButtonLink>
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

      <section id="vakmensen" className="container-page scroll-mt-24 pb-16">
        <h2 className="text-2xl font-semibold">{category.namePlural} op Vakconnectie</h2>
        <p className="mt-2 text-stone-600">Zoek op postcode of plaats om te zien wie er bij jou in de buurt werkt.</p>
        <ProSearchForm compact values={{ vakgebied: category.slug }} className="mt-6" />
        {results.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProCard key={p.slug} pro={p} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-stone-600">Er staan nog geen {plural} op Vakconnectie. Plaats je klus, dan kunnen vakmensen reageren zodra ze zich aanmelden.</p>
        )}
      </section>

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
                    href={`/vakmensen?vakgebied=${category.slug}&plaats=${encodeURIComponent(c.name)}`}
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
