"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Check, ImagePlus, X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { categories, getCategory } from "@/lib/data/categories";
import { TIMING_LABELS } from "@/lib/data/jobs";
import { isValidPostcode, normalizePostcode, placeFromPostcode } from "@/lib/geo";
import { TIMINGS, validateJobStep, type JobErrors, type JobInput } from "@/lib/validation";

const STEPS = [
  "Wat voor klus wil je laten uitvoeren?",
  "Vertel meer over de opdracht",
  "Waar moet de klus worden uitgevoerd?",
  "Wanneer wil je dat de klus wordt uitgevoerd?",
  "Foto’s toevoegen",
  "Je contactgegevens",
  "Controleer je klus",
];

const TIMING_HINTS: Record<string, string> = {
  "zo-snel-mogelijk": "Bij spoed of een probleem dat niet kan wachten.",
  "binnen-weken": "Je wilt binnenkort beginnen.",
  "binnen-maanden": "Je oriënteert je en plant vooruit.",
  "in-overleg": "De planning bespreek je met de vakman.",
};

const MAX_PHOTOS = 6;

interface PhotoItem {
  name: string;
  url: string;
}

export function JobWizard({
  initialCategory,
  initialTitle,
  invitedProfessional,
}: {
  initialCategory?: string;
  initialTitle?: string;
  invitedProfessional?: { slug: string; companyName: string };
}) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<JobInput>({
    category: initialCategory && getCategory(initialCategory) ? initialCategory : "",
    title: initialTitle ?? "",
    description: "",
    postcode: "",
    houseNumber: "",
    timing: "",
    photos: [],
    name: "",
    email: "",
    phone: "",
    createAccount: true,
    password: "",
    invitedProfessional: invitedProfessional?.slug,
  });
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [errors, setErrors] = useState<JobErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [jobId, setJobId] = useState<string>();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [step, status]);

  // Object-URL's opruimen bij verlaten van de pagina.
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

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

  function addPhotos(files: FileList | null) {
    if (!files) return;
    const room = MAX_PHOTOS - photos.length;
    const added = Array.from(files)
      .filter((f) => f.type.startsWith("image/") && f.size <= 10 * 1024 * 1024)
      .slice(0, room)
      .map((f) => ({ name: f.name, url: URL.createObjectURL(f) }));
    setPhotos((p) => [...p, ...added]);
  }

  function removePhoto(i: number) {
    setPhotos((p) => {
      URL.revokeObjectURL(p[i]!.url);
      return p.filter((_, idx) => idx !== i);
    });
  }

  async function submit() {
    setStatus("sending");
    try {
      const res = await fetch("/api/klussen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, photos: photos.map((p) => p.name) }),
      });
      const data = (await res.json()) as { id?: string; errors?: JobErrors };
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        return;
      }
      setJobId(data.id);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const category = getCategory(values.category);
  const place = isValidPostcode(values.postcode) ? placeFromPostcode(values.postcode) : undefined;

  if (status === "done") {
    return (
      <div className="card mx-auto max-w-2xl p-6 text-center sm:p-10">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-semibold outline-none">
          Je klus is geplaatst
        </h2>
        <p className="mx-auto mt-3 max-w-md text-stone-600">
          {values.createAccount
            ? `We hebben een e-mail gestuurd naar ${values.email}. Bevestig je e-mailadres, dan wordt je klus zichtbaar voor vakmensen in de buurt.`
            : `We hebben een bevestiging gestuurd naar ${values.email}. Je krijgt een e-mail zodra een vakman reageert.`}
        </p>
        {jobId && <p className="mt-2 text-sm text-stone-500">Klusnummer: {jobId}</p>}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/account" size="lg">Naar mijn klussen</ButtonLink>
          <ButtonLink href="/" variant="secondary" size="lg">Terug naar home</ButtonLink>
        </div>
      </div>
    );
  }

  const isSummary = step === STEPS.length;

  return (
    <div className="mx-auto max-w-2xl">
      {invitedProfessional && (
        <p className="mb-5 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-900">
          Je nodigt <strong>{invitedProfessional.companyName}</strong> uit voor deze klus. Andere vakmensen uit de buurt
          kunnen ook reageren.
        </p>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-stone-700">
            {isSummary ? "Overzicht" : `Stap ${step} van ${STEPS.length - 1}`}
          </span>
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
          if (isSummary) void submit();
          else next();
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
                    "flex min-h-14 cursor-pointer items-center rounded-lg border px-3 py-3 text-[0.9375rem] sm:px-4 font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600",
                    values.category === c.slug
                      ? "border-brand-600 bg-brand-50 text-brand-900"
                      : "border-stone-300 hover:border-stone-400",
                  )}
                >
                  <input
                    type="radio"
                    name="category"
                    value={c.slug}
                    checked={values.category === c.slug}
                    onChange={() => set("category", c.slug)}
                    className="sr-only"
                  />
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
              <label htmlFor="titel" className="label">Titel van je klus</label>
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
                maxLength={2000}
              />
              <FieldError message={errors.description} />
              <p id="omschrijving-hulp" className="mt-1.5 text-sm text-stone-500">
                Hoe duidelijker je omschrijving, hoe beter vakmensen kunnen reageren.
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
                  placeholder="1234 AB"
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
                  inputMode="text"
                  autoComplete="address-line2"
                  className="input"
                  aria-invalid={Boolean(errors.houseNumber)}
                  maxLength={10}
                />
              </div>
            </div>
            <FieldError message={errors.postcode ?? errors.houseNumber} />
            {place && <p className="mt-3 text-sm text-stone-700">Regio: <strong>{place}</strong></p>}
            <p className="mt-4 rounded-lg bg-stone-50 px-4 py-3 text-sm text-stone-600">
              Vakmensen zien alleen je postcodegebied en plaats. Je volledige adres deel je pas met de vakman die je kiest.
            </p>
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
                  <input
                    type="radio"
                    name="timing"
                    value={t}
                    checked={values.timing === t}
                    onChange={() => set("timing", t)}
                    className="mt-1 h-4 w-4 accent-brand-700"
                  />
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
          <div className="mt-6">
            <p className="text-stone-600">
              Foto&apos;s helpen vakmensen om je klus goed in te schatten. Dit is niet verplicht.
            </p>
            <ul className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
              {photos.map((p, i) => (
                <li key={p.url} className="group relative aspect-square overflow-hidden rounded-lg bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element -- lokale voorvertoning via object-URL */}
                  <img src={p.url} alt={`Foto ${i + 1}: ${p.name}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    aria-label={`Verwijder ${p.name}`}
                    className="absolute right-1.5 top-1.5 rounded-full bg-white/90 p-1 text-stone-700 shadow hover:bg-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
              {photos.length < MAX_PHOTOS && (
                <li>
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-stone-300 text-sm font-medium text-stone-600 transition-colors hover:border-brand-600 hover:text-brand-700 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600">
                    <ImagePlus className="h-6 w-6" aria-hidden="true" />
                    Toevoegen
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }} />
                  </label>
                </li>
              )}
            </ul>
            <p className="mt-3 text-sm text-stone-500">Maximaal {MAX_PHOTOS} foto&apos;s van elk maximaal 10 MB.</p>
          </div>
        )}

        {step === 6 && (
          <div className="mt-6 space-y-5">
            <p className="text-sm text-stone-600">
              Heb je al een account?{" "}
              <Link href="/inloggen?volgende=/klus-plaatsen" className="font-semibold text-brand-700 hover:underline">Inloggen</Link>
            </p>
            <Field id="naam" label="Naam" error={errors.name}>
              <input id="naam" value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className="input" aria-invalid={Boolean(errors.name)} />
            </Field>
            <Field id="email" label="E-mailadres" error={errors.email}>
              <input id="email" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className="input" aria-invalid={Boolean(errors.email)} />
            </Field>
            <Field id="telefoon" label="Telefoonnummer (optioneel)" error={errors.phone} hint="Alleen zichtbaar voor de vakman die jij kiest.">
              <input id="telefoon" type="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className="input" aria-invalid={Boolean(errors.phone)} />
            </Field>
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={values.createAccount} onChange={(e) => set("createAccount", e.target.checked)} className="mt-1 h-4 w-4 accent-brand-700" />
              <span>
                <span className="block font-medium text-stone-900">Maak meteen een account aan</span>
                <span className="block text-sm text-stone-600">Zo kun je reacties bekijken, berichten sturen en later een review schrijven.</span>
              </span>
            </label>
            {values.createAccount && (
              <Field id="wachtwoord" label="Kies een wachtwoord" error={errors.password} hint="Minimaal 8 tekens.">
                <input id="wachtwoord" type="password" value={values.password} onChange={(e) => set("password", e.target.value)} autoComplete="new-password" className="input" aria-invalid={Boolean(errors.password)} />
              </Field>
            )}
          </div>
        )}

        {isSummary && (
          <dl className="mt-6 divide-y divide-stone-200 rounded-xl border border-stone-200">
            <SummaryRow label="Vakgebied" onEdit={() => setStep(1)}>{category?.name}</SummaryRow>
            <SummaryRow label="Klus" onEdit={() => setStep(2)}>
              <span className="font-medium">{values.title}</span>
              <span className="mt-1 block whitespace-pre-line text-stone-600">{values.description}</span>
            </SummaryRow>
            <SummaryRow label="Locatie" onEdit={() => setStep(3)}>
              {normalizePostcode(values.postcode)} {values.houseNumber}
              {place ? `, ${place}` : ""}
            </SummaryRow>
            <SummaryRow label="Planning" onEdit={() => setStep(4)}>{values.timing && TIMING_LABELS[values.timing]}</SummaryRow>
            <SummaryRow label="Foto's" onEdit={() => setStep(5)}>
              {photos.length ? `${photos.length} toegevoegd` : "Geen foto's"}
            </SummaryRow>
            <SummaryRow label="Contact" onEdit={() => setStep(6)}>
              {values.name}, {values.email}
              {values.phone ? `, ${values.phone}` : ""}
            </SummaryRow>
          </dl>
        )}

        {status === "error" && (
          <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            Het plaatsen is niet gelukt. Controleer je gegevens en probeer het opnieuw.
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step === 5 && photos.length === 0 ? (
            <button type="button" onClick={() => setStep(6)} className="h-12 font-medium text-stone-600 hover:text-stone-900">
              Overslaan
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "sending"}>
            {isSummary ? (status === "sending" ? "Bezig met plaatsen…" : "Klus plaatsen") : step === 6 ? "Naar overzicht" : "Volgende"}
          </Button>
        </div>
        {isSummary && (
          <p className="mt-4 text-center text-sm text-stone-500 sm:text-right">
            Door je klus te plaatsen ga je akkoord met de{" "}
            <Link href="/algemene-voorwaarden" className="underline">algemene voorwaarden</Link>.
          </p>
        )}
      </form>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p role="alert" className="mt-1.5 text-sm text-red-700">{message}</p>;
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error ? <FieldError message={error} /> : hint && <p className="mt-1.5 text-sm text-stone-500">{hint}</p>}
    </div>
  );
}

function SummaryRow({ label, onEdit, children }: { label: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 p-4 sm:grid-cols-[8rem_1fr_auto]">
      <dt className="text-sm font-medium text-stone-500">{label}</dt>
      <dd className="col-span-2 row-start-2 text-[0.9375rem] text-stone-900 sm:col-span-1 sm:row-start-1 sm:col-start-2">{children}</dd>
      <dd className="col-start-2 row-start-1 sm:col-start-3">
        <button type="button" onClick={onEdit} className="text-sm font-medium text-brand-700 hover:underline">
          Wijzig
        </button>
      </dd>
    </div>
  );
}
