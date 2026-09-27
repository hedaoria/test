import type { Metadata } from "next";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { proFaqs } from "@/lib/data/content";
import { plans } from "@/lib/data/platform";
import { formatEuro } from "@/lib/format";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Voor vakmensen: vind nieuwe opdrachten in jouw regio",
  description:
    "Meld je aan als vakman bij Vakconnectie. Ontvang opdrachten uit jouw werkgebied, laat je werk zien op je eigen profiel en bouw aan je reputatie met reviews.",
  path: "/voor-vakmensen",
});

const PRO_STEPS = [
  { title: "Maak je profiel aan", text: "Vul je bedrijfsgegevens, vakgebieden en werkgebied in. Wij controleren je KvK-inschrijving." },
  { title: "Bekijk opdrachten", text: "In je dashboard zie je opdrachten uit jouw regio die passen bij wat je doet." },
  { title: "Reageer en maak afspraken", text: "Stuur de opdrachtgever een bericht, plan een bezichtiging en doe een voorstel." },
];

const SECTIONS = [
  {
    id: "opdrachten",
    title: "Zo vind je opdrachten",
    text: "Je bepaalt zelf in welke vakgebieden je werkt en tot hoeveel kilometer je wilt reizen. Nieuwe opdrachten binnen dat gebied verschijnen in je dashboard, met het type klus, de plaats, de afstand en de gewenste planning. Je kiest zelf op welke opdrachten je reageert.",
  },
  {
    id: "profiel",
    title: "Je profiel is je visitekaartje",
    text: "Op je openbare profiel laat je zien wie je bent: je bedrijfsgegevens, specialisaties, certificaten en foto's van afgerond werk. Opdrachtgevers bekijken je profiel voordat ze een keuze maken, dus een compleet profiel maakt echt verschil.",
  },
  {
    id: "reviews",
    title: "Reviews die je kunt vertrouwen",
    text: "Alleen opdrachtgevers met wie je via Vakconnectie hebt gewerkt, kunnen een beoordeling schrijven. Ze geven een cijfer voor kwaliteit, communicatie, afspraken nakomen en prijs/kwaliteit. Je kunt op elke review openbaar reageren.",
  },
];

export default function ForProsPage() {
  return (
    <>
      <JsonLd data={faqLd(proFaqs)} />
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page grid items-center gap-10 py-8 sm:py-14 lg:grid-cols-2">
          <div>
            <Breadcrumbs items={[{ name: "Voor vakmensen", path: "/voor-vakmensen" }]} />
            <h1 className="mt-6 text-3xl font-semibold sm:text-[2.75rem] sm:leading-tight">
              Vind nieuwe opdrachten in jouw regio
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              Met Vakconnectie vind je opdrachten die aansluiten bij jouw vakgebied en werkgebied. Maak een professioneel
              profiel, laat je werk zien en kom rechtstreeks in contact met potentiële klanten.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/registreren?rol=vakman" size="lg">Aanmelden als vakman</ButtonLink>
              <ButtonLink href="#kosten" variant="secondary" size="lg">Bekijk de kosten</ButtonLink>
            </div>
          </div>
          <Photo alt="Vakman bespreekt een klus met een opdrachtgever" tone="sand" className="hidden aspect-[4/3] rounded-2xl sm:flex" />
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <h2 className="text-2xl font-semibold sm:text-3xl">Hoe werkt het voor vakmensen?</h2>
        <HowItWorksSteps steps={PRO_STEPS} className="mt-10" />
      </section>

      <section className="border-t border-stone-200 py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-stone-700">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="kosten" className="scroll-mt-20 border-y border-stone-200 bg-stone-50 py-14 sm:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-semibold sm:text-3xl">Wat kost het?</h2>
          <p className="mt-3 max-w-2xl text-lg text-stone-600">
            Geen kosten per reactie of per opdracht, maar een vast bedrag per maand. Maandelijks opzegbaar.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <li
                key={p.id}
                className={clsx(
                  "flex flex-col rounded-2xl border bg-white p-6 sm:p-7",
                  p.highlighted ? "border-brand-600 ring-1 ring-brand-600" : "border-stone-200",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  {p.highlighted && <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-800">Meest gekozen</span>}
                </div>
                <p className="mt-1 text-sm text-stone-600">{p.description}</p>
                <p className="mt-5">
                  <span className="text-3xl font-semibold text-stone-950">{p.priceMonthly === 0 ? "Gratis" : formatEuro(p.priceMonthly)}</span>
                  {p.priceMonthly > 0 && <span className="text-stone-500"> per maand, excl. btw</span>}
                </p>
                <ul className="mt-6 space-y-2.5 text-[0.9375rem]">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={`/registreren?rol=vakman&abonnement=${p.id}`}
                  variant={p.highlighted ? "primary" : "secondary"}
                  className="mt-8"
                >
                  Kies {p.name}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="veelgestelde-vragen" className="container-page grid scroll-mt-20 gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl font-semibold">Veelgestelde vragen van vakmensen</h2>
        <FaqList faqs={proFaqs} />
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-800 p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">Klaar om te beginnen?</h2>
            <p className="mt-2 text-brand-50/90">Aanmelden duurt ongeveer tien minuten.</p>
          </div>
          <ButtonLink href="/registreren?rol=vakman" variant="light" size="lg">Aanmelden als vakman</ButtonLink>
        </div>
      </section>
    </>
  );
}
