"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Formulier-wrapper voor instellingenpagina's: toont na opslaan een bevestiging.
 * TODO: onSubmit koppelen aan de juiste API-route.
 */
export function SettingsForm({ children, submitLabel = "Opslaan" }: { children: React.ReactNode; submitLabel?: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
      onChange={() => setSaved(false)}
      className="space-y-5 p-5"
    >
      {children}
      <div className="flex items-center gap-4 pt-1">
        <Button type="submit">{submitLabel}</Button>
        {saved && <span role="status" className="text-sm font-medium text-brand-700">Opgeslagen</span>}
      </div>
    </form>
  );
}

export function Toggle({ name, label, description, defaultChecked }: { name: string; label: string; description?: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      <span>
        <span className="block font-medium text-stone-900">{label}</span>
        {description && <span className="block text-sm text-stone-600">{description}</span>}
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
        <span className="h-6 w-11 rounded-full bg-stone-300 transition-colors peer-checked:bg-brand-700 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-600 peer-focus-visible:ring-offset-2" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
