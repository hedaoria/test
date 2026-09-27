import Link from "next/link";
import clsx from "clsx";

/** Beeldmerk: geel vlak met een huis dat twee punten verbindt. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={clsx("shrink-0", className)}>
      <rect width="32" height="32" rx="8" fill="#FFC72C" />
      <path d="M8.5 16.5 16 10l7.5 6.5" fill="none" stroke="#1C1917" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 22.5h9" stroke="#1C1917" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="11.5" cy="22.5" r="2" fill="#1C1917" />
      <circle cx="20.5" cy="22.5" r="2" fill="#1C1917" />
    </svg>
  );
}

export function Logo({ className, href = "/", label }: { className?: string; href?: string; label: string }) {
  return (
    <Link href={href} className={clsx("inline-flex items-center gap-2.5 rounded-md", className)} aria-label={label}>
      <LogoMark className="h-8 w-8" />
      <span className="text-[1.2rem] font-semibold tracking-tight text-stone-950">
        vak<span className="text-brand-400">connectie</span>
      </span>
    </Link>
  );
}
