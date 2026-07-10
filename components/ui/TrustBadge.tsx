import { ShieldCheck, Clock, Banknote, HardHat, type LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [ShieldCheck, Clock, Banknote, HardHat];

interface Props {
  index: number;
  title: string;
  description: string;
}

export default function TrustBadge({ index, title, description }: Props) {
  const Icon = ICONS[index % ICONS.length];
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Icon className="h-5.5 w-5.5" aria-hidden />
      </span>
      <h3 className="text-base font-bold text-ink-900">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-500">{description}</p>
    </div>
  );
}
