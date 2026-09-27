import { NextResponse } from "next/server";

/**
 * POST /api/auth/inloggen
 * TODO: wachtwoord controleren, sessiecookie (SESSION_COOKIE uit lib/auth)
 * zetten en doorsturen naar HOME_FOR_ROLE[rol].
 */
export async function POST() {
  return NextResponse.json(
    { error: "Inloggen is in deze voorbeeldversie nog niet beschikbaar." },
    { status: 503 },
  );
}
