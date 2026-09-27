import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { TrustPoints } from "@/components/home/TrustPoints";
import { customerFaqs } from "@/lib/data/content";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hoe werkt Vakconnectie?",
  description:
    "In drie stappen een vakman vinden: plaats je klus, ontvang reacties van vakmensen uit de buurt en kies op basis van profielen en beoordelingen.",
  path: "/hoe-werkt-het",
});

const DETAILS = [
  {
    title: "Je klus plaatsen",
    text: "Je beantwoordt een paar korte vragen: wat moet er gebeuren, waar en wanneer. Foto's toevoegen kan, maar hoeft niet. Plaatsen is gratis.",
  },
  {
    title: "Reacties ontvangen",
    text: "Vakmensen die in jouw regio werken en bij het vakgebied passen, zien je klus. Wie interesse heeft, stuurt je een bericht. Je krijgt een melding bij elke nieuwe reactie.",
  },
  {
    title: "Vragen stellen en afspreken",
    text: "Via de berichten stel je vragen, spreek je een bezichtiging af of vraag je om een prijsopgave. Je adres en telefoonnummer deel je pas als jij dat wilt.",
  },
  {
    title: "Kiezen en laten uitvoeren",
    text: "Je kiest zelf met wie je verdergaat. Prijs en planning spreek je rechtstreeks met de vakman af. Vakconnectie rekent jou daar niets voor.",
  },
  {
    title: "Beoordeling schrijven",
    text: "Na afloop vragen we je om een beoordeling. Zo help je andere opdrachtgevers bij hun keuze, en goede vakmensen aan nieuwe klussen.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={faqLd(customerFaqs)} />
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page py-8 sm:py-14">
          <Breadcrumbs items={[{ name: "Hoe werkt het?", path: "/hoe-werkt-het" }]} />
          <h1 className="mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl">Hoe werkt Vakconnectie?</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-stone-600">
            Vakconnectie brengt je in contact met vakmensen uit de buurt. Jij houdt de regie: je kiest zelf met wie je
            in gesprek gaat en wie de klus uitvoert.
          </p>
          <HowItWorksSteps className="mt-12" />
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <h2 className="text-2xl font-semibold">Stap voor stap</h2>
        <ol className="mt-8 max-w-3xl space-y-8">
          {DETAILS.map((d, i) => (
            <li key={d.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <span className="pt-0.5 text-sm font-semibold text-brand-700">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold">{d.title}</h3>
                <p className="mt-1.5 leading-relaxed text-stone-700">{d.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/klus-plaatsen" size="lg">Plaats gratis je klus</ButtonLink>
          <ButtonLink href="/vakmensen" variant="secondary" size="lg">Bekijk vakmensen</ButtonLink>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-50 py-14 sm:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-semibold">Met vertrouwen een vakman kiezen</h2>
          <TrustPoints className="mt-10" />
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-2xl font-semibold">Veelgestelde vragen</h2>
          <p className="mt-3 text-stone-600">
            Staat je vraag er niet bij? <Link href="/contact" className="font-semibold text-brand-700 hover:underline">Neem contact op</Link>.
          </p>
        </div>
        <FaqList faqs={customerFaqs} />
      </section>
    </>
  );
}
