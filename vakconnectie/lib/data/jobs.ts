import type { Job, Timing } from "@/lib/types";

export const TIMING_LABELS: Record<Timing, string> = {
  "zo-snel-mogelijk": "Zo snel mogelijk",
  "binnen-weken": "Binnen enkele weken",
  "binnen-maanden": "Binnen enkele maanden",
  "in-overleg": "In overleg",
};

/** Klussen uit de database. Leeg totdat accounts en opslag gekoppeld zijn. */
export const jobs: Job[] = [];

// Tijdelijk: wordt vervangen door de ingelogde gebruiker (getSession() uit lib/auth).
export const CURRENT_CUSTOMER_ID = "";
export const CURRENT_PROFESSIONAL_SLUG = "";
