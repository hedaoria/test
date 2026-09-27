import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/dashboard/Panels";
import { DataTable, Td } from "@/components/admin/DataTable";
import { ManagedStatus } from "@/components/admin/ManagedStatus";
import { RatingInline } from "@/components/ui/Stars";
import { USER_STATUSES } from "@/lib/admin";
import { categoryName } from "@/lib/data/categories";
import { listProfessionals, listUsers } from "@/lib/repository";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Vakmensen goedkeuren" };

export default async function AdminProsPage() {
  const [users, pros] = await Promise.all([listUsers(), listProfessionals()]);
  const pending = users.filter((u) => u.role === "vakman" && u.status === "in_beoordeling");

  return (
    <>
      <PageTitle title="Vakmensen" intro="Controleer KvK-inschrijving en bedrijfsgegevens voordat een profiel zichtbaar wordt." />
      <h2 className="mb-3 font-semibold">Nieuwe aanmeldingen</h2>
      <DataTable head={["Aanvrager", "E-mail", "Aangemeld", "Controle", "Status"]}>
        {pending.map((u) => {
          const pro = pros.find((p) => p.slug === u.professionalSlug);
          return (
            <tr key={u.id}>
              <Td className="font-medium">{pro?.companyName ?? `${u.firstName} ${u.lastName}`}</Td>
              <Td>{u.email}</Td>
              <Td className="whitespace-nowrap">{formatDate(u.createdAt)}</Td>
              <Td className="text-stone-600">{u.emailVerified ? "E-mail bevestigd" : "E-mail nog niet bevestigd"} · KvK te controleren</Td>
              <Td><ManagedStatus initial={u.status} statuses={USER_STATUSES} subject={u.email} /></Td>
            </tr>
          );
        })}
      </DataTable>

      <h2 className="mb-3 mt-10 font-semibold">Alle vakmensen</h2>
      <DataTable head={["Bedrijf", "Vakgebied", "Plaats", "Beoordeling", "Lid sinds", "Geverifieerd"]}>
        {pros.map((p) => (
          <tr key={p.slug}>
            <Td><Link href={`/vakman/${p.slug}`} className="font-medium text-brand-700 hover:underline">{p.companyName}</Link></Td>
            <Td>{p.categories.map(categoryName).join(", ")}</Td>
            <Td>{p.place}</Td>
            <Td><RatingInline average={p.rating.average} count={p.rating.count} /></Td>
            <Td className="whitespace-nowrap">{formatDate(p.memberSince)}</Td>
            <Td>{p.verified ? "Ja" : "Nee"}</Td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
