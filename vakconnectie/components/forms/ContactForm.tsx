"use client";

import { useState } from "react";
import { SendButtons } from "@/components/forms/SendButtons";
import { composeMessage } from "@/lib/contact";

/** Contactformulier dat, net als de aanvraag, via WhatsApp of e-mail wordt verstuurd. */
export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const text = composeMessage("Hallo Vakconnectie,", [["Naam", name], ["Bericht", message]]);

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()} className="card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="c-naam" className="label">Naam</label>
        <input id="c-naam" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="input" />
      </div>
      <div>
        <label htmlFor="c-bericht" className="label">Bericht</label>
        <textarea id="c-bericht" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="input min-h-36 resize-y" aria-invalid={Boolean(error)} />
        {error && <p role="alert" className="mt-1.5 text-sm text-red-700">{error}</p>}
      </div>
      <SendButtons
        message={text}
        subject="Vraag via vakconnectie.nl"
        onBeforeSend={() => {
          if (message.trim().length < 5) {
            setError("Schrijf eerst je bericht.");
            return false;
          }
          setError("");
          return true;
        }}
        onSent={() => setSent(true)}
      />
      <p className="text-sm text-stone-500" role={sent ? "status" : undefined}>
        {sent
          ? "Je WhatsApp of e-mailprogramma is geopend. Verstuur het bericht om het bij ons te laten aankomen."
          : "Je eigen WhatsApp of e-mailprogramma opent met je bericht. Er wordt niets verstuurd voordat je dat zelf doet."}
      </p>
    </form>
  );
}
