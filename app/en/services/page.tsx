import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import ServicesOverviewPage from "@/components/pages/ServicesOverviewPage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.services,
  title: "All Plumbing Services | Emergency, Leaks, Sewers & More",
  description:
    "Explore all AquaFix Loodgieter services: emergency service, leak detection, drain unblocking, sewer services, boiler repair, and bathroom renovation across the Netherlands.",
});

export default function Page() {
  const dict = getDictionary("en");
  return <ServicesOverviewPage locale="en" dict={dict} />;
}
