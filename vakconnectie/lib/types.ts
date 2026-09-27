/**
 * Domeinmodel van Vakconnectie.
 *
 * Deze types beschrijven de gegevens zoals ze straks in de database staan.
 * De huidige demo-data in `lib/data/` volgt dezelfde vorm, zodat de
 * repository-laag (`lib/repository.ts`) later één-op-één kan worden
 * vervangen door echte databasequeries.
 */

export type Role = "klant" | "vakman" | "beheerder";

export type AccountStatus = "actief" | "in_beoordeling" | "geblokkeerd";

export interface User {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  status: AccountStatus;
  createdAt: string; // ISO-datum
  /** Alleen gevuld voor vakmensen. */
  professionalSlug?: string;
}

export interface Category {
  slug: string; // enkelvoud, gebruikt als URL: /schilder
  plural: string; // meervoud, redirect naar enkelvoud
  name: string; // "Schilder"
  namePlural: string; // "Schilders"
  short: string; // één zin voor kaarten
  intro: string; // korte inleiding op de categoriepagina
  commonJobs: string[];
  metaTitle: string;
  metaDescription: string;
  active: boolean;
}

export interface City {
  slug: string;
  name: string;
  province: string;
  lat: number;
  lng: number;
  intro: string;
}

export type AvailabilityStatus = "direct" | "binnenkort" | "later";

export interface Availability {
  status: AvailabilityStatus;
  label: string;
}

export interface ProjectPhoto {
  title: string;
  place: string;
  year: number;
  /** Pad naar de foto in /public. Leeg = nette placeholder. */
  src?: string;
}

export interface ReviewScores {
  kwaliteit: number;
  communicatie: number;
  afspraken: number;
  prijsKwaliteit: number;
}

export interface Review {
  id: string;
  professionalSlug: string;
  authorName: string; // voornaam + eerste letter achternaam
  place: string;
  jobTitle: string;
  date: string; // ISO-datum
  rating: number; // 1–5
  scores: ReviewScores;
  text: string;
  reply?: string;
  status: "gepubliceerd" | "gemeld" | "verborgen";
}

export interface Professional {
  slug: string;
  companyName: string;
  contactName: string;
  categories: string[]; // category slugs, eerste = hoofdvakgebied
  citySlug?: string;
  place: string;
  lat: number;
  lng: number;
  radiusKm: number;
  foundedYear: number;
  yearsExperience: number;
  tagline: string;
  about: string;
  specialisations: string[];
  certifications: string[];
  workArea: string[];
  kvk: string;
  memberSince: string; // ISO-datum
  availability: Availability;
  projects: ProjectPhoto[];
  logo?: string;
  verified: boolean;
}

export type Timing = "zo-snel-mogelijk" | "binnen-weken" | "binnen-maanden" | "in-overleg";

export type JobStatus = "open" | "in_gesprek" | "gegund" | "afgerond" | "geannuleerd";

export interface JobResponse {
  id: string;
  professionalSlug: string;
  message: string;
  createdAt: string;
  status: "nieuw" | "bekeken" | "gekozen" | "afgewezen";
}

export interface Job {
  id: string;
  title: string;
  categorySlug: string;
  description: string;
  details: Record<string, string>;
  postcode: string;
  houseNumber: string;
  place: string;
  lat: number;
  lng: number;
  timing: Timing;
  photos: string[];
  status: JobStatus;
  customerId: string;
  createdAt: string;
  responses: JobResponse[];
  selectedProfessionalSlug?: string;
}

export interface Message {
  id: string;
  from: "klant" | "vakman";
  text?: string;
  photo?: { name: string; url?: string };
  sentAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  jobId: string;
  customerId: string;
  professionalSlug: string;
  messages: Message[];
}

export interface Notification {
  id: string;
  userId: string;
  kind: "reactie" | "bericht" | "review" | "systeem" | "opdracht";
  text: string;
  href: string;
  createdAt: string;
  read: boolean;
}

export interface Report {
  id: string;
  kind: "review" | "profiel" | "opdracht" | "bericht";
  subject: string;
  reason: string;
  reportedBy: string;
  createdAt: string;
  status: "open" | "in_behandeling" | "afgehandeld";
}

export interface Plan {
  id: string;
  name: string;
  priceMonthly: number; // in euro's, excl. btw
  description: string;
  features: string[];
  highlighted?: boolean;
}
