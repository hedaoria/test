import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={clsx("max-w-2xl", className)}>
      {eyebrow && <p className="mb-2 text-sm font-semibold text-brand-700">{eyebrow}</p>}
      <Tag className={clsx("font-semibold", Tag === "h1" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl")}>{title}</Tag>
      {intro && <p className="mt-3 text-lg leading-relaxed text-stone-600">{intro}</p>}
    </div>
  );
}
