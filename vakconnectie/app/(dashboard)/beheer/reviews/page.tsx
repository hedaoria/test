import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/dashboard/Panels";
import { DataTable, Td } from "@/components/admin/DataTable";
import { ManagedStatus } from "@/components/admin/ManagedStatus";
import { Stars } from "@/components/ui/Stars";
import { REVIEW_STATUSES } from "@/lib/admin";
import { listAllReviews, listProfessionals, listReports } from "@/lib/repository";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Reviews" };

export default async function AdminReviewsPage() {
  const [reviews, pros, reports] = await Promise.all([listAllReviews(), listProfessionals(), listReports()]);
  // Reviews met een openstaande melding tonen we als "gemeld".
  const reportedSubjects = reports.filter((r) => r.kind === "review" && r.status !== "afgehandeld").map((r) => r.subject);
  const name = (slug: string) => pros.find((p) => p.slug === slug)?.companyName ?? slug;
  const statusOf = (authorName: string, slug: string, status: string) =>
    reportedSubjects.some((s) => s.includes(name(slug)) && s.includes(authorName)) ? "gemeld" : status;

  return (
    <>
      <PageTitle title="Reviews" intro="Verberg alleen reviews die beledigend zijn, persoonsgegevens bevatten of aantoonbaar niet kloppen." />
      <DataTable head={["Score", "Review", "Bedrijf", "Datum", "Status"]}>
        {reviews.map((r) => (
          <tr key={r.id}>
            <Td><Stars value={r.rating} size="sm" /></Td>
            <Td className="max-w-md">
              <p className="line-clamp-2">{r.text}</p>
              <p className="text-stone-500">{r.authorName} · {r.place}</p>
            </Td>
            <Td><Link href={`/vakman/${r.professionalSlug}`} className="text-brand-700 hover:underline">{name(r.professionalSlug)}</Link></Td>
            <Td className="whitespace-nowrap">{formatDate(r.date)}</Td>
            <Td><ManagedStatus initial={statusOf(r.authorName, r.professionalSlug, r.status)} statuses={REVIEW_STATUSES} subject={`review van ${r.authorName}`} /></Td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
