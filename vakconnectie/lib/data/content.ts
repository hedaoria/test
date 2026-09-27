export interface Faq {
  q: string;
  a: string;
}

export const customerFaqs: Faq[] = [
  {
    q: "Wat kost het om een klus te plaatsen?",
    a: "Niets. Een klus plaatsen en reacties ontvangen is voor opdrachtgevers gratis. Je betaalt alleen de vakman die je kiest, op basis van de afspraken die je samen maakt.",
  },
  {
    q: "Hoeveel reacties kan ik verwachten?",
    a: "Dat hangt af van het soort klus, je regio en de drukte bij vakmensen. Soms reageren er binnen een paar uur meerdere vakmensen, soms duurt het een paar dagen. Je krijgt een melding zodra er iemand reageert.",
  },
  {
    q: "Ben ik verplicht om een vakman te kiezen?",
    a: "Nee. Je bepaalt zelf of je met iemand in zee gaat. Past er geen vakman bij je klus, dan kun je de klus op elk moment sluiten.",
  },
  {
    q: "Wie ziet mijn adres en telefoonnummer?",
    a: "Vakmensen zien alleen je postcodegebied en plaats. Je volledige adres en telefoonnummer deel je pas als jij dat wilt, bijvoorbeeld via een bericht aan de vakman die je kiest.",
  },
  {
    q: "Hoe weet ik of een vakman betrouwbaar is?",
    a: "Op elk profiel zie je bedrijfsgegevens, eerdere projecten en beoordelingen van klanten die via Vakconnectie een klus hebben laten uitvoeren. Bij geverifieerde bedrijven hebben wij de inschrijving bij de KvK gecontroleerd.",
  },
  {
    q: "Kan ik een beoordeling aanpassen?",
    a: "Je kunt een beoordeling binnen 14 dagen na plaatsing nog aanpassen via je account. Daarna staat hij vast, zodat vakmensen weten waar ze aan toe zijn.",
  },
];

export const proFaqs: Faq[] = [
  {
    q: "Voor welke vakgebieden kan ik me aanmelden?",
    a: "Voor alle werkzaamheden in en rond het huis, van schilderwerk tot complete verbouwingen. Je kiest bij het aanmelden je hoofdvakgebied en eventueel een paar aanverwante vakgebieden.",
  },
  {
    q: "Wat heb ik nodig om me aan te melden?",
    a: "Een inschrijving bij de Kamer van Koophandel en een e-mailadres. Wij controleren je gegevens voordat je profiel zichtbaar wordt. Meestal duurt dat één werkdag.",
  },
  {
    q: "Hoe komen opdrachten bij mij terecht?",
    a: "Je stelt zelf je vakgebieden en werkgebied in. Nieuwe opdrachten die daarbinnen vallen, zie je in je dashboard. Als je wilt, krijg je er ook een e-mail over.",
  },
  {
    q: "Betaal ik per opdracht of per reactie?",
    a: "Nee. Je kiest een vast abonnement per maand. Daarmee weet je vooraf waar je aan toe bent, ook in drukke maanden.",
  },
  {
    q: "Kan ik mijn abonnement opzeggen?",
    a: "Ja, maandelijks. Je profiel en je reviews blijven bewaard, zodat je later weer verder kunt waar je gebleven was.",
  },
  {
    q: "Wat als ik het niet eens ben met een beoordeling?",
    a: "Je kunt openbaar reageren op elke beoordeling. Denk je dat een beoordeling niet klopt, bijvoorbeeld omdat de klus niet door jou is uitgevoerd, dan kun je hem melden. Ons team bekijkt elke melding.",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  body: { heading?: string; text: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "klus-goed-omschrijven",
    title: "Zo omschrijf je je klus zodat vakmensen goed kunnen reageren",
    excerpt: "Hoe duidelijker je klus, hoe beter de reacties. Vijf dingen die je altijd kunt vermelden.",
    date: "2026-09-10",
    category: "Tips voor opdrachtgevers",
    body: [
      { text: "Een vakman kan pas goed inschatten wat er nodig is als hij weet waar het om gaat. Met een paar extra zinnen voorkom je veel heen-en-weer berichten." },
      { heading: "1. Wat is de huidige situatie?", text: "Vertel wat er nu is. Bijvoorbeeld: een badkamer uit 1995 met een bad en een losstaande douche." },
      { heading: "2. Wat wil je bereiken?", text: "Beschrijf het eindresultaat zo concreet mogelijk. Een inloopdouche in plaats van het bad, of alleen nieuwe kranen?" },
      { heading: "3. Hoe groot is het ongeveer?", text: "Afmetingen of vierkante meters hoeven niet exact te zijn. Een schatting helpt al enorm." },
      { heading: "4. Heb je al materialen?", text: "Heb je de tegels al gekocht of wil je advies? Dat maakt verschil voor de planning en de prijs." },
      { heading: "5. Voeg foto's toe", text: "Eén foto zegt vaak meer dan een lange omschrijving. Maak een overzichtsfoto en een foto van details, zoals een lekkage of houtrot." },
    ],
  },
  {
    slug: "vakman-kiezen-waar-let-je-op",
    title: "Een vakman kiezen: waar let je op?",
    excerpt: "Reviews zijn belangrijk, maar niet het enige. Waar je nog meer op kunt letten.",
    date: "2026-08-22",
    category: "Tips voor opdrachtgevers",
    body: [
      { text: "Je hebt een paar reacties op je klus. Hoe maak je een keuze?" },
      { heading: "Lees de beoordelingen, niet alleen het cijfer", text: "Een 4,6 met duidelijke, concrete reviews zegt vaak meer dan een 5 zonder toelichting. Let op reviews van klussen die op die van jou lijken." },
      { heading: "Bekijk eerdere projecten", text: "Op het profiel zie je foto's van afgerond werk. Past de stijl en het soort werk bij wat jij zoekt?" },
      { heading: "Vraag om een schriftelijke prijsopgave", text: "Zet afspraken over prijs, planning en wat wel en niet inbegrepen is altijd op papier. Dat voorkomt misverstanden." },
      { heading: "Let op hoe iemand communiceert", text: "Reageert iemand duidelijk en op tijd? Dat is vaak een goede voorspeller van hoe de rest van de samenwerking gaat." },
    ],
  },
  {
    slug: "buitenschilderwerk-wanneer",
    title: "Wanneer laat je het buitenschilderwerk doen?",
    excerpt: "Het schilderseizoen loopt grofweg van april tot oktober. Maar er is meer dat meetelt.",
    date: "2026-07-15",
    category: "Onderhoud",
    body: [
      { text: "Buitenschilderwerk heeft droog weer nodig en een temperatuur boven de 5 à 10 graden, afhankelijk van de verf. Daarom plannen de meeste schilders buitenwerk tussen april en oktober." },
      { heading: "Plan op tijd", text: "In het voorjaar zijn goede schilders vaak al maanden vooruit volgeboekt. Wie in de winter een klus plaatst, heeft meer keus." },
      { heading: "Hoe vaak schilderen?", text: "Gemiddeld is het verstandig om houtwerk buiten om de vijf tot zeven jaar te schilderen. Aan de zon- en regenkant soms eerder." },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
