import type { Metadata } from "next";
import { Panel, PageTitle } from "@/components/dashboard/Panels";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { categories } from "@/lib/data/categories";
import { currentProfessionalSlug } from "@/lib/dashboard";
import { findProfessional } from "@/lib/repository";

export const metadata: Metadata = { title: "Werkgebied" };

export default async function WorkAreaPage() {
  const pro = await findProfessional(currentProfessionalSlug);
  if (!pro) return null;
  return (
    <>
      <PageTitle title="Werkgebied en vakgebieden" intro="Je ziet alleen opdrachten die binnen je werkgebied en vakgebieden vallen." />
      <div className="max-w-2xl space-y-6">
        <Panel title="Werkgebied">
          <SettingsForm>
            <div>
              <label htmlFor="vestiging" className="label">Vanaf postcode of plaats</label>
              <input id="vestiging" defaultValue={pro.place} className="input" />
            </div>
            <div>
              <label htmlFor="straal" className="label">Maximale afstand</label>
              <select id="straal" defaultValue={String(pro.radiusKm)} className="input">
                {[10, 15, 20, 25, 30, 35, 40, 50, 75].map((km) => (
                  <option key={km} value={km}>{km} km</option>
                ))}
              </select>
              <p className="mt-1.5 text-sm text-stone-500">Hemelsbrede afstand vanaf je vestigingsplaats.</p>
            </div>
          </SettingsForm>
        </Panel>
        <Panel title="Vakgebieden">
          <SettingsForm>
            <fieldset>
              <legend className="mb-3 text-sm text-stone-600">Kies maximaal drie vakgebieden. Het eerste is je hoofdvakgebied.</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {categories.map((c) => (
                  <label key={c.slug} className="flex cursor-pointer items-center gap-3 rounded-lg border border-stone-200 px-3 py-2.5 hover:border-stone-300 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
                    <input type="checkbox" name="vakgebied" value={c.slug} defaultChecked={pro.categories.includes(c.slug)} className="h-4 w-4 accent-brand-700" />
                    {c.name}
                  </label>
                ))}
              </div>
            </fieldset>
          </SettingsForm>
        </Panel>
      </div>
    </>
  );
}
