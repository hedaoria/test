"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { categories } from "@/lib/data/categories";
import { isValidPostcode } from "@/lib/geo";
import { EMAIL_PATTERN } from "@/lib/validation";

type Errors = Record<string, string | undefined>;
type Status = "idle" | "sending" | "done" | "error";

async function post(url: string, data: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  const body = (await res.json().catch(() => ({}))) as { error?: string; errors?: Errors };
  return { ok: res.ok, ...body };
}

function Input({
  id,
  label,
  error,
  hint,
  className,
  ...props
}: React.ComponentProps<"input"> & { id: string; label: string; error?: string; hint?: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      <input id={id} name={id} className="input" aria-invalid={Boolean(error)} {...props} />
      {error ? <p className="mt-1.5 text-sm text-red-700">{error}</p> : hint && <p className="mt-1.5 text-sm text-stone-500">{hint}</p>}
    </div>
  );
}

function FormMessage({ status, message }: { status: Status; message?: string }) {
  if (status !== "error" || !message) return null;
  return <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{message}</p>;
}

/* ---------------- Inloggen ---------------- */

export function LoginForm({ next }: { next?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("wachtwoord") ?? "");
    const errs: Errors = {};
    if (!EMAIL_PATTERN.test(email)) errs.email = "Vul een geldig e-mailadres in.";
    if (!password) errs.wachtwoord = "Vul je wachtwoord in.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    const res = await post("/api/auth/inloggen", { email, password, next });
    if (res.ok) {
      setStatus("done");
      window.location.href = next ?? "/account";
    } else {
      setStatus("error");
      setMessage(res.error ?? "Inloggen is niet gelukt.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Input id="email" label="E-mailadres" type="email" autoComplete="email" error={errors.email} />
      <div>
        <Input id="wachtwoord" label="Wachtwoord" type="password" autoComplete="current-password" error={errors.wachtwoord} />
        <Link href="/wachtwoord-vergeten" className="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline">
          Wachtwoord vergeten?
        </Link>
      </div>
      <FormMessage status={status} message={message} />
      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Bezig…" : "Inloggen"}
      </Button>
    </form>
  );
}

/* ---------------- Registreren ---------------- */

export function RegisterForm({ role }: { role: "klant" | "vakman" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string>();
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Errors = {};
    if ((f.voornaam ?? "").trim().length < 2) errs.voornaam = "Vul je voornaam in.";
    if ((f.achternaam ?? "").trim().length < 2) errs.achternaam = "Vul je achternaam in.";
    if (!EMAIL_PATTERN.test((f.email ?? "").trim())) errs.email = "Vul een geldig e-mailadres in.";
    if ((f.wachtwoord ?? "").length < 8) errs.wachtwoord = "Kies een wachtwoord van minimaal 8 tekens.";
    if (role === "vakman") {
      if ((f.bedrijfsnaam ?? "").trim().length < 2) errs.bedrijfsnaam = "Vul je bedrijfsnaam in.";
      if (!/^\d{8}$/.test((f.kvk ?? "").trim())) errs.kvk = "Een KvK-nummer bestaat uit 8 cijfers.";
      if (!f.vakgebied) errs.vakgebied = "Kies je hoofdvakgebied.";
      if (!isValidPostcode(f.postcode ?? "")) errs.postcode = "Vul een geldige postcode in.";
    }
    if (!f.voorwaarden) errs.voorwaarden = "Ga akkoord met de voorwaarden om verder te gaan.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    const res = await post("/api/auth/registreren", { ...f, rol: role });
    if (res.ok) {
      setEmail(f.email!.trim());
      setStatus("done");
    } else {
      setErrors(res.errors ?? {});
      setMessage(res.error ?? "Registreren is niet gelukt.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status">
        <h2 className="text-xl font-semibold">Bevestig je e-mailadres</h2>
        <p className="mt-2 leading-relaxed text-stone-600">
          We hebben een e-mail gestuurd naar <strong>{email}</strong>. Klik op de link in die e-mail om je account te
          activeren.
          {role === "vakman" && " Daarna controleren we je KvK-inschrijving."}
        </p>
        <p className="mt-4 text-sm text-stone-500">Geen e-mail ontvangen? Kijk ook in je map met ongewenste e-mail.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="voornaam" label="Voornaam" autoComplete="given-name" error={errors.voornaam} />
        <Input id="achternaam" label="Achternaam" autoComplete="family-name" error={errors.achternaam} />
      </div>
      {role === "vakman" && (
        <>
          <Input id="bedrijfsnaam" label="Bedrijfsnaam" autoComplete="organization" error={errors.bedrijfsnaam} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="kvk" label="KvK-nummer" inputMode="numeric" maxLength={8} error={errors.kvk} />
            <Input id="postcode" label="Postcode vestiging" autoComplete="postal-code" maxLength={7} error={errors.postcode} />
          </div>
          <div>
            <label htmlFor="vakgebied" className="label">Hoofdvakgebied</label>
            <select id="vakgebied" name="vakgebied" defaultValue="" className="input" aria-invalid={Boolean(errors.vakgebied)}>
              <option value="" disabled>Kies een vakgebied</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
            {errors.vakgebied && <p className="mt-1.5 text-sm text-red-700">{errors.vakgebied}</p>}
          </div>
        </>
      )}
      <Input id="email" label="E-mailadres" type="email" autoComplete="email" error={errors.email} />
      <Input id="wachtwoord" label="Wachtwoord" type="password" autoComplete="new-password" error={errors.wachtwoord} hint="Minimaal 8 tekens." />
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-stone-700">
          <input type="checkbox" name="voorwaarden" value="ja" className="mt-1 h-4 w-4 accent-brand-500" />
          <span>
            Ik ga akkoord met de <Link href="/algemene-voorwaarden" className="underline">algemene voorwaarden</Link> en het{" "}
            <Link href="/privacybeleid" className="underline">privacybeleid</Link>.
          </span>
        </label>
        {errors.voorwaarden && <p className="mt-1.5 text-sm text-red-700">{errors.voorwaarden}</p>}
      </div>
      <FormMessage status={status} message={message} />
      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Bezig…" : role === "vakman" ? "Aanmelden als vakman" : "Account aanmaken"}
      </Button>
    </form>
  );
}

export function RoleTabs({ role }: { role: "klant" | "vakman" }) {
  return (
    <div className="grid grid-cols-2 rounded-lg bg-stone-100 p-1" role="tablist" aria-label="Soort account">
      {(["klant", "vakman"] as const).map((r) => (
        <Link
          key={r}
          href={r === "klant" ? "/registreren" : "/registreren?rol=vakman"}
          role="tab"
          aria-selected={role === r}
          replace
          scroll={false}
          className={clsx(
            "rounded-md px-3 py-2.5 text-center text-sm font-semibold transition-colors",
            role === r ? "bg-white text-stone-950 shadow-sm" : "text-stone-600 hover:text-stone-900",
          )}
        >
          {r === "klant" ? "Ik zoek een vakman" : "Ik ben vakman"}
        </Link>
      ))}
    </div>
  );
}

/* ---------------- Wachtwoord ---------------- */

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!EMAIL_PATTERN.test(email)) {
      setError("Vul een geldig e-mailadres in.");
      return;
    }
    setError(undefined);
    setStatus("sending");
    await post("/api/auth/wachtwoord-vergeten", { email }).catch(() => null);
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p role="status" className="leading-relaxed text-stone-700">
        Als er een account bij dit e-mailadres hoort, ontvang je binnen een paar minuten een e-mail met een link om een
        nieuw wachtwoord in te stellen.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Input id="email" label="E-mailadres" type="email" autoComplete="email" error={error} />
      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
        Herstellink versturen
      </Button>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = String(f.get("wachtwoord") ?? "");
    const repeat = String(f.get("herhaal") ?? "");
    const errs: Errors = {};
    if (password.length < 8) errs.wachtwoord = "Kies een wachtwoord van minimaal 8 tekens.";
    if (password !== repeat) errs.herhaal = "De wachtwoorden komen niet overeen.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    const res = await post("/api/auth/wachtwoord-herstellen", { token, password });
    if (res.ok) setStatus("done");
    else {
      setMessage(res.error ?? "Het herstellen is niet gelukt.");
      setStatus("error");
    }
  }

  if (!token) {
    return <p className="text-stone-700">Deze link is ongeldig of verlopen. <Link href="/wachtwoord-vergeten" className="font-semibold text-brand-700 hover:underline">Vraag een nieuwe link aan</Link>.</p>;
  }
  if (status === "done") {
    return (
      <p role="status" className="text-stone-700">
        Je wachtwoord is gewijzigd. <Link href="/inloggen" className="font-semibold text-brand-700 hover:underline">Log in</Link> met je nieuwe wachtwoord.
      </p>
    );
  }
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Input id="wachtwoord" label="Nieuw wachtwoord" type="password" autoComplete="new-password" error={errors.wachtwoord} hint="Minimaal 8 tekens." />
      <Input id="herhaal" label="Herhaal wachtwoord" type="password" autoComplete="new-password" error={errors.herhaal} />
      <FormMessage status={status} message={message} />
      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
        Wachtwoord opslaan
      </Button>
    </form>
  );
}
