import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/dashboard/Panels";
import { DataTable, Td } from "@/components/admin/DataTable";
import { ManagedStatus } from "@/components/admin/ManagedStatus";
import { REPORT_STATUSES } from "@/lib/admin";
import { listReports } from "@/lib/repository";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Meldingen" };

const KIND = { review: "Review", profiel: "Profiel", opdracht: "Opdracht", bericht: "Bericht" } as const;

export default async function AdminReportsPage() {
  const reports = await listReports();
  return (
    <>
      <PageTitle title="Meldingen" intro="Meldingen van gebruikers en automatische controles." />
      <DataTable head={["Soort", "Onderwerp", "Gemeld door", "Datum", "Status"]}>
        {reports.map((r) => (
          <tr key={r.id}>
            <Td><Badge>{KIND[r.kind]}</Badge></Td>
            <Td className="max-w-md">
              <p className="font-medium">{r.subject}</p>
              <p className="text-stone-500">{r.reason}</p>
            </Td>
            <Td>{r.reportedBy}</Td>
            <Td className="whitespace-nowrap">{formatDate(r.createdAt)}</Td>
            <Td><ManagedStatus initial={r.status} statuses={REPORT_STATUSES} subject={r.subject} /></Td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
