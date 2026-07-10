interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }: Props) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && (
        <span
          className={`inline-block rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wide ${
            light ? "bg-white/10 text-brand-200" : "bg-brand-50 text-brand-700"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
          light ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${light ? "text-ink-200" : "text-ink-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
