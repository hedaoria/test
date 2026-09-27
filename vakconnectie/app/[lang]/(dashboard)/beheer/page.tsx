import type { Metadata } from "next";
import Link from "next/link";
import { Panel, PageTitle, Stat } from "@/components/dashboard/Panels";
import { listAllReviews, listJobs, listProfessionals, listReports, listUsers } from "@/lib/repository";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Overzicht" };

export default async function AdminOverview() {
  const [users, jobs, pros, reviews, reports] = await Promise.all([listUsers(), listJobs(), listProfessionals(), listAllReviews(), listReports()]);
  const pending = users.filter((u) => u.role === "vakman" && u.status === "in_beoordeling");
  const openReports = reports.filter((r) => r.status !== "afgehandeld");

  return (
    <>
      <PageTitle title="Overzicht" intro="Wat vraagt vandaag om aandacht?" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Gebruikers" value={users.length} href="/beheer/gebruikers" />
        <Stat label="Vakmensen" value={pros.length} href="/beheer/vakmensen" />
        <Stat label="Opdrachten" value={jobs.length} href="/beheer/opdrachten" />
        <Stat label="Reviews" value={reviews.length} href="/beheer/reviews" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title={`Wacht op goedkeuring (${pending.length})`} action={<Link href="/beheer/vakmensen" className="text-sm font-medium text-brand-700 hover:underline">Beoordelen</Link>}>
          <ul className="divide-y divide-stone-100">
            {pending.map((u) => (
              <li key={u.id} className="flex justify-between gap-4 px-5 py-3 text-sm">
                <span className="font-medium">{u.firstName} {u.lastName}</span>
                <span className="text-stone-500">Aangemeld {formatDate(u.createdAt)}</span>
              </li>
            ))}
            {pending.length === 0 && <li className="px-5 py-4 text-sm text-stone-600">Niets te beoordelen.</li>}
          </ul>
        </Panel>
        <Panel title={`Openstaande meldingen (${openReports.length})`} action={<Link href="/beheer/meldingen" className="text-sm font-medium text-brand-700 hover:underline">Behandelen</Link>}>
          <ul className="divide-y divide-stone-100">
            {openReports.map((r) => (
              <li key={r.id} className="px-5 py-3 text-sm">
                <p className="font-medium">{r.subject}</p>
                <p className="text-stone-500">{r.reason}</p>
              </li>
            ))}
            {openReports.length === 0 && <li className="px-5 py-4 text-sm text-stone-600">Geen openstaande meldingen.</li>}
          </ul>
        </Panel>
      </div>
    </>
  );
}
