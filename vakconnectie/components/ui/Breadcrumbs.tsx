import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/routes";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Kruimelpad. `path` is het interne (Nederlandse) pad; links worden per taal vertaald. */
export function Breadcrumbs({ items, locale }: { items: { name: string; path: string }[]; locale: Locale }) {
  const all = [{ name: getDictionary(locale).common.home, path: "/" }, ...items];
  return (
    <>
      <nav aria-label={locale === "en" ? "Breadcrumb" : "Kruimelpad"} className="text-sm text-stone-500">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {all.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-stone-700">{item.name}</span>
              ) : (
                <Link href={localizePath(locale, item.path)} className="hover:text-brand-700 hover:underline">{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all, locale)} />
    </>
  );
}
