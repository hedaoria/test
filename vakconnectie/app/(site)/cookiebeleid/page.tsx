import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookiebeleid",
  description: "Vakconnectie gebruikt geen advertentie- of trackingcookies en geen analysediensten.",
  path: "/cookiebeleid",
});

export default function CookiePage() {
  return (
    <LegalPage
      title="Cookiebeleid"
      path="/cookiebeleid"
      intro={
        <p>
          Meer over hoe we met je gegevens omgaan, lees je in ons <Link href="/privacybeleid" className="font-medium text-brand-700 hover:underline">privacybeleid</Link>.
        </p>
      }
      sections={[
        {
          heading: "Welke cookies gebruiken we?",
          paragraphs: ["Deze website gebruikt geen advertentie- of trackingcookies en geen analysediensten. Daarom vragen we je ook niet om toestemming voor cookies."],
        },
      ]}
    />
  );
}
