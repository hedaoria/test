import { ButtonLink } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";

export function NotFoundContent({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <div className="container-page flex flex-col items-start py-20 sm:py-28">
      <p className="text-sm font-semibold text-brand-700">404</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{d.notFound.title}</h1>
      <p className="mt-3 max-w-lg text-lg text-stone-600">{d.notFound.text}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={localizePath(locale, "/")} size="lg">{d.common.backHome}</ButtonLink>
        <ButtonLink href={localizePath(locale, "/klus-plaatsen")} variant="secondary" size="lg">{d.common.request}</ButtonLink>
      </div>
    </div>
  );
}
