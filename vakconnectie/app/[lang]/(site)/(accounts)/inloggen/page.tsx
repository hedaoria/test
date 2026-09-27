import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/layout/AuthShell";
import { LoginForm } from "@/components/forms/AuthForms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Inloggen",
  description: "Log in op je Vakconnectie-account om je klussen, reacties en berichten te bekijken.",
  path: "/inloggen",
  locale: "nl",
  noindex: true,
});

export default async function LoginPage(props: PageProps<"/[lang]/inloggen">) {
  const sp = await props.searchParams;
  const raw = Array.isArray(sp.volgende) ? sp.volgende[0] : sp.volgende;
  // Alleen interne paden toestaan als doorverwijzing.
  const next = raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : undefined;

  return (
    <AuthShell
      title="Inloggen"
      intro={
        <>
          Nog geen account? <Link href="/registreren" className="font-semibold text-brand-700 hover:underline">Registreren</Link>
        </>
      }
    >
      <LoginForm next={next} />
    </AuthShell>
  );
}
