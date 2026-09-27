import type { Metadata } from "next";
import { Stars } from "@/components/ui/Stars";
import { Panel, PageTitle } from "@/components/dashboard/Panels";
import { ReplyForm } from "@/components/dashboard/ReplyForm";
import { RatingOverview } from "@/components/pros/ReviewList";
import { currentProfessionalSlug } from "@/lib/dashboard";
import { findProfessional, listReviewsFor } from "@/lib/repository";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Reviews" };

export default async function ProReviewsPage() {
  const [pro, reviews] = await Promise.all([findProfessional(currentProfessionalSlug), listReviewsFor(currentProfessionalSlug)]);
  if (!pro) return null;
  return (
    <>
      <PageTitle title="Reviews" intro="Reageer op reviews om te laten zien dat je feedback serieus neemt." />
      <RatingOverview summary={pro.rating} reviews={reviews} />
      <Panel className="mt-6">
        <ul className="divide-y divide-stone-200">
          {reviews.map((r) => (
            <li key={r.id} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Stars value={r.rating} size="sm" />
                <span className="text-sm text-stone-500">{formatDate(r.date)}</span>
              </div>
              <p className="mt-2 font-semibold">{r.jobTitle}</p>
              <p className="mt-1 text-stone-700">{r.text}</p>
              <p className="mt-1.5 text-sm text-stone-500">{r.authorName} · {r.place}</p>
              <ReplyForm reviewId={r.id} existing={r.reply} />
            </li>
          ))}
        </ul>
      </Panel>
      <p className="mt-4 text-sm text-stone-500">
        Klopt een review niet, bijvoorbeeld omdat de klus niet door jou is uitgevoerd? Meld het via het contactformulier, dan kijken we ernaar.
      </p>
    </>
  );
}
