import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { CategoryGrid } from "@/components/pros/CategoryGrid";
import { ProCard } from "@/components/pros/ProCard";
import { WhatsAppIcon } from "@/components/forms/SendButtons";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { TrustPoints } from "@/components/home/TrustPoints";
import { listCategories, listCities, listProfessionals } from "@/lib/repository";
import { organizationLd, websiteLd } from "@/lib/seo";
import { COMPANY } from "@/lib/site";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "Vakconnectie | De juiste vakman voor jouw klus" },
  description:
    "Doe gratis en vrijblijvend een projectaanvraag. Vakconnectie helpt je bij het vinden van een passende zelfstandige vakman, met gecontroleerde KvK-inschrijving.",
  alternates: { canonical: "/" },
};

const EXAMPLES = [
  { label: "Badkamer renoveren", category: "badkamerspecialist" },
  { label: "Schilder gezocht", category: "schilder" },
  { label: "Lekkage repareren", category: "loodgieter" },
];

export default async function HomePage() {
  const [categories, cities, pros] = await Promise.all([listCategories(), listCities(), listProfessionals()]);

  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd()]} />

      {/* Hero */}
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
          <div>
            <h1 className="text-[2.1rem] font-semibold leading-[1.1] sm:text-5xl lg:text-[3.35rem]">De juiste vakman voor jouw klus</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-600 sm:text-xl">
              Vertel ons wat je wilt laten doen. Wij helpen je bij het vinden van een passende zelfstandige vakman.
            </p>

            <form action="/klus-plaatsen" method="get" className="mt-8 max-w-xl">
              <label htmlFor="hero-wat" className="mb-2 block font-semibold text-stone-900">Wat moet er gedaan worden?</label>
              <div className="flex flex-col gap-3 sm:flex-row sm:rounded-xl sm:border sm:border-stone-300 sm:bg-white sm:p-1.5 sm:shadow-sm sm:focus-within:border-brand-600 sm:focus-within:ring-4 sm:focus-within:ring-brand-100">
                <input
                  id="hero-wat"
                  name="wat"
                  placeholder="Bijv. badkamer renoveren"
                  className="input h-14 text-[1.0625rem] sm:h-12 sm:border-0 sm:shadow-none sm:focus:shadow-none"
                  autoComplete="off"
                />
                <button type="submit" className="h-14 shrink-0 rounded-lg bg-brand-700 px-6 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-brand-800 sm:h-12">
                  Plaats je klus
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-stone-600">Gratis en vrijblijvend.</p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-stone-500">Bijvoorbeeld:</span>
              {EXAMPLES.map((e) => (
                <Link
                  key={e.label}
                  href={`/klus-plaatsen?vakgebied=${e.category}&wat=${encodeURIComponent(e.label)}`}
                  className="rounded-full border border-stone-300 bg-white px-3 py-1 text-stone-700 transition-colors hover:border-brand-600 hover:text-brand-700"
                >
                  {e.label}
                </Link>
              ))}
            </div>
          </div>

          <aside aria-labelledby="direct-contact" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_12px_32px_-20px_rgb(28_25_23/0.35)] sm:p-8">
            <h2 id="direct-contact" className="text-lg font-semibold">Liever direct contact?</h2>
            <p className="mt-1.5 text-stone-600">Stuur ons een bericht met wat je wilt laten doen. Foto’s zijn welkom.</p>
            <div className="mt-6 space-y-3">
              <a
                href={whatsappUrl("Hallo Vakconnectie, ik zoek een vakman voor: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg bg-brand-700 px-4 py-3.5 font-semibold text-white transition-colors hover:bg-brand-800"
              >
                <WhatsAppIcon className="h-5 w-5" /> Stuur een WhatsApp
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 rounded-lg border border-stone-300 px-4 py-3.5 font-semibold text-stone-900 transition-colors hover:border-stone-400 hover:bg-stone-50">
                <Mail className="h-5 w-5 text-stone-500" aria-hidden="true" /> {COMPANY.email}
              </a>
              <a href={`tel:${COMPANY.phoneHref}`} className="flex items-center gap-3 rounded-lg border border-stone-300 px-4 py-3.5 font-semibold text-stone-900 transition-colors hover:border-stone-400 hover:bg-stone-50">
                <Phone className="h-5 w-5 text-stone-500" aria-hidden="true" /> {COMPANY.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Hoe werkt het */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Hoe werkt Vakconnectie?" />
          <HowItWorksSteps className="mt-10" />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/klus-plaatsen" size="lg">Doe gratis een projectaanvraag</ButtonLink>
            <ButtonLink href="/hoe-werkt-het" variant="secondary" size="lg">Meer over de werkwijze</ButtonLink>
          </div>
        </div>
      </section>

      {/* Vakgebieden */}
      <section className="border-t border-stone-200 bg-stone-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Populaire vakgebieden" intro="Kies een vakgebied en start direct je projectaanvraag." />
          <div className="mt-8">
            <CategoryGrid items={categories} />
          </div>
        </div>
      </section>

      {/* Vakmensen: alleen tonen zodra er openbare profielen zijn */}
      {pros.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading title="Vakmensen bij Vakconnectie" />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pros.slice(0, 3).map((p) => (
                <ProCard key={p.slug} pro={p} />
              ))}
            </div>
            <Link href="/vakmensen" className="mt-6 inline-block font-semibold text-brand-700 hover:underline">Alle vakmensen bekijken →</Link>
          </div>
        </section>
      )}

      {/* Vertrouwen */}
      <section className="border-y border-stone-200 bg-[#faf8f5] py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Met vertrouwen een vakman kiezen" />
          <TrustPoints className="mt-10" />
        </div>
      </section>

      {/* Voor vakmensen */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="rounded-2xl bg-brand-800 p-8 text-white sm:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-200">Ben jij vakman?</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Kom in contact met nieuwe klanten</h2>
              <p className="mt-4 leading-relaxed text-brand-50/90">
                Ben je zelfstandig vakman met een KvK-inschrijving? Meld je aan bij Vakconnectie. Na controle van je
                inschrijving kunnen we je voorstellen aan klanten met een project dat bij je vakgebied past.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/aanmelden-als-vakman" variant="light" size="lg">Aanmelden als vakman</ButtonLink>
                <ButtonLink href="/voor-vakmensen" size="lg" className="border border-brand-600 bg-transparent hover:bg-brand-700">
                  Meer informatie
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regio's */}
      <section className="border-t border-stone-200 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Vakman vinden per regio" />
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-6">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/vakmensen/${c.slug}`} className="text-stone-700 hover:text-brand-700 hover:underline">
                  Vakman in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
