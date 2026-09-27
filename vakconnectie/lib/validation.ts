import { isValidPostcode } from "@/lib/geo";
import type { Timing } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Messages = Dictionary["validation"];

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

export function validateJobStep(step: number, v: JobInput, m: Messages): JobErrors {
  const e: JobErrors = {};
  if (step === 1 && !v.category) e.category = m.category;
  if (step === 2) {
    if (v.title.trim().length < 5) e.title = m.title;
    if (v.description.trim().length < 20) e.description = m.description;
  }
  if (step === 3) {
    if (!isValidPostcode(v.postcode)) e.postcode = m.postcode;
    if (!/^[0-9]{1,5}\s?[A-Za-z0-9-]{0,6}$/.test(v.houseNumber.trim())) e.houseNumber = m.houseNumber;
  }
  if (step === 4 && !v.timing) e.timing = m.timing;
  if (step === 6) {
    if (v.name.trim().length < 2) e.name = m.name;
    if (v.phone.trim() && !PHONE_PATTERN.test(v.phone.trim())) e.phone = m.phone;
    if (v.email.trim() && !EMAIL_PATTERN.test(v.email.trim())) e.email = m.email;
    if (!v.phone.trim() && !v.email.trim()) e.phone = m.contactRequired;
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

export function validateProSignup(v: ProSignupInput, m: Messages): ProSignupErrors {
  const e: ProSignupErrors = {};
  if (v.name.trim().length < 2) e.name = m.name;
  if (v.company.trim().length < 2) e.company = m.company;
  if (!KVK_PATTERN.test(v.kvk.trim())) e.kvk = m.kvk;
  if (v.categories.length === 0) e.categories = m.categories;
  if (v.region.trim().length < 2) e.region = m.region;
  if (!PHONE_PATTERN.test(v.phone.trim())) e.phone = m.phoneRequired;
  if (v.email.trim() && !EMAIL_PATTERN.test(v.email.trim())) e.email = m.email;
  return e;
}
