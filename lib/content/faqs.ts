import { Locale } from "../site";

export interface FaqItem {
  question: { nl: string; en: string };
  answer: { nl: string; en: string };
}

export const GENERAL_FAQS: FaqItem[] = [
  {
    question: {
      nl: "In welke gebieden is AquaFix Loodgieter actief?",
      en: "In which areas is AquaFix Loodgieter active?",
    },
    answer: {
      nl: "Wij zijn actief in heel Nederland, met een uitgebreid team van loodgieters in onder andere Utrecht, Amsterdam, Rotterdam, Den Haag, Eindhoven en omstreken. Bekijk onze werkgebied-pagina voor het volledige overzicht.",
      en: "We operate across the entire Netherlands, with an extensive team of plumbers in cities such as Utrecht, Amsterdam, Rotterdam, The Hague, Eindhoven and surrounding areas. See our service areas page for the full overview.",
    },
  },
  {
    question: {
      nl: "Hoe snel kan een loodgieter bij mij zijn?",
      en: "How quickly can a plumber reach me?",
    },
    answer: {
      nl: "Voor reguliere afspraken plannen wij meestal binnen 1 tot 2 werkdagen een bezoek in. Bij spoedgevallen staat onze loodgieter doorgaans binnen 30 tot 60 minuten voor de deur.",
      en: "For regular appointments we usually schedule a visit within 1 to 2 business days. In emergencies our plumber is typically at your door within 30 to 60 minutes.",
    },
  },
  {
    question: {
      nl: "Wat zijn de kosten van een loodgieter?",
      en: "What does a plumber cost?",
    },
    answer: {
      nl: "De kosten zijn afhankelijk van het type klus, de urgentie en de benodigde materialen. Wij werken met transparante tarieven en geven altijd vooraf een duidelijke prijsindicatie of offerte.",
      en: "Costs depend on the type of job, urgency, and required materials. We work with transparent rates and always provide a clear price indication or quote in advance.",
    },
  },
  {
    question: {
      nl: "Zijn jullie loodgieters gecertificeerd en verzekerd?",
      en: "Are your plumbers certified and insured?",
    },
    answer: {
      nl: "Ja, al onze loodgieters zijn vakkundig opgeleid, gecertificeerd en ons bedrijf is volledig verzekerd voor aansprakelijkheid, zodat u altijd verzekerd bent van kwaliteit en zekerheid.",
      en: "Yes, all our plumbers are professionally trained and certified, and our company is fully insured for liability, so you can always count on quality and peace of mind.",
    },
  },
  {
    question: {
      nl: "Bieden jullie garantie op uitgevoerd werk?",
      en: "Do you offer a guarantee on completed work?",
    },
    answer: {
      nl: "Ja, wij geven garantie op al ons vakwerk en de gebruikte materialen. De exacte garantietermijn hangt af van het type dienst en wordt altijd vermeld in uw offerte.",
      en: "Yes, we provide a guarantee on all our workmanship and the materials used. The exact warranty period depends on the type of service and is always stated in your quote.",
    },
  },
  {
    question: {
      nl: "Kan ik online of via WhatsApp een afspraak maken?",
      en: "Can I book an appointment online or via WhatsApp?",
    },
    answer: {
      nl: "Zeker, u kunt ons contactformulier invullen, ons bellen op +31 6 17 34 73 33 of direct een bericht sturen via WhatsApp. Wij reageren doorgaans binnen enkele uren.",
      en: "Absolutely, you can fill in our contact form, call us at +31 6 17 34 73 33, or send us a message directly via WhatsApp. We typically respond within a few hours.",
    },
  },
  {
    question: {
      nl: "Werken jullie ook voor bedrijven en VvE's?",
      en: "Do you also work for businesses and homeowner associations?",
    },
    answer: {
      nl: "Ja, naast particulieren bedienen wij ook bedrijven, VvE's en vastgoedbeheerders met onderhoudscontracten en projectmatige werkzaamheden.",
      en: "Yes, in addition to homeowners, we also serve businesses, homeowner associations, and property managers with maintenance contracts and project work.",
    },
  },
  {
    question: {
      nl: "Wat moet ik doen bij een acute waterlekkage?",
      en: "What should I do in case of an acute water leak?",
    },
    answer: {
      nl: "Sluit direct de hoofdkraan af, zet indien mogelijk de elektriciteit in de betreffende ruimte uit en bel onmiddellijk onze 24/7 spoedlijn op +31 6 17 34 73 33.",
      en: "Immediately shut off the main water valve, if possible turn off the electricity in the affected room, and call our 24/7 emergency line right away at +31 6 17 34 73 33.",
    },
  },
];

export function getFaqLabel(item: FaqItem, locale: Locale, field: "question" | "answer") {
  return item[field][locale];
}
