import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/contact";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";

/**
 * Contact loopt via Vakconnectie: de klant doet een aanvraag of stuurt ons een
 * bericht, en wij brengen klant en vakman met elkaar in contact.
 */
export function ContactPro({ slug, companyName, primaryCategory, locale }: { slug: string; companyName: string; primaryCategory: string; locale: Locale }) {
  const t = getDictionary(locale).profilePage;
  return (
    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
      <ButtonLink href={localizePath(locale, `/klus-plaatsen?vakgebied=${primaryCategory}&vakman=${slug}`)} size="lg" className="w-full">
        {t.invite}
      </ButtonLink>
      <a href={whatsappUrl(t.contactMessage(companyName))} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "lg", "w-full")}>
        {t.contact}
      </a>
    </div>
  );
}
