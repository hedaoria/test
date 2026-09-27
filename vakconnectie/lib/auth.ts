/**
 * Authenticatie en rollen — voorbereid, nog niet gekoppeld.
 *
 * Koppel hier later een auth-oplossing (bijv. Auth.js of een eigen sessie
 * met e-mailverificatie). De rest van de applicatie gebruikt alleen
 * `getSession()` en `can()`, zodat de keuze voor een provider lokaal blijft.
 */
import type { Role } from "@/lib/types";

export interface Session {
  userId: string;
  role: Role;
  emailVerified: boolean;
}

export const SESSION_COOKIE = "vc_session";

/** Geeft de huidige sessie terug. Zolang auth niet gekoppeld is: `null`. */
export async function getSession(): Promise<Session | null> {
  return null;
}

type Permission =
  | "klus:plaatsen"
  | "klus:reageren"
  | "review:schrijven"
  | "profiel:bewerken"
  | "beheer:gebruikers"
  | "beheer:vakmensen-goedkeuren"
  | "beheer:reviews"
  | "beheer:categorieen";

const PERMISSIONS: Record<Role, Permission[]> = {
  klant: ["klus:plaatsen", "review:schrijven"],
  vakman: ["klus:reageren", "profiel:bewerken"],
  beheerder: ["beheer:gebruikers", "beheer:vakmensen-goedkeuren", "beheer:reviews", "beheer:categorieen"],
};

export function can(session: Session | null, permission: Permission) {
  return Boolean(session && PERMISSIONS[session.role].includes(permission));
}

/** Startpagina na inloggen per rol. */
export const HOME_FOR_ROLE: Record<Role, string> = {
  klant: "/account",
  vakman: "/mijn-bedrijf",
  beheerder: "/beheer",
};
