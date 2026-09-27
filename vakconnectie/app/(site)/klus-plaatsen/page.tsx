import type { Metadata } from "next";
import { JobWizard } from "@/components/forms/JobWizard";
import { findProfessional } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projectaanvraag doen",
  description:
    "Doe gratis en vrijblijvend een projectaanvraag. Vakconnectie helpt je bij het vinden van een passende zelfstandige vakman. Versturen gaat via WhatsApp of e-mail.",
  path: "/klus-plaatsen",
});

function param(v: string | string[] | undefined) {
  return (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
}

export default async function PlaceJobPage(props: PageProps<"/klus-plaatsen">) {
  const sp = await props.searchParams;
  const vakmanSlug = param(sp.vakman);
  const pro = vakmanSlug ? await findProfessional(vakmanSlug) : undefined;

  return (
    <div className="bg-[#faf8f5]">
      <div className="container-page py-8 sm:py-12">
        <div className="mx-auto mb-8 max-w-2xl">
          <h1 className="text-3xl font-semibold sm:text-4xl">Projectaanvraag doen</h1>
          <p className="mt-2 text-lg text-stone-600">Gratis en vrijblijvend. Je verstuurt je aanvraag aan het eind via WhatsApp of e-mail.</p>
        </div>
        <JobWizard
          initialCategory={param(sp.vakgebied) ?? pro?.categories[0]}
          initialTitle={param(sp.wat)?.slice(0, 80)}
          preferredProfessional={pro?.companyName}
        />
      </div>
    </div>
  );
}
