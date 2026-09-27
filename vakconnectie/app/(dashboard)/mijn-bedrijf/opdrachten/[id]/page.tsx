import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { Panel } from "@/components/dashboard/Panels";
import { RespondPanel } from "@/components/dashboard/RespondPanel";
import { categoryName } from "@/lib/data/categories";
import { TIMING_LABELS } from "@/lib/data/jobs";
import { currentProfessionalSlug } from "@/lib/dashboard";
import { findUser, listJobsForProfessional } from "@/lib/repository";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Opdracht bekijken" };

export default async function OpportunityPage(props: PageProps<"/mijn-bedrijf/opdrachten/[id]">) {
  const { id } = await props.params;
  const job = (await listJobsForProfessional(currentProfessionalSlug)).find((j) => j.id === id);
  if (!job) notFound();
  const customer = await findUser(job.customerId);
  const mine = job.responses.find((r) => r.professionalSlug === currentProfessionalSlug);
  const others = job.responses.length - (mine ? 1 : 0);

  return (
    <>
      <Link href="/mijn-bedrijf/opdrachten" className="text-sm font-medium text-brand-700 hover:underline">← Nieuwe opdrachten</Link>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge>{categoryName(job.categorySlug)}</Badge>
        <span className="text-sm text-stone-500">Opdracht #{job.id}</span>
      </div>
      <h1 className="mt-2 text-2xl font-semibold">{job.title}</h1>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_24rem]">
        <div className="space-y-6">
          <Panel title="Omschrijving">
            <div className="p-5">
              <p className="whitespace-pre-line leading-relaxed text-stone-700">{job.description}</p>
              <dl className="mt-5 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                {Object.entries(job.details).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-stone-500">{k}</dt>
                    <dd className="font-medium text-stone-900">{v}</dd>
                  </div>
                ))}
              </dl>
              {job.photos.length > 0 && (
                <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {job.photos.map((p) => (
                    <li key={p}><Photo alt={p} className="aspect-square rounded-lg" /></li>
                  ))}
                </ul>
              )}
            </div>
          </Panel>
          <Panel title="Gegevens">
            <dl className="grid gap-4 p-5 text-sm sm:grid-cols-2">
              <div><dt className="text-stone-500">Locatie</dt><dd className="font-medium">{job.postcode.slice(0, 4)}, {job.place}</dd></div>
              <div><dt className="text-stone-500">Afstand</dt><dd className="font-medium">{job.distanceKm} km</dd></div>
              <div><dt className="text-stone-500">Gewenste planning</dt><dd className="font-medium">{TIMING_LABELS[job.timing]}</dd></div>
              <div><dt className="text-stone-500">Geplaatst op</dt><dd className="font-medium">{formatDate(job.createdAt)}</dd></div>
              <div><dt className="text-stone-500">Opdrachtgever</dt><dd className="font-medium">{customer ? `${customer.firstName} ${customer.lastName[0]}.` : "Onbekend"}</dd></div>
              <div><dt className="text-stone-500">Andere reacties</dt><dd className="font-medium">{others}</dd></div>
            </dl>
          </Panel>
        </div>
        <div>
          <Panel title={mine ? "Jouw reactie" : "Reageren"}>
            <RespondPanel customerFirstName={customer?.firstName ?? "de opdrachtgever"} existing={mine?.message} />
          </Panel>
          <p className="mt-3 text-xs leading-relaxed text-stone-500">
            Het exacte adres en telefoonnummer zie je pas als de opdrachtgever die met je deelt.
          </p>
        </div>
      </div>
    </>
  );
}
