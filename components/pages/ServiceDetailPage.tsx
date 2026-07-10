import { CheckCircle2 } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale } from "@/lib/site";
import { PATHS, PageKey } from "@/lib/routes";
import { ServiceContent } from "@/lib/content/services";
import PageHero from "@/components/sections/PageHero";
import EmergencyBand from "@/components/sections/EmergencyBand";
import CTASection from "@/components/sections/CTASection";
import FaqAccordion from "@/components/ui/FaqAccordion";
import QuoteForm from "@/components/ui/QuoteForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Props {
  locale: Locale;
  dict: Dictionary;
  service: ServiceContent;
  serviceKey: PageKey;
}

export default function ServiceDetailPage({ locale, dict, service, serviceKey }: Props) {
  const content = service[locale];
  const paths = PATHS[locale];
  const Icon = service.icon;

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: dict.nav.services, href: paths.services },
          { label: content.shortTitle, href: paths[serviceKey] },
        ]}
      />
      <PageHero dict={dict} eyebrow={dict.servicesSection.eyebrow} title={content.title} subtitle={content.heroSubtitle} icon={Icon} />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {content.intro.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-ink-600">
                {p}
              </p>
            ))}

            <h2 className="pt-6 text-2xl font-bold text-ink-900">{dict.trust.heading}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.features.map((f) => (
                <div key={f.title} className="flex gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
                  <div>
                    <h3 className="text-sm font-bold text-ink-900">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="pt-6 text-2xl font-bold text-ink-900">
              {locale === "nl" ? "Hoe Wij Te Werk Gaan" : "How We Work"}
            </h2>
            <ol className="space-y-4">
              {content.process.map((step, idx) => (
                <li key={step.title} className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink-900">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="pt-6 text-2xl font-bold text-ink-900">{dict.faqSection.title}</h2>
            <FaqAccordion items={content.faqs} />
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-ink-100 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-ink-900">{dict.quoteForm.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{dict.quoteForm.subtitle}</p>
              <div className="mt-5">
                <QuoteForm dict={dict} locale={locale} defaultService={content.shortTitle} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <EmergencyBand dict={dict} />
      <CTASection dict={dict} locale={locale} />
    </>
  );
}
