import { ButtonLink } from "@/components/ui/Button";

export function NotFoundContent() {
  return (
    <div className="container-page flex flex-col items-start py-20 sm:py-28">
      <p className="text-sm font-semibold text-brand-700">404</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Deze pagina bestaat niet (meer)</h1>
      <p className="mt-3 max-w-lg text-lg text-stone-600">
        Misschien is de link verouderd of zit er een typfout in. Probeer het via de homepage of zoek direct een vakman.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">Naar de homepage</ButtonLink>
        <ButtonLink href="/vakmensen" variant="secondary" size="lg">Vind een vakman</ButtonLink>
      </div>
    </div>
  );
}
