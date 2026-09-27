import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/AuthShell";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "E-mailadres bevestigen",
  description: "Bevestig je e-mailadres om je Vakconnectie-account te activeren.",
  path: "/e-mail-bevestigen",
  locale: "nl",
  noindex: true,
});

/**
 * Landingspagina van de verificatielink (/e-mail-bevestigen?token=...).
 * TODO: token valideren via de auth-provider en het account activeren.
 */
export default async function VerifyEmailPage(props: PageProps<"/[lang]/e-mail-bevestigen">) {
  const sp = await props.searchParams;
  const hasToken = typeof sp.token === "string" && sp.token.length > 0;
  return (
    <AuthShell title={hasToken ? "E-mailadres bevestigd" : "Link ongeldig"}>
      <p className="text-stone-700">
        {hasToken
          ? "Bedankt! Je account is actief. Je kunt nu inloggen."
          : "Deze bevestigingslink is ongeldig of verlopen. Log in om een nieuwe link aan te vragen."}
      </p>
      <ButtonLink href="/inloggen" className="mt-6 w-full" size="lg">Inloggen</ButtonLink>
    </AuthShell>
  );
}
