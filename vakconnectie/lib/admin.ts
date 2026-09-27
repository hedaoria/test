import type { StatusDef } from "@/components/admin/ManagedStatus";

export const USER_STATUSES: Record<string, StatusDef> = {
  actief: { label: "Actief", tone: "brand", actions: [{ label: "Blokkeren", to: "geblokkeerd", danger: true }] },
  in_beoordeling: {
    label: "In beoordeling",
    tone: "amber",
    actions: [
      { label: "Goedkeuren", to: "actief" },
      { label: "Afwijzen", to: "afgewezen", danger: true },
    ],
  },
  geblokkeerd: { label: "Geblokkeerd", tone: "red", actions: [{ label: "Deblokkeren", to: "actief" }] },
  afgewezen: { label: "Afgewezen", tone: "red", actions: [{ label: "Opnieuw beoordelen", to: "in_beoordeling" }] },
};

export const REVIEW_STATUSES: Record<string, StatusDef> = {
  gepubliceerd: { label: "Gepubliceerd", tone: "brand", actions: [{ label: "Verbergen", to: "verborgen", danger: true }] },
  gemeld: {
    label: "Gemeld",
    tone: "amber",
    actions: [
      { label: "Laten staan", to: "gepubliceerd" },
      { label: "Verbergen", to: "verborgen", danger: true },
    ],
  },
  verborgen: { label: "Verborgen", tone: "stone", actions: [{ label: "Publiceren", to: "gepubliceerd" }] },
};

export const REPORT_STATUSES: Record<string, StatusDef> = {
  open: { label: "Open", tone: "red", actions: [{ label: "In behandeling nemen", to: "in_behandeling" }] },
  in_behandeling: { label: "In behandeling", tone: "amber", actions: [{ label: "Afhandelen", to: "afgehandeld" }] },
  afgehandeld: { label: "Afgehandeld", tone: "stone", actions: [{ label: "Heropenen", to: "open" }] },
};

export const JOB_STATUSES: Record<string, StatusDef> = {
  open: { label: "Open", tone: "blue", actions: [{ label: "Offline halen", to: "geannuleerd", danger: true }] },
  in_gesprek: { label: "In gesprek", tone: "amber", actions: [{ label: "Offline halen", to: "geannuleerd", danger: true }] },
  gegund: { label: "Gegund", tone: "brand" },
  afgerond: { label: "Afgerond", tone: "stone" },
  geannuleerd: { label: "Offline", tone: "red", actions: [{ label: "Terugzetten", to: "open" }] },
};

export const CATEGORY_STATUSES: Record<string, StatusDef> = {
  actief: { label: "Zichtbaar", tone: "brand", actions: [{ label: "Verbergen", to: "inactief" }] },
  inactief: { label: "Verborgen", tone: "stone", actions: [{ label: "Zichtbaar maken", to: "actief" }] },
};
