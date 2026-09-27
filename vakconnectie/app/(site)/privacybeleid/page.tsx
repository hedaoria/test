import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { privacySections } from "@/lib/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacybeleid",
  description: "Hoe Vakconnectie omgaat met je persoonsgegevens: welke gegevens we ontvangen, waarvoor we ze gebruiken en wat je rechten zijn.",
  path: "/privacybeleid",
});

export default function PrivacyPage() {
  return <LegalPage title="Privacybeleid" path="/privacybeleid" sections={privacySections} />;
}
