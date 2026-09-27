"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

/** Interesse tonen / reageren op een opdracht. TODO: POST naar /api/klussen/[id]/reacties. */
export function RespondPanel({ customerFirstName, existing }: { customerFirstName: string; existing?: string }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<string | undefined>(existing);
  const [error, setError] = useState("");

  if (sent) {
    return (
      <div className="p-5">
        <p className="font-semibold text-brand-800">Je hebt gereageerd op deze opdracht</p>
        <p className="mt-3 rounded-lg bg-stone-50 p-4 text-[0.9375rem] leading-relaxed text-stone-700">{sent}</p>
        <ButtonLink href="/mijn-bedrijf/berichten" variant="secondary" className="mt-4">Naar berichten</ButtonLink>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="space-y-4 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (message.trim().length < 20) {
          setError("Schrijf een persoonlijk bericht van minimaal 20 tekens.");
          return;
        }
        setError("");
        setSent(message.trim());
      }}
    >
      <div>
        <label htmlFor="reactie" className="label">Bericht aan {customerFirstName}</label>
        <textarea
          id="reactie"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(error)}
          placeholder="Stel jezelf kort voor, vertel waarom je bij deze klus past en stel eventueel een vraag of stel een moment voor om te komen kijken."
          className="input min-h-36 resize-y"
        />
        {error ? <p className="mt-1.5 text-sm text-red-700">{error}</p> : <p className="mt-1.5 text-sm text-stone-500">Een persoonlijk bericht werkt beter dan een standaardtekst.</p>}
      </div>
      <Button type="submit" size="lg" className="w-full">Interesse tonen</Button>
    </form>
  );
}
