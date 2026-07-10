import { type LucideIcon, Phone, MessageCircle } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { BUSINESS } from "@/lib/site";
import Button from "@/components/ui/Button";

interface Props {
  dict: Dictionary;
  icon?: LucideIcon;
  eyebrow: string;
  title: string;
  subtitle: string;
  showCtas?: boolean;
}

export default function PageHero({ dict, icon: Icon, eyebrow, title, subtitle, showCtas = true }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink-950 via-brand-950 to-brand-800 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl"
      />
      <div className="container-page relative py-14 sm:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-200 backdrop-blur">
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">{subtitle}</p>

          {showCtas && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={BUSINESS.phoneHref} variant="accent" icon={<Phone className="h-4.5 w-4.5" />}>
                {dict.buttons.callNow}
              </Button>
              <Button href={BUSINESS.whatsappHref} variant="whatsapp" icon={<MessageCircle className="h-4.5 w-4.5" />}>
                {dict.buttons.whatsappDirect}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
