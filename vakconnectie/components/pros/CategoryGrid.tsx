import Link from "next/link";
import { categoryText } from "@/lib/data/categories";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/routes";
import type { Category } from "@/lib/types";

/** `hrefFor` geeft een intern pad terug; het wordt per taal vertaald. */
export function CategoryGrid({ items, locale, hrefFor }: { items: Category[]; locale: Locale; hrefFor?: (c: Category) => string }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((c) => {
        const text = categoryText(c, locale);
        return (
          <li key={c.slug}>
            <Link
              href={localizePath(locale, hrefFor ? hrefFor(c) : `/${c.slug}`)}
              className="card card-hover group flex h-full flex-col p-4 sm:p-5"
            >
              <span className="flex items-center justify-between gap-2 font-semibold text-stone-950 group-hover:text-brand-700">
                {text.name}
                <span aria-hidden="true" className="text-stone-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-600">→</span>
              </span>
              <span className="mt-1.5 hidden text-sm leading-snug text-stone-600 sm:block">{text.short}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
