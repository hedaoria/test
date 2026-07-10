import { Phone, FileText } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale, BUSINESS } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import Button from "@/components/ui/Button";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export default function CTASection({ dict, locale }: Props) {
  return (
    <section className="bg-ink-900">
      <div className="container-page py-14 sm:py-20 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold text-balance text-white sm:text-4xl">
          {dict.ctaSection.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-ink-300 sm:text-lg">{dict.ctaSection.subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={BUSINESS.phoneHref} variant="accent" size="lg" icon={<Phone className="h-5 w-5" />}>
            {dict.buttons.callNow}
          </Button>
          <Button href={PATHS[locale].contact} variant="outline" size="lg" icon={<FileText className="h-5 w-5" />}>
            {dict.buttons.requestQuote}
          </Button>
        </div>
      </div>
    </section>
  );
}
