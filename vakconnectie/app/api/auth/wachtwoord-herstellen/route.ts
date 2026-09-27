import { NextResponse } from "next/server";

/**
 * POST /api/auth/wachtwoord-herstellen
 * TODO: token controleren, nieuw wachtwoord hashen en opslaan, token ongeldig maken.
 */
export async function POST(request: Request) {
  const b = (await request.json().catch(() => ({}))) as { token?: string; password?: string };
  if (!b.token || (b.password ?? "").length < 8) {
    return NextResponse.json({ error: "Deze link is ongeldig of het wachtwoord is te kort." }, { status: 422 });
  }
  return NextResponse.json(
    { error: "Wachtwoord herstellen is in deze voorbeeldversie nog niet beschikbaar." },
    { status: 503 },
  );
}
