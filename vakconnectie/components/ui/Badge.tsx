import clsx from "clsx";
import type { Availability, JobStatus } from "@/lib/types";

export function Badge({ children, tone = "stone", className }: { children: React.ReactNode; tone?: "stone" | "brand" | "amber" | "red" | "blue"; className?: string }) {
  const tones = {
    stone: "bg-stone-100 text-stone-700",
    brand: "bg-brand-50 text-brand-800",
    amber: "bg-amber-50 text-amber-800",
    red: "bg-red-50 text-red-700",
    blue: "bg-sky-50 text-sky-800",
  };
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}

export function AvailabilityBadge({ availability }: { availability: Availability }) {
  const dot = { direct: "bg-brand-500", binnenkort: "bg-amber-500", later: "bg-stone-400" }[availability.status];
  return (
    <span className="inline-flex items-center gap-2 text-sm text-stone-700">
      <span aria-hidden="true" className={clsx("h-2 w-2 rounded-full", dot)} />
      {availability.label}
    </span>
  );
}

const STATUS: Record<JobStatus, { label: string; tone: "stone" | "brand" | "amber" | "red" | "blue" }> = {
  open: { label: "Wacht op reacties", tone: "blue" },
  in_gesprek: { label: "In gesprek", tone: "amber" },
  gegund: { label: "Vakman gekozen", tone: "brand" },
  afgerond: { label: "Afgerond", tone: "stone" },
  geannuleerd: { label: "Gesloten", tone: "red" },
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const s = STATUS[status];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}
