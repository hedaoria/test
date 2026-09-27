import type { Metadata } from "next";
import { ProCard } from "@/components/pros/ProCard";
import { PageTitle } from "@/components/dashboard/Panels";
import { listProfessionals } from "@/lib/repository";

export const metadata: Metadata = { title: "Opgeslagen vakmensen" };

// TODO: opgeslagen vakmensen uit de database (saved_professionals: user_id, professional_id).
const SAVED: string[] = [];

export default async function SavedPage() {
  const pros = (await listProfessionals()).filter((p) => SAVED.includes(p.slug));
  return (
    <>
      <PageTitle title="Opgeslagen vakmensen" intro="Vakmensen die je hebt bewaard om later te bekijken of uit te nodigen." />
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {pros.map((p) => (
          <ProCard key={p.slug} pro={p} locale="nl" headingLevel="h2" />
        ))}
      </div>
    </>
  );
}
