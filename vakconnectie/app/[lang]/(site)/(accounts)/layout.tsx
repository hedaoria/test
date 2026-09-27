import { notFound } from "next/navigation";
import { ACCOUNTS_ENABLED } from "@/lib/site";
import { getLocale } from "@/lib/i18n/server";

/** Accountpagina's zijn pas bereikbaar zodra authenticatie is gekoppeld (voorlopig alleen Nederlands). */
export default async function AccountsLayout(props: LayoutProps<"/[lang]">) {
  const locale = await getLocale(props.params);
  if (!ACCOUNTS_ENABLED || locale !== "nl") notFound();
  return props.children;
}
