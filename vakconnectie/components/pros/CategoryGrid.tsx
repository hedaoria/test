import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryGrid({ items, hrefFor }: { items: Category[]; hrefFor?: (c: Category) => string }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((c) => (
        <li key={c.slug}>
          <Link
            href={hrefFor ? hrefFor(c) : `/${c.slug}`}
            className="card card-hover group flex h-full flex-col p-4 sm:p-5"
          >
            <span className="flex items-center justify-between gap-2 font-semibold text-stone-950 group-hover:text-brand-700">
              {c.name}
              <span aria-hidden="true" className="text-stone-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-600">→</span>
            </span>
            <span className="mt-1.5 hidden text-sm leading-snug text-stone-600 sm:block">{c.short}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
