import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { COMPANY } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vacatures",
  description: "Werken bij Vakconnectie? Bekijk onze openstaande vacatures of stuur een open sollicitatie.",
  path: "/vacatures",
});

export default function VacanciesPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Vacatures", path: "/vacatures" }]} />
      <div className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Werken bij Vakconnectie</h1>
        <p className="mt-3 text-lg leading-relaxed text-stone-600">
          We bouwen aan een platform dat het voor iedereen makkelijker maakt om een goede vakman te vinden. Daar werken we
          aan met een klein team.
        </p>
        <div className="mt-10 rounded-2xl border border-stone-200 p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Op dit moment geen openstaande vacatures</h2>
          <p className="mt-2 leading-relaxed text-stone-600">
            Denk je dat je iets kunt toevoegen? Stuur gerust een open sollicitatie naar{" "}
            <a href={`mailto:${COMPANY.email}`} className="font-semibold text-brand-700 hover:underline">{COMPANY.email}</a>.
            We lezen alles.
          </p>
        </div>
      </div>
    </div>
  );
}
