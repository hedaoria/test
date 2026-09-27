import { Stars } from "@/components/ui/Stars";
import { formatDate, formatRating } from "@/lib/format";
import type { Review, ReviewScores } from "@/lib/types";
import type { RatingSummary } from "@/lib/repository";

const ASPECTS: { key: keyof ReviewScores; label: string }[] = [
  { key: "kwaliteit", label: "Kwaliteit" },
  { key: "communicatie", label: "Communicatie" },
  { key: "afspraken", label: "Afspraken nakomen" },
  { key: "prijsKwaliteit", label: "Prijs/kwaliteit" },
];

export function RatingOverview({ summary, reviews }: { summary: RatingSummary; reviews: Review[] }) {
  if (summary.count === 0) {
    return <p className="text-stone-600">Dit bedrijf heeft nog geen beoordelingen.</p>;
  }
  const avg = (k: keyof ReviewScores) => reviews.reduce((s, r) => s + r.scores[k], 0) / reviews.length;
  return (
    <div className="grid gap-8 rounded-2xl bg-stone-50 p-6 sm:grid-cols-[auto_1fr] sm:gap-12 sm:p-8">
      <div>
        <p className="text-4xl font-semibold text-stone-950">
          {formatRating(summary.average)} <span className="text-xl font-normal text-stone-500">/ 5</span>
        </p>
        <div className="mt-2">
          <Stars value={summary.average} size="lg" />
        </div>
        <p className="mt-2 text-sm text-stone-600">
          Gebaseerd op {summary.count} {summary.count === 1 ? "beoordeling" : "beoordelingen"}
        </p>
      </div>
      <dl className="grid content-center gap-3">
        {ASPECTS.map(({ key, label }) => {
          const v = avg(key);
          return (
            <div key={key} className="grid grid-cols-[8.5rem_1fr_2rem] items-center gap-3 text-sm">
              <dt className="text-stone-700">{label}</dt>
              <dd className="h-1.5 overflow-hidden rounded-full bg-stone-200">
                <span className="block h-full rounded-full bg-brand-600" style={{ width: `${(v / 5) * 100}%` }} />
              </dd>
              <dd className="text-right font-medium text-stone-900">{formatRating(v)}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

export function ReviewItem({ review, companyName }: { review: Review; companyName?: string }) {
  return (
    <article className="py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Stars value={review.rating} size="sm" />
        <time dateTime={review.date} className="text-sm text-stone-500">{formatDate(review.date)}</time>
      </div>
      <h3 className="mt-2 font-semibold">{review.jobTitle}</h3>
      <p className="mt-1.5 leading-relaxed text-stone-700">{review.text}</p>
      <p className="mt-2 text-sm text-stone-500">
        {review.authorName} · {review.place}
      </p>
      {review.reply && companyName && (
        <div className="mt-4 rounded-lg border-l-2 border-brand-300 bg-stone-50 px-4 py-3">
          <p className="text-sm font-semibold text-stone-800">Reactie van {companyName}</p>
          <p className="mt-1 text-sm leading-relaxed text-stone-700">{review.reply}</p>
        </div>
      )}
    </article>
  );
}
