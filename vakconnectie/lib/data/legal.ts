/**
 * Juridische teksten van Vakconnectie.
 *
 * De privacytekst is gebaseerd op de privacyverklaring op vakconnectie.nl.
 * De algemene voorwaarden zijn nog niet overgenomen: plak de officiële tekst
 * in `termsSections` (en zet de datum in `termsUpdated`). Zolang die leeg is,
 * toont /algemene-voorwaarden alleen een verwijzing naar contact en wordt de
 * pagina niet geïndexeerd.
 */
import { COMPANY } from "@/lib/site";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export const termsUpdated: string | undefined = undefined;
export const termsSections: LegalSection[] = [];

export const privacySections: LegalSection[] = [
  {
    heading: "Wie is verantwoordelijk?",
    paragraphs: [
      `${COMPANY.legalName}, gevestigd in ${COMPANY.city} (KvK ${COMPANY.kvk}), is verantwoordelijk voor de verwerking van persoonsgegevens via deze website.`,
    ],
  },
  {
    heading: "Welke gegevens ontvangen we?",
    paragraphs: [
      "Via een projectaanvraag, een aanmelding als zelfstandig vakman of een bericht aan onze chatbot (VakBot) kunnen we de volgende gegevens ontvangen: je naam, telefoonnummer, e-mailadres, adres of regio, de omschrijving van je project, KvK-gegevens en eventuele foto’s die je zelf meestuurt.",
    ],
  },
  {
    heading: "Versturen via WhatsApp of e-mail",
    paragraphs: [
      "Als je een formulier invult en op ‘Verstuur via WhatsApp’ of ‘Verstuur via e-mail’ klikt, opent je eigen WhatsApp- of e-mailapp met een ingevuld bericht. We ontvangen je gegevens pas als je dat bericht zelf actief verstuurt. Daarvoor wordt er niets verzonden of opgeslagen.",
    ],
  },
  {
    heading: "Waarvoor gebruiken we je gegevens?",
    paragraphs: [
      "Om projectaanvragen en aanmeldingen van vakmensen te behandelen en contact met je op te nemen (uitvoering van een overeenkomst of stappen die daaraan voorafgaan).",
      "Om fraude en misbruik te voorkomen en de kwaliteit van onze bemiddeling te waarborgen (gerechtvaardigd belang).",
      "Om te voldoen aan wettelijke verplichtingen, zoals de administratie- en factuurplicht (wettelijke verplichting).",
    ],
  },
  {
    heading: "Met wie delen we gegevens?",
    paragraphs: [
      "Waar dat nodig is voor je aanvraag, delen we je gegevens met geselecteerde zelfstandige vakmensen. We verkopen je gegevens niet aan derden.",
      "We werken met de volgende partijen: WhatsApp (Meta Platforms, Inc.) voor communicatie, Amazon Web Services (AWS) in de regio Frankfurt (eu-central-1) voor het opslaan en veilig aanbieden van de website, en een e-mailprovider voor het beheer van info@vakconnectie.nl.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "Deze website gebruikt geen advertentie- of trackingcookies en geen analysediensten.",
    ],
  },
  {
    heading: "Jouw rechten",
    paragraphs: [
      "Je hebt het recht op inzage, correctie en verwijdering van je gegevens, op beperking van de verwerking en op een kopie van je gegevens. Ook kun je bezwaar maken tegen de verwerking. Als de verwerking op toestemming is gebaseerd, kun je die toestemming altijd intrekken.",
      `Wil je een van deze rechten gebruiken? Stuur dan een e-mail naar ${COMPANY.email}. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.`,
    ],
  },
  {
    heading: "Contact",
    paragraphs: [`Vragen over privacy kun je sturen naar ${COMPANY.email} of stellen via ${COMPANY.phoneDisplay}.`],
  },
];
