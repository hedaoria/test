import type { Metadata } from "next";
import { JobWizard } from "@/components/forms/JobWizard";
import { findProfessional } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Plaats je klus",
  description:
    "Plaats gratis je klus in een paar korte stappen. Vakmensen uit jouw regio kunnen reageren, jij vergelijkt en kiest.",
  alternates: { canonical: "/klus-plaatsen" },
};

function param(v: string | string[] | undefined) {
  return (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
}

export default async function PlaceJobPage(props: PageProps<"/klus-plaatsen">) {
  const sp = await props.searchParams;
  const vakmanSlug = param(sp.vakman);
  const pro = vakmanSlug ? await findProfessional(vakmanSlug) : undefined;
  const title = param(sp.wat)?.slice(0, 80);

  return (
    <div className="bg-[#faf8f5]">
      <div className="container-page py-8 sm:py-12">
        <div className="mx-auto mb-8 max-w-2xl">
          <h1 className="text-3xl font-semibold sm:text-4xl">Plaats je klus</h1>
          <p className="mt-2 text-lg text-stone-600">Gratis en vrijblijvend. Het invullen duurt een paar minuten.</p>
        </div>
        <JobWizard
          initialCategory={param(sp.vakgebied) ?? pro?.categories[0]}
          initialTitle={title}
          invitedProfessional={pro ? { slug: pro.slug, companyName: pro.companyName } : undefined}
        />
      </div>
    </div>
  );
}
