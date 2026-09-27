"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/** Openbaar reageren op een review. TODO: koppelen aan /api/reviews/[id]/reactie. */
export function ReplyForm({ existing, reviewId }: { existing?: string; reviewId: string }) {
  const [reply, setReply] = useState(existing);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(existing ?? "");

  if (reply && !open) {
    return (
      <div className="mt-4 rounded-lg border-l-2 border-brand-300 bg-stone-50 px-4 py-3">
        <p className="text-sm font-semibold">Jouw reactie</p>
        <p className="mt-1 text-sm text-stone-700">{reply}</p>
        <button type="button" onClick={() => setOpen(true)} className="mt-2 text-sm font-medium text-brand-700 hover:underline">Aanpassen</button>
      </div>
    );
  }
  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="mt-3 text-sm font-medium text-brand-700 hover:underline">
        Reageren
      </button>
    );
  }
  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (draft.trim()) setReply(draft.trim());
        setOpen(false);
      }}
    >
      <label htmlFor={`reply-${reviewId}`} className="sr-only">Je reactie</label>
      <textarea id={`reply-${reviewId}`} rows={3} value={draft} onChange={(e) => setDraft(e.target.value)} className="input resize-y" placeholder="Bedank de klant of geef een toelichting." />
      <div className="flex gap-2">
        <Button type="submit" size="sm">Plaatsen</Button>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Annuleren</Button>
      </div>
    </form>
  );
}
