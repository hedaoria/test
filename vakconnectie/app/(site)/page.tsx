import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { RatingInline } from "@/components/ui/Stars";
import { Avatar } from "@/components/ui/Avatar";
import { CategoryGrid } from "@/components/pros/CategoryGrid";
import { ProCard } from "@/components/pros/ProCard";
import { ProSearchForm } from "@/components/pros/ProSearchForm";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { TrustPoints } from "@/components/home/TrustPoints";
import { listCategories, listCities, listProfessionals } from "@/lib/repository";
import { organizationLd, websiteLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Vakconnectie | Vind een betrouwbare vakman bij jou in de buurt" },
  description:
    "Plaats gratis je klus en kom in contact met schilders, loodgieters, elektriciens en andere vakmensen uit jouw regio. Vergelijk profielen en beoordelingen en kies zelf.",
  alternates: { canonical: "/" },
};

const EXAMPLES = [
  { label: "Badkamer renoveren", category: "badkamerspecialist" },
  { label: "Schilder gezocht", category: "schilder" },
  { label: "Lekkage repareren", category: "loodgieter" },
];

export default async function HomePage() {
  const [categories, cities, pros] = await Promise.all([listCategories(), listCities(), listProfessionals()]);
  const featured = [...pros]
    .filter((p) => p.rating.count >= 3)
    .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, 3);
  const heroPro = pros.find((p) => p.slug === "van-dijk-schilderwerken") ?? pros[0]!;

  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd()]} />

      {/* Hero */}
      <section className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
          <div>
            <h1 className="text-[2.1rem] font-semibold leading-[1.1] sm:text-5xl lg:text-[3.35rem]">
              De juiste vakman voor jouw klus
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-600 sm:text-xl">
              Plaats je klus en kom eenvoudig in contact met vakmensen bij jou in de buurt.
            </p>

            <form action="/klus-plaatsen" method="get" className="mt-8 max-w-xl">
              <label htmlFor="hero-wat" className="mb-2 block font-semibold text-stone-900">
                Wat moet er gedaan worden?
              </label>
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

            <div className="mt-8">
              <Link href="/vakmensen" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800 hover:underline">
                Bekijk vakmensen <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="relative hidden sm:block">
            <Photo
              alt="Vakman aan het werk in een Nederlandse woning"
              tone="sand"
              priority
              className="aspect-[4/3] w-full rounded-2xl lg:aspect-[4/4.4]"
            />
            <div className="absolute -bottom-6 left-6 right-6 rounded-xl border border-stone-200 bg-white p-4 shadow-[0_12px_32px_-16px_rgb(28_25_23/0.35)] lg:-left-8 lg:right-auto lg:w-80">
              <p className="text-xs font-medium text-stone-500">Nieuwe reactie op je klus</p>
              <div className="mt-2 flex items-center gap-3">
                <Avatar name={heroPro.companyName} size="sm" />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-stone-900">{heroPro.companyName}</p>
                  <RatingInline average={heroPro.rating.average} count={heroPro.rating.count} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hoe werkt het */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Hoe werkt Vakconnectie?" />
          <HowItWorksSteps className="mt-10" />
          <div className="mt-10">
            <ButtonLink href="/klus-plaatsen" size="lg">Plaats gratis je klus</ButtonLink>
          </div>
        </div>
      </section>

      {/* Vakgebieden */}
      <section className="border-t border-stone-200 bg-stone-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Populaire vakgebieden" intro="Kies een vakgebied om vakmensen te bekijken of direct je klus te plaatsen." />
          </div>
          <div className="mt-8">
            <CategoryGrid items={categories} />
          </div>
        </div>
      </section>

      {/* Zoeken */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Vind een vakman in jouw buurt" intro="Zoek op vakgebied en postcode of plaats, en bekijk wie er bij jou in de regio werkt." />
          <ProSearchForm compact className="mt-8" />
          {featured.length > 0 && (
            <>
              <h3 className="mt-12 text-lg font-semibold">Goed beoordeeld door klanten</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((p) => (
                  <ProCard key={p.slug} pro={p} headingLevel="h3" />
                ))}
              </div>
              <div className="mt-6">
                <Link href="/vakmensen" className="font-semibold text-brand-700 hover:underline">
                  Alle vakmensen bekijken →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

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
          <div className="grid overflow-hidden rounded-2xl bg-brand-800 text-white lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <p className="text-sm font-semibold text-brand-200">Ben jij vakman?</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Vind nieuwe opdrachten in jouw regio</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-brand-50/90">
                Met Vakconnectie kun je opdrachten vinden die aansluiten bij jouw vakgebied en werkgebied. Maak een
                professioneel profiel, laat je werk zien en kom rechtstreeks in contact met potentiële klanten.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/registreren?rol=vakman" variant="light" size="lg">Aanmelden als vakman</ButtonLink>
                <ButtonLink href="/voor-vakmensen" size="lg" className="border border-brand-600 bg-transparent hover:bg-brand-700">
                  Meer informatie
                </ButtonLink>
              </div>
            </div>
            <Photo alt="Vakman met gereedschap bij een woning" tone="brand" className="min-h-56 lg:min-h-full" />
          </div>
        </div>
      </section>

      {/* Regio's */}
      <section className="border-t border-stone-200 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Vakmensen per regio" />
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
