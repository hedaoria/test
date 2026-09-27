import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { Panel, PageTitle } from "@/components/dashboard/Panels";
import { OpportunityItem } from "@/components/dashboard/OpportunityItem";
import { currentProfessionalSlug } from "@/lib/dashboard";
import { findProfessional, hasResponded, listJobsForProfessional } from "@/lib/repository";

export const metadata: Metadata = { title: "Nieuwe opdrachten" };

const SORTS = { nieuw: "Nieuwste eerst", afstand: "Dichtstbij" } as const;

export default async function OpportunitiesPage(props: PageProps<"/[lang]/mijn-bedrijf/opdrachten">) {
  const sp = await props.searchParams;
  const sort = sp.sortering === "afstand" ? "afstand" : "nieuw";
  const [pro, jobs] = await Promise.all([findProfessional(currentProfessionalSlug), listJobsForProfessional(currentProfessionalSlug)]);
  if (!pro) return null;
  const list = [...jobs].sort((a, b) => (sort === "afstand" ? a.distanceKm - b.distanceKm : b.createdAt.localeCompare(a.createdAt)));

  return (
    <>
      <PageTitle
        title="Nieuwe opdrachten"
        intro={`Opdrachten binnen ${pro.radiusKm} km van ${pro.place} die passen bij jouw vakgebied.`}
        action={
          <div className="flex gap-1 text-sm" role="group" aria-label="Sorteren">
            {(Object.keys(SORTS) as (keyof typeof SORTS)[]).map((s) => (
              <Link
                key={s}
                href={s === "nieuw" ? "/mijn-bedrijf/opdrachten" : "/mijn-bedrijf/opdrachten?sortering=afstand"}
                aria-current={sort === s ? "true" : undefined}
                className={clsx("rounded-full px-3 py-1.5 font-medium", sort === s ? "bg-stone-900 text-white" : "text-stone-700 hover:bg-stone-200")}
              >
                {SORTS[s]}
              </Link>
            ))}
          </div>
        }
      />
      <Panel>
        {list.length ? (
          <div className="divide-y divide-stone-200">
            {list.map((j) => (
              <OpportunityItem key={j.id} job={j} distanceKm={j.distanceKm} responded={hasResponded(j, pro.slug)} />
            ))}
          </div>
        ) : (
          <p className="p-6 text-stone-600">
            Geen opdrachten gevonden. Vergroot eventueel je <Link href="/mijn-bedrijf/werkgebied" className="font-medium text-brand-700 hover:underline">werkgebied</Link>.
          </p>
        )}
      </Panel>
    </>
  );
}
