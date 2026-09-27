"use client";

import { useState } from "react";
import clsx from "clsx";

type Tone = "stone" | "brand" | "amber" | "red" | "blue";

export interface StatusDef {
  label: string;
  tone: Tone;
  /** Acties die vanuit deze status beschikbaar zijn. */
  actions?: { label: string; to: string; danger?: boolean }[];
}

const TONES: Record<Tone, string> = {
  stone: "bg-stone-100 text-stone-700",
  brand: "bg-brand-50 text-brand-800",
  amber: "bg-amber-50 text-amber-800",
  red: "bg-red-50 text-red-700",
  blue: "bg-sky-50 text-sky-800",
};

/**
 * Status + acties voor een rij in de beheeromgeving (goedkeuren, blokkeren, …).
 * Nu lokaal; later koppelen aan een server action of API-route met audit-log.
 */
export function ManagedStatus({ initial, statuses, subject }: { initial: string; statuses: Record<string, StatusDef>; subject: string }) {
  const [status, setStatus] = useState(initial);
  const def = statuses[status]!;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={clsx("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", TONES[def.tone])} aria-live="polite">
        {def.label}
      </span>
      {def.actions?.map((a) => (
        <button
          key={a.label}
          type="button"
          onClick={() => {
            if (a.danger && !window.confirm(`${a.label}: ${subject}?`)) return;
            setStatus(a.to);
          }}
          className={clsx(
            "rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors",
            a.danger ? "border-red-200 text-red-700 hover:bg-red-50" : "border-stone-300 text-stone-800 hover:bg-stone-100",
          )}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
