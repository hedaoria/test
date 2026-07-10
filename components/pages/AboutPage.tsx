import { ShieldCheck, Award, Users, Clock3 } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale, BUSINESS } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import TrustBadge from "@/components/ui/TrustBadge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const CONTENT = {
  nl: {
    eyebrow: "Over Ons",
    title: "Het Team Achter AquaFix Loodgieter",
    subtitle:
      "Sinds 2010 zetten wij ons met hart en ziel in voor vakmanschap, betrouwbaarheid en tevreden klanten in heel Nederland.",
    storyTitle: "Ons Verhaal",
    story: [
      "AquaFix Loodgieter is in 2010 opgericht met een duidelijk doel: loodgietersdiensten leveren waar klanten écht op kunnen vertrouwen. Wat begon als een klein team in Utrecht, is uitgegroeid tot een landelijk opererend loodgietersbedrijf met vestigingen en vakmensen door heel Nederland.",
      "Wij geloven dat vakmanschap, eerlijkheid en snelheid hand in hand moeten gaan. Daarom investeren wij continu in de opleiding van onze monteurs, moderne apparatuur en heldere communicatie met onze klanten.",
      "Vandaag de dag mogen wij duizenden particulieren, bedrijven en VvE's tot onze klanten rekenen, van kleine reparaties tot complete badkamerrenovaties en grootschalige rioleringsprojecten.",
    ],
    missionTitle: "Onze Missie",
    mission:
      "Elke klant voorzien van snelle, vakkundige en eerlijke loodgietersdiensten, zodat u met een gerust hart kunt vertrouwen op uw sanitair, verwarming en riolering.",
    valuesTitle: "Waar Wij Voor Staan",
    values: [
      { title: "Vakmanschap", description: "Onze monteurs zijn gecertificeerd en volgen doorlopend bijscholing." },
      { title: "Betrouwbaarheid", description: "Wij komen afspraken na en communiceren helder over kosten en planning." },
      { title: "Klantgerichtheid", description: "Uw probleem staat centraal, met persoonlijk advies op maat." },
      { title: "Snelheid", description: "Van spoedgevallen tot geplande klussen: wij handelen slagvaardig." },
    ],
    statsTitle: "AquaFix in Cijfers",
    stats: [
      { icon: Award, value: "15+", label: "Jaar ervaring" },
      { icon: Users, value: "10.000+", label: "Tevreden klanten" },
      { icon: ShieldCheck, value: "100%", label: "Verzekerd & gecertificeerd" },
      { icon: Clock3, value: "24/7", label: "Spoedservice" },
    ],
  },
  en: {
    eyebrow: "About Us",
    title: "The Team Behind AquaFix Loodgieter",
    subtitle:
      "Since 2010 we've been fully committed to craftsmanship, reliability, and satisfied customers across the Netherlands.",
    storyTitle: "Our Story",
    story: [
      "AquaFix Loodgieter was founded in 2010 with a clear purpose: to deliver plumbing services customers can truly rely on. What started as a small team in Utrecht has grown into a nationwide plumbing company with locations and professionals across the Netherlands.",
      "We believe craftsmanship, honesty, and speed should go hand in hand. That's why we continuously invest in training our technicians, modern equipment, and clear communication with our customers.",
      "Today we're proud to serve thousands of homeowners, businesses, and homeowner associations, from small repairs to complete bathroom renovations and large-scale sewer projects.",
    ],
    missionTitle: "Our Mission",
    mission:
      "To provide every customer with fast, skilled, and honest plumbing services, so you can trust your plumbing, heating, and sewer systems with complete peace of mind.",
    valuesTitle: "What We Stand For",
    values: [
      { title: "Craftsmanship", description: "Our technicians are certified and continuously trained." },
      { title: "Reliability", description: "We keep our appointments and communicate clearly about costs and planning." },
      { title: "Customer Focus", description: "Your problem comes first, with personal, tailored advice." },
      { title: "Speed", description: "From emergencies to planned jobs: we act decisively." },
    ],
    statsTitle: "AquaFix by the Numbers",
    stats: [
      { icon: Award, value: "15+", label: "Years of experience" },
      { icon: Users, value: "10,000+", label: "Satisfied customers" },
      { icon: ShieldCheck, value: "100%", label: "Insured & certified" },
      { icon: Clock3, value: "24/7", label: "Emergency service" },
    ],
  },
};

export default function AboutPage({ locale, dict }: Props) {
  const c = CONTENT[locale];
  const paths = PATHS[locale];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.about, href: paths.about }]} />
      <PageHero dict={dict} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} icon={ShieldCheck} />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">{c.storyTitle}</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-600">
              {c.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="rounded-2xl border border-brand-100 bg-brand-50 p-6 h-fit">
            <h3 className="text-lg font-bold text-brand-900">{c.missionTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-800">{c.mission}</p>
            <div className="mt-5 border-t border-brand-200 pt-4 text-sm text-brand-800">
              <p className="font-semibold">{BUSINESS.name}</p>
              <p className="mt-1">{BUSINESS.address.street}</p>
              <p>
                {BUSINESS.address.postalCode} {BUSINESS.address.city}
              </p>
              <p className="mt-2">{BUSINESS.phoneDisplay}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ink-50/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title={c.valuesTitle} />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.map((v, idx) => (
              <TrustBadge key={v.title} index={idx} title={v.title} description={v.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading title={c.statsTitle} />
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {c.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center rounded-2xl border border-ink-100 bg-white p-6 text-center shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <s.icon className="h-5.5 w-5.5" />
              </span>
              <p className="mt-3 text-2xl font-extrabold text-ink-900">{s.value}</p>
              <p className="mt-1 text-sm text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  );
}
