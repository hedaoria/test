import { COMPANY } from "@/lib/site";

/**
 * Aanvragen worden verstuurd zoals op vakconnectie.nl: het formulier opent de
 * eigen WhatsApp- of e-mailapp van de bezoeker met een ingevuld bericht.
 * Er wordt niets verstuurd of opgeslagen voordat de bezoeker dat bericht
 * zelf verstuurt.
 */
export function whatsappUrl(text: string) {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Zet label/waarde-paren om in een leesbaar bericht. Lege waarden worden overgeslagen. */
export function composeMessage(intro: string, fields: [string, string | undefined][]) {
  const lines = fields.filter(([, v]) => v && v.trim()).map(([k, v]) => `${k}: ${v!.trim()}`);
  return [intro, "", ...lines].join("\n");
}
