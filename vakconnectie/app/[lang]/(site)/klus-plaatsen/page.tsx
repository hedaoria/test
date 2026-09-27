import type { Metadata } from "next";
import { JobWizard } from "@/components/forms/JobWizard";
import { findProfessional } from "@/lib/repository";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/klus-plaatsen">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).requestPage;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/klus-plaatsen", locale });
}

function param(v: string | string[] | undefined) {
  return (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
}

export default async function PlaceJobPage(props: PageProps<"/[lang]/klus-plaatsen">) {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).requestPage;
  const sp = await props.searchParams;
  const vakmanSlug = param(sp.vakman);
  const pro = vakmanSlug ? await findProfessional(vakmanSlug) : undefined;

  return (
    <div className="bg-[#faf8f5]">
      <div className="container-page py-8 sm:py-12">
        <div className="mx-auto mb-8 max-w-2xl">
          <h1 className="text-3xl font-semibold sm:text-4xl">{t.h1}</h1>
          <p className="mt-2 text-lg text-stone-600">{t.intro}</p>
        </div>
        <JobWizard
          locale={locale}
          initialCategory={param(sp.vakgebied) ?? pro?.categories[0]}
          initialTitle={param(sp.wat)?.slice(0, 80)}
          preferredProfessional={pro?.companyName}
        />
      </div>
    </div>
  );
}
