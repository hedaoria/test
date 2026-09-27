import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { COMPANY } from "@/lib/site";
import { whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata(props: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const t = getDictionary(locale).contactPage;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/contact", locale });
}

export default async function ContactPage(props: PageProps<"/[lang]/contact">) {
  const locale = await getLocale(props.params);
  const d = getDictionary(locale);
  const t = d.contactPage;
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs locale={locale} items={[{ name: t.h1, path: "/contact" }]} />
      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">{t.h1}</h1>
          <p className="mt-3 text-lg leading-relaxed text-stone-600">{t.intro}</p>
          <p className="mt-4 text-stone-700">
            {t.direct}{" "}
            <Link href={localizePath(locale, "/klus-plaatsen")} className="font-semibold text-brand-700 hover:underline">{d.common.request}</Link>.
          </p>
          <dl className="mt-8 space-y-4 text-stone-700">
            <div>
              <dt className="text-sm font-semibold text-stone-900">{t.whatsapp}</dt>
              <dd>
                <a href={whatsappUrl(d.contactForm.intro + " ")} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
                  {t.whatsappLink}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-stone-900">{t.email}</dt>
              <dd><a href={`mailto:${COMPANY.email}`} className="hover:text-brand-700">{COMPANY.email}</a></dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-stone-900">{t.phone}</dt>
              <dd><a href={`tel:${COMPANY.phoneHref}`} className="hover:text-brand-700">{COMPANY.phoneDisplay}</a></dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-stone-900">{t.company}</dt>
              <dd>
                {COMPANY.legalName}
                <br />
                {t.established} {COMPANY.city}
                <br />
                KvK {COMPANY.kvk}
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm locale={locale} />
      </div>
    </div>
  );
}
