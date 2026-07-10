import { SearchX } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { PATHS } from "@/lib/routes";
import Button from "@/components/ui/Button";

export default function NotFound() {
  const dict = getDictionary("nl");

  return (
    <section className="container-page flex flex-col items-center justify-center py-24 text-center sm:py-32">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <SearchX className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-ink-900 sm:text-4xl">{dict.notFound.title}</h1>
      <p className="mt-3 max-w-md text-base text-ink-500">{dict.notFound.description}</p>
      <div className="mt-8">
        <Button href={PATHS.nl.home} variant="primary">
          {dict.notFound.cta}
        </Button>
      </div>
    </section>
  );
}
