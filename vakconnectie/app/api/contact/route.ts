import { NextResponse } from "next/server";
import { EMAIL_PATTERN } from "@/lib/validation";

/** POST /api/contact — contactformulier. Koppel hier later de e-maildienst. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();
  if (name.length < 2 || !EMAIL_PATTERN.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Controleer de ingevulde gegevens." }, { status: 422 });
  }
  // TODO: doorsturen naar support-inbox / ticketsysteem.
  return NextResponse.json({ ok: true });
}
