"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Nieuwe categorie toevoegen. TODO: opslaan via API; nieuwe slug krijgt automatisch een landingspagina. */
export function NewCategoryForm() {
  const [name, setName] = useState("");
  const [added, setAdded] = useState<string[]>([]);
  return (
    <section className="mt-8 rounded-xl border border-stone-200 bg-white p-5">
      <h2 className="font-semibold">Categorie toevoegen</h2>
      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim().length < 3) return;
          setAdded((a) => [...a, name.trim()]);
          setName("");
        }}
      >
        <div className="flex-1">
          <label htmlFor="nieuwe-categorie" className="label">Naam (enkelvoud)</label>
          <input id="nieuwe-categorie" value={name} onChange={(e) => setName(e.target.value)} placeholder="Bijv. Glaszetter" className="input" />
          {name && <p className="mt-1.5 text-sm text-stone-500">URL: /{slugify(name)}</p>}
        </div>
        <Button type="submit">Toevoegen</Button>
      </form>
      {added.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm" role="status">
          {added.map((a) => (
            <li key={a}>Toegevoegd als concept: <strong>{a}</strong> (/{slugify(a)})</li>
          ))}
        </ul>
      )}
    </section>
  );
}
