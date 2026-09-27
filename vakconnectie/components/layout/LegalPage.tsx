import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function LegalPage({
  title,
  path,
  updated,
  intro,
  sections,
  locale,
}: {
  locale: Locale;
  title: string;
  path: string;
  updated?: string;
  intro?: React.ReactNode;
  sections: { heading: string; paragraphs: string[] }[];
}) {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs locale={locale} items={[{ name: title, path }]} />
      <div className="mx-auto mt-6 max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        {updated && <p className="mt-2 text-sm text-stone-500">{getDictionary(locale).common.lastUpdated} {formatDate(updated, locale)}</p>}
        {intro && <div className="mt-6 leading-relaxed text-stone-700">{intro}</div>}
        <div className="prose-vc mt-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
