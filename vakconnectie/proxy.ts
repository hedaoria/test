import { NextResponse, type NextRequest } from "next/server";

/**
 * Toegangscontrole voor de afgeschermde omgevingen.
 *
 * Staat uit zolang AUTH_ENABLED niet "true" is, zodat de dashboards in de
 * voorbeeldversie te bekijken zijn. Na koppeling van authenticatie: zet
 * AUTH_ENABLED=true en controleer hier de sessie en de rol
 * (klant → /account, vakman → /mijn-bedrijf, beheerder → /beheer).
 */
const SESSION_COOKIE = "vc_session";

export function proxy(request: NextRequest) {
  if (process.env.AUTH_ENABLED !== "true") return NextResponse.next();

  const hasSession = request.cookies.has(SESSION_COOKIE);
  if (!hasSession) {
    const url = new URL("/inloggen", request.url);
    url.searchParams.set("volgende", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/mijn-bedrijf/:path*", "/beheer/:path*"],
};
