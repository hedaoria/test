"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, Droplets } from "lucide-react";
import { Locale, BUSINESS } from "@/lib/site";
import { Dictionary } from "@/lib/i18n";
import { getPrimaryNav, getServiceNavLinks } from "@/lib/nav";
import { PATHS } from "@/lib/routes";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "@/components/ui/Button";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export default function Header({ locale, dict }: Props) {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
  }

  const nav = getPrimaryNav(locale);
  const serviceLinks = getServiceNavLinks(locale);
  const paths = PATHS[locale];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-white"
      }`}
    >
      <div className="bg-ink-900 text-ink-100">
        <div className="container-page flex h-9 items-center justify-between text-xs sm:text-sm">
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center gap-1.5 font-medium hover:text-brand-300 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {BUSINESS.phoneDisplay}
          </a>
          <span className="hidden sm:inline text-ink-300">{dict.common.availability} · {BUSINESS.address.city}, {dict.meta.tagline}</span>
        </div>
      </div>

      <div className="container-page">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          <Link href={paths.home} className="flex items-center gap-2 shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30">
              <Droplets className="h-5.5 w-5.5" aria-hidden />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-ink-900">{dict.meta.siteName}</span>
              <span className="hidden sm:block text-[11px] font-medium uppercase tracking-wide text-brand-600">
                {dict.meta.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {nav.map((item, idx) => {
              if (idx === 2) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      aria-expanded={servicesOpen}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                    {servicesOpen && (
                      <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2">
                        <div className="rounded-2xl border border-ink-100 bg-white p-3 shadow-xl">
                          {serviceLinks.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="block rounded-xl px-3 py-2.5 hover:bg-brand-50 transition-colors"
                            >
                              <span className="block text-sm font-semibold text-ink-900">{s.label}</span>
                              <span className="block text-xs text-ink-500 mt-0.5 line-clamp-1">{s.description}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <Button href={BUSINESS.phoneHref} variant="ghost" size="sm" icon={<Phone className="h-4 w-4" />}>
              {dict.buttons.callNow}
            </Button>
            <Button href={paths.contact} variant="primary" size="sm">
              {dict.buttons.requestQuote}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher locale={locale} />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700"
              aria-label={mobileOpen ? dict.nav.close : dict.nav.menu}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-ink-100 bg-white shadow-lg animate-fade-in">
          <nav className="container-page flex flex-col py-3" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink-800 hover:bg-brand-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-ink-100 pt-2">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-ink-400">
                {dict.buttons.ourServices}
              </p>
              {serviceLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-brand-50"
                >
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 px-3">
              <Button href={BUSINESS.phoneHref} variant="primary" icon={<Phone className="h-4 w-4" />}>
                {dict.buttons.callNow}
              </Button>
              <Button href={paths.contact} variant="ghost">
                {dict.buttons.requestQuote}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
