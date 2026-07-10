"use client";

import Script from "next/script";
import { useCookieConsent } from "@/lib/useCookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const consent = useCookieConsent();

  if (!GA_ID || consent !== "all") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
