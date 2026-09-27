import clsx from "clsx";
import { categories } from "@/lib/data/categories";

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
export function ProSearchForm({ values = {}, compact, className }: { values?: SearchValues; compact?: boolean; className?: string }) {
  return (
    <form action="/vakmensen" method="get" role="search" aria-label="Vakmensen zoeken" className={clsx("card p-4 sm:p-5", className)}>
      <div className={clsx("grid gap-3", compact ? "sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_auto]" : "sm:grid-cols-2")}>
        <div>
          <label htmlFor="zoek-vakgebied" className="label">Vakgebied</label>
          <select id="zoek-vakgebied" name="vakgebied" defaultValue={values.vakgebied ?? ""} className="input">
            <option value="">Alle vakgebieden</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="zoek-postcode" className="label">Postcode</label>
          <input id="zoek-postcode" name="postcode" defaultValue={values.postcode} placeholder="1234 AB" autoComplete="postal-code" inputMode="text" maxLength={7} className="input" />
        </div>
        <div>
          <label htmlFor="zoek-plaats" className="label">of plaats</label>
          <input id="zoek-plaats" name="plaats" defaultValue={values.plaats} placeholder="Bijv. Utrecht" autoComplete="address-level2" className="input" />
        </div>
        <div>
          <label htmlFor="zoek-afstand" className="label">Afstand</label>
          <select id="zoek-afstand" name="afstand" defaultValue={values.afstand ?? "25"} className="input">
            {DISTANCES.map((d) => (
              <option key={d} value={d}>Tot {d} km</option>
            ))}
          </select>
        </div>
        <div className={clsx("flex items-end", !compact && "sm:col-span-2")}>
          <button type="submit" className="h-12 w-full rounded-lg bg-brand-700 px-6 font-semibold text-white transition-colors hover:bg-brand-800">
            Zoeken
          </button>
        </div>
      </div>
    </form>
  );
}
