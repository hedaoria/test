import type { Faq } from "@/lib/data/content";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-stone-200 border-y border-stone-200">
      {faqs.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex items-center justify-between gap-4 py-4 text-left font-semibold text-stone-900 hover:text-brand-700">
            {f.q}
            <span aria-hidden="true" className="text-xl leading-none text-stone-400 transition-transform duration-200 group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 pr-8 leading-relaxed text-stone-700">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
