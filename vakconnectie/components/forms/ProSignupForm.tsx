"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SendButtons } from "@/components/forms/SendButtons";
import { categories, categoryText, localizedCategoryName } from "@/lib/data/categories";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { composeMessage } from "@/lib/contact";
import { validateProSignup, type ProSignupErrors, type ProSignupInput } from "@/lib/validation";

export function ProSignupForm({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.signupForm;
  const [v, setV] = useState<ProSignupInput>({ name: "", company: "", kvk: "", categories: [], region: "", phone: "", email: "", note: "" });
  const [errors, setErrors] = useState<ProSignupErrors>({});
  const [sentVia, setSentVia] = useState<"whatsapp" | "email">();

  function set<K extends keyof ProSignupInput>(key: K, value: ProSignupInput[K]) {
    setV((x) => ({ ...x, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e = validateProSignup(v, d.validation);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`pro-${Object.keys(e)[0]}`)?.focus();
      return false;
    }
    return true;
  }

  const f = t.fields;
  const message = composeMessage(t.messageIntro, [
    [f.name, v.name],
    [f.company, v.company],
    [f.kvk, v.kvk],
    [f.categories, v.categories.map((c) => localizedCategoryName(c, locale)).join(", ")],
    [f.region, v.region],
    [f.phone, v.phone],
    [f.email, v.email],
    [f.note, v.note],
  ]);

  if (sentVia) {
    return (
      <div className="card p-6 text-center sm:p-10">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-semibold">{t.sentTitle}</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-stone-600">
          {sentVia === "whatsapp" ? t.sentWhatsapp : t.sentEmail} {t.sentText}
        </p>
        <Button variant="secondary" size="lg" className="mt-8" onClick={() => setSentVia(undefined)}>{t.back}</Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()} className="card space-y-5 p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="pro-name" label={t.name} error={errors.name}>
          <input id="pro-name" value={v.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className="input" aria-invalid={Boolean(errors.name)} />
        </Field>
        <Field id="pro-company" label={t.company} error={errors.company}>
          <input id="pro-company" value={v.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" className="input" aria-invalid={Boolean(errors.company)} />
        </Field>
        <Field id="pro-kvk" label={t.kvk} error={errors.kvk}>
          <input id="pro-kvk" value={v.kvk} onChange={(e) => set("kvk", e.target.value.replace(/\D/g, ""))} inputMode="numeric" maxLength={8} className="input" aria-invalid={Boolean(errors.kvk)} />
        </Field>
        <Field id="pro-region" label={t.region} error={errors.region}>
          <input id="pro-region" value={v.region} onChange={(e) => set("region", e.target.value)} autoComplete="address-level2" className="input" aria-invalid={Boolean(errors.region)} />
        </Field>
      </div>

      <fieldset>
        <legend className="label">{t.categories}</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {categories.map((c) => {
            const checked = v.categories.includes(c.slug);
            return (
              <label
                key={c.slug}
                className={clsx(
                  "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[0.9375rem] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600",
                  checked ? "border-brand-600 bg-brand-50" : "border-stone-300 hover:border-stone-400",
                )}
              >
                <input
                  id={c.slug === categories[0]!.slug ? "pro-categories" : undefined}
                  type="checkbox"
                  checked={checked}
                  onChange={() => set("categories", checked ? v.categories.filter((x) => x !== c.slug) : [...v.categories, c.slug])}
                  className="h-4 w-4 accent-brand-500"
                />
                {categoryText(c, locale).name}
              </label>
            );
          })}
        </div>
        {errors.categories && <p role="alert" className="mt-1.5 text-sm text-red-700">{errors.categories}</p>}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="pro-phone" label={t.phone} error={errors.phone}>
          <input id="pro-phone" type="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className="input" aria-invalid={Boolean(errors.phone)} />
        </Field>
        <Field id="pro-email" label={t.emailOptional} error={errors.email}>
          <input id="pro-email" type="email" value={v.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className="input" aria-invalid={Boolean(errors.email)} />
        </Field>
      </div>
      <Field id="pro-note" label={t.noteOptional}>
        <textarea id="pro-note" rows={4} value={v.note} onChange={(e) => set("note", e.target.value)} placeholder={t.notePlaceholder} className="input resize-y" maxLength={800} />
      </Field>

      <SendButtons locale={locale} message={message} subject={`${t.subject}: ${v.company || v.name}`} onBeforeSend={validate} onSent={setSentVia} />
      <p className="text-sm text-stone-500">
        {t.privacyNote} <Link href={localizePath(locale, "/privacybeleid")} className="underline">{t.privacyLink}</Link>.
      </p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && <p role="alert" className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  );
}
