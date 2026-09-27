import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { proFaqs } from "@/lib/data/content";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Voor vakmensen: aanmelden als zelfstandig vakman",
  description:
    "Ben je zelfstandig vakman met een KvK-inschrijving? Meld je aan bij Vakconnectie. Na controle van je inschrijving kunnen we je voorstellen aan klanten.",
  path: "/voor-vakmensen",
});

const PRO_STEPS = [
  { title: "Meld je aan", text: "Vul het aanmeldformulier in met je bedrijfsgegevens, vakgebied en KvK-nummer, en verstuur het via WhatsApp of e-mail." },
  { title: "Wij controleren je KvK-inschrijving", text: "Voordat we je aan een klant voorstellen, controleren we je inschrijving bij de Kamer van Koophandel." },
  { title: "Kennismaken met de klant", text: "Past een aanvraag bij je vakgebied, dan brengen we je in contact met de klant. Samen leggen jullie de afspraken schriftelijk vast." },
];

export default function ForProsPage() {
  return (
    <>
      <JsonLd data={faqLd(proFaqs)} />
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page py-8 sm:py-14">
          <Breadcrumbs items={[{ name: "Voor vakmensen", path: "/voor-vakmensen" }]} />
          <div className="mt-6 max-w-2xl">
            <h1 className="text-3xl font-semibold sm:text-[2.75rem] sm:leading-tight">Kom in contact met nieuwe klanten</h1>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              Vakconnectie helpt klanten bij het vinden van passende zelfstandige vakmensen. Ben je zelfstandig vakman met
              een KvK-inschrijving? Meld je dan aan.
            </p>
            <div className="mt-8">
              <ButtonLink href="/aanmelden-als-vakman" size="lg">Aanmelden als vakman</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section id="werkwijze" className="container-page scroll-mt-20 py-14 sm:py-20">
        <h2 className="text-2xl font-semibold sm:text-3xl">Hoe werkt het voor vakmensen?</h2>
        <HowItWorksSteps steps={PRO_STEPS} className="mt-10" />
      </section>

      <section className="border-t border-stone-200 bg-stone-50 py-14 sm:py-20">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Jij bent zelfstandig</h2>
            <p className="mt-3 leading-relaxed text-stone-700">
              Vakconnectie bemiddelt; het werk voer je als zelfstandig vakman uit. Afspraken over prijs, planning,
              werkzaamheden en garantie maak je rechtstreeks met de klant en leg je samen schriftelijk vast.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">KvK-inschrijving vereist</h2>
            <p className="mt-3 leading-relaxed text-stone-700">
              We stellen alleen vakmensen voor van wie we de inschrijving bij de Kamer van Koophandel hebben
              gecontroleerd. Vermeld daarom je KvK-nummer bij je aanmelding.
            </p>
          </div>
        </div>
      </section>

      <section id="veelgestelde-vragen" className="container-page grid scroll-mt-20 gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl font-semibold">Veelgestelde vragen van vakmensen</h2>
        <FaqList faqs={proFaqs} />
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-800 p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">Aanmelden als vakman</h2>
            <p className="mt-2 text-brand-50/90">Verstuur je aanmelding via WhatsApp of e-mail.</p>
          </div>
          <ButtonLink href="/aanmelden-als-vakman" variant="light" size="lg">Naar het aanmeldformulier</ButtonLink>
        </div>
      </section>
    </>
  );
}
