"use client";

import { Mail } from "lucide-react";
import clsx from "clsx";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.9.92-3-.2-.31a8.2 8.2 0 1 1 6.86 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31c-.22.25-.86.84-.86 2.05s.88 2.37 1 2.54c.13.16 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

/**
 * Twee knoppen die de eigen WhatsApp- of e-mailapp van de bezoeker openen met
 * een ingevuld bericht. Er wordt niets verstuurd of opgeslagen voordat de
 * bezoeker het bericht daar zelf verstuurt.
 */
export function SendButtons({
  message,
  subject,
  onBeforeSend,
  onSent,
  className,
}: {
  message: string;
  subject: string;
  /** Validatie vlak voor het openen. Geef false terug om te stoppen. */
  onBeforeSend?: () => boolean;
  onSent?: (channel: "whatsapp" | "email") => void;
  className?: string;
}) {
  function handleClick(e: React.MouseEvent, channel: "whatsapp" | "email") {
    if (onBeforeSend && !onBeforeSend()) {
      e.preventDefault();
      return;
    }
    onSent?.(channel);
  }

  return (
    <div className={clsx("grid gap-3 sm:grid-cols-2", className)}>
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => handleClick(e, "whatsapp")}
        className="inline-flex h-13 items-center justify-center gap-2.5 rounded-lg bg-brand-700 px-5 font-semibold text-white transition-colors hover:bg-brand-800"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Verstuur via WhatsApp
      </a>
      <a
        href={mailtoUrl(subject, message)}
        onClick={(e) => handleClick(e, "email")}
        className="inline-flex h-13 items-center justify-center gap-2.5 rounded-lg border border-stone-300 bg-white px-5 font-semibold text-stone-900 transition-colors hover:border-stone-400 hover:bg-stone-50"
      >
        <Mail className="h-5 w-5" aria-hidden="true" />
        Verstuur via e-mail
      </a>
    </div>
  );
}

export { WhatsAppIcon };
