import Image from "next/image";
import clsx from "clsx";

/**
 * Foto met nette placeholder.
 *
 * Zolang er geen eigen fotografie is, tonen we een rustig vlak in plaats van
 * stockfoto's. Zet een foto in /public/images en geef het pad mee als `src`.
 */
export function Photo({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  tone = "stone",
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "stone" | "brand" | "sand";
}) {
  if (src) {
    return (
      <div className={clsx("relative overflow-hidden", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const tones = {
    stone: "bg-stone-100 text-stone-300",
    brand: "bg-brand-50 text-brand-200",
    sand: "bg-[#f3eee6] text-[#e0d6c6]",
  };
  return (
    <div role="img" aria-label={alt} className={clsx("relative flex items-center justify-center overflow-hidden", tones[tone], className)}>
      <svg viewBox="0 0 120 90" aria-hidden="true" className="h-1/3 max-h-24 w-auto">
        <path d="M20 50 60 18l40 32" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 44v30h60V44" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
        <path d="M53 74V56h14v18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
