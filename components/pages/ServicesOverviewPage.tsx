import { Wrench } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import { SERVICES } from "@/lib/content/services";
import PageHero from "@/components/sections/PageHero";
import EmergencyBand from "@/components/sections/EmergencyBand";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const CONTENT = {
  nl: {
    eyebrow: "Onze Diensten",
    title: "Professionele Loodgietersdiensten voor Elke Klus",
    subtitle:
      "Van acute spoedgevallen tot complete badkamerrenovaties: AquaFix Loodgieter biedt een volledig pakket aan diensten voor particulieren en bedrijven in heel Nederland.",
    introTitle: "Waarom Kiezen Voor AquaFix Loodgieter?",
    intro:
      "Wij combineren vakmanschap met moderne technologie om elk loodgietersprobleem snel, grondig en tegen een eerlijke prijs op te lossen. Al onze monteurs zijn gecertificeerd, verzekerd en werken volgens de nieuwste veiligheidsnormen.",
  },
  en: {
    eyebrow: "Our Services",
    title: "Professional Plumbing Services for Every Job",
    subtitle:
      "From urgent emergencies to complete bathroom renovations: AquaFix Loodgieter offers a full range of services for homeowners and businesses across the Netherlands.",
    introTitle: "Why Choose AquaFix Loodgieter?",
    intro:
      "We combine craftsmanship with modern technology to solve any plumbing problem quickly, thoroughly, and at a fair price. All our technicians are certified, insured, and work to the latest safety standards.",
  },
};

export default function ServicesOverviewPage({ locale, dict }: Props) {
  const c = CONTENT[locale];
  const paths = PATHS[locale];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.services, href: paths.services }]} />
      <PageHero dict={dict} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} icon={Wrench} />

      <section className="container-page py-16 sm:py-20">
        <SectionHeading title={c.introTitle} subtitle={c.intro} />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => (
            <ServiceCard
              key={service.key}
              icon={service.icon}
              title={service[locale].title}
              description={service[locale].cardDescription}
              href={paths[service.key]}
              cta={dict.buttons.viewService}
              featured={idx === 0}
            />
          ))}
        </div>
      </section>

      <EmergencyBand dict={dict} />
      <CTASection dict={dict} locale={locale} />
    </>
  );
}
