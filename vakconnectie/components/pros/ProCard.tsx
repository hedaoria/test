import Link from "next/link";
import { MapPin, BadgeCheck } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { RatingInline } from "@/components/ui/Stars";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { buttonClass } from "@/components/ui/Button";
import { categoryName } from "@/lib/data/categories";
import type { ProfessionalWithRating } from "@/lib/repository";

export function ProCard({ pro, headingLevel = "h3" }: { pro: ProfessionalWithRating; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="card card-hover relative flex flex-col p-5">
      <div className="flex items-start gap-4">
        <Avatar name={pro.companyName} src={pro.logo} />
        <div className="min-w-0 flex-1">
          <Heading className="flex items-center gap-1.5 text-[1.0625rem] font-semibold leading-snug">
            <Link href={`/vakman/${pro.slug}`} className="after:absolute after:inset-0 after:rounded-[inherit] hover:text-brand-700">
              {pro.companyName}
            </Link>
            {pro.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-brand-600" aria-label="Geverifieerd bedrijf" />}
          </Heading>
          <p className="mt-0.5 text-sm text-stone-600">
            {pro.categories.map(categoryName).join(" · ")}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-stone-600">
        <RatingInline average={pro.rating.average} count={pro.rating.count} />
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
          {pro.place}
          {pro.distanceKm !== undefined && <span className="text-stone-400">· {pro.distanceKm} km</span>}
        </span>
        <span>{pro.yearsExperience} jaar ervaring</span>
      </div>

      <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-stone-700">{pro.tagline}</p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <AvailabilityBadge availability={pro.availability} />
        <span className={buttonClass("secondary", "sm", "relative")} aria-hidden="true">
          Bekijk profiel
        </span>
      </div>
    </article>
  );
}
