import { DEMO_MODE } from "@/lib/site";

export function DemoBanner() {
  if (!DEMO_MODE) return null;
  return (
    <div className="bg-stone-900 px-4 py-2 text-center text-xs text-stone-200 sm:text-sm">
      Dit is een voorbeeldversie van Vakconnectie. De getoonde bedrijven, reviews en klussen zijn fictief.
    </div>
  );
}
