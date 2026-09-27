"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { SendButtons } from "@/components/forms/SendButtons";
import { categories, getCategory } from "@/lib/data/categories";
import { TIMING_LABELS } from "@/lib/data/jobs";
import { isValidPostcode, normalizePostcode, placeFromPostcode } from "@/lib/geo";
import { composeMessage } from "@/lib/contact";
import { COMPANY } from "@/lib/site";
import { TIMINGS, validateJobStep, type JobErrors, type JobInput } from "@/lib/validation";

const STEPS = [
  "Wat voor klus wil je laten uitvoeren?",
  "Vertel meer over de opdracht",
  "Waar moet de klus worden uitgevoerd?",
  "Wanneer wil je dat de klus wordt uitgevoerd?",
  "Foto’s",
  "Je contactgegevens",
  "Controleer en verstuur je aanvraag",
];

const TIMING_HINTS: Record<string, string> = {
  "zo-snel-mogelijk": "Bij spoed of een probleem dat niet kan wachten.",
  "binnen-weken": "Je wilt binnenkort beginnen.",
  "binnen-maanden": "Je oriënteert je en plant vooruit.",
  "in-overleg": "De planning bespreek je met de vakman.",
};

export function JobWizard({
  initialCategory,
  initialTitle,
  preferredProfessional,
}: {
  initialCategory?: string;
  initialTitle?: string;
  preferredProfessional?: string;
}) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<JobInput>({
    category: initialCategory && getCategory(initialCategory) ? initialCategory : "",
    title: initialTitle ?? "",
    description: "",
    postcode: "",
    houseNumber: "",
    timing: "",
    hasPhotos: false,
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<JobErrors>({});
  const [sentVia, setSentVia] = useState<"whatsapp" | "email">();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [step, sentVia]);

  function set<K extends keyof JobInput>(key: K, value: JobInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function next() {
    const e = validateJobStep(step, values);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(s + 1, STEPS.length));
  }

  function back() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  const category = getCategory(values.category);
  const place = isValidPostcode(values.postcode) ? placeFromPostcode(values.postcode) : undefined;
  const isSummary = step === STEPS.length;

  const message = composeMessage("Hallo Vakconnectie, hierbij mijn projectaanvraag.", [
    ["Vakgebied", category?.name],
    ["Project", values.title],
    ["Omschrijving", values.description],
    ["Adres", `${normalizePostcode(values.postcode)} ${values.houseNumber}${place ? `, ${place}` : ""}`],
    ["Planning", values.timing ? TIMING_LABELS[values.timing] : undefined],
    ["Foto's", values.hasPhotos ? "Ik stuur foto's mee in dit gesprek." : undefined],
    ["Voorkeur voor vakman", preferredProfessional],
    ["Naam", values.name],
    ["Telefoon", values.phone],
    ["E-mail", values.email],
  ]);

  if (sentVia) {
    return (
      <div className="card mx-auto max-w-2xl p-6 text-center sm:p-10">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-semibold outline-none">
          Nog één stap: verstuur het bericht
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-stone-600">
          {sentVia === "whatsapp"
            ? "WhatsApp is geopend met je aanvraag. Verstuur het bericht daar om je aanvraag bij ons af te ronden."
            : "Je e-mailprogramma is geopend met je aanvraag. Verstuur de e-mail om je aanvraag bij ons af te ronden."}
          {values.hasPhotos && " Voeg je foto’s toe aan hetzelfde bericht of stuur ze direct erachteraan."}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone-500">
          Opende er niets? Stuur je aanvraag dan naar{" "}
          <a href={`mailto:${COMPANY.email}`} className="font-medium text-brand-700 hover:underline">{COMPANY.email}</a>.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="secondary" size="lg" onClick={() => setSentVia(undefined)}>Terug naar mijn aanvraag</Button>
          <ButtonLink href="/" variant="ghost" size="lg">Naar de homepage</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {preferredProfessional && (
        <p className="mb-5 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-900">
          Je aanvraag vermeldt dat je voorkeur hebt voor <strong>{preferredProfessional}</strong>.
        </p>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-stone-700">{isSummary ? "Overzicht" : `Stap ${step} van ${STEPS.length - 1}`}</span>
          {step > 1 && (
            <button type="button" onClick={back} className="font-medium text-brand-700 hover:underline">
              ← Vorige
            </button>
          )}
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200" aria-hidden="true">
          <div className="h-full rounded-full bg-brand-600 transition-[width] duration-300" style={{ width: `${(step / STEPS.length) * 100}%` }} />
        </div>
      </div>

      <form
        className="card p-5 sm:p-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!isSummary) next();
        }}
      >
        <h2 ref={headingRef} tabIndex={-1} className="text-xl font-semibold outline-none sm:text-2xl">
          {STEPS[step - 1]}
        </h2>

        {step === 1 && (
          <fieldset className="mt-6">
            <legend className="sr-only">Kies een vakgebied</legend>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {categories.map((c) => (
                <label
                  key={c.slug}
                  className={clsx(
                    "flex min-h-14 cursor-pointer items-center rounded-lg border px-3 py-3 text-[0.9375rem] font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600 sm:px-4",
                    values.category === c.slug ? "border-brand-600 bg-brand-50 text-brand-900" : "border-stone-300 hover:border-stone-400",
                  )}
                >
                  <input type="radio" name="category" value={c.slug} checked={values.category === c.slug} onChange={() => set("category", c.slug)} className="sr-only" />
                  {c.name}
                </label>
              ))}
            </div>
            <FieldError message={errors.category} />
          </fieldset>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="titel" className="label">Titel van je project</label>
              <input
                id="titel"
                value={values.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder={category ? `Bijv. ${category.commonJobs[0]}` : "Bijv. badkamer renoveren"}
                className="input"
                aria-invalid={Boolean(errors.title)}
                maxLength={80}
              />
              <FieldError message={errors.title} />
              {category && !values.title && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {category.commonJobs.slice(0, 4).map((j) => (
                    <button key={j} type="button" onClick={() => set("title", j)} className="rounded-full border border-stone-300 px-3 py-1 text-sm text-stone-700 hover:border-brand-600 hover:text-brand-700">
                      {j}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="omschrijving" className="label">Omschrijving</label>
              <textarea
                id="omschrijving"
                rows={6}
                value={values.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Wat is de huidige situatie en wat wil je laten doen? Noem ook de afmetingen als je die weet."
                className="input min-h-36 resize-y"
                aria-invalid={Boolean(errors.description)}
                aria-describedby="omschrijving-hulp"
                maxLength={1500}
              />
              <FieldError message={errors.description} />
              <p id="omschrijving-hulp" className="mt-1.5 text-sm text-stone-500">
                Hoe duidelijker je omschrijving, hoe beter we een passende vakman kunnen zoeken.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6">
            <div className="grid grid-cols-[1.4fr_1fr] gap-3">
              <div>
                <label htmlFor="postcode" className="label">Postcode</label>
                <input
                  id="postcode"
                  value={values.postcode}
                  onChange={(e) => set("postcode", e.target.value)}
                  onBlur={(e) => set("postcode", normalizePostcode(e.target.value))}
                  placeholder="2011 AB"
                  autoComplete="postal-code"
                  className="input uppercase"
                  aria-invalid={Boolean(errors.postcode)}
                  maxLength={7}
                />
              </div>
              <div>
                <label htmlFor="huisnummer" className="label">Huisnummer</label>
                <input
                  id="huisnummer"
                  value={values.houseNumber}
                  onChange={(e) => set("houseNumber", e.target.value)}
                  placeholder="12"
                  autoComplete="address-line2"
                  className="input"
                  aria-invalid={Boolean(errors.houseNumber)}
                  maxLength={10}
                />
              </div>
            </div>
            <FieldError message={errors.postcode ?? errors.houseNumber} />
            {place && <p className="mt-3 text-sm text-stone-700">Regio: <strong>{place}</strong></p>}
          </div>
        )}

        {step === 4 && (
          <fieldset className="mt-6">
            <legend className="sr-only">Planning</legend>
            <div className="grid gap-2.5">
              {TIMINGS.map((t) => (
                <label
                  key={t}
                  className={clsx(
                    "flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600",
                    values.timing === t ? "border-brand-600 bg-brand-50" : "border-stone-300 hover:border-stone-400",
                  )}
                >
                  <input type="radio" name="timing" value={t} checked={values.timing === t} onChange={() => set("timing", t)} className="mt-1 h-4 w-4 accent-brand-700" />
                  <span>
                    <span className="block font-medium text-stone-900">{TIMING_LABELS[t]}</span>
                    <span className="block text-sm text-stone-600">{TIMING_HINTS[t]}</span>
                  </span>
                </label>
              ))}
            </div>
            <FieldError message={errors.timing} />
          </fieldset>
        )}

        {step === 5 && (
          <fieldset className="mt-6">
            <legend className="text-stone-600">
              Foto’s helpen om je project goed in te schatten. Je kunt ze toevoegen aan je WhatsApp-bericht of e-mail,
              direct nadat je je aanvraag verstuurt.
            </legend>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {[
                { v: true, label: "Ja, ik stuur foto’s mee" },
                { v: false, label: "Nee, geen foto’s" },
              ].map((o) => (
                <label
                  key={String(o.v)}
                  className={clsx(
                    "flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600",
                    values.hasPhotos === o.v ? "border-brand-600 bg-brand-50" : "border-stone-300 hover:border-stone-400",
                  )}
                >
                  <input type="radio" name="fotos" checked={values.hasPhotos === o.v} onChange={() => set("hasPhotos", o.v)} className="h-4 w-4 accent-brand-700" />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 6 && (
          <div className="mt-6 space-y-5">
            <Field id="naam" label="Naam" error={errors.name}>
              <input id="naam" value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className="input" aria-invalid={Boolean(errors.name)} />
            </Field>
            <Field id="telefoon" label="Telefoonnummer" error={errors.phone}>
              <input id="telefoon" type="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className="input" aria-invalid={Boolean(errors.phone)} />
            </Field>
            <Field id="email" label="E-mailadres" error={errors.email}>
              <input id="email" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className="input" aria-invalid={Boolean(errors.email)} />
            </Field>
            <p className="text-sm text-stone-500">Vul minimaal een telefoonnummer of e-mailadres in, zodat we contact met je kunnen opnemen.</p>
          </div>
        )}

        {isSummary && (
          <>
            <dl className="mt-6 divide-y divide-stone-200 rounded-xl border border-stone-200">
              <SummaryRow label="Vakgebied" onEdit={() => setStep(1)}>{category?.name}</SummaryRow>
              <SummaryRow label="Project" onEdit={() => setStep(2)}>
                <span className="font-medium">{values.title}</span>
                <span className="mt-1 block whitespace-pre-line text-stone-600">{values.description}</span>
              </SummaryRow>
              <SummaryRow label="Locatie" onEdit={() => setStep(3)}>
                {normalizePostcode(values.postcode)} {values.houseNumber}
                {place ? `, ${place}` : ""}
              </SummaryRow>
              <SummaryRow label="Planning" onEdit={() => setStep(4)}>{values.timing && TIMING_LABELS[values.timing]}</SummaryRow>
              <SummaryRow label="Foto's" onEdit={() => setStep(5)}>{values.hasPhotos ? "Stuur ik mee" : "Geen foto's"}</SummaryRow>
              <SummaryRow label="Contact" onEdit={() => setStep(6)}>
                {[values.name, values.phone, values.email].filter(Boolean).join(", ")}
              </SummaryRow>
            </dl>
            <div className="mt-6 rounded-lg bg-stone-50 p-4 text-sm leading-relaxed text-stone-600">
              Je projectaanvraag is gratis en vrijblijvend. Als je op een van de knoppen klikt, opent je eigen WhatsApp of
              e-mailprogramma met dit overzicht als bericht. Pas als je dat bericht verstuurt, ontvangen wij je aanvraag.
            </div>
            <SendButtons className="mt-6" message={message} subject={`Projectaanvraag: ${values.title}`} onSent={setSentVia} />
            <p className="mt-4 text-center text-sm text-stone-500 sm:text-left">
              Lees in ons <Link href="/privacybeleid" className="underline">privacybeleid</Link> hoe we met je gegevens omgaan.
            </p>
          </>
        )}

        {!isSummary && (
          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              {step === 6 ? "Naar overzicht" : "Volgende"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p role="alert" className="mt-1.5 text-sm text-red-700">{message}</p>;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

function SummaryRow({ label, onEdit, children }: { label: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 p-4 sm:grid-cols-[8rem_1fr_auto]">
      <dt className="text-sm font-medium text-stone-500">{label}</dt>
      <dd className="col-span-2 row-start-2 text-[0.9375rem] text-stone-900 sm:col-span-1 sm:col-start-2 sm:row-start-1">{children}</dd>
      <dd className="col-start-2 row-start-1 sm:col-start-3">
        <button type="button" onClick={onEdit} className="text-sm font-medium text-brand-700 hover:underline">Wijzig</button>
      </dd>
    </div>
  );
}
