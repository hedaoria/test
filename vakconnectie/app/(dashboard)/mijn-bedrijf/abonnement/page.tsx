import type { Metadata } from "next";
import clsx from "clsx";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Panel, PageTitle } from "@/components/dashboard/Panels";
import { plans } from "@/lib/data/platform";
import { formatDate, formatEuro } from "@/lib/format";

export const metadata: Metadata = { title: "Abonnement en facturatie" };

// Demo: huidig abonnement en facturen. Later: koppeling met betaalprovider (bijv. Mollie of Stripe).
const CURRENT_PLAN = "vak";
const INVOICES = [
  { id: "VC-2026-0918", date: "2026-09-01", amount: 39 },
  { id: "VC-2026-0817", date: "2026-08-01", amount: 39 },
  { id: "VC-2026-0716", date: "2026-07-01", amount: 39 },
];

export default function BillingPage() {
  const current = plans.find((p) => p.id === CURRENT_PLAN)!;
  return (
    <>
      <PageTitle title="Abonnement en facturatie" />
      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <Panel title="Huidig abonnement">
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="text-lg font-semibold">{current.name}</p>
                <p className="text-stone-600">{formatEuro(current.priceMonthly)} per maand, excl. btw · volgende betaling op {formatDate("2026-10-01")}</p>
              </div>
              <Badge tone="brand">Actief</Badge>
            </div>
          </Panel>
          <Panel title="Abonnement wijzigen">
            <ul className="grid gap-3 p-5 md:grid-cols-3">
              {plans.map((p) => (
                <li key={p.id} className={clsx("rounded-xl border p-4", p.id === CURRENT_PLAN ? "border-brand-600 bg-brand-50/50" : "border-stone-200")}>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-stone-600">{p.priceMonthly ? `${formatEuro(p.priceMonthly)} / maand` : "Gratis"}</p>
                  <ul className="mt-3 space-y-1 text-sm text-stone-700">
                    {p.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <Button variant={p.id === CURRENT_PLAN ? "secondary" : "primary"} size="sm" className="mt-4 w-full" disabled={p.id === CURRENT_PLAN}>
                    {p.id === CURRENT_PLAN ? "Huidig abonnement" : `Overstappen naar ${p.name}`}
                  </Button>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Facturen">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-stone-600">
                  <tr><th className="px-5 py-3 font-medium">Factuur</th><th className="px-5 py-3 font-medium">Datum</th><th className="px-5 py-3 font-medium">Bedrag</th><th className="px-5 py-3"><span className="sr-only">Download</span></th></tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {INVOICES.map((i) => (
                    <tr key={i.id}>
                      <td className="px-5 py-3 font-medium">{i.id}</td>
                      <td className="px-5 py-3">{formatDate(i.date)}</td>
                      <td className="px-5 py-3">{formatEuro(i.amount * 1.21)} incl. btw</td>
                      <td className="px-5 py-3 text-right"><span className="font-medium text-brand-700">PDF</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
        <Panel title="Betaalgegevens">
          <div className="space-y-2 p-5 text-sm">
            <p className="text-stone-600">Automatische incasso</p>
            <p className="font-medium">NL•• •••• •••• •••• 42</p>
            <Button variant="secondary" size="sm" className="mt-3">Wijzigen</Button>
            <p className="pt-4 text-stone-500">Je abonnement is maandelijks opzegbaar. Opzeggen gaat in aan het einde van de lopende maand.</p>
          </div>
        </Panel>
      </div>
    </>
  );
}
