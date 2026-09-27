import { NextResponse } from "next/server";
import { getCategory } from "@/lib/data/categories";
import { validateJob, type JobInput } from "@/lib/validation";

/**
 * POST /api/klussen — nieuwe klus plaatsen.
 *
 * Valideert de invoer met dezelfde regels als het formulier. Opslaan in de
 * database, account aanmaken, verificatiemail versturen en vakmensen in de
 * regio notificeren gebeurt hier zodra die koppelingen er zijn.
 */
export async function POST(request: Request) {
  let body: Partial<JobInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const input: JobInput = {
    category: String(body.category ?? ""),
    title: String(body.title ?? ""),
    description: String(body.description ?? ""),
    postcode: String(body.postcode ?? ""),
    houseNumber: String(body.houseNumber ?? ""),
    timing: (body.timing ?? "") as JobInput["timing"],
    photos: Array.isArray(body.photos) ? body.photos.map(String).slice(0, 6) : [],
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? ""),
    createAccount: Boolean(body.createAccount),
    password: String(body.password ?? ""),
    invitedProfessional: body.invitedProfessional ? String(body.invitedProfessional) : undefined,
  };

  const errors = validateJob(input);
  if (!getCategory(input.category)) errors.category = "Onbekend vakgebied.";
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // TODO: opslaan (db), foto-upload naar object storage, verificatiemail,
  // notificaties naar vakmensen binnen het werkgebied.
  const id = String(Date.now()).slice(-6);
  return NextResponse.json({ id }, { status: 201 });
}
