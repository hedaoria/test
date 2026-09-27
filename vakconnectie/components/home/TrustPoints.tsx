import clsx from "clsx";
import { BadgeCheck, FileSignature, Handshake, HandCoins } from "lucide-react";

const POINTS = [
  {
    icon: HandCoins,
    title: "Gratis en vrijblijvend",
    text: "Een projectaanvraag kost je niets en je zit nergens aan vast.",
  },
  {
    icon: Handshake,
    title: "Persoonlijke bemiddeling",
    text: "Wij helpen je bij het vinden van een zelfstandige vakman die past bij je project.",
  },
  {
    icon: BadgeCheck,
    title: "KvK-inschrijving gecontroleerd",
    text: "Voordat we een vakman aan je voorstellen, controleren we de inschrijving bij de Kamer van Koophandel.",
  },
  {
    icon: FileSignature,
    title: "Heldere afspraken",
    text: "Prijs, planning, werkzaamheden en garantie leg je samen met de vakman schriftelijk vast.",
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
