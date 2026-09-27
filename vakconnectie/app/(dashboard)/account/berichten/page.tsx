import type { Metadata } from "next";
import { Messenger } from "@/components/dashboard/Messenger";
import { PageTitle } from "@/components/dashboard/Panels";
import { currentCustomerId, customerThreads } from "@/lib/dashboard";

export const metadata: Metadata = { title: "Berichten" };

export default async function CustomerMessagesPage(props: PageProps<"/account/berichten">) {
  const sp = await props.searchParams;
  const threads = await customerThreads(currentCustomerId);
  return (
    <>
      <PageTitle title="Berichten" />
      <Messenger threads={threads} me="klant" initialId={typeof sp.gesprek === "string" ? sp.gesprek : undefined} />
    </>
  );
}
