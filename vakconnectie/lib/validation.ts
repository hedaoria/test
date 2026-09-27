import { isValidPostcode } from "@/lib/geo";
import type { Timing } from "@/lib/types";

/** Gedeelde validatie voor de aanvraag- en aanmeldformulieren. */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_PATTERN = /^(\+31|0031|0)[1-9][0-9\s-]{7,11}$/;
export const KVK_PATTERN = /^\d{8}$/;

export const TIMINGS: Timing[] = ["zo-snel-mogelijk", "binnen-weken", "binnen-maanden", "in-overleg"];

export interface JobInput {
  category: string;
  title: string;
  description: string;
  postcode: string;
  houseNumber: string;
  timing: Timing | "";
  hasPhotos: boolean;
  name: string;
  phone: string;
  email: string;
}

export type JobErrors = Partial<Record<keyof JobInput, string>>;

export function validateJobStep(step: number, v: JobInput): JobErrors {
  const e: JobErrors = {};
  if (step === 1 && !v.category) e.category = "Kies wat voor klus het is.";
  if (step === 2) {
    if (v.title.trim().length < 5) e.title = "Geef je project een korte titel, bijvoorbeeld “Badkamer renoveren”.";
    if (v.description.trim().length < 20) e.description = "Vertel iets meer, minimaal een paar zinnen.";
  }
  if (step === 3) {
    if (!isValidPostcode(v.postcode)) e.postcode = "Vul een geldige postcode in, bijvoorbeeld 2011 AB.";
    if (!/^[0-9]{1,5}\s?[A-Za-z0-9-]{0,6}$/.test(v.houseNumber.trim())) e.houseNumber = "Vul je huisnummer in.";
  }
  if (step === 4 && !v.timing) e.timing = "Kies wanneer de klus moet gebeuren.";
  if (step === 6) {
    if (v.name.trim().length < 2) e.name = "Vul je naam in.";
    if (v.phone.trim() && !PHONE_PATTERN.test(v.phone.trim())) e.phone = "Dit telefoonnummer klopt niet helemaal.";
    if (v.email.trim() && !EMAIL_PATTERN.test(v.email.trim())) e.email = "Vul een geldig e-mailadres in.";
    if (!v.phone.trim() && !v.email.trim()) e.phone = "Vul een telefoonnummer of e-mailadres in, zodat we contact met je kunnen opnemen.";
  }
  return e;
}

export interface ProSignupInput {
  name: string;
  company: string;
  kvk: string;
  categories: string[];
  region: string;
  phone: string;
  email: string;
  note: string;
}

export type ProSignupErrors = Partial<Record<keyof ProSignupInput, string>>;

export function validateProSignup(v: ProSignupInput): ProSignupErrors {
  const e: ProSignupErrors = {};
  if (v.name.trim().length < 2) e.name = "Vul je naam in.";
  if (v.company.trim().length < 2) e.company = "Vul je bedrijfsnaam in.";
  if (!KVK_PATTERN.test(v.kvk.trim())) e.kvk = "Een KvK-nummer bestaat uit 8 cijfers.";
  if (v.categories.length === 0) e.categories = "Kies minimaal één vakgebied.";
  if (v.region.trim().length < 2) e.region = "Vul je vestigingsplaats of regio in.";
  if (!PHONE_PATTERN.test(v.phone.trim())) e.phone = "Vul een geldig telefoonnummer in.";
  if (v.email.trim() && !EMAIL_PATTERN.test(v.email.trim())) e.email = "Vul een geldig e-mailadres in.";
  return e;
}
