import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatDate } from "@/lib/format";

export function LegalPage({
  title,
  path,
  updated,
  intro,
  sections,
}: {
  title: string;
  path: string;
  updated?: string;
  intro?: React.ReactNode;
  sections: { heading: string; paragraphs: string[] }[];
}) {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ name: title, path }]} />
      <div className="mx-auto mt-6 max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        {updated && <p className="mt-2 text-sm text-stone-500">Laatst bijgewerkt op {formatDate(updated)}</p>}
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
