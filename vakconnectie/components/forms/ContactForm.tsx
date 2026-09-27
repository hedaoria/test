"use client";

import { useState } from "react";
import { SendButtons } from "@/components/forms/SendButtons";
import { composeMessage } from "@/lib/contact";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Contactformulier dat, net als de aanvraag, via WhatsApp of e-mail wordt verstuurd. */
export function ContactForm({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.contactForm;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const text = composeMessage(t.intro, [[t.name, name], [t.message, message]]);

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()} className="card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="c-naam" className="label">{t.name}</label>
        <input id="c-naam" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="input" />
      </div>
      <div>
        <label htmlFor="c-bericht" className="label">{t.message}</label>
        <textarea id="c-bericht" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="input min-h-36 resize-y" aria-invalid={Boolean(error)} />
        {error && <p role="alert" className="mt-1.5 text-sm text-red-700">{error}</p>}
      </div>
      <SendButtons
        locale={locale}
        message={text}
        subject={t.subject}
        onBeforeSend={() => {
          if (message.trim().length < 5) {
            setError(d.validation.message);
            return false;
          }
          setError("");
          return true;
        }}
        onSent={() => setSent(true)}
      />
      <p className="text-sm text-stone-500" role={sent ? "status" : undefined}>
        {sent ? t.sent : t.idle}
      </p>
    </form>
  );
}
