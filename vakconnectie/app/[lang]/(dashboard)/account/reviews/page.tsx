import type { Metadata } from "next";
import Link from "next/link";
import { Panel, PageTitle } from "@/components/dashboard/Panels";
import { ReviewForm } from "@/components/dashboard/ReviewForm";
import { currentCustomerId } from "@/lib/dashboard";
import { findProfessional, listJobsForCustomer } from "@/lib/repository";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Reviews schrijven" };

export default async function WriteReviewsPage() {
  const jobs = await listJobsForCustomer(currentCustomerId);
  // Klussen die (bijna) klaar zijn en een gekozen vakman hebben.
  const toReview = await Promise.all(
    jobs
      .filter((j) => (j.status === "afgerond" || j.status === "gegund") && j.selectedProfessionalSlug)
      .map(async (j) => ({ job: j, pro: await findProfessional(j.selectedProfessionalSlug!) })),
  );

  return (
    <>
      <PageTitle title="Reviews schrijven" intro="Met een eerlijke review help je andere opdrachtgevers én goede vakmensen." />
      <div className="space-y-6">
        {toReview.length === 0 && (
          <p className="rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">
            Er zijn geen klussen om te beoordelen. Na afronding van een klus kun je hier een review schrijven.
          </p>
        )}
        {toReview.map(({ job, pro }) =>
          pro ? (
            <Panel
              key={job.id}
              title={pro.companyName}
              action={<span className="text-sm text-stone-500">{job.status === "afgerond" ? "Afgerond" : "Loopt nog"} · {formatDate(job.createdAt)}</span>}
            >
              <p className="border-b border-stone-100 px-5 py-3 text-sm text-stone-600">
                Klus: <Link href={`/account/klussen/${job.id}`} className="font-medium text-brand-700 hover:underline">{job.title}</Link>
              </p>
              <ReviewForm companyName={pro.companyName} jobTitle={job.title} />
            </Panel>
          ) : null,
        )}
      </div>
    </>
  );
}
