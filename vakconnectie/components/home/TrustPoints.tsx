import clsx from "clsx";
import { IdCard, Star, MessagesSquare, MapPinned } from "lucide-react";

const POINTS = [
  {
    icon: IdCard,
    title: "Duidelijke vakmanprofielen",
    text: "Bedrijfsgegevens, ervaring, specialisaties en foto’s van eerder werk op één plek.",
  },
  {
    icon: Star,
    title: "Beoordelingen van klanten",
    text: "Alleen opdrachtgevers die via Vakconnectie een klus lieten uitvoeren, kunnen een review schrijven.",
  },
  {
    icon: MessagesSquare,
    title: "Direct contact",
    text: "Stel je vragen rechtstreeks aan de vakman via berichten. Je telefoonnummer deel je pas als jij dat wilt.",
  },
  {
    icon: MapPinned,
    title: "Vakmensen uit jouw regio",
    text: "Je ziet alleen vakmensen die in jouw omgeving werken, dus geen lange reistijden.",
  },
];

export function TrustPoints({ className }: { className?: string }) {
  return (
    <ul className={clsx("grid gap-8 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {POINTS.map(({ icon: Icon, title, text }) => (
        <li key={title}>
          <Icon className="h-6 w-6 text-brand-700" strokeWidth={1.75} aria-hidden="true" />
          <h3 className="mt-4 font-semibold">{title}</h3>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-stone-600">{text}</p>
        </li>
      ))}
    </ul>
  );
}
