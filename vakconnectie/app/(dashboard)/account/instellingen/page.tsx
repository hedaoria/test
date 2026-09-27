import type { Metadata } from "next";
import Link from "next/link";
import { Panel, PageTitle } from "@/components/dashboard/Panels";
import { SettingsForm, Toggle } from "@/components/dashboard/SettingsForm";
import { currentCustomerId } from "@/lib/dashboard";
import { findUser } from "@/lib/repository";

export const metadata: Metadata = { title: "Profielinstellingen" };

export default async function CustomerSettingsPage() {
  const user = await findUser(currentCustomerId);
  return (
    <>
      <PageTitle title="Profielinstellingen" />
      <div className="max-w-2xl space-y-6">
        <Panel title="Persoonlijke gegevens">
          <SettingsForm>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="voornaam" className="label">Voornaam</label>
                <input id="voornaam" defaultValue={user?.firstName} className="input" autoComplete="given-name" />
              </div>
              <div>
                <label htmlFor="achternaam" className="label">Achternaam</label>
                <input id="achternaam" defaultValue={user?.lastName} className="input" autoComplete="family-name" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="label">E-mailadres</label>
              <input id="email" type="email" defaultValue={user?.email} className="input" autoComplete="email" />
              <p className="mt-1.5 text-sm text-stone-500">{user?.emailVerified ? "Bevestigd" : "Nog niet bevestigd"}</p>
            </div>
            <div>
              <label htmlFor="telefoon" className="label">Telefoonnummer</label>
              <input id="telefoon" type="tel" className="input" autoComplete="tel" placeholder="06 12345678" />
            </div>
          </SettingsForm>
        </Panel>

        <Panel title="Notificaties">
          <SettingsForm>
            <Toggle name="mail-reactie" label="E-mail bij een nieuwe reactie" defaultChecked />
            <Toggle name="mail-bericht" label="E-mail bij een nieuw bericht" defaultChecked />
            <Toggle name="mail-tips" label="Af en toe tips en nieuws" description="Maximaal één keer per maand." />
          </SettingsForm>
        </Panel>

        <Panel title="Wachtwoord en account">
          <div className="space-y-4 p-5 text-[0.9375rem]">
            <p>
              <Link href="/wachtwoord-vergeten" className="font-medium text-brand-700 hover:underline">Wachtwoord wijzigen</Link>
            </p>
            <p className="text-stone-600">
              Wil je je account verwijderen? Neem <Link href="/contact" className="font-medium text-brand-700 hover:underline">contact</Link> met ons op. We verwijderen je gegevens binnen 30 dagen.
            </p>
          </div>
        </Panel>
      </div>
    </>
  );
}
