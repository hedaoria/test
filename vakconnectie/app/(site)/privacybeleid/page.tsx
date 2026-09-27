import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { COMPANY } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacybeleid",
  description: "Hoe Vakconnectie omgaat met je persoonsgegevens: welke gegevens we verwerken, waarom en hoe lang.",
  path: "/privacybeleid",
});

// Concepttekst: laat deze voor livegang controleren door een privacyjurist.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacybeleid"
      path="/privacybeleid"
      updated="2026-09-01"
      sections={[
        { heading: "Wie zijn wij?", paragraphs: [`${COMPANY.legalName}, ${COMPANY.street}, ${COMPANY.postcode} ${COMPANY.city}, is verantwoordelijk voor de verwerking van persoonsgegevens via Vakconnectie. Vragen kun je sturen naar ${COMPANY.email}.`] },
        { heading: "Welke gegevens verwerken we?", paragraphs: ["Als opdrachtgever: je naam, e-mailadres, eventueel telefoonnummer, het adres van de klus, de omschrijving en foto's van je klus, berichten en reviews.", "Als vakman: je bedrijfs- en contactgegevens, KvK-nummer, werkgebied, profielinformatie, berichten en facturatiegegevens."] },
        { heading: "Waarom?", paragraphs: ["We gebruiken deze gegevens om het platform te laten werken: klussen tonen aan passende vakmensen, berichten doorgeven, meldingen sturen en reviews publiceren. Daarnaast om misbruik te voorkomen en om aan wettelijke verplichtingen te voldoen."] },
        { heading: "Wie ziet wat?", paragraphs: ["Vakmensen zien van een klus alleen het postcodegebied en de plaats. Je volledige adres en telefoonnummer zijn alleen zichtbaar voor een vakman met wie jij ze deelt. We verkopen je gegevens nooit aan derden."] },
        { heading: "Hoe lang bewaren we gegevens?", paragraphs: ["Zolang je account actief is. Na het verwijderen van je account wissen we je gegevens binnen 30 dagen, behalve gegevens die we wettelijk langer moeten bewaren, zoals facturen."] },
        { heading: "Jouw rechten", paragraphs: ["Je hebt recht op inzage, correctie, verwijdering en overdracht van je gegevens. Ook kun je bezwaar maken tegen bepaalde verwerkingen. Stuur daarvoor een e-mail. Ben je het niet eens met hoe we met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens."] },
      ]}
    />
  );
}
