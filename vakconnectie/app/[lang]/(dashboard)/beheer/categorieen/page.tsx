import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/dashboard/Panels";
import { DataTable, Td } from "@/components/admin/DataTable";
import { ManagedStatus } from "@/components/admin/ManagedStatus";
import { NewCategoryForm } from "@/components/admin/NewCategoryForm";
import { CATEGORY_STATUSES } from "@/lib/admin";
import { listCategories, listJobs, listProfessionals } from "@/lib/repository";

export const metadata: Metadata = { title: "Categorieën" };

export default async function AdminCategoriesPage() {
  const [categories, pros, jobs] = await Promise.all([listCategories(), listProfessionals(), listJobs()]);
  return (
    <>
      <PageTitle title="Categorieën" intro="Vakgebieden bepalen de URL's, de zoekfilters en welke opdrachten vakmensen zien." />
      <DataTable head={["Naam", "URL", "Vakmensen", "Opdrachten", "Status"]}>
        {categories.map((c) => (
          <tr key={c.slug}>
            <Td className="font-medium">{c.name}</Td>
            <Td><Link href={`/${c.slug}`} className="text-brand-700 hover:underline">/{c.slug}</Link></Td>
            <Td>{pros.filter((p) => p.categories.includes(c.slug)).length}</Td>
            <Td>{jobs.filter((j) => j.categorySlug === c.slug).length}</Td>
            <Td><ManagedStatus initial={c.active ? "actief" : "inactief"} statuses={CATEGORY_STATUSES} subject={c.name} /></Td>
          </tr>
        ))}
      </DataTable>
      <NewCategoryForm />
    </>
  );
}
