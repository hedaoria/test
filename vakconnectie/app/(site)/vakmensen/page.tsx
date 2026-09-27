import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProCard } from "@/components/pros/ProCard";
import { ProSearchForm, DISTANCES } from "@/components/pros/ProSearchForm";
import { findCategory, searchProfessionals } from "@/lib/repository";
import { itemListLd } from "@/lib/seo";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = {
  title: "Vind een vakman bij jou in de buurt",
  description:
    "Zoek op vakgebied, postcode of plaats en vergelijk vakmensen uit jouw regio. Bekijk ervaring, beschikbaarheid en beoordelingen van klanten.",
  alternates: { canonical: "/vakmensen" },
};

function param(v: string | string[] | undefined) {
  return (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
}

export default async function VakmensenPage(props: PageProps<"/vakmensen">) {
  const sp = await props.searchParams;
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

  const heading = category ? `${category.namePlural}` : "Vakmensen";
  const where = location ? ` in de buurt van ${location.label}` : "";

  const sortHref = (s: "afstand" | "beoordeling") => {
    const q = new URLSearchParams(Object.entries(values).filter(([, v]) => v) as [string, string][]);
    if (s === "beoordeling") q.set("sortering", "beoordeling");
    return `/vakmensen?${q.toString()}`;
  };
  const activeSort = sort ?? (location ? "afstand" : "beoordeling");

  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Vind een vakman", path: "/vakmensen" }]} />
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Vind een vakman</h1>
      <p className="mt-2 max-w-2xl text-lg text-stone-600">
        Zoek op vakgebied en locatie. Je ziet alleen vakmensen die in jouw omgeving werken.
      </p>

      <ProSearchForm compact values={values} className="mt-8" />

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div aria-live="polite">
          <h2 className="text-xl font-semibold">
            {heading}
            {where}
          </h2>
          <p className="mt-1 text-sm text-stone-600">{pluralize(results.length, "resultaat", "resultaten")}</p>
          {locationNotFound && (
            <p className="mt-2 text-sm text-amber-800">
              We konden deze postcode of plaats niet vinden. Controleer de spelling of probeer een postcode.
            </p>
          )}
        </div>
        {location && results.length > 1 && (
          <div className="flex items-center gap-1 text-sm" role="group" aria-label="Sorteren">
            <span className="mr-1 text-stone-500">Sorteer op</span>
            {(["afstand", "beoordeling"] as const).map((s) => (
              <Link
                key={s}
                href={sortHref(s)}
                aria-current={activeSort === s ? "true" : undefined}
                className={clsx(
                  "rounded-full px-3 py-1 font-medium",
                  activeSort === s ? "bg-stone-900 text-white" : "text-stone-700 hover:bg-stone-100",
                )}
              >
                {s === "afstand" ? "Afstand" : "Beoordeling"}
              </Link>
            ))}
          </div>
        )}
      </div>

      {results.length > 0 ? (
        <>
          <JsonLd data={itemListLd(results)} />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProCard key={p.slug} pro={p} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center sm:p-12">
          <h3 className="text-lg font-semibold">Geen vakmensen gevonden met deze zoekopdracht</h3>
          <p className="mx-auto mt-2 max-w-md text-stone-600">
            Probeer een grotere afstand of een ander vakgebied. Of plaats je klus: dan kunnen vakmensen uit de regio
            zelf reageren.
          </p>
          <ButtonLink
            href={`/klus-plaatsen${category ? `?vakgebied=${category.slug}` : ""}`}
            className="mt-6"
            size="lg"
          >
            Plaats je klus
          </ButtonLink>
        </div>
      )}

      <aside className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-50 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="text-lg font-semibold">Liever dat vakmensen naar jou toe komen?</h2>
          <p className="mt-1 text-stone-700">Plaats gratis je klus en ontvang reacties van vakmensen uit de buurt.</p>
        </div>
        <ButtonLink href={`/klus-plaatsen${category ? `?vakgebied=${category.slug}` : ""}`} size="lg">
          Plaats gratis je klus
        </ButtonLink>
      </aside>
    </div>
  );
}
