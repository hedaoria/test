import {
  Siren,
  Search,
  Wrench,
  Waves,
  Flame,
  Bath,
  type LucideIcon,
} from "lucide-react";
import { PageKey, SERVICE_PAGE_KEYS } from "../routes";

export interface ServiceLocaleContent {
  title: string;
  shortTitle: string;
  cardDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  intro: string[];
  features: { title: string; description: string }[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export interface ServiceContent {
  key: PageKey;
  icon: LucideIcon;
  nl: ServiceLocaleContent;
  en: ServiceLocaleContent;
}

export const SERVICES: ServiceContent[] = [
  {
    key: "emergency",
    icon: Siren,
    nl: {
      title: "Spoed Loodgieter 24/7",
      shortTitle: "Spoedservice",
      cardDescription:
        "Dag en nacht bereikbaar voor waterlekkage, verstoppingen en andere loodgietersnoodgevallen.",
      metaTitle: "Spoed Loodgieter 24/7 | Direct een Vakman Nodig? | AquaFix",
      metaDescription:
        "Spoed loodgieter nodig? AquaFix staat 24/7 voor u klaar bij waterlekkage, verstopping of ketelstoring. Snel ter plaatse in heel Nederland. Bel direct!",
      heroSubtitle:
        "Een loodgietersnoodgeval wacht niet op kantooruren. Onze spoedloodgieters staan dag en nacht, 365 dagen per jaar, voor u klaar.",
      intro: [
        "Een gesprongen leiding, een overstromende badkamer of een defecte CV-ketel in de winter: loodgietersproblemen kondigen zich zelden netjes aan. Daarom biedt AquaFix Loodgieter een volwaardige 24/7 spoedservice in heel Nederland.",
        "Onze spoedloodgieters zijn uitgerust met alle materialen om de meeste problemen direct bij het eerste bezoek op te lossen, zodat u zo snel mogelijk weer zonder zorgen kunt douchen, koken en wonen.",
      ],
      features: [
        {
          title: "Binnen 30-60 minuten ter plaatse",
          description:
            "In de meeste regio's staat onze spoedloodgieter binnen een uur voor de deur, ook 's nachts en in het weekend.",
        },
        {
          title: "Altijd bereikbaar, ook op feestdagen",
          description:
            "365 dagen per jaar, 24 uur per dag bereikbaar via telefoon en WhatsApp voor urgente situaties.",
        },
        {
          title: "Directe schadebeperking",
          description:
            "Wij stoppen eerst de schade (water afsluiten, lekkage dichten) en lossen daarna het probleem structureel op.",
        },
        {
          title: "Transparante spoedtarieven",
          description:
            "Ook bij spoed werken wij met heldere tarieven. Geen verrassingen achteraf, altijd eerlijk gecommuniceerd.",
        },
      ],
      process: [
        { title: "Bel of app ons direct", description: "U belt of appt ons spoednummer en beschrijft kort het probleem." },
        { title: "Directe inschatting", description: "Wij geven telefonisch eerste hulp-advies en een inschatting van de aankomsttijd." },
        { title: "Spoedloodgieter komt langs", description: "Onze vakman komt met volledig uitgeruste bus naar u toe." },
        { title: "Probleem opgelost", description: "Het probleem wordt direct verholpen of tijdelijk veiliggesteld met vervolgafspraak." },
      ],
      faqs: [
        {
          question: "Hoe snel is de spoedloodgieter bij mij?",
          answer:
            "In de meeste gevallen staat onze spoedloodgieter binnen 30 tot 60 minuten bij u voor de deur, afhankelijk van uw locatie en de actuele drukte.",
        },
        {
          question: "Wat kost een spoedloodgieter?",
          answer:
            "Onze spoedtarieven zijn transparant en worden altijd vooraf telefonisch met u besproken, zodat u niet voor verrassingen komt te staan.",
        },
        {
          question: "Is de spoedservice ook in het weekend beschikbaar?",
          answer:
            "Ja, onze spoedservice is 24 uur per dag, 7 dagen per week beschikbaar, inclusief weekenden en feestdagen.",
        },
      ],
    },
    en: {
      title: "24/7 Emergency Plumber",
      shortTitle: "Emergency Service",
      cardDescription:
        "Available day and night for water leaks, blockages and other plumbing emergencies.",
      metaTitle: "24/7 Emergency Plumber Netherlands | Need Help Now? | AquaFix",
      metaDescription:
        "Need an emergency plumber? AquaFix is available 24/7 for water leaks, blockages and boiler failures. Fast response across the Netherlands. Call now!",
      heroSubtitle:
        "A plumbing emergency doesn't wait for office hours. Our emergency plumbers are on call day and night, 365 days a year.",
      intro: [
        "A burst pipe, a flooding bathroom, or a broken boiler in winter: plumbing problems rarely announce themselves at a convenient time. That's why AquaFix Loodgieter offers a full 24/7 emergency plumber service across the Netherlands.",
        "Our emergency plumbers carry everything needed to fix most problems on the very first visit, so you can get back to showering, cooking, and living worry-free as quickly as possible.",
      ],
      features: [
        {
          title: "On-site within 30-60 minutes",
          description:
            "In most regions our emergency plumber arrives within the hour, including nights and weekends.",
        },
        {
          title: "Always available, even on holidays",
          description:
            "Reachable 365 days a year, 24 hours a day, by phone and WhatsApp for urgent situations.",
        },
        {
          title: "Immediate damage control",
          description:
            "We first stop the damage (shutting off water, sealing leaks) and then fix the underlying problem.",
        },
        {
          title: "Transparent emergency rates",
          description:
            "Even for emergencies, we work with clear pricing. No surprises afterwards, always communicated honestly.",
        },
      ],
      process: [
        { title: "Call or message us", description: "Call or WhatsApp our emergency line and briefly describe the problem." },
        { title: "Instant assessment", description: "We give first-aid advice over the phone and an estimated arrival time." },
        { title: "Emergency plumber arrives", description: "Our professional arrives in a fully equipped van." },
        { title: "Problem solved", description: "The issue is fixed immediately or safely secured with a follow-up appointment." },
      ],
      faqs: [
        {
          question: "How fast can an emergency plumber reach me?",
          answer:
            "In most cases our emergency plumber arrives within 30 to 60 minutes, depending on your location and current workload.",
        },
        {
          question: "What does an emergency plumber cost?",
          answer:
            "Our emergency rates are transparent and always discussed with you by phone beforehand, so there are no surprises.",
        },
        {
          question: "Is the emergency service available on weekends?",
          answer:
            "Yes, our emergency service is available 24 hours a day, 7 days a week, including weekends and public holidays.",
        },
      ],
    },
  },
  {
    key: "leakDetection",
    icon: Search,
    nl: {
      title: "Lekkage Opsporen",
      shortTitle: "Lekkage Opsporing",
      cardDescription:
        "Nauwkeurige lekdetectie met professionele apparatuur, zonder onnodige breekwerkzaamheden.",
      metaTitle: "Lekkage Opsporen Zonder Breekwerk | Professionele Lekdetectie | AquaFix",
      metaDescription:
        "Vochtplekken of hoge waterrekening? Onze specialisten sporen elke lekkage snel en nauwkeurig op met professionele apparatuur. Vraag een offerte aan.",
      heroSubtitle:
        "Vochtplekken, een onverklaarbaar hoge waterrekening of een vochtige geur? Wij sporen de bron van de lekkage snel en nauwkeurig op.",
      intro: [
        "Een verborgen lekkage kan grote schade veroorzaken als deze te laat wordt ontdekt. Onze loodgieters gebruiken geavanceerde apparatuur zoals warmtebeeldcamera's, vochtmeters en akoestische lekdetectie om de exacte locatie van een lek te bepalen.",
        "Door precies te weten waar het probleem zit, hoeven we minder te breken en kunnen we de lekkage gerichter en voordeliger verhelpen dan bij traditionele opsporingsmethoden.",
      ],
      features: [
        {
          title: "Niet-destructieve opsporing",
          description:
            "Met warmtebeeldcamera's en akoestische sensoren vinden wij lekken zonder onnodig te hoeven breken.",
        },
        {
          title: "Geschikt voor alle leidingtypes",
          description:
            "Wij sporen lekkages op in waterleidingen, vloerverwarming, rioolleidingen en daken.",
        },
        {
          title: "Uitgebreid rapport",
          description:
            "Na de opsporing ontvangt u een duidelijk rapport met foto's en een concreet herstelvoorstel.",
        },
        {
          title: "Directe reparatie mogelijk",
          description:
            "Onze loodgieters kunnen de lekkage in veel gevallen direct na opsporing ook meteen verhelpen.",
        },
      ],
      process: [
        { title: "Inspectie plannen", description: "U meldt de klachten (vochtplekken, hoge waterrekening) en wij plannen een inspectie." },
        { title: "Lekdetectie ter plaatse", description: "Met professionele apparatuur sporen wij de exacte bron van de lekkage op." },
        { title: "Rapport & advies", description: "U ontvangt een helder rapport met de bevindingen en een oplossingsvoorstel." },
        { title: "Herstel van de lekkage", description: "Na akkoord verhelpen wij de lekkage vakkundig en duurzaam." },
      ],
      faqs: [
        {
          question: "Moet er altijd gebroken worden om een lek te vinden?",
          answer:
            "Nee, dankzij warmtebeeldcamera's en akoestische apparatuur kunnen wij in de meeste gevallen lekkages opsporen zonder te breken.",
        },
        {
          question: "Hoe weet ik of ik een verborgen lekkage heb?",
          answer:
            "Signalen zijn onder andere vochtplekken, een onverklaarbaar hoge waterrekening, een vochtige geur of een dalende waterdruk.",
        },
        {
          question: "Hoe lang duurt een lekdetectie-onderzoek?",
          answer:
            "Een standaard lekdetectie duurt gemiddeld 1 tot 2 uur, afhankelijk van de omvang en complexiteit van de situatie.",
        },
      ],
    },
    en: {
      title: "Leak Detection",
      shortTitle: "Leak Detection",
      cardDescription:
        "Precise leak detection using professional equipment, without unnecessary demolition.",
      metaTitle: "Leak Detection Without Demolition | Professional Leak Detection | AquaFix",
      metaDescription:
        "Damp patches or an unexplained high water bill? Our specialists locate any leak quickly and accurately using professional equipment. Request a quote.",
      heroSubtitle:
        "Damp patches, an unexplained high water bill, or a musty smell? We locate the source of the leak quickly and accurately.",
      intro: [
        "A hidden leak can cause significant damage if discovered too late. Our plumbers use advanced equipment such as thermal imaging cameras, moisture meters, and acoustic leak detection to pinpoint the exact location of a leak.",
        "By knowing exactly where the problem is, we need to break open less of your property and can fix the leak more precisely and affordably than with traditional detection methods.",
      ],
      features: [
        {
          title: "Non-destructive detection",
          description:
            "Using thermal imaging cameras and acoustic sensors, we find leaks without unnecessary demolition.",
        },
        {
          title: "Works on all pipe types",
          description:
            "We detect leaks in water pipes, underfloor heating, sewer lines and roofs.",
        },
        {
          title: "Detailed report",
          description:
            "After detection you receive a clear report with photos and a concrete repair proposal.",
        },
        {
          title: "Immediate repair possible",
          description:
            "In many cases our plumbers can fix the leak immediately after it has been located.",
        },
      ],
      process: [
        { title: "Schedule an inspection", description: "You report the symptoms (damp patches, high water bill) and we schedule an inspection." },
        { title: "On-site leak detection", description: "Using professional equipment we locate the exact source of the leak." },
        { title: "Report & advice", description: "You receive a clear report with findings and a proposed solution." },
        { title: "Leak repair", description: "After approval we repair the leak professionally and durably." },
      ],
      faqs: [
        {
          question: "Do you always need to break open walls or floors to find a leak?",
          answer:
            "No, thanks to thermal imaging and acoustic equipment we can locate most leaks without any demolition.",
        },
        {
          question: "How do I know if I have a hidden leak?",
          answer:
            "Signs include damp patches, an unexplained high water bill, a musty smell, or dropping water pressure.",
        },
        {
          question: "How long does a leak detection survey take?",
          answer:
            "A standard leak detection survey takes on average 1 to 2 hours, depending on the size and complexity of the situation.",
        },
      ],
    },
  },
  {
    key: "drainUnblocking",
    icon: Wrench,
    nl: {
      title: "Afvoer Ontstoppen",
      shortTitle: "Ontstopping",
      cardDescription:
        "Snel en effectief afvoeren, gootstenen en toiletten ontstoppen met professionele apparatuur.",
      metaTitle: "Afvoer Ontstoppen | Snel & Vakkundig | AquaFix Loodgieter",
      metaDescription:
        "Verstopte afvoer, gootsteen of toilet? Onze loodgieters ontstoppen snel en grondig met een hogedrukspuit of ontstoppingsveer. Ook 's avonds en in het weekend.",
      heroSubtitle:
        "Een verstopte afvoer, gootsteen of toilet is vervelend en kan snel escaleren. Wij ontstoppen snel, grondig en met de juiste apparatuur.",
      intro: [
        "Een langzaam weglopende afvoer of een volledig verstopt toilet is een van de meest voorkomende loodgietersproblemen. Vaak is de oorzaak vet, haar, kalkaanslag of wortelinrgroei in de leiding.",
        "Onze loodgieters gebruiken professionele ontstoppingsveren en hogedrukapparatuur om de verstopping niet alleen op te lossen, maar ook de leiding grondig te reinigen zodat het probleem niet snel terugkeert.",
      ],
      features: [
        {
          title: "Voor elk type verstopping",
          description:
            "Van keuken- en badkamerafvoeren tot toiletten en buitenriolering: wij lossen elke verstopping op.",
        },
        {
          title: "Hogedrukreiniging",
          description:
            "Met hogedrukspuiten reinigen wij de leiding grondig, zodat vet- en kalkaanslag echt verdwijnt.",
        },
        {
          title: "Camera-inspectie mogelijk",
          description:
            "Bij hardnekkige verstoppingen inspecteren wij de leiding met een camera om de oorzaak vast te stellen.",
        },
        {
          title: "Preventief advies",
          description:
            "Wij geven u praktische tips om toekomstige verstoppingen te voorkomen.",
        },
      ],
      process: [
        { title: "Melding verstopping", description: "U meldt de verstopping telefonisch of via WhatsApp." },
        { title: "Vakman ter plaatse", description: "Onze loodgieter komt langs met ontstoppingsapparatuur." },
        { title: "Ontstoppen & reinigen", description: "De verstopping wordt verwijderd en de leiding grondig gereinigd." },
        { title: "Controle & advies", description: "Wij controleren de afvoer en geven advies om herhaling te voorkomen." },
      ],
      faqs: [
        {
          question: "Wat kost het ontstoppen van een afvoer?",
          answer:
            "De kosten zijn afhankelijk van de locatie en ernst van de verstopping. Wij geven altijd vooraf een duidelijke prijsindicatie.",
        },
        {
          question: "Kan ik een verstopping zelf voorkomen?",
          answer:
            "Ja, door geen vet, haar of vreemde voorwerpen in de afvoer te laten spoelen en regelmatig te reinigen, voorkomt u de meeste verstoppingen.",
        },
        {
          question: "Wat als de verstopping steeds terugkomt?",
          answer:
            "Een terugkerende verstopping kan wijzen op een structureel probleem, zoals wortelinrgroei. Wij inspecteren dit met een camera en adviseren een duurzame oplossing.",
        },
      ],
    },
    en: {
      title: "Drain Unblocking",
      shortTitle: "Drain Unblocking",
      cardDescription:
        "Fast and effective unblocking of drains, sinks and toilets using professional equipment.",
      metaTitle: "Drain Unblocking Netherlands | Fast & Professional | AquaFix Loodgieter",
      metaDescription:
        "Blocked drain, sink or toilet? Our plumbers unblock drains quickly and thoroughly using high-pressure jetting or drain rods. Available evenings and weekends.",
      heroSubtitle:
        "A blocked drain, sink, or toilet is annoying and can escalate quickly. We unblock it fast, thoroughly, and with the right equipment.",
      intro: [
        "A slow-draining sink or a fully blocked toilet is one of the most common plumbing problems. The cause is often grease, hair, limescale, or root intrusion in the pipe.",
        "Our plumbers use professional drain rods and high-pressure equipment to not only clear the blockage but also thoroughly clean the pipe, so the problem doesn't quickly return.",
      ],
      features: [
        {
          title: "For every type of blockage",
          description:
            "From kitchen and bathroom drains to toilets and outdoor sewers: we clear any blockage.",
        },
        {
          title: "High-pressure jetting",
          description:
            "With high-pressure jets we thoroughly clean the pipe, so grease and limescale build-up is truly removed.",
        },
        {
          title: "Camera inspection available",
          description:
            "For stubborn blockages we inspect the pipe with a camera to determine the cause.",
        },
        {
          title: "Preventive advice",
          description:
            "We give you practical tips to prevent future blockages.",
        },
      ],
      process: [
        { title: "Report the blockage", description: "You report the blockage by phone or WhatsApp." },
        { title: "Plumber arrives", description: "Our plumber arrives with professional unblocking equipment." },
        { title: "Unblock & clean", description: "The blockage is removed and the pipe is thoroughly cleaned." },
        { title: "Check & advice", description: "We check the drain and give advice to prevent it happening again." },
      ],
      faqs: [
        {
          question: "How much does drain unblocking cost?",
          answer:
            "Costs depend on the location and severity of the blockage. We always provide a clear price indication in advance.",
        },
        {
          question: "Can I prevent a blockage myself?",
          answer:
            "Yes, by not flushing grease, hair, or foreign objects down the drain and cleaning it regularly, you can prevent most blockages.",
        },
        {
          question: "What if the blockage keeps coming back?",
          answer:
            "A recurring blockage may indicate a structural problem, such as root intrusion. We inspect this with a camera and recommend a lasting solution.",
        },
      ],
    },
  },
  {
    key: "sewer",
    icon: Waves,
    nl: {
      title: "Riolering",
      shortTitle: "Riolering",
      cardDescription:
        "Rioolinspectie, reiniging en reparatie met camera-inspectie voor een duurzame oplossing.",
      metaTitle: "Riolering Reinigen & Repareren | Camera-inspectie | AquaFix Loodgieter",
      metaDescription:
        "Problemen met uw riolering? Wij bieden rioolinspectie, hogedrukreiniging en reparatie met camera-inspectie. Snel en vakkundig door heel Nederland.",
      heroSubtitle:
        "Van rioolverstopping tot lekkende rioolbuizen: wij inspecteren, reinigen en repareren uw riolering grondig en duurzaam.",
      intro: [
        "Problemen met de riolering kunnen leiden tot vervelende stankoverlast, verzakkingen of zelfs waterschade aan uw woning. Onze specialisten inspecteren uw riolering met professionele camera's om de exacte staat en oorzaak van het probleem te bepalen.",
        "Op basis van de inspectie adviseren wij de meest duurzame oplossing, van hogedrukreiniging tot volledige rioolrenovatie zonder graafwerk (relining).",
      ],
      features: [
        {
          title: "Camera-inspectie riolering",
          description:
            "Wij brengen de staat van uw riolering volledig in kaart met professionele inspectiecamera's.",
        },
        {
          title: "Hogedruk rioolreiniging",
          description:
            "Wij reinigen rioolbuizen grondig van vet, wortels en kalkaanslag met hogedrukapparatuur.",
        },
        {
          title: "Reparatie zonder graafwerk",
          description:
            "Met relining-technieken repareren wij rioolbuizen vaak zonder dat er gegraven hoeft te worden.",
        },
        {
          title: "Preventief onderhoud",
          description:
            "Met periodiek onderhoud voorkomt u kostbare rioolproblemen in de toekomst.",
        },
      ],
      process: [
        { title: "Camera-inspectie", description: "Wij inspecteren de riolering en brengen eventuele schade in kaart." },
        { title: "Advies op maat", description: "U ontvangt een helder advies met de beste oplossing voor uw situatie." },
        { title: "Reiniging of reparatie", description: "Wij voeren de reiniging of reparatie vakkundig uit." },
        { title: "Eindcontrole", description: "Na afronding controleren wij het resultaat met een laatste inspectie." },
      ],
      faqs: [
        {
          question: "Hoe vaak moet riolering gereinigd worden?",
          answer:
            "Wij adviseren de riolering gemiddeld eens per 2 tot 3 jaar preventief te laten reinigen, afhankelijk van gebruik en leeftijd van de leidingen.",
        },
        {
          question: "Wat is relining?",
          answer:
            "Relining is een techniek waarbij een rioolbuis van binnenuit wordt gerepareerd met een kunststof coating, zonder dat er gegraven hoeft te worden.",
        },
        {
          question: "Hoe herken ik rioolproblemen?",
          answer:
            "Veelvoorkomende signalen zijn stankoverlast, terugkerende verstoppingen, vochtplekken of verzakkingen in de tuin of oprit.",
        },
      ],
    },
    en: {
      title: "Sewer Services",
      shortTitle: "Sewer Services",
      cardDescription:
        "Sewer inspection, cleaning and repair with camera inspection for a lasting solution.",
      metaTitle: "Sewer Cleaning & Repair | Camera Inspection | AquaFix Loodgieter",
      metaDescription:
        "Sewer problems? We offer sewer inspection, high-pressure cleaning and repair with camera inspection. Fast and professional across the Netherlands.",
      heroSubtitle:
        "From sewer blockages to leaking sewer pipes: we thoroughly inspect, clean, and repair your sewer system for a lasting result.",
      intro: [
        "Sewer problems can lead to unpleasant odours, subsidence, or even water damage to your home. Our specialists inspect your sewer system with professional cameras to determine the exact condition and cause of the problem.",
        "Based on the inspection, we recommend the most durable solution, from high-pressure cleaning to full sewer repair without excavation (relining).",
      ],
      features: [
        {
          title: "Sewer camera inspection",
          description:
            "We fully map the condition of your sewer system with professional inspection cameras.",
        },
        {
          title: "High-pressure sewer cleaning",
          description:
            "We thoroughly clean sewer pipes of grease, roots and limescale using high-pressure equipment.",
        },
        {
          title: "Trenchless repair",
          description:
            "Using relining techniques we can often repair sewer pipes without any excavation.",
        },
        {
          title: "Preventive maintenance",
          description:
            "Periodic maintenance prevents costly sewer problems in the future.",
        },
      ],
      process: [
        { title: "Camera inspection", description: "We inspect the sewer system and map out any damage." },
        { title: "Tailored advice", description: "You receive clear advice with the best solution for your situation." },
        { title: "Cleaning or repair", description: "We carry out the cleaning or repair professionally." },
        { title: "Final check", description: "After completion we verify the result with a final inspection." },
      ],
      faqs: [
        {
          question: "How often should sewers be cleaned?",
          answer:
            "We recommend preventive sewer cleaning roughly every 2 to 3 years, depending on usage and the age of the pipes.",
        },
        {
          question: "What is relining?",
          answer:
            "Relining is a technique where a sewer pipe is repaired from the inside with a plastic coating, without any excavation required.",
        },
        {
          question: "How do I recognize sewer problems?",
          answer:
            "Common signs include bad odours, recurring blockages, damp patches, or subsidence in the garden or driveway.",
        },
      ],
    },
  },
  {
    key: "heating",
    icon: Flame,
    nl: {
      title: "CV Ketel Reparatie & Onderhoud",
      shortTitle: "CV Ketel",
      cardDescription:
        "Reparatie, onderhoud en installatie van CV-ketels door gecertificeerde monteurs.",
      metaTitle: "CV Ketel Reparatie & Onderhoud | Erkend Installateur | AquaFix",
      metaDescription:
        "CV-ketel storing of onderhoud nodig? Onze gecertificeerde monteurs repareren en onderhouden alle merken CV-ketels. Snel geholpen, ook bij spoed.",
      heroSubtitle:
        "Geen warm water of verwarming? Onze gecertificeerde monteurs repareren, onderhouden en installeren CV-ketels van alle merken.",
      intro: [
        "Een defecte CV-ketel is vooral in de winter een groot ongemak. Onze gecertificeerde monteurs hebben ruime ervaring met alle bekende ketelmerken en lossen storingen snel en vakkundig op.",
        "Daarnaast bieden wij jaarlijks onderhoud aan om storingen te voorkomen, uw energieverbruik te optimaliseren en de levensduur van uw CV-ketel te verlengen.",
      ],
      features: [
        {
          title: "Alle merken CV-ketels",
          description:
            "Onze monteurs zijn opgeleid voor alle bekende merken, waaronder Nefit, Vaillant, Remeha en Intergas.",
        },
        {
          title: "Snelle storingsdiagnose",
          description:
            "Met moderne diagnoseapparatuur sporen wij de oorzaak van een storing snel op.",
        },
        {
          title: "Jaarlijks onderhoud",
          description:
            "Preventief onderhoud verlengt de levensduur van uw ketel en voorkomt onverwachte storingen.",
        },
        {
          title: "Advies over vervanging",
          description:
            "Is reparatie niet meer rendabel? Wij adviseren u eerlijk over een energiezuinige vervangende ketel.",
        },
      ],
      process: [
        { title: "Storing melden", description: "U meldt de storing of vraagt een onderhoudsbeurt aan." },
        { title: "Diagnose", description: "Onze monteur stelt de oorzaak van de storing vast." },
        { title: "Reparatie of onderhoud", description: "Wij voeren de reparatie of het onderhoud direct uit, indien onderdelen op voorraad zijn." },
        { title: "Test & advies", description: "Wij testen de installatie grondig en geven onderhoudsadvies." },
      ],
      faqs: [
        {
          question: "Hoe vaak moet mijn CV-ketel onderhouden worden?",
          answer:
            "Wij adviseren jaarlijks onderhoud om storingen te voorkomen en de garantie van uw ketel te behouden.",
        },
        {
          question: "Welke merken CV-ketels repareren jullie?",
          answer:
            "Wij repareren en onderhouden alle bekende merken, waaronder Nefit, Vaillant, Remeha, Intergas, Bosch en Atag.",
        },
        {
          question: "Mijn ketel is ouder dan 15 jaar, repareren of vervangen?",
          answer:
            "Bij oudere ketels wegen wij de reparatiekosten af tegen de kosten van een nieuwe, energiezuinige ketel en adviseren wij u eerlijk.",
        },
      ],
    },
    en: {
      title: "Boiler Repair & Maintenance",
      shortTitle: "Heating / Boiler",
      cardDescription:
        "Repair, maintenance and installation of boilers by certified technicians.",
      metaTitle: "Boiler Repair & Maintenance | Certified Installer | AquaFix",
      metaDescription:
        "Boiler breakdown or maintenance needed? Our certified technicians repair and maintain all boiler brands. Fast help, including emergencies.",
      heroSubtitle:
        "No hot water or heating? Our certified technicians repair, maintain, and install boilers of all brands.",
      intro: [
        "A broken boiler is a major inconvenience, especially in winter. Our certified technicians have extensive experience with all well-known boiler brands and resolve breakdowns quickly and professionally.",
        "We also offer annual maintenance to prevent breakdowns, optimize your energy usage, and extend the lifespan of your boiler.",
      ],
      features: [
        {
          title: "All boiler brands",
          description:
            "Our technicians are trained on all well-known brands, including Nefit, Vaillant, Remeha, and Intergas.",
        },
        {
          title: "Fast fault diagnosis",
          description:
            "Using modern diagnostic equipment we quickly identify the cause of a breakdown.",
        },
        {
          title: "Annual maintenance",
          description:
            "Preventive maintenance extends the lifespan of your boiler and prevents unexpected breakdowns.",
        },
        {
          title: "Honest replacement advice",
          description:
            "If repair is no longer cost-effective, we give you honest advice on an energy-efficient replacement boiler.",
        },
      ],
      process: [
        { title: "Report the fault", description: "You report the fault or request a maintenance visit." },
        { title: "Diagnosis", description: "Our technician identifies the cause of the breakdown." },
        { title: "Repair or maintenance", description: "We carry out the repair or maintenance immediately if parts are in stock." },
        { title: "Test & advice", description: "We thoroughly test the system and give maintenance advice." },
      ],
      faqs: [
        {
          question: "How often should my boiler be serviced?",
          answer:
            "We recommend annual maintenance to prevent breakdowns and keep your boiler's warranty valid.",
        },
        {
          question: "Which boiler brands do you repair?",
          answer:
            "We repair and maintain all well-known brands, including Nefit, Vaillant, Remeha, Intergas, Bosch, and Atag.",
        },
        {
          question: "My boiler is older than 15 years, repair or replace?",
          answer:
            "For older boilers we weigh the repair cost against a new, energy-efficient boiler and give you honest advice.",
        },
      ],
    },
  },
  {
    key: "bathroom",
    icon: Bath,
    nl: {
      title: "Badkamer Renovatie",
      shortTitle: "Badkamerrenovatie",
      cardDescription:
        "Complete badkamerrenovatie van ontwerp tot oplevering, door ervaren vakmensen.",
      metaTitle: "Badkamer Renovatie op Maat | Ontwerp tot Oplevering | AquaFix",
      metaDescription:
        "Droombadkamer? Wij verzorgen uw complete badkamerrenovatie, van ontwerp en sloop tot tegelwerk en oplevering. Vraag een vrijblijvende offerte aan.",
      heroSubtitle:
        "Van klein sanitair vervangen tot een complete renovatie: wij realiseren uw droombadkamer van A tot Z.",
      intro: [
        "Een nieuwe badkamer is een investering in comfort en woonplezier. Onze vakmensen begeleiden u van het eerste ontwerp tot de laatste tegel, met oog voor kwaliteit, functionaliteit en stijl.",
        "Wij verzorgen het volledige traject: sloop, loodgieterswerk, tegelwerk, elektra en afwerking, zodat u zich geen zorgen hoeft te maken over de coördinatie van verschillende vakmensen.",
      ],
      features: [
        {
          title: "Ontwerp op maat",
          description:
            "Samen met u ontwerpen wij een badkamer die past bij uw wensen, stijl en budget.",
        },
        {
          title: "Volledige ontzorging",
          description:
            "Van sloop tot oplevering: wij regelen het hele traject, inclusief tegelwerk en elektra.",
        },
        {
          title: "Vaste doorlooptijd",
          description:
            "Wij werken met een duidelijke planning, zodat u weet wanneer uw nieuwe badkamer klaar is.",
        },
        {
          title: "Garantie op het werk",
          description:
            "Wij geven garantie op zowel het loodgieterswerk als het tegel- en afwerkingswerk.",
        },
      ],
      process: [
        { title: "Gratis adviesgesprek", description: "Wij bespreken uw wensen, stijl en budget tijdens een vrijblijvende afspraak." },
        { title: "Ontwerp & offerte", description: "U ontvangt een 3D-ontwerp en een gedetailleerde offerte." },
        { title: "Uitvoering", description: "Ons team voert de renovatie volgens planning uit, van sloop tot afwerking." },
        { title: "Oplevering", description: "Wij leveren de badkamer op en lopen samen met u alles na." },
      ],
      faqs: [
        {
          question: "Hoe lang duurt een complete badkamerrenovatie?",
          answer:
            "Een gemiddelde badkamerrenovatie duurt 1 tot 2 weken, afhankelijk van de omvang en gewenste afwerking.",
        },
        {
          question: "Kan ik zelf materialen en tegels uitzoeken?",
          answer:
            "Ja, u kunt zelf materialen kiezen of gebruikmaken van ons netwerk van leveranciers voor sanitair en tegels.",
        },
        {
          question: "Wat kost een nieuwe badkamer gemiddeld?",
          answer:
            "De kosten zijn sterk afhankelijk van de gewenste afwerking en grootte. Na een gratis adviesgesprek ontvangt u een gedetailleerde offerte op maat.",
        },
      ],
    },
    en: {
      title: "Bathroom Renovation",
      shortTitle: "Bathroom Renovation",
      cardDescription:
        "Complete bathroom renovation from design to delivery, by experienced professionals.",
      metaTitle: "Custom Bathroom Renovation | Design to Delivery | AquaFix",
      metaDescription:
        "Dream bathroom? We handle your complete bathroom renovation, from design and demolition to tiling and delivery. Request a no-obligation quote.",
      heroSubtitle:
        "From replacing a single fixture to a complete renovation: we bring your dream bathroom to life from A to Z.",
      intro: [
        "A new bathroom is an investment in comfort and enjoyment of your home. Our professionals guide you from the first design to the final tile, with an eye for quality, function, and style.",
        "We handle the entire process: demolition, plumbing, tiling, electrical work, and finishing, so you don't have to worry about coordinating different tradespeople.",
      ],
      features: [
        {
          title: "Custom design",
          description:
            "Together with you we design a bathroom that fits your wishes, style, and budget.",
        },
        {
          title: "Full-service renovation",
          description:
            "From demolition to delivery: we manage the entire project, including tiling and electrical work.",
        },
        {
          title: "Fixed timeline",
          description:
            "We work with a clear planning, so you know exactly when your new bathroom will be ready.",
        },
        {
          title: "Guarantee on the work",
          description:
            "We provide a guarantee on both the plumbing and the tiling and finishing work.",
        },
      ],
      process: [
        { title: "Free consultation", description: "We discuss your wishes, style, and budget during a no-obligation appointment." },
        { title: "Design & quote", description: "You receive a 3D design and a detailed quote." },
        { title: "Renovation", description: "Our team carries out the renovation on schedule, from demolition to finishing." },
        { title: "Delivery", description: "We deliver the finished bathroom and walk through everything together with you." },
      ],
      faqs: [
        {
          question: "How long does a full bathroom renovation take?",
          answer:
            "An average bathroom renovation takes 1 to 2 weeks, depending on the size and desired finish.",
        },
        {
          question: "Can I choose my own materials and tiles?",
          answer:
            "Yes, you can choose your own materials or use our network of suppliers for fixtures and tiles.",
        },
        {
          question: "What does a new bathroom cost on average?",
          answer:
            "Costs strongly depend on the desired finish and size. After a free consultation you'll receive a detailed, tailored quote.",
        },
      ],
    },
  },
];

export function getService(key: PageKey): ServiceContent | undefined {
  return SERVICES.find((s) => s.key === key);
}

export { SERVICE_PAGE_KEYS };
