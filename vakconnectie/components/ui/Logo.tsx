import Link from "next/link";
import clsx from "clsx";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={clsx("shrink-0", className)}>
      <rect width="32" height="32" rx="8" className="fill-brand-700" />
      <path d="M8.5 16.5 16 10l7.5 6.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 22.5h9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="11.5" cy="22.5" r="2" fill="#fff" />
      <circle cx="20.5" cy="22.5" r="2" fill="#fff" />
    </svg>
  );
}

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={clsx("inline-flex items-center gap-2.5 rounded-md", className)} aria-label="Vakconnectie, naar de homepage">
      <LogoMark className="h-8 w-8" />
      <span className={clsx("text-[1.2rem] font-semibold tracking-tight", inverted ? "text-white" : "text-stone-950")}>
        vak<span className={inverted ? "text-brand-200" : "text-brand-700"}>connectie</span>
      </span>
    </Link>
  );
}
