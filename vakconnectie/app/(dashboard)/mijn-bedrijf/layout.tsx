import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { notFound } from "next/navigation";
import { ACCOUNTS_ENABLED } from "@/lib/site";
import { currentProfessionalSlug, professionalThreads, unreadCount } from "@/lib/dashboard";
import { findProfessional, hasResponded, listJobsForProfessional, listNotifications } from "@/lib/repository";

export const metadata: Metadata = {
  title: { default: "Mijn bedrijf", template: "%s | Mijn bedrijf | Vakconnectie" },
  robots: { index: false, follow: false },
};

export default async function ProLayout({ children }: { children: React.ReactNode }) {
  if (!ACCOUNTS_ENABLED) notFound();
  const [pro, jobs, threads, notifications] = await Promise.all([
    findProfessional(currentProfessionalSlug),
    listJobsForProfessional(currentProfessionalSlug),
    professionalThreads(currentProfessionalSlug),
    listNotifications("u-vak-1"),
  ]);
  const newJobs = jobs.filter((j) => !hasResponded(j, currentProfessionalSlug)).length;

  return (
    <>
      <DashboardShell
        title="Mijn bedrijf"
        userName={pro?.companyName ?? "Vakman"}
        roleLabel="Vakman"
        notificationsHref="/mijn-bedrijf"
        unread={notifications.filter((n) => !n.read).length}
        nav={[
          { href: "/mijn-bedrijf", label: "Overzicht", exact: true },
          { href: "/mijn-bedrijf/opdrachten", label: "Nieuwe opdrachten", badge: newJobs },
          { href: "/mijn-bedrijf/reacties", label: "Mijn reacties" },
          { href: "/mijn-bedrijf/berichten", label: "Berichten", badge: unreadCount(threads, "vakman") },
          { href: "/mijn-bedrijf/profiel", label: "Mijn profiel" },
          { href: "/mijn-bedrijf/reviews", label: "Reviews" },
          { href: "/mijn-bedrijf/werkgebied", label: "Werkgebied" },
          { href: "/mijn-bedrijf/beschikbaarheid", label: "Beschikbaarheid" },
          { href: "/mijn-bedrijf/instellingen", label: "Instellingen" },
        ]}
      >
        {children}
      </DashboardShell>
    </>
  );
}
