import Link from "next/link";
import { type ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "accent" | "whatsapp" | "outline" | "ghost";
type Size = "md" | "lg" | "sm";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20 focus-visible:outline-brand-600",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 shadow-lg shadow-accent-500/25 focus-visible:outline-accent-500",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-lg shadow-[#25D366]/25 focus-visible:outline-[#25D366]",
  outline:
    "border-2 border-white/70 text-white hover:bg-white hover:text-brand-700 focus-visible:outline-white",
  ghost: "bg-white text-brand-700 hover:bg-brand-50 border border-ink-200 focus-visible:outline-brand-600",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-3 text-base gap-2",
  lg: "px-7 py-4 text-base sm:text-lg gap-2.5",
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  type = "button",
  disabled,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none disabled:hover:translate-y-0",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} aria-label={ariaLabel} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
}
