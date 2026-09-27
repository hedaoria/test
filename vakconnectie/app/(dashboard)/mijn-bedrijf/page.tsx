import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Panel, PageTitle, Stat } from "@/components/dashboard/Panels";
import { OpportunityItem } from "@/components/dashboard/OpportunityItem";
import { NotificationList } from "@/components/dashboard/NotificationList";
import { currentProfessionalSlug, professionalThreads, unreadCount } from "@/lib/dashboard";
import { findProfessional, hasResponded, listJobsForProfessional, listNotifications } from "@/lib/repository";
import { formatRating } from "@/lib/format";

export const metadata: Metadata = { title: "Overzicht" };

export default async function ProOverviewPage() {
  const [pro, jobs, threads, notifications] = await Promise.all([
    findProfessional(currentProfessionalSlug),
    listJobsForProfessional(currentProfessionalSlug),
    professionalThreads(currentProfessionalSlug),
    listNotifications("u-vak-1"),
  ]);
  if (!pro) return null;
  const open = jobs.filter((j) => !hasResponded(j, pro.slug));
  const responded = jobs.filter((j) => hasResponded(j, pro.slug));

  // Eenvoudige profielvolledigheid als stimulans om het profiel aan te vullen.
  const checks = [
    { ok: pro.about.length > 100, label: "Beschrijving van je bedrijf" },
    { ok: pro.projects.length >= 3, label: "Minimaal drie projectfoto's" },
    { ok: pro.certifications.length > 0, label: "Certificaten of lidmaatschappen" },
    { ok: Boolean(pro.logo), label: "Logo of profielfoto" },
    { ok: pro.verified, label: "Bedrijfsgegevens gecontroleerd" },
  ];
  const pct = Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);

  return (
    <>
      <PageTitle title={`Welkom terug, ${pro.contactName.split(" ")[0]}`} intro="Dit gebeurt er bij jou in de regio." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Nieuwe opdrachten" value={open.length} href="/mijn-bedrijf/opdrachten" />
        <Stat label="Mijn reacties" value={responded.length} href="/mijn-bedrijf/reacties" />
        <Stat label="Ongelezen berichten" value={unreadCount(threads, "vakman")} href="/mijn-bedrijf/berichten" />
        <Stat label="Gemiddelde beoordeling" value={pro.rating.count ? `${formatRating(pro.rating.average)} / 5` : "–"} href="/mijn-bedrijf/reviews" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_20rem]">
        <Panel
          title="Opdrachten in jouw regio"
          action={<Link href="/mijn-bedrijf/opdrachten" className="text-sm font-medium text-brand-700 hover:underline">Alles bekijken</Link>}
        >
          {open.length ? (
            <div className="divide-y divide-stone-200">
              {open.slice(0, 4).map((j) => (
                <OpportunityItem key={j.id} job={j} distanceKm={j.distanceKm} responded={false} />
              ))}
            </div>
          ) : (
            <p className="p-5 text-stone-600">Er zijn op dit moment geen nieuwe opdrachten in je werkgebied.</p>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel title="Je profiel">
            <div className="p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Volledigheid</span>
                <span className="font-semibold">{pct}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200">
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} />
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {checks.map((c) => (
                  <li key={c.label} className={c.ok ? "text-stone-500 line-through" : "text-stone-800"}>{c.label}</li>
                ))}
              </ul>
              <ButtonLink href="/mijn-bedrijf/profiel" variant="secondary" size="sm" className="mt-5 w-full">Profiel aanvullen</ButtonLink>
            </div>
          </Panel>
          <div>
            <h2 className="mb-3 font-semibold">Meldingen</h2>
            <NotificationList items={notifications} />
          </div>
        </div>
      </div>
    </>
  );
}
