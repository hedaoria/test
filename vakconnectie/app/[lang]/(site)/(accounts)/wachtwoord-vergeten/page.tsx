import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/layout/AuthShell";
import { ForgotPasswordForm } from "@/components/forms/AuthForms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Wachtwoord vergeten",
  description: "Vraag een link aan om een nieuw wachtwoord in te stellen.",
  path: "/wachtwoord-vergeten",
  locale: "nl",
  noindex: true,
});

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Wachtwoord vergeten"
      intro="Vul je e-mailadres in. Je ontvangt een link om een nieuw wachtwoord in te stellen."
      aside={
        <p className="mt-6 text-center text-sm">
          <Link href="/inloggen" className="font-medium text-brand-700 hover:underline">← Terug naar inloggen</Link>
        </p>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
