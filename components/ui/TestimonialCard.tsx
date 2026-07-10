import { Star } from "lucide-react";
import { Locale } from "@/lib/site";
import { Testimonial } from "@/lib/content/testimonials";

interface Props {
  testimonial: Testimonial;
  locale: Locale;
}

export default function TestimonialCard({ testimonial, locale }: Props) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} / 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "fill-accent-500 text-accent-500" : "text-ink-200"}`}
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">
        &ldquo;{testimonial.text[locale]}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
        <div>
          <p className="text-sm font-semibold text-ink-900">{testimonial.name}</p>
          <p className="text-xs text-ink-400">{testimonial.location[locale]}</p>
        </div>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700">
          {testimonial.service[locale]}
        </span>
      </figcaption>
    </figure>
  );
}
