import Link from "next/link";
import clsx from "clsx";

export function PageTitle({ title, intro, action }: { title: string; intro?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {intro && <p className="mt-1 text-stone-600">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={clsx("rounded-xl border border-stone-200 bg-white", className)}>
      {title && (
        <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-5 py-4">
          <h2 className="font-semibold">{title}</h2>
          {action}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}

export function Stat({ label, value, href }: { label: string; value: React.ReactNode; href?: string }) {
  const body = (
    <>
      <p className="text-sm text-stone-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-stone-950">{value}</p>
    </>
  );
  return href ? (
    <Link href={href} className="card card-hover block p-5">{body}</Link>
  ) : (
    <div className="card p-5">{body}</div>
  );
}
