import { Star } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale, BUSINESS } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import { TESTIMONIALS } from "@/lib/content/testimonials";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import TestimonialCard from "@/components/ui/TestimonialCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const CONTENT = {
  nl: {
    eyebrow: "Klantbeoordelingen",
    title: "Wat Onze Klanten Over Ons Zeggen",
    subtitle:
      "Onze klanttevredenheid staat bij ons voorop. Lees hieronder waarom klanten in heel Nederland kiezen voor AquaFix Loodgieter.",
    ratingLabel: "Gemiddelde beoordeling op basis van",
    reviewsWord: "beoordelingen",
  },
  en: {
    eyebrow: "Customer Reviews",
    title: "What Our Customers Say About Us",
    subtitle:
      "Customer satisfaction is our top priority. Read below why customers across the Netherlands choose AquaFix Loodgieter.",
    ratingLabel: "Average rating based on",
    reviewsWord: "reviews",
  },
};

export default function ReviewsPage({ locale, dict }: Props) {
  const c = CONTENT[locale];
  const paths = PATHS[locale];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.reviews, href: paths.reviews }]} />
      <PageHero dict={dict} eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} icon={Star} showCtas={false} />

      <section className="container-page py-16 sm:py-20">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-7 w-7 fill-accent-500 text-accent-500" />
            ))}
          </div>
          <p className="text-3xl font-extrabold text-ink-900">{BUSINESS.ratingValue} / 5</p>
          <p className="text-sm text-ink-500">
            {c.ratingLabel} {BUSINESS.reviewCount}+ {c.reviewsWord}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} locale={locale} />
          ))}
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  );
}
