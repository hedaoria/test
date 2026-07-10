import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta: string;
  featured?: boolean;
}

export default function ServiceCard({ icon: Icon, title, description, href, cta, featured = false }: Props) {
  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-2xl border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        featured
          ? "border-brand-600 bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lg shadow-brand-600/20"
          : "border-ink-100 bg-white hover:border-brand-200"
      }`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          featured ? "bg-white/15 text-white" : "bg-brand-50 text-brand-600 group-hover:bg-brand-100"
        }`}
      >
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h3 className={`mt-5 text-lg font-bold ${featured ? "text-white" : "text-ink-900"}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-relaxed flex-1 ${featured ? "text-brand-100" : "text-ink-500"}`}>
        {description}
      </p>
      <span
        className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
          featured ? "text-white" : "text-brand-600"
        }`}
      >
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
