import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { COMPANY } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Over ons",
  description: "Vakconnectie is een bemiddelingsbedrijf uit Haarlem dat klanten helpt bij het vinden van passende zelfstandige vakmensen.",
  path: "/over-ons",
});

export default function AboutPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Over ons", path: "/over-ons" }]} />
      <div className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Over Vakconnectie</h1>
        <div className="prose-vc mt-5 text-lg">
          <p>
            Vakconnectie is een bemiddelingsbedrijf. We helpen klanten bij het vinden van passende zelfstandige vakmensen
            voor werkzaamheden in en rond het huis.
          </p>
          <p>
            Een projectaanvraag is voor klanten gratis en vrijblijvend. Voordat we een vakman aan een klant voorstellen,
            controleren we de inschrijving bij de Kamer van Koophandel. Klant en vakman maken daarna zelf schriftelijke
            afspraken over prijs, planning, werkzaamheden en garantie.
          </p>
        </div>
        <dl className="mt-10 grid gap-4 rounded-2xl border border-stone-200 p-6 text-[0.9375rem] sm:grid-cols-2">
          <div><dt className="text-stone-500">Bedrijfsnaam</dt><dd className="font-medium">{COMPANY.legalName}</dd></div>
          <div><dt className="text-stone-500">Vestigingsplaats</dt><dd className="font-medium">{COMPANY.city}</dd></div>
          <div><dt className="text-stone-500">KvK-nummer</dt><dd className="font-medium">{COMPANY.kvk}</dd></div>
          <div><dt className="text-stone-500">E-mail</dt><dd className="font-medium"><a href={`mailto:${COMPANY.email}`} className="hover:text-brand-700">{COMPANY.email}</a></dd></div>
        </dl>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/klus-plaatsen" size="lg">Doe een projectaanvraag</ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">Neem contact op</ButtonLink>
        </div>
      </div>
    </div>
  );
}
