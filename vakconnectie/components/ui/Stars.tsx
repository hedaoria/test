import clsx from "clsx";
import { formatRating } from "@/lib/format";

function Star({ fill, className }: { fill: number; className?: string }) {
  const id = `s${Math.round(fill * 100)}`;
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="#d97706" />
          <stop offset={`${fill * 100}%`} stopColor="#e7e5e4" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M10 1.7l2.47 5.2 5.7.68-4.2 3.92 1.1 5.64L10 14.35l-5.07 2.8 1.1-5.65-4.2-3.9 5.7-.7z"
      />
    </svg>
  );
}

export function Stars({ value, size = "md" }: { value: number; size?: "sm" | "md" | "lg" }) {
  const cls = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" }[size];
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${formatRating(value)} van 5 sterren`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} fill={Math.max(0, Math.min(1, value - i))} className={cls} />
      ))}
    </span>
  );
}

export function RatingInline({ average, count, className }: { average: number; count: number; className?: string }) {
  if (count === 0) return <span className={clsx("text-sm text-stone-500", className)}>Nog geen beoordelingen</span>;
  return (
    <span className={clsx("inline-flex items-center gap-1.5 text-sm", className)}>
      <Stars value={average} size="sm" />
      <span className="font-semibold text-stone-900">{formatRating(average)}</span>
      <span className="text-stone-500">({count})</span>
    </span>
  );
}
