import type { Metadata } from "next";
import { Messenger } from "@/components/dashboard/Messenger";
import { PageTitle } from "@/components/dashboard/Panels";
import { currentProfessionalSlug, professionalThreads } from "@/lib/dashboard";

export const metadata: Metadata = { title: "Berichten" };

export default async function ProMessagesPage(props: PageProps<"/mijn-bedrijf/berichten">) {
  const sp = await props.searchParams;
  const threads = await professionalThreads(currentProfessionalSlug);
  return (
    <>
      <PageTitle title="Berichten" />
      <Messenger threads={threads} me="vakman" initialId={typeof sp.gesprek === "string" ? sp.gesprek : undefined} />
    </>
  );
}
