import { Phone, MessageCircle, ShieldCheck, Star, Clock3 } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale, BUSINESS } from "@/lib/site";
import Button from "@/components/ui/Button";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export default function HomeHero({ dict, locale }: Props) {
  const stats = [
    { value: dict.hero.stat1Value, label: dict.hero.stat1Label },
    { value: dict.hero.stat2Value, label: dict.hero.stat2Label },
    { value: dict.hero.stat3Value, label: dict.hero.stat3Label },
    { value: dict.hero.stat4Value, label: dict.hero.stat4Label },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-950 via-brand-950 to-brand-900 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl"
      />

      <div className="container-page relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-200 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              {dict.hero.badge}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg">{dict.hero.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={BUSINESS.phoneHref} variant="accent" size="lg" icon={<Phone className="h-5 w-5" />}>
                {dict.buttons.callNow}
              </Button>
              <Button
                href={BUSINESS.whatsappHref}
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="h-5 w-5" />}
              >
                {dict.buttons.whatsappDirect}
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-ink-300">
              <div className="flex -space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
                ))}
              </div>
              <span>
                {BUSINESS.ratingValue}/5 · {BUSINESS.reviewCount}+ {locale === "nl" ? "beoordelingen" : "reviews"}
              </span>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/10 p-5 text-center transition-transform hover:-translate-y-1"
                  >
                    <p className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-xs font-medium text-ink-200">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-accent-500/15 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
                  <Clock3 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{dict.nav.emergency}</p>
                  <p className="text-xs text-ink-200">{BUSINESS.phoneDisplay}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
