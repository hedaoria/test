"use client";

import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";

const ASPECTS = [
  { key: "kwaliteit", label: "Kwaliteit van het werk" },
  { key: "communicatie", label: "Communicatie" },
  { key: "afspraken", label: "Afspraken nakomen" },
  { key: "prijsKwaliteit", label: "Prijs/kwaliteit" },
] as const;

const LABELS = ["", "Slecht", "Matig", "Redelijk", "Goed", "Uitstekend"];

function StarInput({ name, label, value, onChange, large }: { name: string; label: string; value: number; onChange: (v: number) => void; large?: boolean }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <fieldset>
      <legend className={clsx(large ? "label" : "text-sm text-stone-700")}>{label}</legend>
      <div className="mt-1 flex items-center gap-3">
        <div className="flex" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer p-0.5" onMouseEnter={() => setHover(n)}>
              <input type="radio" name={name} value={n} checked={value === n} onChange={() => onChange(n)} className="peer sr-only" />
              <svg viewBox="0 0 20 20" aria-hidden="true" className={clsx(large ? "h-8 w-8" : "h-6 w-6", "rounded transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-600", n <= shown ? "fill-amber-600" : "fill-stone-200")}>
                <path d="M10 1.7l2.47 5.2 5.7.68-4.2 3.92 1.1 5.64L10 14.35l-5.07 2.8 1.1-5.65-4.2-3.9 5.7-.7z" />
              </svg>
              <span className="sr-only">{n} {n === 1 ? "ster" : "sterren"}</span>
            </label>
          ))}
        </div>
        <span className="text-sm text-stone-600" aria-live="polite">{LABELS[shown]}</span>
      </div>
    </fieldset>
  );
}

/** Review schrijven na afronding van een klus. TODO: POST naar /api/reviews. */
export function ReviewForm({ companyName, jobTitle }: { companyName: string; jobTitle: string }) {
  const [rating, setRating] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];
    if (!rating) errs.push("Geef een totaalscore.");
    if (ASPECTS.some((a) => !scores[a.key])) errs.push("Geef een score voor elk onderdeel.");
    if (text.trim().length < 20) errs.push("Schrijf minimaal een paar zinnen over je ervaring.");
    setErrors(errs);
    if (!errs.length) setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="p-5">
        <p className="font-semibold">Bedankt voor je beoordeling!</p>
        <p className="mt-1 text-stone-600">Je review voor {companyName} wordt na een korte controle op het profiel geplaatst. Je kunt hem de komende 14 dagen nog aanpassen.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6 p-5">
      <StarInput name="totaal" label={`Hoe tevreden ben je over ${companyName}?`} value={rating} onChange={setRating} large />
      <div className="grid gap-4 sm:grid-cols-2">
        {ASPECTS.map((a) => (
          <StarInput key={a.key} name={a.key} label={a.label} value={scores[a.key] ?? 0} onChange={(v) => setScores((s) => ({ ...s, [a.key]: v }))} />
        ))}
      </div>
      <div>
        <label htmlFor="review-tekst" className="label">Je ervaring</label>
        <textarea
          id="review-tekst"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Hoe ging het met “${jobTitle}”? Wat ging goed en wat kon beter?`}
          className="input min-h-32 resize-y"
        />
        <p className="mt-1.5 text-sm text-stone-500">Je review verschijnt met je voornaam, de eerste letter van je achternaam en je woonplaats.</p>
      </div>
      {errors.length > 0 && (
        <ul role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {errors.map((e) => <li key={e}>{e}</li>)}
        </ul>
      )}
      <Button type="submit" size="lg">Review plaatsen</Button>
    </form>
  );
}
