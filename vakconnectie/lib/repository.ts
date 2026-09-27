/**
 * Repository-laag: de enige plek waar pagina's gegevens ophalen.
 *
 * Nu lezen alle functies uit de demo-data in `lib/data/`. Zodra er een
 * database is (bijvoorbeeld Postgres via Prisma of Drizzle), vervang je
 * alleen de implementatie van deze functies. Pagina's en componenten
 * hoeven dan niet te veranderen, omdat alles al async is.
 */
import { categories, getCategory } from "@/lib/data/categories";
import { cities, getCity } from "@/lib/data/cities";
import { professionals } from "@/lib/data/professionals";
import { reviews } from "@/lib/data/reviews";
import { jobs } from "@/lib/data/jobs";
import { conversations, notifications, reports, users } from "@/lib/data/platform";
import { distanceKm, resolveLocation, type GeoPoint } from "@/lib/geo";
import type { Job, Professional, Review } from "@/lib/types";

export interface RatingSummary {
  average: number;
  count: number;
}

export type ProfessionalWithRating = Professional & { rating: RatingSummary; distanceKm?: number };

function publishedReviews(slug: string) {
  return reviews.filter((r) => r.professionalSlug === slug && r.status === "gepubliceerd");
}

export function summarize(list: Pick<Review, "rating">[]): RatingSummary {
  if (list.length === 0) return { average: 0, count: 0 };
  const avg = list.reduce((sum, r) => sum + r.rating, 0) / list.length;
  return { average: Math.round(avg * 10) / 10, count: list.length };
}

function withRating(p: Professional): ProfessionalWithRating {
  return { ...p, rating: summarize(publishedReviews(p.slug)) };
}

/* ---------- Categorieën & regio's ---------- */

export async function listCategories() {
  return categories.filter((c) => c.active);
}

export async function findCategory(slug: string) {
  return getCategory(slug);
}

export async function listCities() {
  return cities;
}

export async function findCity(slug: string) {
  return getCity(slug);
}

/* ---------- Vakmensen ---------- */

export async function listProfessionals() {
  return professionals.map(withRating);
}

export async function findProfessional(slug: string) {
  const p = professionals.find((x) => x.slug === slug);
  return p ? withRating(p) : undefined;
}

export async function listReviewsFor(slug: string) {
  return publishedReviews(slug).sort((a, b) => b.date.localeCompare(a.date));
}

export async function listAllReviews() {
  return [...reviews].sort((a, b) => b.date.localeCompare(a.date));
}

export interface ProfessionalSearch {
  category?: string;
  postcode?: string;
  place?: string;
  maxDistanceKm?: number;
  sort?: "afstand" | "beoordeling";
}

export interface ProfessionalSearchResult {
  results: ProfessionalWithRating[];
  location: GeoPoint | null;
  locationNotFound: boolean;
}

export async function searchProfessionals(q: ProfessionalSearch): Promise<ProfessionalSearchResult> {
  const hasLocationInput = Boolean(q.postcode?.trim() || q.place?.trim());
  const location = resolveLocation({ postcode: q.postcode, place: q.place });
  let list = professionals.map(withRating);

  if (q.category) list = list.filter((p) => p.categories.includes(q.category!));

  if (location) {
    const max = q.maxDistanceKm ?? 25;
    list = list
      .map((p) => ({ ...p, distanceKm: Math.round(distanceKm(location, p)) }))
      // Toon vakmensen binnen de gekozen afstand én binnen hun eigen werkgebied.
      .filter((p) => p.distanceKm! <= max && p.distanceKm! <= p.radiusKm + 5);
  }

  const sort = q.sort ?? (location ? "afstand" : "beoordeling");
  list.sort((a, b) =>
    sort === "afstand" && a.distanceKm !== undefined && b.distanceKm !== undefined
      ? a.distanceKm - b.distanceKm
      : b.rating.average - a.rating.average || b.rating.count - a.rating.count,
  );

  return { results: list, location, locationNotFound: hasLocationInput && !location };
}

export async function professionalsNear(point: { lat: number; lng: number }, maxKm = 35) {
  return professionals
    .map((p) => ({ ...withRating(p), distanceKm: Math.round(distanceKm(point, p)) }))
    .filter((p) => p.distanceKm <= maxKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

/* ---------- Klussen ---------- */

export async function listJobs() {
  return [...jobs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function findJob(id: string) {
  return jobs.find((j) => j.id === id);
}

export async function listJobsForCustomer(customerId: string) {
  return (await listJobs()).filter((j) => j.customerId === customerId);
}

/** Opdrachten die passen bij vakgebied en werkgebied van een vakman. */
export async function listJobsForProfessional(slug: string) {
  const pro = professionals.find((p) => p.slug === slug);
  if (!pro) return [];
  return (await listJobs())
    .filter((j) => pro.categories.includes(j.categorySlug) && j.status !== "afgerond" && j.status !== "geannuleerd")
    .map((j) => ({ ...j, distanceKm: Math.round(distanceKm(pro, j)) }))
    .filter((j) => j.distanceKm <= pro.radiusKm);
}

export function hasResponded(job: Job, slug: string) {
  return job.responses.some((r) => r.professionalSlug === slug);
}

/* ---------- Berichten, meldingen, gebruikers ---------- */

export async function listConversationsForCustomer(customerId: string) {
  return conversations.filter((c) => c.customerId === customerId);
}

export async function listConversationsForProfessional(slug: string) {
  return conversations.filter((c) => c.professionalSlug === slug);
}

export async function listNotifications(userId: string) {
  return notifications.filter((n) => n.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listUsers() {
  return users;
}

export async function findUser(id: string) {
  return users.find((u) => u.id === id);
}

export async function listReports() {
  return reports;
}
