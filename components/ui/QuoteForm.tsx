"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale } from "@/lib/site";
import { getServiceNavLinks } from "@/lib/nav";

interface Props {
  dict: Dictionary;
  locale: Locale;
  defaultService?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function QuoteForm({ dict, locale, defaultService }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.quoteForm;
  const services = getServiceNavLinks(locale);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, locale }),
      });
      if (!res.ok) throw new Error("request-failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className="mb-1.5 block text-sm font-medium text-ink-700">
            {f.name}
          </label>
          <input
            id="q-name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label htmlFor="q-phone" className="mb-1.5 block text-sm font-medium text-ink-700">
            {f.phone}
          </label>
          <input
            id="q-phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-email" className="mb-1.5 block text-sm font-medium text-ink-700">
            {f.email}
          </label>
          <input
            id="q-email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label htmlFor="q-address" className="mb-1.5 block text-sm font-medium text-ink-700">
            {f.address}
          </label>
          <input
            id="q-address"
            name="address"
            type="text"
            required
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-service" className="mb-1.5 block text-sm font-medium text-ink-700">
            {f.serviceType}
          </label>
          <select
            id="q-service"
            name="serviceType"
            defaultValue={defaultService ?? ""}
            required
            className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option value="" disabled>
              {f.serviceTypePlaceholder}
            </option>
            {services.map((s) => (
              <option key={s.href} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="q-urgency" className="mb-1.5 block text-sm font-medium text-ink-700">
            {f.urgency}
          </label>
          <select
            id="q-urgency"
            name="urgency"
            defaultValue="normal"
            className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option value="normal">{f.urgencyOptions.normal}</option>
            <option value="urgent">{f.urgencyOptions.urgent}</option>
            <option value="emergency">{f.urgencyOptions.emergency}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="q-message" className="mb-1.5 block text-sm font-medium text-ink-700">
          {f.message}
        </label>
        <textarea
          id="q-message"
          name="message"
          required
          rows={4}
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <p className="text-xs leading-relaxed text-ink-400">{f.privacyNotice}</p>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-600 disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {status === "loading" ? "..." : f.submit}
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {f.success}
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {f.error}
        </p>
      )}
    </form>
  );
}
