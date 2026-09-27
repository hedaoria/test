import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "./config";

/** Taal uit de route-parameters; onbekende taal geeft een 404. */
export async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

export function localeParams() {
  return LOCALES.map((lang) => ({ lang }));
}
