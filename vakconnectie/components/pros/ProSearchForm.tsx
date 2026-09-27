import clsx from "clsx";
import { categories, categoryText } from "@/lib/data/categories";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";

export interface SearchValues {
  vakgebied?: string;
  postcode?: string;
  plaats?: string;
  afstand?: string;
}

export const DISTANCES = ["10", "25", "50", "100"];

/**
 * Zoekformulier als gewone GET-form: werkt zonder JavaScript en levert
 * deelbare, indexeerbare URL's op (/vakmensen?vakgebied=schilder&postcode=...).
 */
export function ProSearchForm({ values = {}, compact, className, locale }: { values?: SearchValues; compact?: boolean; className?: string; locale: Locale }) {
  const t = getDictionary(locale).search;
  return (
    <form action={localizePath(locale, "/vakmensen")} method="get" role="search" aria-label={t.label} className={clsx("card p-4 sm:p-5", className)}>
      <div className={clsx("grid gap-3", compact ? "sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_auto]" : "sm:grid-cols-2")}>
        <div>
          <label htmlFor="zoek-vakgebied" className="label">{t.category}</label>
          <select id="zoek-vakgebied" name="vakgebied" defaultValue={values.vakgebied ?? ""} className="input">
            <option value="">{t.allCategories}</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{categoryText(c, locale).name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="zoek-postcode" className="label">{t.postcode}</label>
          <input id="zoek-postcode" name="postcode" defaultValue={values.postcode} placeholder="1234 AB" autoComplete="postal-code" inputMode="text" maxLength={7} className="input" />
        </div>
        <div>
          <label htmlFor="zoek-plaats" className="label">{t.place}</label>
          <input id="zoek-plaats" name="plaats" defaultValue={values.plaats} placeholder={t.placePlaceholder} autoComplete="address-level2" className="input" />
        </div>
        <div>
          <label htmlFor="zoek-afstand" className="label">{t.distance}</label>
          <select id="zoek-afstand" name="afstand" defaultValue={values.afstand ?? "25"} className="input">
            {DISTANCES.map((d) => (
              <option key={d} value={d}>{t.upTo(d)}</option>
            ))}
          </select>
        </div>
        <div className={clsx("flex items-end", !compact && "sm:col-span-2")}>
          <button type="submit" className="h-12 w-full rounded-lg bg-brand-700 px-6 font-semibold text-white transition-colors hover:bg-brand-800">
            {t.submit}
          </button>
        </div>
      </div>
    </form>
  );
}
