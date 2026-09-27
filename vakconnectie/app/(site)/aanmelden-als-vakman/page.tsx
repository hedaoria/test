import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProSignupForm } from "@/components/forms/ProSignupForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Aanmelden als zelfstandig vakman",
  description: "Meld je aan als zelfstandig vakman bij Vakconnectie. We controleren je KvK-inschrijving voordat we je aan klanten voorstellen.",
  path: "/aanmelden-als-vakman",
});

export default function ProSignupPage() {
  return (
    <div className="bg-[#faf8f5]">
      <div className="container-page py-8 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <Breadcrumbs items={[{ name: "Voor vakmensen", path: "/voor-vakmensen" }, { name: "Aanmelden", path: "/aanmelden-als-vakman" }]} />
          <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Aanmelden als zelfstandig vakman</h1>
          <p className="mt-3 text-lg leading-relaxed text-stone-600">
            Vul je gegevens in en verstuur je aanmelding via WhatsApp of e-mail. Voordat we je aan een klant voorstellen,
            controleren we je inschrijving bij de Kamer van Koophandel.
          </p>
          <div className="mt-8">
            <ProSignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
