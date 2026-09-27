import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Over ons",
  description: "Vakconnectie maakt het eenvoudig om een goede vakman in de buurt te vinden. Lees waarom we begonnen en waar we voor staan.",
  path: "/over-ons",
});

const VALUES = [
  { title: "Eerlijk", text: "Geen gekochte plekken bovenaan en geen verborgen kosten voor opdrachtgevers. Beoordelingen komen van echte klanten." },
  { title: "Lokaal", text: "Een goede vakman woont vaak dichterbij dan je denkt. We laten vakmensen zien die in jouw regio werken." },
  { title: "Eenvoudig", text: "Een klus plaatsen moet net zo makkelijk zijn als een bericht sturen. Daar blijven we aan schaven." },
];

export default function AboutPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Over ons", path: "/over-ons" }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Over Vakconnectie</h1>
          <div className="prose-vc mt-5 text-lg">
            <p>
              Iedereen kent het: je wilt iets laten doen in huis, maar waar vind je iemand die het goed doet, op tijd komt
              en een eerlijke prijs vraagt? Vaak vraag je rond in je omgeving en hoop je op het beste.
            </p>
            <p>
              Vakconnectie maakt dat makkelijker. Je beschrijft je klus en vakmensen uit de buurt reageren. Jij vergelijkt
              hun profielen, eerdere projecten en ervaringen van andere klanten, en kiest zelf.
            </p>
            <p>
              Voor vakmensen is het een manier om zonder dure advertenties nieuwe klanten te vinden, dichtbij huis en
              passend bij hun vak.
            </p>
          </div>
        </div>
        <Photo alt="Het team van Vakconnectie" tone="sand" className="aspect-[4/3] rounded-2xl" />
      </div>

      <section className="mt-16 border-t border-stone-200 pt-12">
        <h2 className="text-2xl font-semibold">Waar we voor staan</h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-3">
          {VALUES.map((v) => (
            <li key={v.title}>
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="mt-1.5 leading-relaxed text-stone-600">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/klus-plaatsen" size="lg">Plaats je klus</ButtonLink>
        <ButtonLink href="/contact" variant="secondary" size="lg">Neem contact op</ButtonLink>
      </div>
    </div>
  );
}
