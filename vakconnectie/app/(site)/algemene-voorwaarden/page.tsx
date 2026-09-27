import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { termsSections, termsUpdated } from "@/lib/data/legal";
import { COMPANY } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Algemene voorwaarden",
  description: "De algemene voorwaarden van Vakconnectie.",
  path: "/algemene-voorwaarden",
  // Pas indexeren zodra de officiële tekst is toegevoegd.
  noindex: termsSections.length === 0,
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Algemene voorwaarden"
      path="/algemene-voorwaarden"
      updated={termsUpdated}
      intro={
        termsSections.length === 0 ? (
          <p>
            Voor de algemene voorwaarden van {COMPANY.legalName} kun je contact met ons opnemen via{" "}
            <a href={`mailto:${COMPANY.email}`} className="font-medium text-brand-700 hover:underline">{COMPANY.email}</a>.
          </p>
        ) : undefined
      }
      sections={termsSections}
    />
  );
}
