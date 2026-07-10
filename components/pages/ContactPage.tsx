import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale, BUSINESS } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/ui/ContactForm";
import QuoteForm from "@/components/ui/QuoteForm";
import MapEmbed from "@/components/ui/MapEmbed";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const CONTENT = {
  nl: {
    eyebrow: "Contact",
    title: "Neem Contact Op met AquaFix Loodgieter",
    subtitle:
      "Heeft u een loodgietersprobleem, wilt u een offerte aanvragen of heeft u een vraag? Wij staan voor u klaar, telefonisch, via WhatsApp of per formulier.",
    infoTitle: "Contactgegevens",
    quoteTitle: "Offerte Aanvragen",
  },
  en: {
    eyebrow: "Contact",
    title: "Get in Touch with AquaFix Loodgieter",
    subtitle:
      "Have a plumbing problem, want to request a quote, or have a question? We're here for you by phone, WhatsApp, or via the form.",
    infoTitle: "Contact Details",
    quoteTitle: "Request a Quote",
  },
};

export default function ContactPage({ locale, dict }: Props) {
  const c = CONTENT[locale];
  const paths = PATHS[locale];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.contact, href: paths.contact }]} />
      <PageHero dict={dict} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} icon={Send} />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm lg:col-span-1 h-fit">
            <h2 className="text-lg font-bold text-ink-900">{c.infoTitle}</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Phone className="h-4.5 w-4.5" />
                </span>
                <a href={BUSINESS.phoneHref} className="font-medium text-ink-800 hover:text-brand-600">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle className="h-4.5 w-4.5" />
                </span>
                <a
                  href={BUSINESS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink-800 hover:text-brand-600"
                >
                  {dict.common.whatsappLabel}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <a href={`mailto:${BUSINESS.email}`} className="font-medium text-ink-800 hover:text-brand-600">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <MapPin className="h-4.5 w-4.5" />
                </span>
                <span className="font-medium text-ink-800">
                  {BUSINESS.address.street}
                  <br />
                  {BUSINESS.address.postalCode} {BUSINESS.address.city}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Clock className="h-4.5 w-4.5" />
                </span>
                <span className="font-medium text-ink-800">
                  {dict.footer.weekdays}
                  <br />
                  {dict.footer.emergencyLine}
                </span>
              </li>
            </ul>

            <div className="mt-6 h-56">
              <MapEmbed title={c.infoTitle} className="h-full" />
            </div>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm lg:col-span-1">
            <h2 className="text-lg font-bold text-ink-900">{dict.contactForm.title}</h2>
            <p className="mt-2 text-sm text-ink-500">{dict.contactForm.subtitle}</p>
            <div className="mt-5">
              <ContactForm dict={dict} locale={locale} />
            </div>
          </div>

          <div className="rounded-2xl border border-accent-200 bg-accent-50/40 p-6 shadow-sm lg:col-span-1">
            <h2 className="text-lg font-bold text-ink-900">{c.quoteTitle}</h2>
            <p className="mt-2 text-sm text-ink-500">{dict.quoteForm.subtitle}</p>
            <div className="mt-5">
              <QuoteForm dict={dict} locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
