import type { Metadata } from "next";
import { Panel, PageTitle } from "@/components/dashboard/Panels";
import { SettingsForm, Toggle } from "@/components/dashboard/SettingsForm";
import { currentProfessionalSlug } from "@/lib/dashboard";
import { findProfessional } from "@/lib/repository";

export const metadata: Metadata = { title: "Beschikbaarheid" };

const OPTIONS = [
  { value: "direct", label: "Direct beschikbaar", hint: "Je kunt deze week of volgende week beginnen." },
  { value: "binnenkort", label: "Binnenkort beschikbaar", hint: "Je hebt over een paar weken weer ruimte." },
  { value: "later", label: "Vol gepland", hint: "Je neemt alleen opdrachten aan voor later." },
];

export default async function AvailabilityPage() {
  const pro = await findProfessional(currentProfessionalSlug);
  if (!pro) return null;
  return (
    <>
      <PageTitle title="Beschikbaarheid" intro="Je beschikbaarheid staat op je profiel en in de zoekresultaten." />
      <div className="max-w-2xl">
        <Panel>
          <SettingsForm>
            <fieldset className="space-y-2">
              <legend className="label">Status</legend>
              {OPTIONS.map((o) => (
                <label key={o.value} className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 px-4 py-3 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
                  <input type="radio" name="status" value={o.value} defaultChecked={pro.availability.status === o.value} className="mt-1 h-4 w-4 accent-brand-500" />
                  <span>
                    <span className="block font-medium">{o.label}</span>
                    <span className="block text-sm text-stone-600">{o.hint}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <div>
              <label htmlFor="toelichting" className="label">Tekst op je profiel</label>
              <input id="toelichting" defaultValue={pro.availability.label} maxLength={50} className="input" />
              <p className="mt-1.5 text-sm text-stone-500">Bijvoorbeeld: “Beschikbaar vanaf half oktober”.</p>
            </div>
            <Toggle name="pauze" label="Tijdelijk geen nieuwe opdrachten" description="Handig tijdens vakanties. Je profiel blijft zichtbaar." />
          </SettingsForm>
        </Panel>
      </div>
    </>
  );
}
