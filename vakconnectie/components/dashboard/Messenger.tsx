"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowLeft, ImagePlus, Paperclip, Send, X } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { formatShortDate, formatTime } from "@/lib/format";
import type { Message } from "@/lib/types";

export interface ThreadSummary {
  id: string;
  otherName: string;
  otherHref?: string;
  jobTitle: string;
  jobHref: string;
  messages: Message[];
}

/**
 * Berichten tussen opdrachtgever en vakman.
 * Nu alleen in de browser; later koppelen aan /api/berichten + realtime (bijv. SSE of websockets).
 */
export function Messenger({
  threads: initial,
  me,
  initialId,
}: {
  threads: ThreadSummary[];
  me: "klant" | "vakman";
  initialId?: string;
}) {
  const startId = initialId && initial.some((t) => t.id === initialId) ? initialId : undefined;
  const [threads, setThreads] = useState(() =>
    initial.map((t) => (t.id === startId ? { ...t, messages: t.messages.map((m) => (m.from !== me ? { ...m, read: true } : m)) } : t)),
  );
  const [activeId, setActiveId] = useState<string | undefined>(startId);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<{ name: string; url: string }>();
  const endRef = useRef<HTMLDivElement>(null);
  const active = threads.find((t) => t.id === activeId);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [activeId, active?.messages.length]);

  function open(id: string) {
    setActiveId(id);
    // Markeer berichten van de ander als gelezen.
    setThreads((ts) => ts.map((t) => (t.id === id ? { ...t, messages: t.messages.map((m) => (m.from !== me ? { ...m, read: true } : m)) } : t)));
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!active || (!text.trim() && !photo)) return;
    const now = new Date().toISOString();
    const added: Message[] = [];
    if (photo) added.push({ id: crypto.randomUUID(), from: me, photo, sentAt: now, read: false });
    if (text.trim()) added.push({ id: crypto.randomUUID(), from: me, text: text.trim(), sentAt: now, read: false });
    setThreads((ts) => ts.map((t) => (t.id === active.id ? { ...t, messages: [...t.messages, ...added] } : t)));
    setText("");
    setPhoto(undefined);
  }

  const unread = (t: ThreadSummary) => t.messages.filter((m) => m.from !== me && !m.read).length;
  const last = (t: ThreadSummary) => t.messages[t.messages.length - 1];

  if (threads.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center text-stone-600">
        Je hebt nog geen gesprekken.
      </div>
    );
  }

  return (
    <div className="grid h-[calc(100dvh-13rem)] min-h-[28rem] overflow-hidden rounded-xl border border-stone-200 bg-white lg:h-[calc(100dvh-10rem)] lg:grid-cols-[20rem_1fr]">
      {/* Gesprekkenlijst */}
      <div className={clsx("min-h-0 overflow-y-auto border-stone-200 lg:block lg:border-r", active && "hidden")}>
        <h2 className="sr-only">Gesprekken</h2>
        <ul className="divide-y divide-stone-100">
          {threads.map((t) => {
            const m = last(t);
            const n = unread(t);
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => open(t.id)}
                  aria-current={t.id === activeId ? "true" : undefined}
                  className={clsx("flex w-full gap-3 px-4 py-4 text-left transition-colors hover:bg-stone-50", t.id === activeId && "bg-brand-50/60")}
                >
                  <Avatar name={t.otherName} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className={clsx("truncate text-[0.9375rem]", n ? "font-semibold text-stone-950" : "font-medium text-stone-800")}>{t.otherName}</span>
                      {m && <span className="shrink-0 text-xs text-stone-500">{formatShortDate(m.sentAt)}</span>}
                    </span>
                    <span className="block truncate text-xs text-stone-500">{t.jobTitle}</span>
                    <span className="mt-0.5 flex items-center justify-between gap-2">
                      <span className={clsx("truncate text-sm", n ? "text-stone-900" : "text-stone-600")}>
                        {m?.photo ? "Foto" : m?.text}
                      </span>
                      {n > 0 && <span className="shrink-0 rounded-full bg-brand-700 px-1.5 text-xs font-semibold text-white">{n}</span>}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Gesprek */}
      {active ? (
        <section className="flex min-h-0 flex-col" aria-label={`Gesprek met ${active.otherName}`}>
          <div className="flex items-center gap-3 border-b border-stone-200 px-4 py-3">
            <button type="button" onClick={() => setActiveId(undefined)} className="-ml-1 rounded-md p-1.5 text-stone-600 hover:bg-stone-100 lg:hidden" aria-label="Terug naar gesprekken">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <p className="truncate font-semibold">
                {active.otherHref ? <Link href={active.otherHref} className="hover:text-brand-700">{active.otherName}</Link> : active.otherName}
              </p>
              <Link href={active.jobHref} className="block truncate text-sm text-stone-500 hover:text-brand-700">{active.jobTitle}</Link>
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-stone-50/60 px-4 py-5" aria-live="polite">
            {active.messages.map((m, i) => {
              const mine = m.from === me;
              const prev = active.messages[i - 1];
              const newDay = !prev || prev.sentAt.slice(0, 10) !== m.sentAt.slice(0, 10);
              return (
                <div key={m.id}>
                  {newDay && (
                    <p className="my-3 text-center text-xs font-medium text-stone-500">
                      {m.sentAt.slice(0, 10) === new Date().toISOString().slice(0, 10) ? "Vandaag" : formatShortDate(m.sentAt)}
                    </p>
                  )}
                  <div className={clsx("flex", mine ? "justify-end" : "justify-start")}>
                    <div className={clsx("max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[0.9375rem] leading-relaxed", mine ? "rounded-br-md bg-brand-700 text-white" : "rounded-bl-md border border-stone-200 bg-white text-stone-900")}>
                      {m.photo &&
                        (m.photo.url ? (
                          // eslint-disable-next-line @next/next/no-img-element -- lokale voorvertoning
                          <img src={m.photo.url} alt={m.photo.name} className="mb-1 max-h-60 rounded-lg" />
                        ) : (
                          <span className={clsx("mb-1 flex items-center gap-2 rounded-lg px-3 py-6 text-sm", mine ? "bg-brand-800" : "bg-stone-100 text-stone-600")}>
                            <Paperclip className="h-4 w-4" aria-hidden="true" /> {m.photo.name}
                          </span>
                        ))}
                      {m.text && <p className="whitespace-pre-line">{m.text}</p>}
                      <p className={clsx("mt-1 text-right text-[0.6875rem]", mine ? "text-brand-100" : "text-stone-400")}>
                        <time dateTime={m.sentAt}>{formatTime(m.sentAt)}</time>
                        {mine && (m.read ? " · Gelezen" : " · Verzonden")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="border-t border-stone-200 p-3">
            {photo && (
              <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-stone-100 py-1 pl-1 pr-2 text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element -- lokale voorvertoning */}
                <img src={photo.url} alt="" className="h-10 w-10 rounded object-cover" />
                <span className="max-w-40 truncate">{photo.name}</span>
                <button type="button" onClick={() => setPhoto(undefined)} aria-label="Foto verwijderen" className="text-stone-500 hover:text-stone-900">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="flex items-end gap-2">
              <label className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600" aria-label="Foto toevoegen">
                <ImagePlus className="h-5 w-5" />
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setPhoto({ name: f.name, url: URL.createObjectURL(f) });
                    e.target.value = "";
                  }}
                />
              </label>
              <label htmlFor="bericht" className="sr-only">Bericht</label>
              <textarea
                id="bericht"
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="Schrijf een bericht…"
                className="input max-h-40 min-h-11 flex-1 resize-none py-2.5"
              />
              <button type="submit" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-white hover:bg-brand-800 disabled:opacity-50" aria-label="Versturen" disabled={!text.trim() && !photo}>
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-xs text-stone-500">Deel je adres of telefoonnummer alleen als je dat zelf wilt.</p>
          </form>
        </section>
      ) : (
        <div className="hidden items-center justify-center p-10 text-stone-500 lg:flex">Kies een gesprek</div>
      )}
    </div>
  );
}
