import { NextResponse } from "next/server";
import { getCategory } from "@/lib/data/categories";
import { isValidPostcode } from "@/lib/geo";
import { EMAIL_PATTERN } from "@/lib/validation";

/**
 * POST /api/auth/registreren
 * Valideert de registratie voor opdrachtgevers en vakmensen.
 * TODO: gebruiker opslaan (wachtwoord gehasht), verificatiemail met token
 * versturen naar /e-mail-bevestigen?token=..., vakman op "in_beoordeling".
 */
export async function POST(request: Request) {
  const b = (await request.json().catch(() => ({}))) as Record<string, string | undefined>;
  const errors: Record<string, string> = {};
  if ((b.voornaam ?? "").trim().length < 2) errors.voornaam = "Vul je voornaam in.";
  if ((b.achternaam ?? "").trim().length < 2) errors.achternaam = "Vul je achternaam in.";
  if (!EMAIL_PATTERN.test((b.email ?? "").trim())) errors.email = "Vul een geldig e-mailadres in.";
  if ((b.wachtwoord ?? "").length < 8) errors.wachtwoord = "Kies een wachtwoord van minimaal 8 tekens.";
  if (b.rol === "vakman") {
    if ((b.bedrijfsnaam ?? "").trim().length < 2) errors.bedrijfsnaam = "Vul je bedrijfsnaam in.";
    if (!/^\d{8}$/.test((b.kvk ?? "").trim())) errors.kvk = "Een KvK-nummer bestaat uit 8 cijfers.";
    if (!getCategory(b.vakgebied ?? "")) errors.vakgebied = "Kies je hoofdvakgebied.";
    if (!isValidPostcode(b.postcode ?? "")) errors.postcode = "Vul een geldige postcode in.";
  }
  if (Object.keys(errors).length) return NextResponse.json({ errors, error: "Controleer de gemarkeerde velden." }, { status: 422 });
  return NextResponse.json({ ok: true, verificationSent: true }, { status: 201 });
}
