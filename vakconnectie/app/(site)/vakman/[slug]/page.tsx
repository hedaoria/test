import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Avatar } from "@/components/ui/Avatar";
import { Photo } from "@/components/ui/Photo";
import { JsonLd } from "@/components/ui/JsonLd";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { Stars } from "@/components/ui/Stars";
import { ContactPro } from "@/components/pros/ContactPro";
import { RatingOverview, ReviewItem } from "@/components/pros/ReviewList";
import { categoryName } from "@/lib/data/categories";
import { findProfessional, listProfessionals, listReviewsFor } from "@/lib/repository";
import { formatDate, formatRating } from "@/lib/format";
import { pageMetadata, professionalLd } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listProfessionals()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/vakman/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const pro = await findProfessional(slug);
  if (!pro) return {};
  const cat = categoryName(pro.categories[0]!).toLowerCase();
  const rating = pro.rating.count ? ` Beoordeeld met een ${formatRating(pro.rating.average)} door ${pro.rating.count} klanten.` : "";
  return pageMetadata({
    title: `${pro.companyName}, ${cat} in ${pro.place}`,
    description: `${pro.tagline}${rating} Bekijk projecten, werkgebied en beschikbaarheid.`,
    path: `/vakman/${pro.slug}`,
  });
}

export default async function ProfilePage(props: PageProps<"/vakman/[slug]">) {
  const { slug } = await props.params;
  const pro = await findProfessional(slug);
  if (!pro) notFound();
  const reviews = await listReviewsFor(slug);
  const categoryNames = pro.categories.map(categoryName);
  const primary = pro.categories[0]!;

  return (
    <>
      <JsonLd data={professionalLd(pro, reviews, categoryNames)} />

      <div className="border-b border-stone-200 bg-[#faf8f5]">
        <div className="container-page py-6 sm:py-8">
          <Breadcrumbs
            items={[
              { name: categoryName(primary) , path: `/${primary}` },
              { name: pro.companyName, path: `/vakman/${pro.slug}` },
            ]}
          />
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar name={pro.companyName} src={pro.logo} size="xl" className="bg-white" />
            <div className="min-w-0">
              <h1 className="flex flex-wrap items-center gap-2 text-2xl font-semibold sm:text-3xl">
                {pro.companyName}
                {pro.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-800">
                    <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Geverifieerd
                  </span>
                )}
              </h1>
              <p className="mt-1 text-stone-700">{categoryNames.join(" · ")}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-600">
                {pro.rating.count > 0 && (
                  <a href="#reviews" className="inline-flex items-center gap-1.5 hover:text-brand-700">
                    <Stars value={pro.rating.average} size="sm" />
                    <span className="font-semibold text-stone-900">{formatRating(pro.rating.average)}</span>
                    <span>({pro.rating.count} {pro.rating.count === 1 ? "beoordeling" : "beoordelingen"})</span>
                  </a>
                )}
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-stone-400" aria-hidden="true" /> {pro.place}
                </span>
                <span>{pro.yearsExperience} jaar ervaring</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_20rem] lg:gap-14 lg:py-14">
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="over">
            <h2 id="over" className="text-xl font-semibold">Over {pro.companyName}</h2>
            <p className="mt-2 text-lg leading-relaxed text-stone-700">{pro.tagline}</p>
            <p className="mt-3 leading-relaxed text-stone-700">{pro.about}</p>
            <h3 className="mt-8 font-semibold">Specialisaties</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {pro.specialisations.map((s) => (
                <li key={s} className="rounded-full bg-stone-100 px-3 py-1.5 text-sm text-stone-800">{s}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="projecten">
            <h2 id="projecten" className="text-xl font-semibold">Afgeronde projecten</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {pro.projects.map((p, i) => (
                <li key={p.title}>
                  <figure>
                    <Photo
                      src={p.src}
                      alt={`${p.title} in ${p.place}`}
                      tone={(["stone", "sand", "brand"] as const)[i % 3]}
                      className="aspect-[4/3] rounded-xl"
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    />
                    <figcaption className="mt-2">
                      <span className="font-medium text-stone-900">{p.title}</span>
                      <span className="block text-sm text-stone-500">{p.place} · {p.year}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>

          {reviews.length > 0 && (
            <section id="reviews" aria-labelledby="reviews-titel" className="scroll-mt-24">
              <h2 id="reviews-titel" className="text-xl font-semibold">Beoordelingen</h2>
              <div className="mt-5">
                <RatingOverview summary={pro.rating} reviews={reviews} />
              </div>
              <div className="mt-2 divide-y divide-stone-200">
                {reviews.map((r) => (
                  <ReviewItem key={r.id} review={r} companyName={pro.companyName} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="text-sm font-semibold text-stone-900">Beschikbaarheid</p>
            <div className="mt-2">
              <AvailabilityBadge availability={pro.availability} />
            </div>
            <div className="mt-5">
              <ContactPro slug={pro.slug} companyName={pro.companyName} primaryCategory={primary} />
            </div>
          </div>

          <div className="card divide-y divide-stone-200">
            <section className="p-5">
              <h2 className="text-sm font-semibold">Bedrijfsgegevens</h2>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="text-stone-500">Vestigingsplaats</dt>
                <dd className="text-stone-900">{pro.place}</dd>
                <dt className="text-stone-500">Opgericht</dt>
                <dd className="text-stone-900">{pro.foundedYear}</dd>
                <dt className="text-stone-500">KvK</dt>
                <dd className="text-stone-900">{pro.verified ? "Gecontroleerd" : "Wordt gecontroleerd"}</dd>
                <dt className="text-stone-500">Contactpersoon</dt>
                <dd className="text-stone-900">{pro.contactName}</dd>
                <dt className="text-stone-500">Lid sinds</dt>
                <dd className="text-stone-900">{formatDate(pro.memberSince)}</dd>
              </dl>
            </section>
            <section className="p-5">
              <h2 className="text-sm font-semibold">Werkgebied</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">
                Tot {pro.radiusKm} km rond {pro.place}, waaronder {pro.workArea.join(", ")}.
              </p>
            </section>
            {pro.certifications.length > 0 && (
              <section className="p-5">
                <h2 className="text-sm font-semibold">Certificaten en lidmaatschappen</h2>
                <ul className="mt-2 space-y-1.5 text-sm text-stone-700">
                  {pro.certifications.map((c) => (
                    <li key={c} className="flex gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
