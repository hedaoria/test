import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Locale } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import { getDictionary } from "@/lib/i18n";

export interface Crumb {
  label: string;
  href: string;
}

interface Props {
  locale: Locale;
  items: Crumb[];
}

export default function Breadcrumbs({ locale, items }: Props) {
  const dict = getDictionary(locale);
  const all: Crumb[] = [{ label: dict.breadcrumbs.home, href: PATHS[locale].home }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-ink-100 bg-ink-50/60">
      <ol className="container-page flex flex-wrap items-center gap-1.5 py-3 text-xs sm:text-sm text-ink-500">
        {all.map((item, idx) => {
          const isLast = idx === all.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {idx === 0 ? (
                <Link href={item.href} className="flex items-center gap-1 hover:text-brand-600 transition-colors">
                  <Home className="h-3.5 w-3.5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              ) : isLast ? (
                <span className="font-medium text-ink-800" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-brand-600 transition-colors">
                  {item.label}
                </Link>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5 text-ink-300" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
