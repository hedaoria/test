import { notFound } from "next/navigation";
import { ACCOUNTS_ENABLED } from "@/lib/site";

/** Accountpagina's zijn pas bereikbaar zodra authenticatie is gekoppeld. */
export default function AccountsLayout({ children }: { children: React.ReactNode }) {
  if (!ACCOUNTS_ENABLED) notFound();
  return children;
}
