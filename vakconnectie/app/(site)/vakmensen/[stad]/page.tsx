import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProCard } from "@/components/pros/ProCard";
import { CategoryGrid } from "@/components/pros/CategoryGrid";
import { findCity, listCategories, listCities, professionalsNear } from "@/lib/repository";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listCities()).map((c) => ({ stad: c.slug }));
}

export async function generateMetadata(props: PageProps<"/vakmensen/[stad]">): Promise<Metadata> {
  const { stad } = await props.params;
  const city = await findCity(stad);
  if (!city) return {};
  return pageMetadata({
    title: `Vakman vinden in ${city.name}`,
    description: `Op zoek naar een schilder, loodgieter, elektricien of aannemer in ${city.name}? Plaats gratis je klus en vergelijk vakmensen uit ${city.name} en omgeving.`,
    path: `/vakmensen/${city.slug}`,
  });
}

export default async function CityPage(props: PageProps<"/vakmensen/[stad]">) {
  const { stad } = await props.params;
  const city = await findCity(stad);
  if (!city) notFound();

  const [categories, pros, cities] = await Promise.all([listCategories(), professionalsNear(city, 35), listCities()]);
  const covered = new Set(pros.flatMap((p) => p.categories));

  return (
    <>
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page py-8 sm:py-12">
          <Breadcrumbs items={[{ name: "Vakmensen", path: "/vakmensen" }, { name: city.name, path: `/vakmensen/${city.slug}` }]} />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h1 className="text-3xl font-semibold sm:text-4xl">Vakman vinden in {city.name}</h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-stone-600">{city.intro}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href="/klus-plaatsen" size="lg">Plaats je klus</ButtonLink>
              <ButtonLink href={`/vakmensen?plaats=${encodeURIComponent(city.name)}`} variant="secondary" size="lg">
                Zoek in {city.name}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <h2 className="text-2xl font-semibold">Vakgebieden in {city.name}</h2>
        <p className="mt-2 text-stone-600">Kies een vakgebied om vakmensen in {city.name} en omgeving te bekijken.</p>
        <div className="mt-6">
          <CategoryGrid
            items={categories}
            hrefFor={(c) => `/vakmensen?vakgebied=${c.slug}&plaats=${encodeURIComponent(city.name)}&afstand=25`}
          />
        </div>
      </section>

      <section className="container-page pb-16">
        <h2 className="text-2xl font-semibold">Vakmensen in en rond {city.name}</h2>
        {pros.length > 0 ? (
          <>
            <JsonLd data={itemListLd(pros)} />
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pros.map((p) => (
                <ProCard key={p.slug} pro={p} />
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4 text-stone-600">
            Er staan nog geen vakmensen uit {city.name} op Vakconnectie. Plaats je klus, dan laten we het je weten zodra
            er iemand in de buurt reageert.
          </p>
        )}
        {covered.size < categories.length && pros.length > 0 && (
          <p className="mt-6 text-sm text-stone-600">
            Staat het vakgebied dat je zoekt er niet tussen?{" "}
            <Link href="/klus-plaatsen" className="font-semibold text-brand-700 hover:underline">Plaats je klus</Link>{" "}
            en laat vakmensen uit de regio zelf reageren.
          </p>
        )}
      </section>

      <section className="border-t border-stone-200 bg-stone-50 py-12">
        <div className="container-page">
          <h2 className="text-lg font-semibold">Andere regio&apos;s</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {cities
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <li key={c.slug}>
                  <Link href={`/vakmensen/${c.slug}`} className="inline-block rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-sm text-stone-700 hover:border-brand-600 hover:text-brand-700">
                    {c.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
