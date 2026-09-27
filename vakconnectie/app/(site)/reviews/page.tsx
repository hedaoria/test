import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { ReviewItem } from "@/components/pros/ReviewList";
import { listAllReviews, listProfessionals } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Reviews: zo werken beoordelingen op Vakconnectie",
  description:
    "Beoordelingen op Vakconnectie komen alleen van opdrachtgevers die echt met een vakman hebben gewerkt. Lees hoe reviews werken en bekijk recente ervaringen.",
  path: "/reviews",
});

const RULES = [
  { title: "Alleen na een echte klus", text: "Je kunt alleen een review schrijven als je via Vakconnectie met de vakman in contact bent geweest en de klus is afgerond." },
  { title: "Vier onderdelen", text: "Naast een totaalscore geef je een cijfer voor kwaliteit, communicatie, afspraken nakomen en prijs/kwaliteit." },
  { title: "Vakmensen mogen reageren", text: "Elke vakman kan openbaar reageren op een review. Zo zie je ook hoe iemand omgaat met feedback." },
  { title: "We verwijderen niets zomaar", text: "Ook minder goede reviews blijven staan. We halen alleen reviews weg die beledigend zijn, persoonsgegevens bevatten of aantoonbaar niet kloppen." },
];

export default async function ReviewsPage() {
  const [reviews, pros] = await Promise.all([listAllReviews(), listProfessionals()]);
  const recent = reviews.filter((r) => r.status === "gepubliceerd").slice(0, 8);
  const proName = (slug: string) => pros.find((p) => p.slug === slug)?.companyName ?? slug;

  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Reviews", path: "/reviews" }]} />
      <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Reviews op Vakconnectie</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-stone-600">
        Beoordelingen van andere opdrachtgevers helpen je bij het kiezen van een vakman. Daarom letten we goed op dat
        ze eerlijk en bruikbaar zijn.
      </p>

      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {RULES.map((r) => (
          <li key={r.title}>
            <h2 className="font-semibold">{r.title}</h2>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-stone-600">{r.text}</p>
          </li>
        ))}
      </ul>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold">Recente beoordelingen</h2>
        <div className="mt-2 divide-y divide-stone-200">
          {recent.map((r) => (
            <div key={r.id}>
              <ReviewItem review={r} />
              <p className="-mt-3 pb-5 text-sm">
                Voor{" "}
                <Link href={`/vakman/${r.professionalSlug}`} className="font-semibold text-brand-700 hover:underline">
                  {proName(r.professionalSlug)}
                </Link>
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/account/reviews" size="lg">Schrijf een review</ButtonLink>
        <ButtonLink href="/vakmensen" variant="secondary" size="lg">Bekijk vakmensen</ButtonLink>
      </div>
    </div>
  );
}
