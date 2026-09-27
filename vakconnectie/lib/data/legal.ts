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

/**
 * Engelse versie van de privacytekst (zelfde inhoud als hierboven). De officiële
 * site heeft ook een Engelse versie; vervang deze tekst door die versie zodra
 * die beschikbaar is.
 */
const privacySectionsEn: LegalSection[] = [
  {
    heading: "Who is responsible?",
    paragraphs: [
      `${COMPANY.legalName}, based in ${COMPANY.city}, the Netherlands (Chamber of Commerce no. ${COMPANY.kvk}), is the controller for personal data processed through this website.`,
    ],
  },
  {
    heading: "What data do we receive?",
    paragraphs: [
      "Through a project request, a registration as a self-employed tradesperson or a message to our chatbot (VakBot), we may receive the following data: your name, phone number, email address, address or region, a description of your project, Chamber of Commerce (KvK) details and any photos you choose to send.",
    ],
  },
  {
    heading: "Sending via WhatsApp or email",
    paragraphs: [
      "When you fill in a form and click ‘Send via WhatsApp’ or ‘Send via email’, your own WhatsApp or email app opens with a pre-filled message. We only receive your data once you actively send that message yourself. Nothing is transmitted or stored before then.",
    ],
  },
  {
    heading: "What do we use your data for?",
    paragraphs: [
      "To handle project requests and registrations from tradespeople and to contact you (performance of a contract or steps taken before entering into one).",
      "To prevent fraud and misuse and to safeguard the quality of our intermediary service (legitimate interest).",
      "To comply with legal obligations, such as bookkeeping and invoicing requirements (legal obligation).",
    ],
  },
  {
    heading: "Who do we share data with?",
    paragraphs: [
      "Where needed for your request, we share your data with selected self-employed tradespeople. We do not sell your data to third parties.",
      "We work with the following parties: WhatsApp (Meta Platforms, Inc.) for communication, Amazon Web Services (AWS) in the Frankfurt region (eu-central-1) for storing and securely delivering the website, and an email provider for managing info@vakconnectie.nl.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: ["This website does not use advertising or tracking cookies, or any analytics services."],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You have the right to access, rectify and erase your data, to restrict its processing and to receive a copy of it. You can also object to the processing. Where processing is based on consent, you can withdraw that consent at any time.",
      `Would you like to exercise one of these rights? Send an email to ${COMPANY.email}. You can also file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).`,
    ],
  },
  {
    heading: "Contact",
    paragraphs: [`Privacy questions can be sent to ${COMPANY.email} or asked by phone on ${COMPANY.phoneDisplay}.`],
  },
];

export function getPrivacySections(locale: "nl" | "en") {
  return locale === "en" ? privacySectionsEn : privacySections;
}
