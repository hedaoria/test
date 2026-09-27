import { NextResponse, type NextRequest } from "next/server";
import { englishToInternal, localizePath } from "@/lib/i18n/routes";

/**
 * Taalroutering en toegangscontrole.
 *
 * - Nederlands staat op de root (/klus-plaatsen) en wordt intern herschreven naar /nl/...
 * - Engels staat onder /en met Engelse paden (/en/project-request) en wordt intern
 *   herschreven naar /en/<Nederlands pad>.
 * - /nl/... is geen openbare URL en stuurt door naar de versie zonder prefix.
 * - Accounts, dashboards en beheer vereisen een sessie zodra AUTH_ENABLED=true.
 */
const SESSION_COOKIE = "vc_session";
const PROTECTED = ["/account", "/mijn-bedrijf", "/beheer"];

/** Herschrijf naar de interne route en geef de taal door (gebruikt door de 404-pagina). */
function rewrite(request: NextRequest, target: string, locale: "nl" | "en") {
  const headers = new Headers(request.headers);
  headers.set("x-vc-locale", locale);
  return NextResponse.rewrite(new URL(target, request.url), { request: { headers } });
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const internal = englishToInternal(pathname.slice(3));
    // Nederlandse paden onder /en doorsturen naar de Engelse URL (bijv. /en/schilder → /en/painter).
    const canonical = localizePath("en", internal);
    if (!internal.includes("__onbekend__") && canonical !== pathname.replace(/\/$/, "")) {
      const url = request.nextUrl.clone();
      url.pathname = canonical;
      return NextResponse.redirect(url, 308);
    }
    return rewrite(request, `/en${internal === "/" ? "" : internal}${search}`, "en");
  }

  if (process.env.AUTH_ENABLED === "true" && PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    if (!request.cookies.has(SESSION_COOKIE)) {
      const url = new URL("/inloggen", request.url);
      url.searchParams.set("volgende", pathname);
      return NextResponse.redirect(url);
    }
  }

  return rewrite(request, `/nl${pathname === "/" ? "" : pathname}${search}`, "nl");
}

export const config = {
  // Alles behalve Next-internals, API-routes en bestanden met een extensie.
  matcher: ["/((?!_next|api|opengraph-image|.*\\.[a-zA-Z0-9]+$).*)"],
};
