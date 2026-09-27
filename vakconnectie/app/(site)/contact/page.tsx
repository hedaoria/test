import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { COMPANY } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Vraag of opmerking over Vakconnectie? Stuur ons een bericht. We reageren binnen twee werkdagen.",
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
            Heb je een vraag over je klus, je account of het platform? Stuur ons een bericht. We reageren binnen twee
            werkdagen.
          </p>
          <p className="mt-6 text-stone-700">
            Misschien staat het antwoord al bij de{" "}
            <Link href="/veelgestelde-vragen" className="font-semibold text-brand-700 hover:underline">veelgestelde vragen</Link>.
          </p>
          <dl className="mt-8 space-y-4 text-stone-700">
            <div>
              <dt className="text-sm font-semibold text-stone-900">E-mail</dt>
              <dd><a href={`mailto:${COMPANY.email}`} className="hover:text-brand-700">{COMPANY.email}</a></dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-stone-900">Postadres</dt>
              <dd>
                {COMPANY.legalName}<br />
                {COMPANY.street}<br />
                {COMPANY.postcode} {COMPANY.city}
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
