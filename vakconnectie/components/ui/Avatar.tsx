import Image from "next/image";
import clsx from "clsx";
import { initials } from "@/lib/format";

export function Avatar({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const dims = { sm: "h-9 w-9 text-xs", md: "h-12 w-12 text-sm", lg: "h-16 w-16 text-lg", xl: "h-24 w-24 text-2xl" }[size];
  if (src) {
    return (
      <Image src={src} alt={`Logo van ${name}`} width={96} height={96} className={clsx("shrink-0 rounded-xl object-cover", dims, className)} />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "inline-flex shrink-0 items-center justify-center rounded-xl bg-brand-50 font-semibold text-brand-800 ring-1 ring-inset ring-brand-100",
        dims,
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
