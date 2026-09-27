export interface Faq {
  q: string;
  a: string;
}

export const customerFaqs: Faq[] = [
  {
    q: "Wat kost een projectaanvraag?",
    a: "Niets. Een projectaanvraag is voor klanten gratis en vrijblijvend.",
  },
  {
    q: "Hoe werkt Vakconnectie?",
    a: "Vakconnectie is een bemiddelingsbedrijf. Je vertelt ons wat je wilt laten doen, en wij helpen je bij het vinden van een passende zelfstandige vakman.",
  },
  {
    q: "Hoe weet ik of een vakman betrouwbaar is?",
    a: "Voordat we een vakman aan je voorstellen, controleren we de inschrijving bij de Kamer van Koophandel (KvK).",
  },
  {
    q: "Wie maakt de afspraken over prijs en planning?",
    a: "Dat doe je zelf met de vakman. Jullie leggen de afspraken over prijs, planning, werkzaamheden en garantie samen schriftelijk vast.",
  },
  {
    q: "Hoe verstuur ik mijn aanvraag?",
    a: "Via WhatsApp of e-mail. Als je het formulier invult en op ‘Verstuur via WhatsApp’ of ‘Verstuur via e-mail’ klikt, opent je eigen app met een ingevuld bericht. Pas als je dat bericht zelf verstuurt, ontvangen wij je aanvraag.",
  },
  {
    q: "Wat gebeurt er met mijn gegevens?",
    a: "We gebruiken je gegevens om je aanvraag te behandelen en contact met je op te nemen. Waar dat nodig is voor je aanvraag, delen we ze met geselecteerde zelfstandige vakmensen. We verkopen je gegevens niet aan derden.",
  },
];

export const proFaqs: Faq[] = [
  {
    q: "Wie kan zich aanmelden?",
    a: "Zelfstandige vakmensen met een inschrijving bij de Kamer van Koophandel.",
  },
  {
    q: "Hoe meld ik me aan?",
    a: "Vul het aanmeldformulier in en verstuur het via WhatsApp of e-mail. Vermeld je KvK-gegevens, zodat we je inschrijving kunnen controleren.",
  },
  {
    q: "Wanneer word ik aan een klant voorgesteld?",
    a: "Pas nadat we je KvK-inschrijving hebben gecontroleerd, en wanneer er een aanvraag is die bij je vakgebied past.",
  },
  {
    q: "Wie maakt de afspraken met de klant?",
    a: "Dat doe je zelf met de klant. Afspraken over prijs, planning, werkzaamheden en garantie leggen jullie samen schriftelijk vast.",
  },
];

const customerFaqsEn: Faq[] = [
  { q: "What does a project request cost?", a: "Nothing. A project request is free and without obligation for clients." },
  {
    q: "How does Vakconnectie work?",
    a: "Vakconnectie is an intermediary. You tell us what you would like done, and we help you find a suitable self-employed tradesperson.",
  },
  {
    q: "How do I know a tradesperson is reliable?",
    a: "Before we introduce a tradesperson to you, we check their registration with the Dutch Chamber of Commerce (KvK).",
  },
  {
    q: "Who agrees the price and planning?",
    a: "You do, together with the tradesperson. You put the arrangements for price, planning, the work and the guarantee in writing together.",
  },
  {
    q: "How do I send my request?",
    a: "Via WhatsApp or email. When you fill in the form and click ‘Send via WhatsApp’ or ‘Send via email’, your own app opens with a pre-filled message. We only receive your request once you send that message yourself.",
  },
  {
    q: "What happens to my data?",
    a: "We use your data to handle your request and to contact you. Where needed for your request, we share it with selected self-employed tradespeople. We do not sell your data to third parties.",
  },
];

const proFaqsEn: Faq[] = [
  { q: "Who can sign up?", a: "Self-employed tradespeople registered with the Dutch Chamber of Commerce (KvK)." },
  {
    q: "How do I sign up?",
    a: "Fill in the sign-up form and send it via WhatsApp or email. Include your KvK details so we can check your registration.",
  },
  {
    q: "When will I be introduced to a client?",
    a: "Only after we have checked your KvK registration, and when there is a request that matches your trade.",
  },
  {
    q: "Who makes the arrangements with the client?",
    a: "You do, together with the client. You put the arrangements for price, planning, the work and the guarantee in writing together.",
  },
];

export function getFaqs(locale: "nl" | "en") {
  return locale === "en"
    ? { customer: customerFaqsEn, pro: proFaqsEn }
    : { customer: customerFaqs, pro: proFaqs };
}
