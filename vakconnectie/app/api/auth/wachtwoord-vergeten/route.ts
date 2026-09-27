import { NextResponse } from "next/server";

/**
 * POST /api/auth/wachtwoord-vergeten
 * Antwoordt altijd hetzelfde, zodat niet te achterhalen is of een e-mailadres bestaat.
 * TODO: token aanmaken (1 uur geldig) en e-mail versturen met link naar /wachtwoord-herstellen?token=...
 */
export async function POST() {
  return NextResponse.json({ ok: true });
}
