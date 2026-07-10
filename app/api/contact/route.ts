import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  locale?: string;
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const { name, email, phone, message } = payload;

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 });
  }

  // Wire this up to a real email/CRM integration (e.g. Resend, SendGrid, HubSpot) in production.
  console.log("[contact-form]", { name, email, phone, message: message.slice(0, 500) });

  return NextResponse.json({ ok: true });
}
