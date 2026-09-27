import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { listReports, listUsers } from "@/lib/repository";

export const metadata: Metadata = {
  title: { default: "Beheer", template: "%s | Beheer | Vakconnectie" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [users, reports] = await Promise.all([listUsers(), listReports()]);
  const pending = users.filter((u) => u.role === "vakman" && u.status === "in_beoordeling").length;
  const openReports = reports.filter((r) => r.status !== "afgehandeld").length;
  return (
    <>
      <DemoBanner />
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
