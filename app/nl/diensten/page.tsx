import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import ServicesOverviewPage from "@/components/pages/ServicesOverviewPage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.services,
  title: "Alle Loodgietersdiensten | Spoed, Lekkage, Riolering & Meer",
  description:
    "Bekijk alle diensten van AquaFix Loodgieter: spoedservice, lekkage opsporen, afvoer ontstoppen, riolering, CV-ketel reparatie en badkamerrenovatie in heel Nederland.",
});

export default function Page() {
  const dict = getDictionary("nl");
  return <ServicesOverviewPage locale="nl" dict={dict} />;
}
