import clsx from "clsx";

export const CUSTOMER_STEPS = [
  {
    title: "Vertel wat je nodig hebt",
    text: "Beschrijf je project, de locatie en je gewenste planning, en verstuur je aanvraag via WhatsApp of e-mail. Gratis en vrijblijvend.",
  },
  {
    title: "Wij zoeken een passende vakman",
    text: "Vakconnectie zoekt een zelfstandige vakman die bij je project past. We controleren de KvK-inschrijving voordat we iemand aan je voorstellen.",
  },
  {
    title: "Je maakt zelf de afspraken",
    text: "Jij en de vakman leggen samen schriftelijk vast wat de prijs, planning, werkzaamheden en garantie zijn.",
  },
];

export function HowItWorksSteps({
  steps = CUSTOMER_STEPS,
  className,
}: {
  steps?: { title: string; text: string }[];
  className?: string;
}) {
  return (
    <ol className={clsx("grid gap-8 md:grid-cols-3 md:gap-6", className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 md:block">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-700 text-base font-semibold text-brand-700">
            {i + 1}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="absolute left-12 right-2 top-5 hidden h-px bg-stone-200 md:block" />
          )}
          <div className="md:mt-5">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-1.5 leading-relaxed text-stone-600">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
