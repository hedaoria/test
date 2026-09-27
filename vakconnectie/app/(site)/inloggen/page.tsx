import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/layout/AuthShell";
import { LoginForm } from "@/components/forms/AuthForms";
import { DEMO_MODE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Inloggen",
  description: "Log in op je Vakconnectie-account om je klussen, reacties en berichten te bekijken.",
  path: "/inloggen",
  noindex: true,
});

export default async function LoginPage(props: PageProps<"/inloggen">) {
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
      aside={
        DEMO_MODE && (
          <div className="mt-6 rounded-xl border border-dashed border-stone-300 p-5 text-sm">
            <p className="font-semibold text-stone-900">Voorbeeldomgevingen bekijken</p>
            <p className="mt-1 text-stone-600">Inloggen is in deze voorbeeldversie nog niet gekoppeld. Bekijk de dashboards met voorbeeldgegevens:</p>
            <ul className="mt-3 space-y-1.5">
              <li><Link href="/account" className="font-medium text-brand-700 hover:underline">Dashboard opdrachtgever →</Link></li>
              <li><Link href="/mijn-bedrijf" className="font-medium text-brand-700 hover:underline">Dashboard vakman →</Link></li>
              <li><Link href="/beheer" className="font-medium text-brand-700 hover:underline">Beheeromgeving →</Link></li>
            </ul>
          </div>
        )
      }
    >
      <LoginForm next={next} />
    </AuthShell>
  );
}
