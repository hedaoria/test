import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookiebeleid",
  description: "Welke cookies Vakconnectie gebruikt en waarom.",
  path: "/cookiebeleid",
});

export default function CookiePage() {
  return (
    <LegalPage
      title="Cookiebeleid"
      path="/cookiebeleid"
      updated="2026-09-01"
      sections={[
        { heading: "Wat zijn cookies?", paragraphs: ["Cookies zijn kleine bestanden die een website op je apparaat opslaat. Ze zorgen er bijvoorbeeld voor dat je ingelogd blijft."] },
        { heading: "Welke cookies gebruiken we?", paragraphs: ["Functionele cookies: nodig om in te loggen en om je voorkeuren te onthouden. Hiervoor vragen we geen toestemming.", "Analytische cookies: alleen als we die in de toekomst gaan gebruiken, en dan pas na jouw toestemming. We gebruiken geen advertentiecookies."] },
        { heading: "Cookies verwijderen", paragraphs: ["Je kunt cookies op elk moment verwijderen via de instellingen van je browser. Houd er rekening mee dat je dan opnieuw moet inloggen."] },
      ]}
    />
  );
}
