"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath, parsePathname } from "@/lib/i18n/routes";

const NAV = [
  { href: "/vakmensen", key: "findPro" },
  { href: "/klus-plaatsen", key: "placeJob" },
  { href: "/hoe-werkt-het", key: "howItWorks" },
  { href: "/voor-vakmensen", key: "forPros" },
] as const;

const LANG_LABEL: Record<Locale, { short: string; long: string }> = {
  nl: { short: "NL", long: "Nederlands" },
  en: { short: "EN", long: "English" },
};

/** Taalkeuze: linkt naar dezelfde pagina in de andere taal. */
function LanguageSwitch({ locale, internal, label, className, onNavigate }: { locale: Locale; internal: string; label: string; className?: string; onNavigate?: () => void }) {
  return (
    <div role="group" aria-label={label} className={clsx("inline-flex items-center rounded-full border border-stone-300 p-0.5 text-sm font-semibold", className)}>
      {(["nl", "en"] as const).map((l) => (
        <Link
          key={l}
          href={localizePath(l, internal)}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? "true" : undefined}
          aria-label={LANG_LABEL[l].long}
          onClick={onNavigate}
          className={clsx(
            "rounded-full px-2.5 py-1 transition-colors",
            l === locale ? "bg-stone-900 text-white" : "text-stone-600 hover:text-stone-950",
          )}
        >
          {LANG_LABEL[l].short}
        </Link>
      ))}
    </div>
  );
}

export function Header({ locale, accountsEnabled = false }: { locale: Locale; accountsEnabled?: boolean }) {
  const t = getDictionary(locale).nav;
  const parsed = parsePathname(usePathname() ?? "/").internal;
  // Onbekende pagina (404): taalkeuze gaat naar de homepage in de andere taal.
  const internal = parsed.includes("__onbekend__") ? "/" : parsed;
  const [open, setOpen] = useState(false);
  const lp = (href: string) => localizePath(locale, href);
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => internal === href || internal.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Logo href={lp("/")} label={t.homeLabel} />

          <nav aria-label={t.mainMenu} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={lp(item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={clsx(
                      "relative rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                      isActive(item.href) ? "text-brand-700" : "text-stone-700 hover:text-stone-950",
                    )}
                  >
                    {t[item.key]}
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-brand-600 transition-opacity",
                        isActive(item.href) ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitch locale={locale} internal={internal} label={t.language} />
            {accountsEnabled ? (
              <>
                <Link href="/inloggen" className="rounded-md px-2 py-2 text-[0.9375rem] font-medium text-stone-700 hover:text-stone-950">
                  {t.login}
                </Link>
                <ButtonLink href="/registreren" variant="secondary" size="sm" className="h-10 px-4">
                  {t.register}
                </ButtonLink>
              </>
            ) : (
              <>
                <Link href={lp("/contact")} className="rounded-md px-2 py-2 text-[0.9375rem] font-medium text-stone-700 hover:text-stone-950">
                  {t.contact}
                </Link>
                <ButtonLink href={lp("/klus-plaatsen")} size="sm" className="h-10 px-4">
                  {t.freeRequest}
                </ButtonLink>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <div className="hidden sm:block">
              <LanguageSwitch locale={locale} internal={internal} label={t.language} />
            </div>
            <ButtonLink href={lp("/klus-plaatsen")} size="sm" className="h-10" onClick={close}>
              {t.placeJob}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobiel-menu"
              aria-label={open ? t.closeMenu : t.openMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-stone-800 hover:bg-stone-100"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobiel-menu" className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-white lg:hidden">
          <nav aria-label={t.mobileMenu} className="container-page flex flex-col py-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <span className="text-sm font-medium text-stone-600">{t.language}</span>
              <LanguageSwitch locale={locale} internal={internal} label={t.language} onNavigate={close} />
            </div>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={lp(item.href)}
                onClick={close}
                className={clsx("border-b border-stone-100 py-4 text-lg font-medium", isActive(item.href) ? "text-brand-700" : "text-stone-900")}
              >
                {t[item.key]}
              </Link>
            ))}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {accountsEnabled ? (
                <>
                  <ButtonLink href="/inloggen" variant="secondary" size="lg" onClick={close}>
                    {t.login}
                  </ButtonLink>
                  <ButtonLink href="/registreren" size="lg" onClick={close}>
                    {t.register}
                  </ButtonLink>
                </>
              ) : (
                <>
                  <ButtonLink href={lp("/contact")} variant="secondary" size="lg" onClick={close}>
                    {t.contact}
                  </ButtonLink>
                  <ButtonLink href={lp("/aanmelden-als-vakman")} variant="secondary" size="lg" onClick={close}>
                    {getDictionary(locale).common.joinAsPro}
                  </ButtonLink>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
