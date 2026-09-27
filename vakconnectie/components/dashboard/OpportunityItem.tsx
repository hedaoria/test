import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonClass } from "@/components/ui/Button";
import { categoryName } from "@/lib/data/categories";
import { TIMING_LABELS } from "@/lib/data/jobs";
import { relativeDate } from "@/lib/format";
import type { Job } from "@/lib/types";

export function OpportunityItem({ job, distanceKm, responded }: { job: Job; distanceKm: number; responded: boolean }) {
  return (
    <article className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{categoryName(job.categorySlug)}</Badge>
          {responded && <Badge tone="brand">Gereageerd</Badge>}
          {job.responses.length === 0 && !responded && <Badge tone="blue">Nog geen reacties</Badge>}
        </div>
        <h3 className="mt-2 font-semibold">
          <Link href={`/mijn-bedrijf/opdrachten/${job.id}`} className="hover:text-brand-700">{job.title}</Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-[0.9375rem] text-stone-600">{job.description}</p>
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-600">
          <div className="flex items-center gap-1">
            <dt className="sr-only">Locatie</dt>
            <MapPin className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
            <dd>{job.place} · {distanceKm} km</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-stone-500">Gewenst:</dt>
            <dd>{TIMING_LABELS[job.timing]}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-stone-500">Geplaatst:</dt>
            <dd>{relativeDate(job.createdAt)}</dd>
          </div>
        </dl>
      </div>
      <Link href={`/mijn-bedrijf/opdrachten/${job.id}`} className={buttonClass(responded ? "secondary" : "primary", "sm", "shrink-0")}>
        Bekijk opdracht
      </Link>
    </article>
  );
}
