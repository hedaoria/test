"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

/** Acties bij een reactie: vakman kiezen of afwijzen. TODO: koppelen aan API. */
export function ResponseActions({
  conversationHref,
  initial,
  companyName,
}: {
  conversationHref: string;
  initial: "nieuw" | "bekeken" | "gekozen" | "afgewezen";
  companyName: string;
}) {
  const [state, setState] = useState(initial);
  if (state === "gekozen") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-brand-700">Je hebt {companyName} gekozen</span>
        <ButtonLink href={conversationHref} variant="secondary" size="sm">Bericht sturen</ButtonLink>
      </div>
    );
  }
  if (state === "afgewezen") {
    return (
      <p className="text-sm text-stone-500">
        Afgewezen.{" "}
        <button type="button" onClick={() => setState("bekeken")} className="font-medium text-brand-700 hover:underline">Ongedaan maken</button>
      </p>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      <ButtonLink href={conversationHref} size="sm">Bericht sturen</ButtonLink>
      <Button variant="secondary" size="sm" onClick={() => setState("gekozen")}>Kies deze vakman</Button>
      <Button variant="ghost" size="sm" onClick={() => setState("afgewezen")} className="text-stone-600">Afwijzen</Button>
    </div>
  );
}
