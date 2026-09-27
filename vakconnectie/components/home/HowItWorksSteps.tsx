import clsx from "clsx";

export function HowItWorksSteps({ steps, className }: { steps: readonly { title: string; text: string }[]; className?: string }) {
  return (
    <ol className={clsx("grid gap-8 md:grid-cols-3 md:gap-6", className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 md:block">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-400 bg-brand-400 text-base font-semibold text-stone-950">
            {i + 1}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="absolute left-12 right-2 top-5 hidden h-px bg-stone-200 md:block" />
          )}
          <div className="md:mt-5">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-1.5 leading-relaxed text-stone-600">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
