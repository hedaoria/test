import { Locale } from "../site";
import { Dictionary } from "./types";
import { nl } from "./nl";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { nl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
