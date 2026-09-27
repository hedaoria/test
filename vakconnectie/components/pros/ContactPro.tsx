"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";

/**
 * "Neem contact op": opent een berichtvenster. Contactgegevens van beide
 * partijen blijven afgeschermd; het bericht komt in het berichtensysteem.
 */
export function ContactPro({ slug, companyName, primaryCategory }: { slug: string; companyName: string; primaryCategory: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim().length < 10) {
      setError("Schrijf een kort bericht van minimaal 10 tekens.");
      return;
    }
    // TODO: POST naar /api/berichten zodra accounts gekoppeld zijn.
    setError("");
    setSent(true);
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
        <ButtonLink href={`/klus-plaatsen?vakgebied=${primaryCategory}&vakman=${slug}`} size="lg" className="w-full">
          Nodig uit voor mijn klus
        </ButtonLink>
        <Button variant="secondary" size="lg" className="w-full" onClick={() => dialog.current?.showModal()}>
          Neem contact op
        </Button>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="contact-titel"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl p-0 shadow-xl backdrop:bg-stone-950/40"
        onClose={() => setSent(false)}
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2 id="contact-titel" className="text-xl font-semibold">
              {sent ? "Bericht verstuurd" : `Bericht aan ${companyName}`}
            </h2>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Sluiten" className="-m-1 rounded-md p-1 text-stone-500 hover:bg-stone-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          {sent ? (
            <div className="mt-4">
              <p className="text-stone-700">
                {companyName} krijgt een melding van je bericht. Je vindt het antwoord straks terug bij je berichten.
              </p>
              <div className="mt-6 flex gap-3">
                <ButtonLink href="/account/berichten">Naar berichten</ButtonLink>
                <Button variant="secondary" onClick={() => dialog.current?.close()}>Sluiten</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-4" noValidate>
              <label htmlFor="contact-bericht" className="label">Je bericht</label>
              <textarea
                id="contact-bericht"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby="contact-hulp"
                placeholder="Vertel kort waar je hulp bij nodig hebt."
                className="input min-h-32 resize-y"
              />
              <p id="contact-hulp" className={error ? "mt-1.5 text-sm text-red-700" : "mt-1.5 text-sm text-stone-500"}>
                {error || "Je telefoonnummer en adres worden niet gedeeld, tenzij je dat zelf in een bericht doet."}
              </p>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-stone-500">
                  Nog geen account? <Link href="/registreren" className="font-semibold text-brand-700 hover:underline">Registreren</Link>
                </p>
                <Button type="submit">Versturen</Button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
