import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProSignupForm } from "@/components/forms/ProSignupForm";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/aanmelden-als-vakman">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).signupPage;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/aanmelden-als-vakman", locale });
}

export default async function ProSignupPage(props: PageProps<"/[lang]/aanmelden-als-vakman">) {
  const locale = await getLocale(props.params);
  const d = getDictionary(locale);
  const t = d.signupPage;
  return (
    <div className="bg-[#faf8f5]">
      <div className="container-page py-8 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <Breadcrumbs
            locale={locale}
            items={[
              { name: d.prosPage.crumb, path: "/voor-vakmensen" },
              { name: t.crumb, path: "/aanmelden-als-vakman" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">{t.h1}</h1>
          <p className="mt-3 text-lg leading-relaxed text-stone-600">{t.intro}</p>
          <div className="mt-8">
            <ProSignupForm locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
