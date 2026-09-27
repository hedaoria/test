"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Bell } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";

export interface NavItem {
  href: string;
  label: string;
  badge?: number;
  /** Alleen exact matchen (voor de overzichtspagina). */
  exact?: boolean;
}

export function DashboardShell({
  title,
  userName,
  roleLabel,
  nav,
  notificationsHref,
  unread = 0,
  children,
}: {
  title: string;
  userName: string;
  roleLabel: string;
  nav: NavItem[];
  notificationsHref?: string;
  unread?: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <div className="min-h-dvh bg-stone-50">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700 sm:inline">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            {notificationsHref && (
              <Link
                href={notificationsHref}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-stone-700 hover:bg-stone-100"
                aria-label={unread ? `Notificaties, ${unread} ongelezen` : "Notificaties"}
              >
                <Bell className="h-5 w-5" />
                {unread > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" aria-hidden="true" />}
              </Link>
            )}
            <div className="flex items-center gap-2.5 pl-1">
              <Avatar name={userName} size="sm" />
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold text-stone-900">{userName}</p>
                <p className="text-xs text-stone-500">{roleLabel}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Mobiele navigatie: horizontaal scrollbare tabs */}
        <nav aria-label={`${title} menu`} className="border-t border-stone-100 lg:hidden">
          <ul className="flex gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none]">
            {nav.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active(item) ? "page" : undefined}
                  className={clsx(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium",
                    active(item) ? "bg-brand-700 text-white" : "text-stone-700 hover:bg-stone-100",
                  )}
                >
                  {item.label}
                  {!!item.badge && <Count n={item.badge} inverted={active(item)} />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mx-auto flex max-w-[90rem] gap-8 px-4 py-6 sm:px-6 lg:py-10">
        <aside className="hidden w-60 shrink-0 lg:block">
          <nav aria-label={`${title} menu`} className="sticky top-26">
            <ul className="space-y-0.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active(item) ? "page" : undefined}
                    className={clsx(
                      "flex items-center justify-between rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium transition-colors",
                      active(item) ? "bg-white text-brand-800 shadow-sm ring-1 ring-stone-200" : "text-stone-700 hover:bg-white hover:text-stone-950",
                    )}
                  >
                    {item.label}
                    {!!item.badge && <Count n={item.badge} />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main id="inhoud" className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

function Count({ n, inverted }: { n: number; inverted?: boolean }) {
  return (
    <span className={clsx("rounded-full px-1.5 text-xs font-semibold", inverted ? "bg-white/20 text-white" : "bg-brand-100 text-brand-800")}>
      {n}
    </span>
  );
}
