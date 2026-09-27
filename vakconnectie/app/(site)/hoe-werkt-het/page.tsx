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
    "Vakconnectie is een bemiddelingsbedrijf dat je helpt bij het vinden van een passende zelfstandige vakman. Een projectaanvraag is gratis en vrijblijvend.",
  path: "/hoe-werkt-het",
});

const DETAILS = [
  {
    title: "Je doet een projectaanvraag",
    text: "Je vult in wat er moet gebeuren, waar en wanneer. Aan het eind verstuur je je aanvraag via WhatsApp of e-mail. Foto’s kun je meesturen. Een projectaanvraag is gratis en vrijblijvend.",
  },
  {
    title: "Wij zoeken een passende vakman",
    text: "Vakconnectie werkt als bemiddelingsbedrijf. Op basis van je aanvraag zoeken we een zelfstandige vakman die bij je project past.",
  },
  {
    title: "We controleren de KvK-inschrijving",
    text: "Voordat we een vakman aan je voorstellen, controleren we de inschrijving bij de Kamer van Koophandel.",
  },
  {
    title: "We brengen je met elkaar in contact",
    text: "Waar dat nodig is voor je aanvraag, delen we je gegevens met de geselecteerde vakman, zodat jullie contact kunnen opnemen.",
  },
  {
    title: "Jullie maken samen schriftelijke afspraken",
    text: "Prijs, planning, werkzaamheden en garantie spreek je rechtstreeks met de vakman af. Leg deze afspraken samen schriftelijk vast.",
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
            Vakconnectie is een bemiddelingsbedrijf. We helpen klanten bij het vinden van passende zelfstandige
            vakmensen, en vakmensen bij het vinden van nieuwe klanten.
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
          <ButtonLink href="/klus-plaatsen" size="lg">Doe gratis een projectaanvraag</ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">Neem contact op</ButtonLink>
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
