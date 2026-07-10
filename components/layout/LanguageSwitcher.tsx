"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/lib/site";
import { getAlternatePath, otherLocale } from "@/lib/routes";

interface Props {
  locale: Locale;
  variant?: "header" | "footer";
}

const FLAG: Record<Locale, string> = { nl: "🇳🇱", en: "🇬🇧" };
const LABEL: Record<Locale, string> = { nl: "NL", en: "EN" };

export default function LanguageSwitcher({ locale, variant = "header" }: Props) {
  const pathname = usePathname();
  const target = otherLocale(locale);
  const alternatePath = getAlternatePath(pathname || `/${locale}`);

  if (variant === "footer") {
    return (
      <Link
        href={alternatePath}
        hrefLang={target}
        className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white transition-colors"
      >
        <span aria-hidden>{FLAG[target]}</span>
        <span>{target === "nl" ? "Nederlands" : "English"}</span>
      </Link>
    );
  }

  return (
    <Link
      href={alternatePath}
      hrefLang={target}
      className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-sm font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700 transition-colors"
      aria-label={`Switch to ${target === "nl" ? "Dutch" : "English"}`}
    >
      <span aria-hidden>{FLAG[target]}</span>
      <span>{LABEL[target]}</span>
    </Link>
  );
}
