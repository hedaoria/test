import { headers } from "next/headers";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

// not-found krijgt geen params; proxy.ts geeft de taal door via een request-header.
export default async function NotFound() {
  const locale = (await headers()).get("x-vc-locale") === "en" ? "en" : "nl";
  return <NotFoundContent locale={locale} />;
}
