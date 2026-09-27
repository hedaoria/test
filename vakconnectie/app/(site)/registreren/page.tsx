import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/layout/AuthShell";
import { RegisterForm, RoleTabs } from "@/components/forms/AuthForms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Registreren",
  description: "Maak gratis een account aan als opdrachtgever, of meld je aan als vakman bij Vakconnectie.",
  path: "/registreren",
});

export default async function RegisterPage(props: PageProps<"/registreren">) {
  const sp = await props.searchParams;
  const role = sp.rol === "vakman" ? "vakman" : "klant";
  return (
    <AuthShell
      title={role === "vakman" ? "Aanmelden als vakman" : "Account aanmaken"}
      intro={
        <>
          Heb je al een account? <Link href="/inloggen" className="font-semibold text-brand-700 hover:underline">Inloggen</Link>
        </>
      }
    >
      <RoleTabs role={role} />
      <div className="mt-6">
        <RegisterForm key={role} role={role} />
      </div>
    </AuthShell>
  );
}
