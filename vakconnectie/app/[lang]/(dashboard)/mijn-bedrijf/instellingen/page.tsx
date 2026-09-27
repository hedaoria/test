import type { Metadata } from "next";
import Link from "next/link";
import { Panel, PageTitle } from "@/components/dashboard/Panels";
import { SettingsForm, Toggle } from "@/components/dashboard/SettingsForm";
import { findUser } from "@/lib/repository";

export const metadata: Metadata = { title: "Instellingen" };

export default async function ProSettingsPage() {
  const user = await findUser("u-vak-1");
  return (
    <>
      <PageTitle title="Instellingen" />
      <div className="max-w-2xl space-y-6">
        <Panel title="Contactpersoon">
          <SettingsForm>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="voornaam" className="label">Voornaam</label>
                <input id="voornaam" defaultValue={user?.firstName} className="input" />
              </div>
              <div>
                <label htmlFor="achternaam" className="label">Achternaam</label>
                <input id="achternaam" defaultValue={user?.lastName} className="input" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="label">E-mailadres</label>
              <input id="email" type="email" defaultValue={user?.email} className="input" />
            </div>
          </SettingsForm>
        </Panel>
        <Panel title="E-mailnotificaties">
          <SettingsForm>
            <Toggle name="nieuwe-opdracht" label="Nieuwe opdracht in mijn werkgebied" defaultChecked />
            <Toggle name="dagoverzicht" label="Dagelijks overzicht in plaats van losse e-mails" />
            <Toggle name="bericht" label="Nieuw bericht van een opdrachtgever" defaultChecked />
            <Toggle name="review" label="Nieuwe review" defaultChecked />
          </SettingsForm>
        </Panel>
        <Panel title="Beveiliging">
          <div className="p-5 text-[0.9375rem]">
            <Link href="/wachtwoord-vergeten" className="font-medium text-brand-700 hover:underline">Wachtwoord wijzigen</Link>
          </div>
        </Panel>
      </div>
    </>
  );
}
