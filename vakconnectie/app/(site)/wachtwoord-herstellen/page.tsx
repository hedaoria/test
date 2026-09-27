import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { ResetPasswordForm } from "@/components/forms/AuthForms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nieuw wachtwoord instellen",
  description: "Stel een nieuw wachtwoord in voor je Vakconnectie-account.",
  path: "/wachtwoord-herstellen",
  noindex: true,
});

export default async function ResetPasswordPage(props: PageProps<"/wachtwoord-herstellen">) {
  const sp = await props.searchParams;
  const token = typeof sp.token === "string" ? sp.token : undefined;
  return (
    <AuthShell title="Nieuw wachtwoord instellen">
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}
