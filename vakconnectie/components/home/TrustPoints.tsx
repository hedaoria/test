import clsx from "clsx";
import { BadgeCheck, FileSignature, Handshake, HandCoins } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const ICONS = [HandCoins, Handshake, BadgeCheck, FileSignature];

export function TrustPoints({ locale, className }: { locale: Locale; className?: string }) {
  const points = getDictionary(locale).trust;
  return (
    <ul className={clsx("grid gap-8 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {points.map(({ title, text }, i) => {
        const Icon = ICONS[i]!;
        return (
          <li key={title}>
            <Icon className="h-6 w-6 text-brand-700" strokeWidth={1.75} aria-hidden="true" />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-stone-600">{text}</p>
          </li>
        );
      })}
    </ul>
  );
}
