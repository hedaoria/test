/**
 * Hulpfuncties voor de dashboards. Zolang authenticatie nog niet gekoppeld is,
 * gebruiken de dashboards een lege gebruiker. Vervang
 * CURRENT_CUSTOMER_ID / CURRENT_PROFESSIONAL_SLUG later door de sessie
 * (getSession() uit lib/auth).
 */
import { CURRENT_CUSTOMER_ID, CURRENT_PROFESSIONAL_SLUG } from "@/lib/data/jobs";
import {
  findJob,
  findProfessional,
  findUser,
  listConversationsForCustomer,
  listConversationsForProfessional,
} from "@/lib/repository";
import type { ThreadSummary } from "@/components/dashboard/Messenger";

export const currentCustomerId = CURRENT_CUSTOMER_ID;
export const currentProfessionalSlug = CURRENT_PROFESSIONAL_SLUG;

export async function customerThreads(customerId: string): Promise<ThreadSummary[]> {
  const convs = await listConversationsForCustomer(customerId);
  return Promise.all(
    convs.map(async (c) => {
      const [pro, job] = await Promise.all([findProfessional(c.professionalSlug), findJob(c.jobId)]);
      return {
        id: c.id,
        otherName: pro?.companyName ?? "Vakman",
        otherHref: `/vakman/${c.professionalSlug}`,
        jobTitle: job?.title ?? "Klus",
        jobHref: `/account/klussen/${c.jobId}`,
        messages: c.messages,
      };
    }),
  );
}

export async function professionalThreads(slug: string): Promise<ThreadSummary[]> {
  const convs = await listConversationsForProfessional(slug);
  return Promise.all(
    convs.map(async (c) => {
      const [user, job] = await Promise.all([findUser(c.customerId), findJob(c.jobId)]);
      return {
        id: c.id,
        // Vakmensen zien alleen voornaam + eerste letter achternaam.
        otherName: user ? `${user.firstName} ${user.lastName[0]}.` : "Opdrachtgever",
        jobTitle: job ? `${job.title} · ${job.place}` : "Opdracht",
        jobHref: `/mijn-bedrijf/opdrachten/${c.jobId}`,
        messages: c.messages,
      };
    }),
  );
}

export function unreadCount(threads: ThreadSummary[], me: "klant" | "vakman") {
  return threads.reduce((n, t) => n + t.messages.filter((m) => m.from !== me && !m.read).length, 0);
}
