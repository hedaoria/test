import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { notFound } from "next/navigation";
import { ACCOUNTS_ENABLED } from "@/lib/site";
import { getLocale } from "@/lib/i18n/server";
import { listReports, listUsers } from "@/lib/repository";

export const metadata: Metadata = {
  title: { default: "Beheer", template: "%s | Beheer | Vakconnectie" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout(props: LayoutProps<"/[lang]/beheer">) {
  const { children } = props;
  // Dashboards zijn voorlopig alleen in het Nederlands beschikbaar.
  if (!ACCOUNTS_ENABLED || (await getLocale(props.params)) !== "nl") notFound();
  const [users, reports] = await Promise.all([listUsers(), listReports()]);
  const pending = users.filter((u) => u.role === "vakman" && u.status === "in_beoordeling").length;
  const openReports = reports.filter((r) => r.status !== "afgehandeld").length;
  return (
    <>
      <DashboardShell
        title="Beheer"
        userName="Team Vakconnectie"
        roleLabel="Beheerder"
        nav={[
          { href: "/beheer", label: "Overzicht", exact: true },
          { href: "/beheer/gebruikers", label: "Gebruikers" },
          { href: "/beheer/vakmensen", label: "Vakmensen goedkeuren", badge: pending },
          { href: "/beheer/opdrachten", label: "Opdrachten" },
          { href: "/beheer/reviews", label: "Reviews" },
          { href: "/beheer/meldingen", label: "Meldingen", badge: openReports },
          { href: "/beheer/categorieen", label: "Categorieën" },
        ]}
      >
        {children}
      </DashboardShell>
    </>
  );
}
