import type { Metadata } from "next";
import Link from "next/link";
import { Badge, JobStatusBadge } from "@/components/ui/Badge";
import { Panel, PageTitle } from "@/components/dashboard/Panels";
import { currentProfessionalSlug } from "@/lib/dashboard";
import { listJobs } from "@/lib/repository";
import { relativeDate } from "@/lib/format";

export const metadata: Metadata = { title: "Mijn reacties" };

const RESPONSE_STATUS = {
  nieuw: { label: "Nog niet gelezen", tone: "blue" },
  bekeken: { label: "Gelezen", tone: "stone" },
  gekozen: { label: "Je bent gekozen", tone: "brand" },
  afgewezen: { label: "Niet gekozen", tone: "red" },
} as const;

export default async function MyResponsesPage() {
  const jobs = (await listJobs()).filter((j) => j.responses.some((r) => r.professionalSlug === currentProfessionalSlug));
  return (
    <>
      <PageTitle title="Mijn reacties" intro="Opdrachten waarop je hebt gereageerd." />
      <Panel>
        <ul className="divide-y divide-stone-200">
          {jobs.map((job) => {
            const r = job.responses.find((x) => x.professionalSlug === currentProfessionalSlug)!;
            const s = RESPONSE_STATUS[r.status];
            return (
              <li key={job.id} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link href={`/mijn-bedrijf/opdrachten/${job.id}`} className="font-semibold hover:text-brand-700">{job.title}</Link>
                  <p className="text-sm text-stone-500">{job.place} · gereageerd {relativeDate(r.createdAt)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone={s.tone}>{s.label}</Badge>
                  <JobStatusBadge status={job.status} />
                </div>
              </li>
            );
          })}
        </ul>
        {jobs.length === 0 && <p className="p-5 text-stone-600">Je hebt nog niet gereageerd op opdrachten.</p>}
      </Panel>
    </>
  );
}
