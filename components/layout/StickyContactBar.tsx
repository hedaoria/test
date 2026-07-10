"use client";

import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/site";
import { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
}

export default function StickyContactBar({ dict }: Props) {
  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 hidden sm:flex flex-col gap-3">
        <a
          href={BUSINESS.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.buttons.whatsappChat}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
        <a
          href={BUSINESS.phoneHref}
          aria-label={dict.buttons.callNow}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-xl shadow-brand-600/40 transition-transform hover:scale-105"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex sm:hidden border-t border-ink-100 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <a
          href={BUSINESS.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 bg-brand-600 py-3.5 text-sm font-semibold text-white"
        >
          <Phone className="h-4.5 w-4.5" />
          {dict.buttons.callNow}
        </a>
        <a
          href={BUSINESS.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4.5 w-4.5" />
          {dict.buttons.whatsappDirect}
        </a>
      </div>
    </>
  );
}
