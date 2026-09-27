import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { customerFaqs, proFaqs } from "@/lib/data/content";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Veelgestelde vragen",
  description: "Antwoorden op veelgestelde vragen over klussen plaatsen, vakmensen kiezen, privacy, reviews en aanmelden als vakman.",
  path: "/veelgestelde-vragen",
});

export default function FaqPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <JsonLd data={faqLd([...customerFaqs, ...proFaqs])} />
      <Breadcrumbs items={[{ name: "Veelgestelde vragen", path: "/veelgestelde-vragen" }]} />
      <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Veelgestelde vragen</h1>
      <div className="mt-10 grid gap-14 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Voor opdrachtgevers</h2>
          <FaqList faqs={customerFaqs} />
        </section>
        <section>
          <h2 className="mb-4 text-xl font-semibold">Voor vakmensen</h2>
          <FaqList faqs={proFaqs} />
        </section>
      </div>
      <p className="mt-12 text-stone-600">
        Geen antwoord gevonden? <Link href="/contact" className="font-semibold text-brand-700 hover:underline">Neem contact met ons op</Link>.
      </p>
    </div>
  );
}
