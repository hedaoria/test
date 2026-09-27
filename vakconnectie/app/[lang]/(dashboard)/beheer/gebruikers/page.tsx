import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { Badge } from "@/components/ui/Badge";
import { PageTitle } from "@/components/dashboard/Panels";
import { DataTable, Td } from "@/components/admin/DataTable";
import { ManagedStatus } from "@/components/admin/ManagedStatus";
import { USER_STATUSES } from "@/lib/admin";
import { listUsers } from "@/lib/repository";
import { formatDate } from "@/lib/format";
import type { Role } from "@/lib/types";

export const metadata: Metadata = { title: "Gebruikers" };

const ROLE_LABEL: Record<Role, string> = { klant: "Opdrachtgever", vakman: "Vakman", beheerder: "Beheerder" };
const FILTERS = [
  { value: "", label: "Alle" },
  { value: "klant", label: "Opdrachtgevers" },
  { value: "vakman", label: "Vakmensen" },
  { value: "beheerder", label: "Beheerders" },
];

export default async function UsersPage(props: PageProps<"/[lang]/beheer/gebruikers">) {
  const sp = await props.searchParams;
  const role = typeof sp.rol === "string" ? sp.rol : "";
  const q = typeof sp.q === "string" ? sp.q.trim().toLowerCase() : "";
  const users = (await listUsers()).filter(
    (u) => (!role || u.role === role) && (!q || `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <PageTitle title="Gebruikers" />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 text-sm">
          {FILTERS.map((f) => (
            <Link
              key={f.value}
              href={f.value ? `/beheer/gebruikers?rol=${f.value}` : "/beheer/gebruikers"}
              aria-current={role === f.value ? "true" : undefined}
              className={clsx("rounded-full px-3 py-1.5 font-medium", role === f.value ? "bg-stone-900 text-white" : "text-stone-700 hover:bg-stone-200")}
            >
              {f.label}
            </Link>
          ))}
        </div>
        <form className="flex w-full gap-2 sm:w-auto" role="search">
          {role && <input type="hidden" name="rol" value={role} />}
          <label htmlFor="zoek-gebruiker" className="sr-only">Zoek gebruiker</label>
          <input id="zoek-gebruiker" name="q" defaultValue={q} placeholder="Naam of e-mail" className="input h-10 min-h-0 w-full py-1.5 text-sm sm:w-56" />
        </form>
      </div>
      <DataTable head={["Naam", "Rol", "E-mail", "Geregistreerd", "Status"]}>
        {users.map((u) => (
          <tr key={u.id}>
            <Td className="font-medium">{u.firstName} {u.lastName}</Td>
            <Td>{ROLE_LABEL[u.role]}</Td>
            <Td>
              {u.email}
              {!u.emailVerified && <Badge tone="amber" className="ml-2">Niet bevestigd</Badge>}
            </Td>
            <Td className="whitespace-nowrap">{formatDate(u.createdAt)}</Td>
            <Td>{u.role !== "beheerder" && <ManagedStatus initial={u.status} statuses={USER_STATUSES} subject={u.email} />}</Td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}
