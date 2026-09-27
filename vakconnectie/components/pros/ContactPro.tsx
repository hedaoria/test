import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/contact";

/**
 * Contact loopt via Vakconnectie: de klant doet een aanvraag of stuurt ons een
 * bericht, en wij brengen klant en vakman met elkaar in contact.
 */
export function ContactPro({ slug, companyName, primaryCategory }: { slug: string; companyName: string; primaryCategory: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
      <ButtonLink href={`/klus-plaatsen?vakgebied=${primaryCategory}&vakman=${slug}`} size="lg" className="w-full">
        Nodig uit voor mijn klus
      </ButtonLink>
      <a
        href={whatsappUrl(`Hallo Vakconnectie, ik wil graag in contact komen met ${companyName}. Het gaat om: `)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass("secondary", "lg", "w-full")}
      >
        Neem contact op
      </a>
    </div>
  );
}
