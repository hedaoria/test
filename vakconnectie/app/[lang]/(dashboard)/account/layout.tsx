import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { notFound } from "next/navigation";
import { ACCOUNTS_ENABLED } from "@/lib/site";
import { getLocale } from "@/lib/i18n/server";
import { currentCustomerId, customerThreads, unreadCount } from "@/lib/dashboard";
import { findUser, listJobsForCustomer, listNotifications } from "@/lib/repository";

export const metadata: Metadata = {
  title: { default: "Mijn account", template: "%s | Mijn account | Vakconnectie" },
  robots: { index: false, follow: false },
};

export default async function AccountLayout(props: LayoutProps<"/[lang]/account">) {
  const { children } = props;
  // Dashboards zijn voorlopig alleen in het Nederlands beschikbaar.
  if (!ACCOUNTS_ENABLED || (await getLocale(props.params)) !== "nl") notFound();
  const [user, jobs, threads, notifications] = await Promise.all([
    findUser(currentCustomerId),
    listJobsForCustomer(currentCustomerId),
    customerThreads(currentCustomerId),
    listNotifications(currentCustomerId),
  ]);
  const newResponses = jobs.flatMap((j) => j.responses).filter((r) => r.status === "nieuw").length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <>
      <DashboardShell
        title="Mijn account"
        userName={user ? `${user.firstName} ${user.lastName}` : "Opdrachtgever"}
        roleLabel="Opdrachtgever"
        notificationsHref="/account/meldingen"
        unread={unreadNotifications}
        nav={[
          { href: "/account", label: "Mijn klussen", exact: true },
          { href: "/klus-plaatsen", label: "Nieuwe klus plaatsen" },
          { href: "/account/reacties", label: "Reacties van vakmensen", badge: newResponses },
          { href: "/account/berichten", label: "Berichten", badge: unreadCount(threads, "klant") },
          { href: "/account/opgeslagen", label: "Opgeslagen vakmensen" },
          { href: "/account/reviews", label: "Reviews schrijven" },
          { href: "/account/meldingen", label: "Notificaties", badge: unreadNotifications },
          { href: "/account/instellingen", label: "Profielinstellingen" },
        ]}
      >
        {children}
      </DashboardShell>
    </>
  );
}
