import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Panel, PageTitle } from "@/components/dashboard/Panels";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { currentProfessionalSlug } from "@/lib/dashboard";
import { findProfessional } from "@/lib/repository";

export const metadata: Metadata = { title: "Mijn profiel" };

export default async function ProProfilePage() {
  const pro = await findProfessional(currentProfessionalSlug);
  if (!pro) return null;
  return (
    <>
      <PageTitle
        title="Mijn profiel"
        intro="Dit zien opdrachtgevers op je openbare profielpagina."
        action={<ButtonLink href={`/vakman/${pro.slug}`} variant="secondary">Bekijk openbaar profiel</ButtonLink>}
      />
      <div className="max-w-3xl space-y-6">
        <Panel title="Bedrijf">
          <SettingsForm>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="bedrijfsnaam" className="label">Bedrijfsnaam</label>
                <input id="bedrijfsnaam" defaultValue={pro.companyName} className="input" />
              </div>
              <div>
                <label htmlFor="opgericht" className="label">Opgericht in</label>
                <input id="opgericht" type="number" defaultValue={pro.foundedYear} className="input" />
              </div>
            </div>
            <div>
              <label htmlFor="tagline" className="label">Korte omschrijving</label>
              <input id="tagline" defaultValue={pro.tagline} maxLength={90} className="input" />
              <p className="mt-1.5 text-sm text-stone-500">Eén zin, zichtbaar in de zoekresultaten.</p>
            </div>
            <div>
              <label htmlFor="over" className="label">Over je bedrijf</label>
              <textarea id="over" rows={6} defaultValue={pro.about} className="input min-h-36 resize-y" />
            </div>
            <div>
              <label htmlFor="specialisaties" className="label">Specialisaties</label>
              <input id="specialisaties" defaultValue={pro.specialisations.join(", ")} className="input" />
              <p className="mt-1.5 text-sm text-stone-500">Scheid met komma&apos;s.</p>
            </div>
            <div>
              <label htmlFor="certificaten" className="label">Certificaten en lidmaatschappen</label>
              <textarea id="certificaten" rows={3} defaultValue={pro.certifications.join("\n")} className="input resize-y" />
              <p className="mt-1.5 text-sm text-stone-500">Eén per regel. We kunnen om een bewijs vragen.</p>
            </div>
          </SettingsForm>
        </Panel>

        <Panel title="Projectfoto's">
          <div className="p-5">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {pro.projects.map((p) => (
                <li key={p.title}>
                  <Photo src={p.src} alt={p.title} className="aspect-[4/3] rounded-lg" sizes="240px" />
                  <p className="mt-1.5 truncate text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-stone-500">{p.place} · {p.year}</p>
                </li>
              ))}
              <li>
                <label className="flex aspect-[4/3] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-stone-300 text-sm font-medium text-stone-600 hover:border-brand-600 hover:text-brand-700">
                  Project toevoegen
                  <input type="file" accept="image/*" multiple className="sr-only" />
                </label>
              </li>
            </ul>
            <p className="mt-4 text-sm text-stone-500">Gebruik je eigen foto&apos;s van afgerond werk. Zorg dat er geen personen of huisnummers herkenbaar zijn.</p>
          </div>
        </Panel>
      </div>
    </>
  );
}
