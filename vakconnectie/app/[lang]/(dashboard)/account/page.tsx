import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { JobStatusBadge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/dashboard/Panels";
import { categoryName } from "@/lib/data/categories";
import { currentCustomerId } from "@/lib/dashboard";
import { findProfessional, listJobsForCustomer } from "@/lib/repository";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Mijn klussen" };

export default async function MyJobsPage() {
  const jobs = await listJobsForCustomer(currentCustomerId);
  const selected = await Promise.all(jobs.map((j) => (j.selectedProfessionalSlug ? findProfessional(j.selectedProfessionalSlug) : undefined)));

  return (
    <>
      <PageTitle title="Mijn klussen" action={<ButtonLink href="/klus-plaatsen">Nieuwe klus plaatsen</ButtonLink>} />
      {jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center">
          <p className="text-stone-600">Je hebt nog geen klussen geplaatst.</p>
          <ButtonLink href="/klus-plaatsen" className="mt-5">Plaats je eerste klus</ButtonLink>
        </div>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job, i) => {
            const newCount = job.responses.filter((r) => r.status === "nieuw").length;
            return (
              <li key={job.id}>
                <Link href={`/account/klussen/${job.id}`} className="card card-hover block p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-stone-500">{categoryName(job.categorySlug)} · {job.place}</p>
                      <h2 className="mt-0.5 text-lg font-semibold">{job.title}</h2>
                    </div>
                    <JobStatusBadge status={job.status} />
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
                    <div>
                      <dt className="text-stone-500">Geplaatst</dt>
                      <dd className="font-medium text-stone-900">{formatDate(job.createdAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-500">Reacties</dt>
                      <dd className="font-medium text-stone-900">
                        {job.responses.length}
                        {newCount > 0 && <span className="ml-1.5 text-brand-700">({newCount} nieuw)</span>}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-stone-500">Gekozen vakman</dt>
                      <dd className="font-medium text-stone-900">{selected[i]?.companyName ?? "Nog niet gekozen"}</dd>
                    </div>
                  </dl>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
