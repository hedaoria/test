import type { Metadata } from "next";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { RatingInline } from "@/components/ui/Stars";
import { PageTitle } from "@/components/dashboard/Panels";
import { currentCustomerId } from "@/lib/dashboard";
import { findProfessional, listJobsForCustomer } from "@/lib/repository";
import { relativeDate } from "@/lib/format";

export const metadata: Metadata = { title: "Reacties van vakmensen" };

export default async function ResponsesPage() {
  const jobs = await listJobsForCustomer(currentCustomerId);
  const items = await Promise.all(
    jobs.flatMap((job) => job.responses.map(async (r) => ({ job, r, pro: await findProfessional(r.professionalSlug) }))),
  );
  items.sort((a, b) => b.r.createdAt.localeCompare(a.r.createdAt));

  return (
    <>
      <PageTitle title="Reacties van vakmensen" intro="Alle reacties op je klussen op één plek." />
      <ul className="space-y-3">
        {items.map(({ job, r, pro }) =>
          pro ? (
            <li key={r.id} className="card p-5">
              <div className="flex items-start gap-3">
                <Avatar name={pro.companyName} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/vakman/${pro.slug}`} className="font-semibold hover:text-brand-700">{pro.companyName}</Link>
                    {r.status === "nieuw" && <Badge tone="brand">Nieuw</Badge>}
                    {r.status === "gekozen" && <Badge tone="stone">Gekozen</Badge>}
                  </div>
                  <RatingInline average={pro.rating.average} count={pro.rating.count} className="mt-0.5" />
                  <p className="mt-2 line-clamp-2 text-stone-700">{r.message}</p>
                  <p className="mt-3 text-sm text-stone-500">
                    Op <Link href={`/account/klussen/${job.id}`} className="font-medium text-brand-700 hover:underline">{job.title}</Link> · {relativeDate(r.createdAt)}
                  </p>
                </div>
              </div>
            </li>
          ) : null,
        )}
      </ul>
    </>
  );
}
