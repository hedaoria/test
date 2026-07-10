import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import LocaleLayout from "@/components/layout/LocaleLayout";
import { localBusinessSchema, organizationJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AquaFix Loodgieter | Spoed Loodgieter 24/7 in Heel Nederland",
    template: "%s | AquaFix Loodgieter",
  },
  description:
    "AquaFix Loodgieter: uw betrouwbare loodgieter in heel Nederland. 24/7 spoedservice, lekkage opsporen, ontstopping, riolering, CV-ketel reparatie en badkamerrenovatie.",
  applicationName: "AquaFix Loodgieter",
  authors: [{ name: "AquaFix Loodgieter" }],
  keywords: [
    "loodgieter",
    "spoed loodgieter",
    "loodgieter dichtbij",
    "lekkage opsporen",
    "afvoer ontstoppen",
    "riolering",
    "cv ketel reparatie",
    "badkamer renovatie",
    "erkende loodgieter",
  ],
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
  },
  verification: {
    google: "google-site-verification-code-placeholder",
  },
};

export default function NlLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="antialiased bg-white text-ink-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema("nl")) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <LocaleLayout locale="nl">{children}</LocaleLayout>
      </body>
    </html>
  );
}
