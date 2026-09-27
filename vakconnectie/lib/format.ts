const dateFmt = new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric" });
const shortDateFmt = new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "short" });
const timeFmt = new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit" });

/** Referentiedatum voor relatieve tijden, zodat server en browser hetzelfde tonen. */
export const DEMO_NOW = new Date("2026-09-27T12:00:00");

export function formatDate(iso: string) {
  return dateFmt.format(new Date(iso));
}

export function formatShortDate(iso: string) {
  return shortDateFmt.format(new Date(iso));
}

export function formatTime(iso: string) {
  return timeFmt.format(new Date(iso));
}

export function formatRating(value: number) {
  return value.toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function formatEuro(value: number) {
  return value.toLocaleString("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

export function relativeDate(iso: string, now = DEMO_NOW) {
  const diffDays = Math.floor((now.getTime() - new Date(iso).getTime()) / 86_400_000);
  if (diffDays <= 0) return "vandaag";
  if (diffDays === 1) return "gisteren";
  if (diffDays < 7) return `${diffDays} dagen geleden`;
  if (diffDays < 14) return "vorige week";
  return formatDate(iso);
}

export function initials(name: string) {
  return name
    .replace(/[^A-Za-zÀ-ÿ\s-]/g, "")
    .split(/[\s-]+/)
    .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function pluralize(count: number, singular: string, plural: string) {
  return `${count.toLocaleString("nl-NL")} ${count === 1 ? singular : plural}`;
}
