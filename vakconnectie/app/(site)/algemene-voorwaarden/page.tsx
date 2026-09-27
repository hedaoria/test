import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { COMPANY } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Algemene voorwaarden",
  description: "De algemene voorwaarden voor het gebruik van Vakconnectie door opdrachtgevers en vakmensen.",
  path: "/algemene-voorwaarden",
});

// Concepttekst: laat deze voor livegang controleren door een jurist.
export default function TermsPage() {
  return (
    <LegalPage
      title="Algemene voorwaarden"
      path="/algemene-voorwaarden"
      updated="2026-09-01"
      sections={[
        { heading: "1. Over Vakconnectie", paragraphs: [`Vakconnectie is een online platform van ${COMPANY.legalName} (KvK ${COMPANY.kvk}) dat opdrachtgevers en vakmensen met elkaar in contact brengt. Vakconnectie is zelf geen partij bij de afspraken die opdrachtgever en vakman met elkaar maken.`] },
        { heading: "2. Account", paragraphs: ["Voor sommige functies heb je een account nodig. Je zorgt dat je gegevens kloppen en houdt je wachtwoord geheim. Je bent verantwoordelijk voor wat er met je account gebeurt."] },
        { heading: "3. Klussen plaatsen", paragraphs: ["Het plaatsen van een klus is gratis voor opdrachtgevers. Je omschrijft de klus naar waarheid en plaatst geen klussen die in strijd zijn met de wet of met deze voorwaarden.", "Afspraken over prijs, planning, uitvoering en garantie maak je rechtstreeks met de vakman."] },
        { heading: "4. Vakmensen", paragraphs: ["Vakmensen die zich aanmelden, moeten ingeschreven staan bij de Kamer van Koophandel. Ze zijn zelf verantwoordelijk voor de uitvoering van het werk, de benodigde vergunningen, verzekeringen en certificeringen.", "Voor vakmensen gelden de abonnementsvoorwaarden die bij aanmelding worden getoond. Abonnementen zijn maandelijks opzegbaar."] },
        { heading: "5. Reviews", paragraphs: ["Reviews moeten gebaseerd zijn op een echte ervaring. Vakconnectie mag reviews die beledigend zijn, persoonsgegevens bevatten of aantoonbaar onjuist zijn, weigeren of verwijderen."] },
        { heading: "6. Aansprakelijkheid", paragraphs: ["Vakconnectie is niet aansprakelijk voor het werk dat een vakman uitvoert of voor afspraken tussen opdrachtgever en vakman, behalve bij opzet of grove nalatigheid van Vakconnectie zelf."] },
        { heading: "7. Blokkeren van accounts", paragraphs: ["Bij misbruik, fraude of herhaalde klachten kan Vakconnectie een account tijdelijk of definitief blokkeren."] },
        { heading: "8. Toepasselijk recht", paragraphs: ["Op deze voorwaarden is Nederlands recht van toepassing."] },
      ]}
    />
  );
}
