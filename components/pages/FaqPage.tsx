import { HelpCircle, Phone, MessageCircle } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale, BUSINESS } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import { GENERAL_FAQS } from "@/lib/content/faqs";
import PageHero from "@/components/sections/PageHero";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const CONTENT = {
  nl: {
    ctaTitle: "Staat uw vraag er niet bij?",
    ctaSubtitle: "Neem gerust contact met ons op, wij helpen u graag verder.",
  },
  en: {
    ctaTitle: "Didn't find your question?",
    ctaSubtitle: "Feel free to get in touch with us, we're happy to help.",
  },
};

export default function FaqPage({ locale, dict }: Props) {
  const c = CONTENT[locale];
  const paths = PATHS[locale];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.faq, href: paths.faq }]} />
      <PageHero
        dict={dict}
        eyebrow={dict.faqSection.eyebrow}
        title={dict.faqSection.title}
        subtitle={dict.faqSection.subtitle}
        icon={HelpCircle}
        showCtas={false}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion
            items={GENERAL_FAQS.map((f) => ({ question: f.question[locale], answer: f.answer[locale] }))}
          />

          <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center sm:p-8">
            <h2 className="text-xl font-bold text-brand-900">{c.ctaTitle}</h2>
            <p className="mt-2 text-sm text-brand-800">{c.ctaSubtitle}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Button href={BUSINESS.phoneHref} variant="primary" icon={<Phone className="h-4 w-4" />}>
                {dict.buttons.callNow}
              </Button>
              <Button href={BUSINESS.whatsappHref} variant="whatsapp" icon={<MessageCircle className="h-4 w-4" />}>
                {dict.buttons.whatsappDirect}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
