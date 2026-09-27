import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { JobStatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { RatingInline } from "@/components/ui/Stars";
import { Panel } from "@/components/dashboard/Panels";
import { ResponseActions } from "@/components/dashboard/ResponseActions";
import { categoryName } from "@/lib/data/categories";
import { TIMING_LABELS } from "@/lib/data/jobs";
import { currentCustomerId } from "@/lib/dashboard";
import { findJob, findProfessional, listConversationsForCustomer } from "@/lib/repository";
import { formatDate, relativeDate } from "@/lib/format";

export async function generateMetadata(props: PageProps<"/account/klussen/[id]">): Promise<Metadata> {
  const job = await findJob((await props.params).id);
  return { title: job?.title ?? "Klus" };
}

export default async function CustomerJobPage(props: PageProps<"/account/klussen/[id]">) {
  const { id } = await props.params;
  const job = await findJob(id);
  if (!job || job.customerId !== currentCustomerId) notFound();

  const [responses, conversations, selected] = await Promise.all([
    Promise.all(job.responses.map(async (r) => ({ ...r, pro: await findProfessional(r.professionalSlug) }))),
    listConversationsForCustomer(currentCustomerId),
    job.selectedProfessionalSlug ? findProfessional(job.selectedProfessionalSlug) : undefined,
  ]);
  const convFor = (slug: string) => conversations.find((c) => c.jobId === job.id && c.professionalSlug === slug);

  return (
    <>
      <Link href="/account" className="text-sm font-medium text-brand-700 hover:underline">← Mijn klussen</Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-stone-500">Klus #{job.id} · {categoryName(job.categorySlug)}</p>
          <h1 className="mt-1 text-2xl font-semibold">{job.title}</h1>
        </div>
        <JobStatusBadge status={job.status} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <Panel title={`Reacties (${responses.length})`}>
            {responses.length === 0 ? (
              <p className="p-5 text-stone-600">Nog geen reacties. Je krijgt een melding zodra een vakman reageert.</p>
            ) : (
              <ul className="divide-y divide-stone-200">
                {responses.map((r) =>
                  r.pro ? (
                    <li key={r.id} className="p-5">
                      <div className="flex items-start gap-3">
                        <Avatar name={r.pro.companyName} size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <Link href={`/vakman/${r.pro.slug}`} className="font-semibold hover:text-brand-700">{r.pro.companyName}</Link>
                            <span className="text-xs text-stone-500">{relativeDate(r.createdAt)}</span>
                          </div>
                          <RatingInline average={r.pro.rating.average} count={r.pro.rating.count} className="mt-0.5" />
                          <p className="mt-3 leading-relaxed text-stone-700">{r.message}</p>
                          <div className="mt-4">
                            <ResponseActions
                              initial={r.status}
                              companyName={r.pro.companyName}
                              conversationHref={`/account/berichten${convFor(r.pro.slug) ? `?gesprek=${convFor(r.pro.slug)!.id}` : ""}`}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : null,
                )}
              </ul>
            )}
          </Panel>

          <Panel title="Klusdetails">
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
                    <li key={p}>
                      <Photo alt={p} className="aspect-square rounded-lg" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Overzicht">
            <dl className="space-y-3 p-5 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-stone-500">Geplaatst op</dt><dd className="font-medium">{formatDate(job.createdAt)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-stone-500">Planning</dt><dd className="font-medium">{TIMING_LABELS[job.timing]}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-stone-500">Locatie</dt><dd className="text-right font-medium">{job.postcode} {job.houseNumber}, {job.place}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-stone-500">Gekozen vakman</dt><dd className="text-right font-medium">{selected ? <Link href={`/vakman/${selected.slug}`} className="text-brand-700 hover:underline">{selected.companyName}</Link> : "Nog niet gekozen"}</dd></div>
            </dl>
          </Panel>
          <div className="space-y-2">
            {job.status === "gegund" && <ButtonLink href="/account/reviews" className="w-full">Klus afronden</ButtonLink>}
            <ButtonLink href="/account/berichten" variant="secondary" className="w-full">Naar berichten</ButtonLink>
          </div>
          <p className="text-xs leading-relaxed text-stone-500">
            Vakmensen zien alleen je postcodegebied en plaats, niet je huisnummer of telefoonnummer.
          </p>
        </div>
      </div>
    </>
  );
}
