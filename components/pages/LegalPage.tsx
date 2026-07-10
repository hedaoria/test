import { Dictionary } from "@/lib/i18n";
import { Locale } from "@/lib/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Crumb } from "@/components/ui/Breadcrumbs";

interface Section {
  heading: string;
  paragraphs: string[];
}

interface Props {
  locale: Locale;
  dict: Dictionary;
  crumb: Crumb;
  title: string;
  intro: string;
  updatedLabel: string;
  sections: Section[];
}

export default function LegalPage({ locale, crumb, title, intro, updatedLabel, sections }: Props) {
  return (
    <>
      <Breadcrumbs locale={locale} items={[crumb]} />
      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-ink-400">{updatedLabel}</p>
          <p className="mt-6 text-base leading-relaxed text-ink-600">{intro}</p>

          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl font-bold text-ink-900">{s.heading}</h2>
                <div className="mt-3 space-y-3">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink-600">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
