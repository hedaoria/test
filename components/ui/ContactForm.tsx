"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale } from "@/lib/site";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({ dict, locale }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.contactForm;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
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
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
            {f.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={f.namePlaceholder}
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">
            {f.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder={f.phonePlaceholder}
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
          {f.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={f.emailPlaceholder}
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
          {f.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={f.messagePlaceholder}
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <p className="text-xs leading-relaxed text-ink-400">{f.privacyNotice}</p>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
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
