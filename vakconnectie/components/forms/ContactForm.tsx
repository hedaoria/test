"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EMAIL_PATTERN } from "@/lib/validation";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? "").trim(),
    };
    const next: Errors = {};
    if (data.name.length < 2) next.name = "Vul je naam in.";
    if (!EMAIL_PATTERN.test(data.email)) next.email = "Vul een geldig e-mailadres in.";
    if (data.message.length < 10) next.message = "Schrijf een bericht van minimaal 10 tekens.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => null);
    setStatus(res?.ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div className="card p-6 sm:p-8" role="status">
        <h2 className="text-xl font-semibold">Bedankt voor je bericht</h2>
        <p className="mt-2 text-stone-600">We reageren binnen twee werkdagen per e-mail.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-naam" className="label">Naam</label>
          <input id="c-naam" name="name" autoComplete="name" className="input" aria-invalid={Boolean(errors.name)} />
          {errors.name && <p className="mt-1.5 text-sm text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="label">E-mailadres</label>
          <input id="c-email" name="email" type="email" autoComplete="email" className="input" aria-invalid={Boolean(errors.email)} />
          {errors.email && <p className="mt-1.5 text-sm text-red-700">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="c-onderwerp" className="label">Onderwerp</label>
        <select id="c-onderwerp" name="subject" className="input">
          <option>Vraag over mijn klus</option>
          <option>Vraag over mijn account</option>
          <option>Aanmelden als vakman</option>
          <option>Een review of profiel melden</option>
          <option>Iets anders</option>
        </select>
      </div>
      <div>
        <label htmlFor="c-bericht" className="label">Bericht</label>
        <textarea id="c-bericht" name="message" rows={6} className="input min-h-36 resize-y" aria-invalid={Boolean(errors.message)} />
        {errors.message && <p className="mt-1.5 text-sm text-red-700">{errors.message}</p>}
      </div>
      {status === "error" && <p role="alert" className="text-sm text-red-700">Versturen is niet gelukt. Probeer het later opnieuw.</p>}
      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Bezig…" : "Versturen"}
      </Button>
    </form>
  );
}
