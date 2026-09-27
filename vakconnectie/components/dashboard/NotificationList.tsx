import Link from "next/link";
import clsx from "clsx";
import { relativeDate } from "@/lib/format";
import type { Notification } from "@/lib/types";

export function NotificationList({ items }: { items: Notification[] }) {
  if (!items.length) return <p className="text-stone-600">Geen notificaties.</p>;
  return (
    <ul className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
      {items.map((n) => (
        <li key={n.id}>
          <Link href={n.href} className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-stone-50">
            <span aria-hidden="true" className={clsx("mt-2 h-2 w-2 shrink-0 rounded-full", n.read ? "bg-transparent" : "bg-brand-600")} />
            <span className="min-w-0 flex-1">
              <span className={clsx("block", n.read ? "text-stone-700" : "font-medium text-stone-950")}>{n.text}</span>
              <span className="text-sm text-stone-500">{relativeDate(n.createdAt)}</span>
            </span>
            {!n.read && <span className="sr-only">Ongelezen</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
