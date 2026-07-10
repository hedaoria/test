import {
  Droplets,
  Wrench,
  Flame,
  ShieldCheck,
  Bath,
  Siren,
  type LucideIcon,
} from "lucide-react";

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPostLocale {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  sections: BlogSection[];
}

export interface BlogPost {
  id: string;
  slug: { nl: string; en: string };
  icon: LucideIcon;
  publishedAt: string;
  readMinutes: number;
  category: { nl: string; en: string };
  nl: BlogPostLocale;
  en: BlogPostLocale;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "voorkom-waterschade",
    slug: { nl: "waterschade-voorkomen-5-tips", en: "prevent-water-damage-5-tips" },
    icon: Droplets,
    publishedAt: "2026-06-02",
    readMinutes: 6,
    category: { nl: "Preventie", en: "Prevention" },
    nl: {
      title: "5 Tips om Waterschade in Huis te Voorkomen",
      metaTitle: "5 Tips om Waterschade te Voorkomen | AquaFix Loodgieter Blog",
      metaDescription:
        "Voorkom kostbare waterschade met deze 5 praktische tips van onze loodgieters. Herken vroege signalen van lekkage en bescherm uw woning.",
      excerpt:
        "Waterschade kan enorme kosten met zich meebrengen. Met deze vijf praktische tips van onze loodgieters beschermt u uw woning tegen lekkages en wateroverlast.",
      sections: [
        {
          heading: "1. Controleer regelmatig zichtbare leidingen",
          paragraphs: [
            "Loop periodiek langs zichtbare leidingen onder gootstenen, bij de CV-ketel en in de meterkast. Let op roestvorming, vochtplekken of druppels, want dit zijn vaak de eerste signalen van een beginnende lekkage.",
          ],
        },
        {
          heading: "2. Let op uw waterrekening",
          paragraphs: [
            "Een onverklaarbare stijging van uw waterverbruik kan wijzen op een verborgen lekkage. Vergelijk uw rekeningen regelmatig en neem bij twijfel contact op voor een professionele lekdetectie.",
          ],
        },
        {
          heading: "3. Onderhoud uw CV-ketel jaarlijks",
          paragraphs: [
            "Een slecht onderhouden CV-ketel kan lekkages en storingen veroorzaken. Laat uw ketel jaarlijks controleren door een gecertificeerd monteur om problemen vroegtijdig te signaleren.",
          ],
        },
        {
          heading: "4. Isoleer leidingen tegen vorst",
          paragraphs: [
            "Bevroren leidingen kunnen barsten en grote schade veroorzaken. Isoleer leidingen in onverwarmde ruimtes zoals de garage of kruipruimte, zeker voor de wintermaanden.",
          ],
        },
        {
          heading: "5. Reageer snel bij twijfel",
          paragraphs: [
            "Merkt u vochtplekken, een vochtige geur of een vreemd geluid in de leidingen? Wacht niet af, maar schakel direct een professionele loodgieter in om erger te voorkomen.",
          ],
        },
      ],
    },
    en: {
      title: "5 Tips to Prevent Water Damage in Your Home",
      metaTitle: "5 Tips to Prevent Water Damage | AquaFix Loodgieter Blog",
      metaDescription:
        "Prevent costly water damage with these 5 practical tips from our plumbers. Recognize early signs of a leak and protect your home.",
      excerpt:
        "Water damage can lead to enormous costs. With these five practical tips from our plumbers, you can protect your home against leaks and flooding.",
      sections: [
        {
          heading: "1. Regularly check visible pipes",
          paragraphs: [
            "Periodically inspect visible pipes under sinks, near the boiler, and in the utility cupboard. Watch for rust, damp patches, or drips — these are often the first signs of a developing leak.",
          ],
        },
        {
          heading: "2. Keep an eye on your water bill",
          paragraphs: [
            "An unexplained rise in your water usage can indicate a hidden leak. Compare your bills regularly and contact a professional for leak detection if in doubt.",
          ],
        },
        {
          heading: "3. Service your boiler annually",
          paragraphs: [
            "A poorly maintained boiler can cause leaks and breakdowns. Have your boiler inspected annually by a certified technician to catch problems early.",
          ],
        },
        {
          heading: "4. Insulate pipes against frost",
          paragraphs: [
            "Frozen pipes can burst and cause major damage. Insulate pipes in unheated areas like the garage or crawl space, especially before winter.",
          ],
        },
        {
          heading: "5. Act quickly if in doubt",
          paragraphs: [
            "Noticing damp patches, a musty smell, or an odd sound in the pipes? Don't wait — call a professional plumber immediately to prevent further damage.",
          ],
        },
      ],
    },
  },
  {
    id: "verstopping-voorkomen",
    slug: { nl: "verstopte-afvoer-voorkomen", en: "how-to-prevent-a-blocked-drain" },
    icon: Wrench,
    publishedAt: "2026-05-14",
    readMinutes: 5,
    category: { nl: "Onderhoud", en: "Maintenance" },
    nl: {
      title: "Verstopte Afvoer Voorkomen: Zo Doet U Dat",
      metaTitle: "Verstopte Afvoer Voorkomen | Praktische Tips | AquaFix",
      metaDescription:
        "Voorkom een verstopte afvoer met deze praktische tips. Leer wat wel en niet door de gootsteen of het toilet mag en hoe u uw leidingen schoon houdt.",
      excerpt:
        "Een verstopte afvoer is vervelend en vaak te voorkomen. Ontdek praktische tips om uw afvoeren en riolering vrij van verstoppingen te houden.",
      sections: [
        {
          heading: "Vet en olie horen niet in de gootsteen",
          paragraphs: [
            "Vet stolt in de leiding en vormt samen met andere resten een harde prop. Giet vet en bakolie nooit door de gootsteen, maar laat het afkoelen en gooi het bij het restafval.",
          ],
        },
        {
          heading: "Gebruik een haarzeef in douche en bad",
          paragraphs: [
            "Haar is een van de meest voorkomende oorzaken van verstoppingen. Een eenvoudige haarzeef voorkomt dat haar in de sifon verzamelt.",
          ],
        },
        {
          heading: "Alleen toiletpapier door het toilet",
          paragraphs: [
            "Vochtige doekjes, wattenstaafjes en ander afval horen niet in het toilet, ook niet als er 'doorspoelbaar' op staat. Dit is een van de belangrijkste oorzaken van rioolverstoppingen.",
          ],
        },
        {
          heading: "Spoel maandelijks door met heet water",
          paragraphs: [
            "Spoel afvoeren regelmatig door met een flinke hoeveelheid heet water om vet- en zeepresten te verwijderen voordat ze zich ophopen.",
          ],
        },
        {
          heading: "Twijfelt u? Laat een professionele controle uitvoeren",
          paragraphs: [
            "Bij terugkerende verstoppingen kan een camera-inspectie de onderliggende oorzaak, zoals wortelinrgroei, aan het licht brengen.",
          ],
        },
      ],
    },
    en: {
      title: "How to Prevent a Blocked Drain",
      metaTitle: "How to Prevent a Blocked Drain | Practical Tips | AquaFix",
      metaDescription:
        "Prevent a blocked drain with these practical tips. Learn what should and shouldn't go down the sink or toilet, and how to keep your pipes clean.",
      excerpt:
        "A blocked drain is annoying and often preventable. Discover practical tips to keep your drains and sewer free of blockages.",
      sections: [
        {
          heading: "Grease and oil don't belong in the sink",
          paragraphs: [
            "Grease solidifies in the pipe and, together with other debris, forms a hard clog. Never pour grease or cooking oil down the sink — let it cool and dispose of it with your household waste.",
          ],
        },
        {
          heading: "Use a hair catcher in the shower and bath",
          paragraphs: [
            "Hair is one of the most common causes of blockages. A simple hair catcher prevents hair from collecting in the trap.",
          ],
        },
        {
          heading: "Only toilet paper down the toilet",
          paragraphs: [
            "Wet wipes, cotton swabs, and other waste don't belong in the toilet, even if labelled 'flushable'. This is one of the leading causes of sewer blockages.",
          ],
        },
        {
          heading: "Flush with hot water monthly",
          paragraphs: [
            "Regularly flush drains with a generous amount of hot water to remove grease and soap residue before it builds up.",
          ],
        },
        {
          heading: "Not sure? Get a professional check-up",
          paragraphs: [
            "For recurring blockages, a camera inspection can reveal the underlying cause, such as root intrusion.",
          ],
        },
      ],
    },
  },
  {
    id: "cv-ketel-onderhoud",
    slug: { nl: "cv-ketel-onderhoud-checklist", en: "boiler-maintenance-checklist" },
    icon: Flame,
    publishedAt: "2026-04-21",
    readMinutes: 7,
    category: { nl: "CV Ketel", en: "Heating" },
    nl: {
      title: "CV-Ketel Onderhoud: De Complete Checklist",
      metaTitle: "CV-Ketel Onderhoud Checklist | Voorkom Storingen | AquaFix",
      metaDescription:
        "Voorkom storingen en verleng de levensduur van uw CV-ketel met deze complete onderhoudschecklist van onze gecertificeerde monteurs.",
      excerpt:
        "Regelmatig onderhoud voorkomt storingen en verlaagt uw energiekosten. Bekijk onze complete checklist voor CV-ketelonderhoud.",
      sections: [
        {
          heading: "Waarom jaarlijks onderhoud belangrijk is",
          paragraphs: [
            "Een CV-ketel die niet regelmatig wordt onderhouden, verliest efficiëntie en heeft een grotere kans op storingen. Jaarlijks onderhoud houdt uw ketel veilig, zuinig en betrouwbaar.",
          ],
        },
        {
          heading: "Controleer de waterdruk",
          paragraphs: [
            "De waterdruk van uw CV-installatie hoort doorgaans tussen de 1 en 2 bar te liggen. Een te lage druk kan wijzen op een lekkage of luchtinsluiting.",
          ],
        },
        {
          heading: "Ontlucht radiatoren regelmatig",
          paragraphs: [
            "Tikkende geluiden of radiatoren die niet volledig warm worden, wijzen vaak op lucht in het systeem. Ontlucht radiatoren minimaal eenmaal per stookseizoen.",
          ],
        },
        {
          heading: "Laat de brander jaarlijks controleren",
          paragraphs: [
            "Een gecertificeerd monteur controleert de brander, rookgasafvoer en veiligheidsonderdelen op een correcte werking, wat essentieel is voor uw veiligheid.",
          ],
        },
        {
          heading: "Let op deze waarschuwingssignalen",
          paragraphs: [
            "Vreemde geluiden, een gele in plaats van blauwe vlam, foutmeldingen of een stijgend gasverbruik zijn signalen om direct een monteur in te schakelen.",
          ],
        },
      ],
    },
    en: {
      title: "Boiler Maintenance: The Complete Checklist",
      metaTitle: "Boiler Maintenance Checklist | Prevent Breakdowns | AquaFix",
      metaDescription:
        "Prevent breakdowns and extend the lifespan of your boiler with this complete maintenance checklist from our certified technicians.",
      excerpt:
        "Regular maintenance prevents breakdowns and lowers your energy costs. Check out our complete checklist for boiler maintenance.",
      sections: [
        {
          heading: "Why annual maintenance matters",
          paragraphs: [
            "A boiler that isn't regularly maintained loses efficiency and has a higher chance of breaking down. Annual maintenance keeps your boiler safe, efficient, and reliable.",
          ],
        },
        {
          heading: "Check the water pressure",
          paragraphs: [
            "The water pressure of your heating system should typically be between 1 and 2 bar. Pressure that's too low can indicate a leak or trapped air.",
          ],
        },
        {
          heading: "Bleed radiators regularly",
          paragraphs: [
            "Ticking sounds or radiators that don't heat up fully often indicate air in the system. Bleed radiators at least once per heating season.",
          ],
        },
        {
          heading: "Have the burner inspected annually",
          paragraphs: [
            "A certified technician checks the burner, flue, and safety components for correct operation, which is essential for your safety.",
          ],
        },
        {
          heading: "Watch for these warning signs",
          paragraphs: [
            "Strange noises, a yellow instead of blue flame, error codes, or rising gas consumption are all signs to call a technician right away.",
          ],
        },
      ],
    },
  },
  {
    id: "badkamer-trends",
    slug: { nl: "badkamer-trends-2026", en: "bathroom-trends-2026" },
    icon: Bath,
    publishedAt: "2026-03-10",
    readMinutes: 6,
    category: { nl: "Badkamer", en: "Bathroom" },
    nl: {
      title: "Badkamertrends 2026: Inspiratie voor Uw Renovatie",
      metaTitle: "Badkamertrends 2026 | Inspiratie voor Uw Renovatie | AquaFix",
      metaDescription:
        "Op zoek naar inspiratie voor uw nieuwe badkamer? Ontdek de belangrijkste badkamertrends van 2026, van materialen tot slimme technologie.",
      excerpt:
        "Plant u een badkamerrenovatie? Laat u inspireren door de belangrijkste trends van 2026 op het gebied van materialen, kleuren en techniek.",
      sections: [
        {
          heading: "Natuurlijke materialen en aardetinten",
          paragraphs: [
            "Natuursteen, hout-look tegels en warme aardetinten blijven populair. Deze combinatie zorgt voor een rustige, spa-achtige uitstraling in de badkamer.",
          ],
        },
        {
          heading: "Inloopdouches zonder drempel",
          paragraphs: [
            "Drempelloze inloopdouches zijn niet alleen visueel aantrekkelijk, maar ook praktisch en toekomstbestendig voor toegankelijkheid.",
          ],
        },
        {
          heading: "Slimme sanitaire technologie",
          paragraphs: [
            "Van douchekranen met digitale temperatuurregeling tot vloerverwarming die via een app te bedienen is: slimme technologie wint terrein in de badkamer.",
          ],
        },
        {
          heading: "Duurzame en waterbesparende keuzes",
          paragraphs: [
            "Waterbesparende kranen en douchekoppen worden steeds populairder, mede door de nadruk op duurzaamheid en lagere energierekeningen.",
          ],
        },
      ],
    },
    en: {
      title: "Bathroom Trends 2026: Inspiration for Your Renovation",
      metaTitle: "Bathroom Trends 2026 | Renovation Inspiration | AquaFix",
      metaDescription:
        "Looking for inspiration for your new bathroom? Discover the top bathroom trends of 2026, from materials to smart technology.",
      excerpt:
        "Planning a bathroom renovation? Get inspired by the top trends of 2026 in materials, colours, and technology.",
      sections: [
        {
          heading: "Natural materials and earthy tones",
          paragraphs: [
            "Natural stone, wood-look tiles, and warm earthy tones remain popular. This combination creates a calm, spa-like feel in the bathroom.",
          ],
        },
        {
          heading: "Curbless walk-in showers",
          paragraphs: [
            "Curbless walk-in showers are not only visually appealing but also practical and future-proof for accessibility.",
          ],
        },
        {
          heading: "Smart bathroom technology",
          paragraphs: [
            "From shower taps with digital temperature control to app-controlled underfloor heating: smart technology is gaining ground in the bathroom.",
          ],
        },
        {
          heading: "Sustainable, water-saving choices",
          paragraphs: [
            "Water-saving taps and shower heads are becoming increasingly popular, driven by a focus on sustainability and lower energy bills.",
          ],
        },
      ],
    },
  },
  {
    id: "kies-betrouwbare-loodgieter",
    slug: { nl: "betrouwbare-loodgieter-kiezen", en: "how-to-choose-a-reliable-plumber" },
    icon: ShieldCheck,
    publishedAt: "2026-02-18",
    readMinutes: 5,
    category: { nl: "Advies", en: "Advice" },
    nl: {
      title: "Zo Kiest U een Betrouwbare Loodgieter",
      metaTitle: "Betrouwbare Loodgieter Kiezen | Waar Op Te Letten | AquaFix",
      metaDescription:
        "Waar let u op bij het kiezen van een betrouwbare en professionele loodgieter? Onze tips helpen u een weloverwogen keuze te maken.",
      excerpt:
        "Niet elke loodgieter is hetzelfde. Met deze tips herkent u een betrouwbare en professionele loodgieter en voorkomt u vervelende verrassingen.",
      sections: [
        {
          heading: "Controleer certificering en verzekering",
          paragraphs: [
            "Een betrouwbare loodgieter is aangesloten bij een branchevereniging, gecertificeerd en volledig verzekerd voor aansprakelijkheid.",
          ],
        },
        {
          heading: "Vraag altijd om een duidelijke offerte",
          paragraphs: [
            "Een professioneel bedrijf geeft altijd een transparante offerte vooraf, zodat u niet voor verrassingen komt te staan.",
          ],
        },
        {
          heading: "Lees onafhankelijke reviews",
          paragraphs: [
            "Klantbeoordelingen geven een goed beeld van de betrouwbaarheid en kwaliteit van een loodgietersbedrijf.",
          ],
        },
        {
          heading: "Let op garantie en nazorg",
          paragraphs: [
            "Een goede loodgieter geeft garantie op het uitgevoerde werk en staat ook na de klus voor u klaar bij vragen.",
          ],
        },
      ],
    },
    en: {
      title: "How to Choose a Reliable Plumber",
      metaTitle: "How to Choose a Reliable Plumber | What to Look For | AquaFix",
      metaDescription:
        "What should you look for when choosing a reliable, professional plumber? Our tips help you make an informed choice.",
      excerpt:
        "Not every plumber is the same. With these tips you can recognize a reliable, professional plumber and avoid unpleasant surprises.",
      sections: [
        {
          heading: "Check certification and insurance",
          paragraphs: [
            "A reliable plumber is affiliated with an industry association, certified, and fully insured for liability.",
          ],
        },
        {
          heading: "Always ask for a clear quote",
          paragraphs: [
            "A professional company always provides a transparent quote upfront, so you won't face unpleasant surprises.",
          ],
        },
        {
          heading: "Read independent reviews",
          paragraphs: [
            "Customer reviews give a good indication of the reliability and quality of a plumbing company.",
          ],
        },
        {
          heading: "Look for guarantees and aftercare",
          paragraphs: [
            "A good plumber offers a guarantee on completed work and remains available for questions after the job is done.",
          ],
        },
      ],
    },
  },
  {
    id: "wat-te-doen-bij-spoed",
    slug: { nl: "wat-te-doen-bij-waterlekkage", en: "what-to-do-during-a-water-emergency" },
    icon: Siren,
    publishedAt: "2026-01-25",
    readMinutes: 4,
    category: { nl: "Spoed", en: "Emergency" },
    nl: {
      title: "Wat te Doen Bij een Acute Waterlekkage",
      metaTitle: "Wat te Doen Bij Waterlekkage | Stappenplan | AquaFix",
      metaDescription:
        "Een acute waterlekkage kan grote schade veroorzaken. Volg dit stappenplan om de schade te beperken totdat de spoedloodgieter arriveert.",
      excerpt:
        "Een acute waterlekkage vraagt om snel handelen. Volg dit stappenplan om schade te beperken totdat onze spoedloodgieter arriveert.",
      sections: [
        {
          heading: "Stap 1: Sluit de hoofdkraan af",
          paragraphs: [
            "De hoofdkraan bevindt zich meestal bij de watermeter. Draai deze direct dicht om de watertoevoer te stoppen.",
          ],
        },
        {
          heading: "Stap 2: Schakel elektriciteit uit indien nodig",
          paragraphs: [
            "Bij water in de buurt van stopcontacten of apparatuur, schakel de betreffende groep in de meterkast uit voor uw veiligheid.",
          ],
        },
        {
          heading: "Stap 3: Beperk de waterschade",
          paragraphs: [
            "Gebruik handdoeken, emmers of een dweil om verdere verspreiding van water te voorkomen en waardevolle spullen te verplaatsen.",
          ],
        },
        {
          heading: "Stap 4: Bel direct onze spoedlijn",
          paragraphs: [
            "Bel +31 6 17 34 73 33 voor directe hulp. Onze spoedloodgieter staat u telefonisch bij en komt zo snel mogelijk langs.",
          ],
        },
      ],
    },
    en: {
      title: "What to Do During an Acute Water Leak",
      metaTitle: "What to Do During a Water Leak | Step-by-Step Guide | AquaFix",
      metaDescription:
        "An acute water leak can cause major damage. Follow this step-by-step guide to limit the damage until the emergency plumber arrives.",
      excerpt:
        "An acute water leak calls for quick action. Follow this step-by-step guide to limit damage until our emergency plumber arrives.",
      sections: [
        {
          heading: "Step 1: Shut off the main valve",
          paragraphs: [
            "The main valve is usually located near the water meter. Turn it off immediately to stop the water supply.",
          ],
        },
        {
          heading: "Step 2: Turn off electricity if needed",
          paragraphs: [
            "If water is near outlets or appliances, switch off the relevant circuit in the fuse box for your safety.",
          ],
        },
        {
          heading: "Step 3: Limit the water damage",
          paragraphs: [
            "Use towels, buckets, or a mop to prevent water from spreading further, and move valuable items out of the way.",
          ],
        },
        {
          heading: "Step 4: Call our emergency line immediately",
          paragraphs: [
            "Call +31 6 17 34 73 33 for immediate help. Our emergency plumber will assist you over the phone and arrive as quickly as possible.",
          ],
        },
      ],
    },
  },
];

export function getBlogPostBySlug(locale: "nl" | "en", slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug[locale] === slug);
}
