import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { COMPANY } from "@/lib/site";
import { whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Neem contact op met Vakconnectie via WhatsApp, e-mail of telefoon.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Contact</h1>
          <p className="mt-3 text-lg leading-relaxed text-stone-600">
            Heb je een vraag of wil je een project bespreken? Neem gerust contact met ons op.
          </p>
          <p className="mt-4 text-stone-700">
            Wil je direct een vakman zoeken?{" "}
            <Link href="/klus-plaatsen" className="font-semibold text-brand-700 hover:underline">Doe een projectaanvraag</Link>.
          </p>
          <dl className="mt-8 space-y-4 text-stone-700">
            <div>
              <dt className="text-sm font-semibold text-stone-900">WhatsApp</dt>
              <dd>
                <a href={whatsappUrl("Hallo Vakconnectie, ")} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
                  Stuur een WhatsApp-bericht
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-stone-900">E-mail</dt>
              <dd><a href={`mailto:${COMPANY.email}`} className="hover:text-brand-700">{COMPANY.email}</a></dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-stone-900">Telefoon</dt>
              <dd><a href={`tel:${COMPANY.phoneHref}`} className="hover:text-brand-700">{COMPANY.phoneDisplay}</a></dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-stone-900">Bedrijfsgegevens</dt>
              <dd>
                {COMPANY.legalName}
                <br />
                Gevestigd in {COMPANY.city}
                <br />
                KvK {COMPANY.kvk}
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
