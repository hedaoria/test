import type { Metadata } from "next";
import { PageTitle } from "@/components/dashboard/Panels";
import { NotificationList } from "@/components/dashboard/NotificationList";
import { currentCustomerId } from "@/lib/dashboard";
import { listNotifications } from "@/lib/repository";

export const metadata: Metadata = { title: "Notificaties" };

export default async function CustomerNotificationsPage() {
  const items = await listNotifications(currentCustomerId);
  return (
    <>
      <PageTitle title="Notificaties" />
      <NotificationList items={items} />
    </>
  );
}
