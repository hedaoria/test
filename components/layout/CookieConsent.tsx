"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { PATHS } from "@/lib/routes";
import { Locale } from "@/lib/site";
import Button from "@/components/ui/Button";
import { useCookieConsent, setCookieConsent } from "@/lib/useCookieConsent";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export default function CookieConsent({ dict, locale }: Props) {
  const consent = useCookieConsent();

  if (consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6 animate-fade-up">
      <div className="mx-auto max-w-3xl rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 shadow-2xl">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Cookie className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-ink-900">{dict.cookie.title}</h2>
            <p className="mt-1 text-sm text-ink-500">{dict.cookie.description}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm" onClick={() => setCookieConsent("all")}>
            {dict.cookie.acceptAll}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCookieConsent("necessary")}>
            {dict.cookie.onlyNecessary}
          </Button>
          <Link
            href={PATHS[locale].cookiePolicy}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 underline underline-offset-2"
          >
            {dict.cookie.privacyPolicy}
          </Link>
        </div>
      </div>
    </div>
  );
}
