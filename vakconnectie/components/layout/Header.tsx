"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

const NAV = [
  { href: "/vakmensen", label: "Vind een vakman" },
  { href: "/klus-plaatsen", label: "Plaats een klus" },
  { href: "/hoe-werkt-het", label: "Hoe werkt het?" },
  { href: "/voor-vakmensen", label: "Voor vakmensen" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo />

        <nav aria-label="Hoofdmenu" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={clsx(
                    "relative rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                    isActive(item.href) ? "text-brand-700" : "text-stone-700 hover:text-stone-950",
                  )}
                >
                  {item.label}
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

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/inloggen" className="rounded-md px-3 py-2 text-[0.9375rem] font-medium text-stone-700 hover:text-stone-950">
            Inloggen
          </Link>
          <ButtonLink href="/registreren" variant="secondary" size="sm" className="h-10 px-4">
            Registreren
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ButtonLink href="/klus-plaatsen" size="sm" className="h-10" onClick={() => setOpen(false)}>
            Plaats een klus
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-stone-800 hover:bg-stone-100"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobiel-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobiel menu" className="container-page flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "border-b border-stone-100 py-4 text-lg font-medium",
                  isActive(item.href) ? "text-brand-700" : "text-stone-900",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <ButtonLink href="/inloggen" variant="secondary" size="lg" onClick={() => setOpen(false)}>
                Inloggen
              </ButtonLink>
              <ButtonLink href="/registreren" size="lg" onClick={() => setOpen(false)}>
                Registreren
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
