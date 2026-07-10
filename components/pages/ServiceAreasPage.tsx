import { MapPin, Clock3 } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import { SERVICE_AREAS } from "@/lib/content/serviceAreas";
import PageHero from "@/components/sections/PageHero";
import EmergencyBand from "@/components/sections/EmergencyBand";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import MapEmbed from "@/components/ui/MapEmbed";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const CONTENT = {
  nl: {
    eyebrow: "Werkgebied",
    title: "Loodgieter Dichtbij in Heel Nederland",
    subtitle:
      "AquaFix Loodgieter is actief in tientallen steden en regio's door heel Nederland. Bekijk hieronder of wij ook bij u in de buurt actief zijn.",
    mapTitle: "Onze Locatie & Werkgebied",
    listTitle: "Steden Waar Wij Actief Zijn",
    listSubtitle: "Staat uw plaats er niet bij? Neem gerust contact op, wij zijn actief in nog veel meer regio's.",
    responseLabel: "Gem. aankomsttijd",
  },
  en: {
    eyebrow: "Service Areas",
    title: "Plumber Near You, Across the Netherlands",
    subtitle:
      "AquaFix Loodgieter operates in dozens of cities and regions throughout the Netherlands. Check below to see if we're active near you.",
    mapTitle: "Our Location & Service Area",
    listTitle: "Cities We Serve",
    listSubtitle: "Don't see your city? Get in touch — we operate in many more regions as well.",
    responseLabel: "Avg. response time",
  },
};

export default function ServiceAreasPage({ locale, dict }: Props) {
  const c = CONTENT[locale];
  const paths = PATHS[locale];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.serviceAreas, href: paths.serviceAreas }]} />
      <PageHero dict={dict} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} icon={MapPin} />

      <section className="container-page py-16 sm:py-20">
        <SectionHeading title={c.mapTitle} align="left" />
        <div className="mt-6 h-96">
          <MapEmbed title={c.mapTitle} className="h-full" />
        </div>
      </section>

      <section className="bg-ink-50/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title={c.listTitle} subtitle={c.listSubtitle} />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_AREAS.map((area) => (
              <div
                key={area.city}
                className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{area.city}</p>
                    <p className="text-xs text-ink-400">{area.province[locale]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
                  <Clock3 className="h-3.5 w-3.5" />
                  {area.responseTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmergencyBand dict={dict} />
      <CTASection dict={dict} locale={locale} />
    </>
  );
}
