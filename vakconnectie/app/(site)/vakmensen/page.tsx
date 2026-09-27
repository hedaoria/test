import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProCard } from "@/components/pros/ProCard";
import { ProSearchForm, DISTANCES } from "@/components/pros/ProSearchForm";
import { findCategory, listProfessionals, searchProfessionals } from "@/lib/repository";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { itemListLd } from "@/lib/seo";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = {
  title: "Vind een vakman bij jou in de buurt",
  description:
    "Vakconnectie helpt je bij het vinden van een passende zelfstandige vakman. Doe gratis en vrijblijvend een projectaanvraag.",
  alternates: { canonical: "/vakmensen" },
};

function param(v: string | string[] | undefined) {
  return (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
}

export default async function VakmensenPage(props: PageProps<"/vakmensen">) {
  const sp = await props.searchParams;
  // Zolang er geen openbare profielen zijn, zoeken wij voor de klant.
  if ((await listProfessionals()).length === 0) return <NoPublicProfiles />;
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
            Probeer een grotere afstand of een ander vakgebied. Of doe een projectaanvraag: dan zoeken wij een
            passende zelfstandige vakman voor je.
          </p>
          <ButtonLink
            href={`/klus-plaatsen${category ? `?vakgebied=${category.slug}` : ""}`}
            className="mt-6"
            size="lg"
          >
            Doe een projectaanvraag
          </ButtonLink>
        </div>
      )}

      <aside className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-50 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="text-lg font-semibold">Liever dat wij voor je zoeken?</h2>
          <p className="mt-1 text-stone-700">Doe gratis en vrijblijvend een projectaanvraag, dan zoeken wij een passende vakman.</p>
        </div>
        <ButtonLink href={`/klus-plaatsen${category ? `?vakgebied=${category.slug}` : ""}`} size="lg">
          Doe een projectaanvraag
        </ButtonLink>
      </aside>
    </div>
  );
}

function NoPublicProfiles() {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Vind een vakman", path: "/vakmensen" }]} />
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Vind een vakman</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-stone-600">
        Vertel ons wat je wilt laten doen. Wij helpen je bij het vinden van een passende zelfstandige vakman en
        controleren de KvK-inschrijving voordat we iemand aan je voorstellen.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/klus-plaatsen" size="lg">Doe gratis een projectaanvraag</ButtonLink>
        <ButtonLink href="/contact" variant="secondary" size="lg">Neem contact op</ButtonLink>
      </div>
      <section className="mt-14 border-t border-stone-200 pt-12">
        <h2 className="text-2xl font-semibold">Zo werkt het</h2>
        <HowItWorksSteps className="mt-8" />
      </section>
    </div>
  );
}
