export interface Testimonial {
  name: string;
  location: { nl: string; en: string };
  rating: number;
  text: { nl: string; en: string };
  service: { nl: string; en: string };
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marieke de Vries",
    location: { nl: "Utrecht", en: "Utrecht" },
    rating: 5,
    text: {
      nl: "Binnen 40 minuten stond de loodgieter voor de deur toen onze keukenkraan begon te lekken. Vriendelijk, snel en een eerlijke prijs. Echt een aanrader!",
      en: "Within 40 minutes the plumber was at our door when our kitchen tap started leaking. Friendly, fast, and a fair price. Highly recommended!",
    },
    service: { nl: "Spoedservice", en: "Emergency Service" },
  },
  {
    name: "Tom Bakker",
    location: { nl: "Amsterdam", en: "Amsterdam" },
    rating: 5,
    text: {
      nl: "Onze badkamer is volledig gerenoveerd door AquaFix. Van ontwerp tot oplevering top begeleid, precies binnen de afgesproken planning en budget.",
      en: "Our bathroom was completely renovated by AquaFix. Excellent guidance from design to delivery, exactly within the agreed schedule and budget.",
    },
    service: { nl: "Badkamerrenovatie", en: "Bathroom Renovation" },
  },
  {
    name: "Els Willemsen",
    location: { nl: "Rotterdam", en: "Rotterdam" },
    rating: 5,
    text: {
      nl: "Hardnekkige verstopping die andere loodgieters niet konden oplossen. AquaFix vond met camera-inspectie direct de oorzaak en loste het probleem duurzaam op.",
      en: "A stubborn blockage other plumbers couldn't fix. AquaFix used camera inspection to find the cause immediately and solved the problem for good.",
    },
    service: { nl: "Riolering", en: "Sewer Services" },
  },
  {
    name: "Hassan El Amrani",
    location: { nl: "Den Haag", en: "The Hague" },
    rating: 5,
    text: {
      nl: "Onze CV-ketel viel uit tijdens een koude winterweek. Dezelfde dag nog geholpen en de monteur legde alles duidelijk uit. Top service!",
      en: "Our boiler broke down during a cold winter week. Helped the same day, and the technician explained everything clearly. Great service!",
    },
    service: { nl: "CV Ketel", en: "Heating / Boiler" },
  },
  {
    name: "Sophie Jansen",
    location: { nl: "Eindhoven", en: "Eindhoven" },
    rating: 5,
    text: {
      nl: "Vochtplekken op het plafond bleken een verborgen lekkage. Dankzij de warmtebeeldcamera was er nauwelijks breekwerk nodig. Zeer professioneel.",
      en: "Damp patches on the ceiling turned out to be a hidden leak. Thanks to the thermal imaging camera, almost no demolition was needed. Very professional.",
    },
    service: { nl: "Lekkage Opsporen", en: "Leak Detection" },
  },
  {
    name: "Peter van Dijk",
    location: { nl: "Groningen", en: "Groningen" },
    rating: 4,
    text: {
      nl: "Snelle en nette afhandeling van een verstopte afvoer. Communicatie over de afspraak kon iets sneller, maar het resultaat was uitstekend.",
      en: "Fast and tidy handling of a blocked drain. Communication about the appointment could have been slightly quicker, but the result was excellent.",
    },
    service: { nl: "Afvoer Ontstoppen", en: "Drain Unblocking" },
  },
];
