import type { Metadata } from "next";
import { PageTitle } from "@/components/dashboard/Panels";
import { DataTable, Td } from "@/components/admin/DataTable";
import { ManagedStatus } from "@/components/admin/ManagedStatus";
import { JOB_STATUSES } from "@/lib/admin";
import { categoryName } from "@/lib/data/categories";
import { listJobs } from "@/lib/repository";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Opdrachten" };

export default async function AdminJobsPage() {
  const jobs = await listJobs();
  return (
    <>
      <PageTitle title="Opdrachten" />
      <DataTable head={["#", "Klus", "Vakgebied", "Plaats", "Geplaatst", "Reacties", "Status"]}>
        {jobs.map((j) => (
          <tr key={j.id}>
            <Td className="text-stone-500">{j.id}</Td>
            <Td className="max-w-72">
              <p className="font-medium">{j.title}</p>
              <p className="line-clamp-1 text-stone-500">{j.description}</p>
            </Td>
            <Td>{categoryName(j.categorySlug)}</Td>
            <Td>{j.place}</Td>
            <Td className="whitespace-nowrap">{formatDate(j.createdAt)}</Td>
            <Td>{j.responses.length}</Td>
            <Td><ManagedStatus initial={j.status} statuses={JOB_STATUSES} subject={`opdracht #${j.id}`} /></Td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
